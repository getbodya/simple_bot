import {StatePropertyAccessor, TurnContext } from "botbuilder";
import {isEmpty} from 'lodash';
import { AppBot } from "../bots/bot";

export class AuthMiddleware{
	private userDataAccessor: StatePropertyAccessor;

	constructor(private bot: AppBot) {
		this.userDataAccessor = this.bot.userState.createProperty('userProfile')
	}
	
	async onTurn(context: TurnContext, next) {
		const userData = await this.userDataAccessor.get(context)

		if(context.activity.type === 'message') {
			console.log('userData', userData)
			if(this.checkAuth(userData)) {
				await next();
			} else {
				await context.sendActivity('please login to bot')
				await this.bot.beginDialog(context, 'loginDialog')
			}
		} else {
			await next();
		}
	}

	private checkAuth(userData) {
		return !isEmpty(userData)
	}
}