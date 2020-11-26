"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNameCard = void 0;
const botbuilder_1 = require("botbuilder");
function createNameCard() {
    return {
        attachments: [botbuilder_1.CardFactory.adaptiveCard({
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.2",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Please enter your name",
                        "wrap": true
                    },
                    {
                        "type": "Input.Text",
                        "placeholder": "First name",
                        "id": "first_name"
                    },
                    {
                        "type": "Input.Text",
                        "placeholder": "Last name",
                        "id": "last_name"
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
    };
}
exports.createNameCard = createNameCard;
