"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const nameCard_1 = require("./cards/nameCard");
class UserNameDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('userName');
        this.firstStep = async (stepContext) => {
            await stepContext.context.sendActivity(nameCard_1.createNameCard());
            return botbuilder_dialogs_1.Dialog.EndOfTurn;
        };
        this.secondStep = async (stepContext) => {
            return stepContext.endDialog(stepContext.context.activity.value);
        };
        this.addStep(this.firstStep);
        this.addStep(this.secondStep);
    }
}
exports.UserNameDialog = UserNameDialog;
