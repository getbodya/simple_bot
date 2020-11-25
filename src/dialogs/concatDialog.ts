import { StatePropertyAccessor, TurnContext } from 'botbuilder';
import { WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';

export class ConcatDialog extends WaterfallDialog {
    private accessor: StatePropertyAccessor;

    constructor() {
        super('concatDialog');
        this.addStep(this.firstStringStep)
            .addStep(this.secondStringStep)
            .addStep(this.resultStep)
    }
    
    private firstStringStep = async (stepContext: WaterfallStepContext) => {
        //@ts-ignore
        return await stepContext.prompt('textPrompt', 'enter first string');
    }
    private secondStringStep = async (stepContext: WaterfallStepContext<{ a: string }>) => {
        stepContext.options.a = stepContext.result;

        return await stepContext.prompt('textPrompt', 'enter second string');
    }
    private resultStep = async (stepContext: WaterfallStepContext<{ a: string }>) => {
      
        stepContext.context.sendActivity(`${stepContext.options.a} + ${stepContext.result} = ${stepContext.options.a + stepContext.result} `)

        return await stepContext.endDialog();
    }

}