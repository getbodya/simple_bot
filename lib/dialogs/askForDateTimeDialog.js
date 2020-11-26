"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskForDateTimeDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class AskForDateTimeDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('askForDateTime');
        this.firstStep = async (stepContext) => {
            return await stepContext.prompt('dateTimePrompt', 'Please provide a reservation date and time (e.g.: June 6th at 5pm)');
        };
        this.secondStep = async (stepContext) => {
            return await stepContext.endDialog(stepContext.result);
        };
        this.addStep(this.firstStep)
            .addStep(this.secondStep);
    }
}
exports.AskForDateTimeDialog = AskForDateTimeDialog;
