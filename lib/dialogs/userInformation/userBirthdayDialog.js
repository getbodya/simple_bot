"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBirthday = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const birthdayCard_1 = require("./cards/birthdayCard");
// const birthdayCard = require('./cards/birthdayCard.json')
class UserBirthday extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('userBirthday');
        this.firstStep = async (stepContext) => {
            console.log('userBirthday.1');
            await stepContext.context.sendActivity(birthdayCard_1.createBirthdayCard());
            return botbuilder_dialogs_1.Dialog.EndOfTurn;
        };
        this.secondStep = async (stepContext) => {
            console.log('userBirthday.2.context.activity', stepContext.context.activity);
            return stepContext.endDialog(stepContext.context.activity.value);
        };
        this.addStep(this.firstStep);
        this.addStep(this.secondStep);
    }
}
exports.UserBirthday = UserBirthday;
