import { CardFactory } from "botbuilder"

export function createNameCard() {
    return {
        attachments: [CardFactory.adaptiveCard({
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
    }

}


