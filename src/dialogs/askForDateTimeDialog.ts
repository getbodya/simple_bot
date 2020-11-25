import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class AskForDateTimeDialog extends WaterfallDialog {
	constructor() {
		super('askForDateTime')
		this.addStep(this.firstStep)
			.addStep(this.secondStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.prompt('dateTimePrompt', 'Please provide a reservation date and time (e.g.: June 6th at 5pm)');
	}
	
	private secondStep = async (stepContext: WaterfallStepContext) => {
        return await stepContext.endDialog(stepContext.result)
	}
	
}