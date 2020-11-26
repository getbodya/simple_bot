"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class HelpDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('help');
        this.firstStep = async (stepContext) => {
            await stepContext.context.sendActivity('this bot supports the following commands:\n- user\n- concat\n- reserv');
            console.log('!@#!@#!@#', stepContext);
            return await stepContext.endDialog();
        };
        this.addStep(this.firstStep);
    }
}
exports.HelpDialog = HelpDialog;
