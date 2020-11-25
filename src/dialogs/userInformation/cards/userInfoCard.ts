import { CardFactory } from "botbuilder"

export function createUserInfoCard({first_name, last_name, birthday}) {
    return {
        attachments: [CardFactory.adaptiveCard({
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
    }
}


