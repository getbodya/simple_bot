import { Dialog, WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";
import {createNameCard} from './cards/nameCard';


export class UserNameDialog extends WaterfallDialog {
	constructor() {
		super('userName')
		this.addStep(this.firstStep)
		this.addStep(this.secondStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		await stepContext.context.sendActivity(createNameCard())
		return Dialog.EndOfTurn
	}
	
	private secondStep = async (stepContext: WaterfallStepContext) => {
		return stepContext.endDialog(stepContext.context.activity.value)
	}

	
}