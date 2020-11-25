import * as restify from 'restify';
import { BotFrameworkAdapter, ConversationState, MemoryStorage, TurnContext, UserState } from 'botbuilder';
import { ChoicePrompt, DateTimePrompt, DialogSet, OAuthPrompt, TextPrompt } from 'botbuilder-dialogs';
import { CosmosDbPartitionedStorage } from 'botbuilder-azure';
import * as dotenv from 'dotenv';

import { AppBot } from './bots/bot';
import { ConcatDialog } from './dialogs/concatDialog';
import { AskForDateTimeDialog } from './dialogs/askForDateTimeDialog';
import { AskForPartySizeDialog } from './dialogs/askForPartySize';
import { AskForReserverNameDialog } from './dialogs/askForReserverName';
import { ReservationDialog } from './dialogs/reservationDialog';
import { UserInformationDialog } from './dialogs/userInformation/userInformationDialog';
import { UserBirthday } from './dialogs/userInformation/userBirthdayDialog';
import { UserNameDialog } from './dialogs/userInformation/userNameDialog';
import { HelpDialog } from './dialogs/help';
import { ShowUserProfileDialog } from './dialogs/showUserProfileDialog';
import { storageDecorator } from './services/storage-decorator';
import { LoginDialog } from './dialogs/loginDialog/loginDialog';

import {DBClient} from './services/cosmos-client';
import { loginCallback } from './controllers/login-callback';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { GreetingDialog } from './dialogs/greeting';


dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`)
});

const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const memoryStorage = new MemoryStorage();

const storage = new CosmosDbPartitionedStorage({
    cosmosDbEndpoint: process.env.CosmosDbEndpoint,
    authKey: process.env.CosmosDbAuthKey,
    databaseId: process.env.CosmosDbDatabaseId,
    containerId: process.env.CosmosDbContainerId,
    compatibilityMode: false
});
// const decoratedStorage = new storageDecorator(storage)

const conversationState = new ConversationState(storage);
const userState = new UserState(storage);

const dialogs: DialogSet = new DialogSet(conversationState.createProperty('dialogState'))

dialogs.add(new TextPrompt('textPrompt'));
dialogs.add(new DateTimePrompt('dateTimePrompt'));
dialogs.add(new ChoicePrompt('choicePrompt'));
dialogs.add(new ConcatDialog());
dialogs.add(new AskForDateTimeDialog());
dialogs.add(new AskForPartySizeDialog());
dialogs.add(new AskForReserverNameDialog());
dialogs.add(new ReservationDialog());

dialogs.add(new UserNameDialog());
dialogs.add(new UserBirthday());
dialogs.add(new UserInformationDialog(userState));

dialogs.add(new ShowUserProfileDialog(userState));

dialogs.add(new HelpDialog());
dialogs.add(new OAuthPrompt('oauthPrompt', {
    connectionName: 'GitConnection',
    text: 'Please Sign In',
    title: 'Sign In',
    timeout: 30000
}));
dialogs.add(new LoginDialog())
dialogs.add(new GreetingDialog(userState))


const bot = new AppBot(dialogs, conversationState, userState);

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (turnContext: TurnContext) => {
        await bot.run(turnContext)
        
    })
})

server.get(
    '/*',
    restify.plugins.serveStatic({
        directory: './static'
    })
);

server.post('/api/login', async (req, res) => await loginCallback(adapter, bot, req, res))

adapter.use(new AuthMiddleware(bot))