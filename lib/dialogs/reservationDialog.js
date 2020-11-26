"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class ReservationDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor() {
        super('reservationDialog');
        this.firstStep = async (stepContext) => {
            stepContext.context.sendActivity("Welcome to the dinner reservation.");
            return await stepContext.beginDialog('askForDateTime');
        };
        this.secondStep = async (stepContext) => {
            if (stepContext.result) {
                stepContext.options.reservationDate = stepContext.result[0].value;
            }
            return await stepContext.beginDialog('askForPartySize');
        };
        this.thirdStep = async (stepContext) => {
            if (stepContext.result) {
                stepContext.options.partySize = stepContext.result;
            }
            return await stepContext.beginDialog('askForReserverName');
        };
        this.finalStep = async (stepContext) => {
            if (stepContext.result) {
                stepContext.options.reservationName = stepContext.result;
            }
            stepContext.context.sendActivity(`Reservation confirmed.
			\nReservation details: 
				\n\tDate/Time: ${stepContext.options.reservationDate}
				\n\tParty size: ${stepContext.options.partySize}
				\n\tReservation name: ${stepContext.options.reservationName}
		`);
            return await stepContext.endDialog();
        };
        this.addStep(this.firstStep)
            .addStep(this.secondStep)
            .addStep(this.thirdStep)
            .addStep(this.finalStep);
    }
}
exports.ReservationDialog = ReservationDialog;
