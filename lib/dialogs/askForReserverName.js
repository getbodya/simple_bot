"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskForReserverNameDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class AskForReserverNameDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('askForReserverName');
        this.firstStep = async (stepContext) => {
            return await stepContext.prompt('textPrompt', "Who's name will this reservation be under?");
        };
        this.secondStep = async (stepContext) => {
            return await stepContext.endDialog(stepContext.result);
        };
        this.addStep(this.firstStep)
            .addStep(this.secondStep);
    }
}
exports.AskForReserverNameDialog = AskForReserverNameDialog;
