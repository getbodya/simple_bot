import { ActivityHandler, ConversationState, InputHints, StatePropertyAccessor, TeamsActivityHandler, TurnContext, UserState } from "botbuilder";
import { DialogContext, DialogSet, DialogTurnStatus } from "botbuilder-dialogs";

export class AppBot extends TeamsActivityHandler {
    constructor(
        public dialogs: DialogSet,
        public conversationState: ConversationState,
        public userState: UserState
        ) {
        super();

        this.onMessage(this.onMessageHandler.bind(this));
    }

     public async run(context: TurnContext) {
        
        try {
            await super.run(context);

            await this.conversationState.saveChanges(context, false)
            await this.userState.saveChanges(context, false)
        } catch (error) {
            console.log(error)
        }

    }


    private async onMessageHandler(context: TurnContext, next) {
        const dialogContext = await this.dialogs.createContext(context);

        // if (results.status === DialogTurnStatus.empty) {
        if (dialogContext.context.activity.type = 'message') {
            switch (context.activity.text) {
                case 'help':
                    await dialogContext.cancelAllDialogs();
                    return await dialogContext.replaceDialog('help');
                case 'cancel':
                    const cancelMessageText = 'Cancelling...';
                    await dialogContext.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                    return await dialogContext.cancelAllDialogs();
                case 'user': 
                    await dialogContext.beginDialog('userInformation');
                    break;
                case 'reserv': 
                    await dialogContext.beginDialog("reservationDialog");
                    break;
                case 'concat':
                    await dialogContext.beginDialog("concatDialog")
                    break;
                case 'show me':
                    await dialogContext.beginDialog("showUserProfile");
                    break;
                case 'login':
                    await dialogContext.beginDialog("loginDialog");
                    break;

                default:
                    await dialogContext.continueDialog()
                    break;
            }
        }
        await next()
    }

    public async beginDialog(context: TurnContext, name: string) {
        const dialogContext = await this.dialogs.createContext(context);

        await dialogContext.cancelAllDialogs();
        await dialogContext.beginDialog(name)
    }
}