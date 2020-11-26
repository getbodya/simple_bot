"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_azure_1 = require("botbuilder-azure");
const dotenv = require("dotenv");
const bot_1 = require("./bots/bot");
const concatDialog_1 = require("./dialogs/concatDialog");
const askForDateTimeDialog_1 = require("./dialogs/askForDateTimeDialog");
const askForPartySize_1 = require("./dialogs/askForPartySize");
const askForReserverName_1 = require("./dialogs/askForReserverName");
const reservationDialog_1 = require("./dialogs/reservationDialog");
const userInformationDialog_1 = require("./dialogs/userInformation/userInformationDialog");
const userBirthdayDialog_1 = require("./dialogs/userInformation/userBirthdayDialog");
const userNameDialog_1 = require("./dialogs/userInformation/userNameDialog");
const help_1 = require("./dialogs/help");
const showUserProfileDialog_1 = require("./dialogs/showUserProfileDialog");
const loginDialog_1 = require("./dialogs/loginDialog/loginDialog");
const login_callback_1 = require("./controllers/login-callback");
const auth_middleware_1 = require("./middlewares/auth-middleware");
const greeting_1 = require("./dialogs/greeting");
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
const memoryStorage = new botbuilder_1.MemoryStorage();
const storage = new botbuilder_azure_1.CosmosDbPartitionedStorage({
    cosmosDbEndpoint: process.env.CosmosDbEndpoint,
    authKey: process.env.CosmosDbAuthKey,
    databaseId: process.env.CosmosDbDatabaseId,
    containerId: process.env.CosmosDbContainerId,
    compatibilityMode: false
});
// const decoratedStorage = new storageDecorator(storage)
const conversationState = new botbuilder_1.ConversationState(storage);
const userState = new botbuilder_1.UserState(storage);
const dialogs = new botbuilder_dialogs_1.DialogSet(conversationState.createProperty('dialogState'));
dialogs.add(new botbuilder_dialogs_1.TextPrompt('textPrompt'));
dialogs.add(new botbuilder_dialogs_1.DateTimePrompt('dateTimePrompt'));
dialogs.add(new botbuilder_dialogs_1.ChoicePrompt('choicePrompt'));
dialogs.add(new concatDialog_1.ConcatDialog());
dialogs.add(new askForDateTimeDialog_1.AskForDateTimeDialog());
dialogs.add(new askForPartySize_1.AskForPartySizeDialog());
dialogs.add(new askForReserverName_1.AskForReserverNameDialog());
dialogs.add(new reservationDialog_1.ReservationDialog());
dialogs.add(new userNameDialog_1.UserNameDialog());
dialogs.add(new userBirthdayDialog_1.UserBirthday());
dialogs.add(new userInformationDialog_1.UserInformationDialog(userState));
dialogs.add(new showUserProfileDialog_1.ShowUserProfileDialog(userState));
dialogs.add(new help_1.HelpDialog());
dialogs.add(new botbuilder_dialogs_1.OAuthPrompt('oauthPrompt', {
    connectionName: 'GitConnection',
    text: 'Please Sign In',
    title: 'Sign In',
    timeout: 30000
}));
dialogs.add(new loginDialog_1.LoginDialog());
dialogs.add(new greeting_1.GreetingDialog(userState));
const bot = new bot_1.AppBot(dialogs, conversationState, userState);
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (turnContext) => {
        await bot.run(turnContext);
    });
});
server.get('/*', restify.plugins.serveStatic({
    directory: './static'
}));
server.post('/api/login', async (req, res) => await login_callback_1.loginCallback(adapter, bot, req, res));
adapter.use(new auth_middleware_1.AuthMiddleware(bot));
