import { Dialog, WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";
import {createBirthdayCard} from './cards/birthdayCard';

// const birthdayCard = require('./cards/birthdayCard.json')

export class UserBirthday extends WaterfallDialog {
	constructor() {
		super('userBirthday')
		this.addStep(this.firstStep)
		this.addStep(this.secondStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		console.log('userBirthday.1')
		await stepContext.context.sendActivity(createBirthdayCard())
		return Dialog.EndOfTurn
	}
	
	private secondStep = async (stepContext: WaterfallStepContext) => {
		console.log('userBirthday.2.context.activity', stepContext.context.activity)

		return stepContext.endDialog(stepContext.context.activity.value)
	}

	
}