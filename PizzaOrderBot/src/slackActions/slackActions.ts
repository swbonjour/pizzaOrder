import axios from "axios";
import { appSlack } from "../app";
import { SLACK_WEBHOOK } from "../utils/dotenvVariables";
import { createdOrderPayload, orderPizzaPayload } from "../utils/slackPayload";
import { sendOrderData } from "./postDataAction";
import { checkEmptyVariables } from "./slackActionsErrorHandler";
import { ISlackActions } from "./slackActionsInterface";

export class SlackActions {

  private payload: ISlackActions = {
    name: '',
    size: '',
    dough: '',
    sideboard: '',
    topping: '',
    destination: '',
    additional: '',
    profileName: '',
    profileImg: '',
    profileID: '',
  }

  constructor() {}

  private startOrderComand() {
    appSlack.command("/order", async ({ ack, body, client }) => {
      await ack();

      await client.views.open({
        trigger_id: body.trigger_id,
        //@ts-ignore
        view: orderPizzaPayload,
      });
    });
  }

  private startSelectActions(actionName: string) {
    appSlack.action(`static_select-${actionName}`, async ({ ack, action }) => {
      await ack();
        
      //@ts-ignore
      this.payload[actionName] = action.selected_option.text.text
    });
  }

  private startModalSubmit() {
    appSlack.view("pizza_modal", async ({ ack, payload, client, body }) => {
      await ack();

      const clientData = await client.users.profile.get({user: body.user.id});

      this.payload.profileName = String(clientData.profile?.real_name)
      this.payload.profileImg = String(clientData.profile?.image_48)
      this.payload.profileID = String(body.user.id)

      this.payload.destination = String(
        payload.state.values.destination_input["plain_text_input-destination"]
          .value
      );
      this.payload.additional = String(
        payload.state.values.additional_input["plain_text_input-additional"]
          .value
      );

      if(!checkEmptyVariables(this.payload)) {
        await axios.post(SLACK_WEBHOOK, {
            text: 'All the items should be selected!'
        })
        return;
      }
      
      try {
        sendOrderData(this.payload);
        await axios.post(SLACK_WEBHOOK, createdOrderPayload(this.payload))
      } catch(err) {
        await axios.post(SLACK_WEBHOOK, {
          text: 'Something went wrong on the server side, try again later'
        })
      }
    });
  }

  private startAllActions() {
    this.startSelectActions("name");
    this.startSelectActions("size");
    this.startSelectActions("dough");
    this.startSelectActions("sideboard");
    this.startSelectActions("topping");
    this.startModalSubmit();
  }

  async startCommands() {
    this.startOrderComand();
    this.startAllActions();
  }
}
