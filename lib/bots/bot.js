"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBot = void 0;
const botbuilder_1 = require("botbuilder");
class AppBot extends botbuilder_1.TeamsActivityHandler {
    constructor(dialogs, conversationState, userState) {
        super();
        this.dialogs = dialogs;
        this.conversationState = conversationState;
        this.userState = userState;
        this.onMessage(this.onMessageHandler.bind(this));
    }
    async run(context) {
        try {
            await super.run(context);
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
        }
        catch (error) {
            console.log(error);
        }
    }
    async onMessageHandler(context, next) {
        const dialogContext = await this.dialogs.createContext(context);
        // if (results.status === DialogTurnStatus.empty) {
        if (dialogContext.context.activity.type = 'message') {
            switch (context.activity.text) {
                case 'help':
                    await dialogContext.cancelAllDialogs();
                    return await dialogContext.replaceDialog('help');
                case 'cancel':
                    const cancelMessageText = 'Cancelling...';
                    await dialogContext.context.sendActivity(cancelMessageText, cancelMessageText, botbuilder_1.InputHints.IgnoringInput);
                    return await dialogContext.cancelAllDialogs();
                case 'user':
                    await dialogContext.beginDialog('userInformation');
                    break;
                case 'reserv':
                    await dialogContext.beginDialog("reservationDialog");
                    break;
                case 'concat':
                    await dialogContext.beginDialog("concatDialog");
                    break;
                case 'show me':
                    await dialogContext.beginDialog("showUserProfile");
                    break;
                case 'login':
                    await dialogContext.beginDialog("loginDialog");
                    break;
                default:
                    await dialogContext.continueDialog();
                    break;
            }
        }
        await next();
    }
    async beginDialog(context, name) {
        const dialogContext = await this.dialogs.createContext(context);
        await dialogContext.cancelAllDialogs();
        await dialogContext.beginDialog(name);
    }
}
exports.AppBot = AppBot;
