"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackActions = void 0;
const axios_1 = __importDefault(require("axios"));
const app_1 = require("../app");
const dotenvVariables_1 = require("../utils/dotenvVariables");
const slackPayload_1 = require("../utils/slackPayload");
const postDataAction_1 = require("./postDataAction");
const slackActionsErrorHandler_1 = require("./slackActionsErrorHandler");
class SlackActions {
    constructor() {
        this.payload = {
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
        };
    }
    startOrderComand() {
        app_1.appSlack.command("/order", ({ ack, body, client }) => __awaiter(this, void 0, void 0, function* () {
            yield ack();
            yield client.views.open({
                trigger_id: body.trigger_id,
                //@ts-ignore
                view: slackPayload_1.orderPizzaPayload,
            });
        }));
    }
    startSelectActions(actionName) {
        app_1.appSlack.action(`static_select-${actionName}`, ({ ack, action }) => __awaiter(this, void 0, void 0, function* () {
            yield ack();
            //@ts-ignore
            this.payload[actionName] = action.selected_option.text.text;
        }));
    }
    startModalSubmit() {
        app_1.appSlack.view("pizza_modal", ({ ack, payload, client, body }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield ack();
            const clientData = yield client.users.profile.get({ user: body.user.id });
            this.payload.profileName = String((_a = clientData.profile) === null || _a === void 0 ? void 0 : _a.real_name);
            this.payload.profileImg = String((_b = clientData.profile) === null || _b === void 0 ? void 0 : _b.image_48);
            this.payload.profileID = String(body.user.id);
            this.payload.destination = String(payload.state.values.destination_input["plain_text_input-destination"]
                .value);
            this.payload.additional = String(payload.state.values.additional_input["plain_text_input-additional"]
                .value);
            if (!(0, slackActionsErrorHandler_1.checkEmptyVariables)(this.payload)) {
                yield axios_1.default.post(dotenvVariables_1.SLACK_WEBHOOK, {
                    text: 'All the items should be selected!'
                });
                return;
            }
            try {
                (0, postDataAction_1.sendOrderData)(this.payload);
                yield axios_1.default.post(dotenvVariables_1.SLACK_WEBHOOK, (0, slackPayload_1.createdOrderPayload)(this.payload));
            }
            catch (err) {
                yield axios_1.default.post(dotenvVariables_1.SLACK_WEBHOOK, {
                    text: 'Something went wrong on the server side, try again later'
                });
            }
        }));
    }
    startAllActions() {
        this.startSelectActions("name");
        this.startSelectActions("size");
        this.startSelectActions("dough");
        this.startSelectActions("sideboard");
        this.startSelectActions("topping");
        this.startModalSubmit();
    }
    startCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startOrderComand();
            this.startAllActions();
        });
    }
}
exports.SlackActions = SlackActions;
