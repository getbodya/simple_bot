import { BotFrameworkAdapter, ConversationReference, TurnContext } from "botbuilder";
import { AppBot } from "../bots/bot";

export const loginCallback = (adapter: BotFrameworkAdapter, bot: AppBot, req, res) => {
	const {username, password, state} = req.body;
	//@ts-ignore
	console.log(JSON.parse(Buffer.from(state, 'base64')))
	//@ts-ignore
	const conversationReference = JSON.parse(Buffer.from(state, 'base64').toString())
	adapter.continueConversation(conversationReference, async (context: TurnContext): Promise<void> => {
		const userDataAccessor = bot.userState.createProperty('userProfile');
		
		await userDataAccessor.set(context, {
			first_name: username,
			last_name: username,
			birthday: ''
		});


		await bot.userState.saveChanges(context);
		await bot.beginDialog(context, 'greetingDialog')
	})
}