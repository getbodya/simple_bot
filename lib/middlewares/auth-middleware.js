"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const lodash_1 = require("lodash");
class AuthMiddleware {
    constructor(bot) {
        this.bot = bot;
        this.userDataAccessor = this.bot.userState.createProperty('userProfile');
    }
    async onTurn(context, next) {
        const userData = await this.userDataAccessor.get(context);
        if (context.activity.type === 'message') {
            console.log('userData', userData);
            if (this.checkAuth(userData)) {
                await next();
            }
            else {
                await context.sendActivity('please login to bot');
                await this.bot.beginDialog(context, 'loginDialog');
            }
        }
        else {
            await next();
        }
    }
    checkAuth(userData) {
        return !lodash_1.isEmpty(userData);
    }
}
exports.AuthMiddleware = AuthMiddleware;
