"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcatDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class ConcatDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('concatDialog');
        this.firstStringStep = async (stepContext) => {
            //@ts-ignore
            return await stepContext.prompt('textPrompt', 'enter first string');
        };
        this.secondStringStep = async (stepContext) => {
            stepContext.options.a = stepContext.result;
            return await stepContext.prompt('textPrompt', 'enter second string');
        };
        this.resultStep = async (stepContext) => {
            stepContext.context.sendActivity(`${stepContext.options.a} + ${stepContext.result} = ${stepContext.options.a + stepContext.result} `);
            return await stepContext.endDialog();
        };
        this.addStep(this.firstStringStep)
            .addStep(this.secondStringStep)
            .addStep(this.resultStep);
    }
}
exports.ConcatDialog = ConcatDialog;
