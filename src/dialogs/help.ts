import { InputHints } from "botbuilder";
import { ChoiceFactory, WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class HelpDialog extends WaterfallDialog {
	constructor() {
		super('help')
		this.addStep(this.firstStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		await stepContext.context.sendActivity('this bot supports the following commands:\n- user\n- concat\n- reserv')
		console.log('!@#!@#!@#', stepContext)
		return await stepContext.endDialog();
	}
	
	
}