"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskForPartySizeDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class AskForPartySizeDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('askForPartySize');
        this.firstStep = async (stepContext) => {
            return await stepContext.prompt('textPrompt', "How many people are in your party?");
        };
        this.secondStep = async (stepContext) => {
            return await stepContext.endDialog(stepContext.result);
        };
        this.addStep(this.firstStep)
            .addStep(this.secondStep);
    }
}
exports.AskForPartySizeDialog = AskForPartySizeDialog;
