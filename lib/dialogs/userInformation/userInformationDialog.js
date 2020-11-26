"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInformationDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const userInfoCard_1 = require("./cards/userInfoCard");
class UserInformationDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor(userState) {
        super('userInformation');
        this.userState = userState;
        this.firstStep = async (stepContext) => {
            return await stepContext.beginDialog('userName');
        };
        this.secondStep = async (stepContext) => {
            stepContext.options.first_name = stepContext.result.first_name;
            stepContext.options.last_name = stepContext.result.last_name;
            return await stepContext.beginDialog('userBirthday');
        };
        this.thirdStep = async (stepContext) => {
            this.userDataAccessor.set(stepContext.context, {
                first_name: stepContext.options.first_name,
                last_name: stepContext.options.last_name,
                birthday: stepContext.result.birthday
            });
            await stepContext.context.sendActivity(userInfoCard_1.createUserInfoCard({
                first_name: stepContext.options.first_name,
                last_name: stepContext.options.last_name,
                birthday: stepContext.result.birthday
            }));
            return await stepContext.endDialog();
        };
        this.userDataAccessor = this.userState.createProperty('userProfile');
        this.addStep(this.firstStep);
        this.addStep(this.secondStep);
        this.addStep(this.thirdStep);
    }
}
exports.UserInformationDialog = UserInformationDialog;
