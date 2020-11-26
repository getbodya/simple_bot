"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class GreetingDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor(userState) {
        super('greetingDialog');
        this.userState = userState;
        this.firstStep = async (stepContext) => {
            const userData = await this.userDataAccessor.get(stepContext.context);
            await stepContext.context.sendActivity(`hello ${userData.first_name}`);
            return stepContext.endDialog();
        };
        this.userDataAccessor = this.userState.createProperty('userProfile');
        this.addStep(this.firstStep);
    }
}
exports.GreetingDialog = GreetingDialog;
