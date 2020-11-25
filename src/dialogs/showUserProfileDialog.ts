import { StatePropertyAccessor, UserState } from "botbuilder";
import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class ShowUserProfileDialog extends WaterfallDialog {
	private userDataAccessor: StatePropertyAccessor;

	constructor(private userState: UserState) {
		super('showUserProfile')

		this.userDataAccessor = this.userState.createProperty('userProfile')
		
		this.addStep(this.firstStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		const userData = await this.userDataAccessor.get(stepContext.context)
	
		await stepContext.context.sendActivity(`
			// name: ${userData.first_name} ${userData.last_name}
			// birthday: ${userData.birthday}
		`).catch((err) => console.log(err))

		return await stepContext.endDialog()
	}
}