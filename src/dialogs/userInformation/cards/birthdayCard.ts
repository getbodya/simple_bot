import { CardFactory } from "botbuilder"

export function createBirthdayCard() {
    return {
        attachments: [CardFactory.adaptiveCard({
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Please enter your birthday",
                    "wrap": true
                },
                {
                    "type": "Input.Date",
                    "id": "birthday"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Submit"
                        }
                    ]
                }
            ]
        })]
    }

}


