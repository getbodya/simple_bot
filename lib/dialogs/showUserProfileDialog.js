"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowUserProfileDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class ShowUserProfileDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor(userState) {
        super('showUserProfile');
        this.userState = userState;
        this.firstStep = async (stepContext) => {
            const userData = await this.userDataAccessor.get(stepContext.context);
            await stepContext.context.sendActivity(`
			// name: ${userData.first_name} ${userData.last_name}
			// birthday: ${userData.birthday}
		`).catch((err) => console.log(err));
            return await stepContext.endDialog();
        };
        this.userDataAccessor = this.userState.createProperty('userProfile');
        this.addStep(this.firstStep);
    }
}
exports.ShowUserProfileDialog = ShowUserProfileDialog;
