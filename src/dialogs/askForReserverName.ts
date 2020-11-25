import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class AskForReserverNameDialog extends WaterfallDialog {
	constructor() {
		super('askForReserverName')
		this.addStep(this.firstStep)
			.addStep(this.secondStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.prompt('textPrompt', "Who's name will this reservation be under?");
	}
	
	private secondStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.endDialog(stepContext.result)
	}
	
}