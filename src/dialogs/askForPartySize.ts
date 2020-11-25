import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class AskForPartySizeDialog extends WaterfallDialog {
	constructor() {
		super('askForPartySize')
		this.addStep(this.firstStep)
			.addStep(this.secondStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.prompt('textPrompt', "How many people are in your party?");
	}
	
	private secondStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.endDialog(stepContext.result)
	}
	
}