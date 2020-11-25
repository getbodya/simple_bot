import { StatePropertyAccessor, UserState } from "botbuilder";
import { WaterfallDialog, WaterfallStep, WaterfallStepContext } from "botbuilder-dialogs";
import { createUserInfoCard } from "./cards/userInfoCard";

export class UserInformationDialog extends WaterfallDialog {
	private userDataAccessor: StatePropertyAccessor;

	constructor(private userState: UserState) {
		super('userInformation')
		this.userDataAccessor = this.userState.createProperty('userProfile')
		this.addStep(this.firstStep)
		this.addStep(this.secondStep)
		this.addStep(this.thirdStep)
	}

	private firstStep: WaterfallStep = async (stepContext: WaterfallStepContext<any>) => {		
		return await stepContext.beginDialog('userName')
	}

	private secondStep = async (stepContext: WaterfallStepContext<any>) => {
		stepContext.options.first_name = stepContext.result.first_name;
		stepContext.options.last_name = stepContext.result.last_name;

		return await stepContext.beginDialog('userBirthday')
	}

	private thirdStep = async (stepContext: WaterfallStepContext<any>) => {
		this.userDataAccessor.set(stepContext.context, {
			first_name: stepContext.options.first_name,
			last_name: stepContext.options.last_name,
			birthday: stepContext.result.birthday
		});
		
		await stepContext.context.sendActivity(createUserInfoCard({
			first_name: stepContext.options.first_name,
			last_name: stepContext.options.last_name,
			birthday: stepContext.result.birthday
		}));

		return await stepContext.endDialog()
	}
	
}