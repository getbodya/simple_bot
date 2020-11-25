import { CardFactory, ConversationReference, StatePropertyAccessor, TurnContext, UserState } from "botbuilder";
import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";
import { objectToBase64 } from "../../utils/conver";

export class LoginDialog extends WaterfallDialog {

	constructor() {
		super('loginDialog')

		
		this.addStep(this.firstStep)
	}

	private firstStep = async (stepContext: WaterfallStepContext) => {
		const conversationStateRef = TurnContext.getConversationReference(stepContext.context.activity)
		console.log(conversationStateRef)
		await stepContext.context.sendActivity({ attachments: [this.createSignInCard(conversationStateRef)] });
		
		return await stepContext.endDialog()
		
	}

	createSignInCard(ref: Partial<ConversationReference>) {
		const state = objectToBase64(ref);

        return CardFactory.signinCard(
            'BotFramework Sign in Card',
            `https://todo-bot-deploy.azurewebsites.net/pages/login/login.html?state=${state}`,
            'login'
        );
    }
}