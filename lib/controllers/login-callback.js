"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCallback = void 0;
exports.loginCallback = (adapter, bot, req, res) => {
    const { username, password, state } = req.body;
    //@ts-ignore
    console.log(JSON.parse(Buffer.from(state, 'base64')));
    //@ts-ignore
    const conversationReference = JSON.parse(Buffer.from(state, 'base64').toString());
    adapter.continueConversation(conversationReference, async (context) => {
        const userDataAccessor = bot.userState.createProperty('userProfile');
        await userDataAccessor.set(context, {
            first_name: username,
            last_name: username,
            birthday: ''
        });
        await bot.userState.saveChanges(context);
        await bot.beginDialog(context, 'greetingDialog');
    });
};
