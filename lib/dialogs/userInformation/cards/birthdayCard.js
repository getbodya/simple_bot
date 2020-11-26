"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBirthdayCard = void 0;
const botbuilder_1 = require("botbuilder");
function createBirthdayCard() {
    return {
        attachments: [botbuilder_1.CardFactory.adaptiveCard({
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
    };
}
exports.createBirthdayCard = createBirthdayCard;
