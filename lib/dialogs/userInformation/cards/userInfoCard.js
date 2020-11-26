"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserInfoCard = void 0;
const botbuilder_1 = require("botbuilder");
function createUserInfoCard({ first_name, last_name, birthday }) {
    return {
        attachments: [botbuilder_1.CardFactory.adaptiveCard({
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.2",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": `First name: ${first_name}`,
                        "wrap": true
                    },
                    {
                        "type": "TextBlock",
                        "text": `Last name: ${last_name}`,
                        "wrap": true
                    },
                    {
                        "type": "TextBlock",
                        "text": `Birthday: ${birthday}`,
                        "wrap": true
                    }
                ]
            })]
    };
}
exports.createUserInfoCard = createUserInfoCard;
