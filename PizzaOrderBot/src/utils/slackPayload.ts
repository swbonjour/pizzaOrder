import { ISlackActions } from "../slackActions/slackActionsInterface";

export const orderPizzaPayload = {
	"type": "modal",
    "callback_id": "pizza_modal",
	"title": {
		"type": "plain_text",
		"text": "My App",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Hello! I will take your order! :pizza:",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Pizza name:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Cheese pizza",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Chilli pizza",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Pepperoni pizza",
							"emoji": true
						},
						"value": "value-2"
					}
				],
				"action_id": "static_select-name"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Size:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "S",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "M",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "XL",
							"emoji": true
						},
						"value": "value-2"
					}
				],
				"action_id": "static_select-size"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Dough:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Standart",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Thin",
							"emoji": true
						},
						"value": "value-1"
					}
				],
				"action_id": "static_select-dough"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Sideboard:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Standart",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Cheese",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Pepperoni",
							"emoji": true
						},
						"value": "value-2"
					}
				],
				"action_id": "static_select-sideboard"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Topping:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Cheese",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Pepperoni",
							"emoji": true
						},
						"value": "value-1"
					}
				],
				"action_id": "static_select-topping"
			}
		},
		{
			"type": "input",
            "block_id": "destination_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-destination"
			},
			"label": {
				"type": "plain_text",
				"text": "Destination point :house:",
				"emoji": true
			}
		},
		{
			"type": "input",
            "block_id": 'additional_input',
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-additional"
			},
			"label": {
				"type": "plain_text",
				"text": "Additional info :heart:",
				"emoji": true
			}
		}
	]
}

export function createdOrderPayload(payload: ISlackActions) {
	return {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Thank you for the order! :pizza:",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `Your order is: \n Pizza Name: ${payload.name} \n Size: ${payload.size} \n Dough: ${payload.dough} \n Sideboard: ${payload.sideboard} \n Topping: ${payload.topping} \n`
			}
		}
	]
}
}