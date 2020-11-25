import { WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";

export class ReservationDialog extends WaterfallDialog {
	constructor() {
		super('reservationDialog')
		this.addStep(this.firstStep)
			.addStep(this.secondStep)
			.addStep(this.thirdStep)
			.addStep(this.finalStep)
		
	}
	private firstStep = async (stepContext: WaterfallStepContext) => {
		stepContext.context.sendActivity("Welcome to the dinner reservation.")
        return await stepContext.beginDialog('askForDateTime');
	}
	
	private secondStep = async (stepContext: WaterfallStepContext<IReservation>) => {
		if (stepContext.result) {
			stepContext.options.reservationDate = stepContext.result[0].value
		}
		
        return  await stepContext.beginDialog('askForPartySize');
	}

	private thirdStep = async (stepContext: WaterfallStepContext<IReservation>) => {
		if (stepContext.result) {
			stepContext.options.partySize = stepContext.result
		}
		
        return  await stepContext.beginDialog('askForReserverName');
	}

	private finalStep = async (stepContext: WaterfallStepContext<IReservation>) => {
		if (stepContext.result) {
			stepContext.options.reservationName = stepContext.result
		}
		stepContext.context.sendActivity(`Reservation confirmed.
			\nReservation details: 
				\n\tDate/Time: ${stepContext.options.reservationDate}
				\n\tParty size: ${stepContext.options.partySize}
				\n\tReservation name: ${stepContext.options.reservationName}
		`);

        return  await stepContext.endDialog();
	}
}

interface IReservation {
	reservationDate: string;
	partySize: string;
	reservationName: string;
}