"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDialog = void 0;
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const conver_1 = require("../../utils/conver");
class LoginDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('loginDialog');
        this.firstStep = async (stepContext) => {
            const conversationStateRef = botbuilder_1.TurnContext.getConversationReference(stepContext.context.activity);
            console.log(conversationStateRef);
            await stepContext.context.sendActivity({ attachments: [this.createSignInCard(conversationStateRef)] });
            return await stepContext.endDialog();
        };
        this.addStep(this.firstStep);
    }
    createSignInCard(ref) {
        const state = conver_1.objectToBase64(ref);
        return botbuilder_1.CardFactory.signinCard('BotFramework Sign in Card', `https://todo-bot-deploy.azurewebsites.net/pages/login/login.html?state=${state}`, 'login');
    }
}
exports.LoginDialog = LoginDialog;
