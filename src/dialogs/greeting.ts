import { StatePropertyAccessor, UserState } from "botbuilder";
import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class GreetingDialog extends WaterfallDialog {
	private userDataAccessor: StatePropertyAccessor;

	constructor(private userState: UserState) {
		super('greetingDialog')
		this.userDataAccessor = this.userState.createProperty('userProfile')

		this.addStep(this.firstStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		const userData = await this.userDataAccessor.get(stepContext.context)

		await stepContext.context.sendActivity(`hello ${userData.first_name}`)
		
		return stepContext.endDialog();
	}
}