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
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSlack = void 0;
const bolt_1 = require("@slack/bolt");
const slackActions_1 = require("./slackActions/slackActions");
const dotenvVariables_1 = require("./utils/dotenvVariables");
exports.appSlack = new bolt_1.App({
    token: dotenvVariables_1.SLACK_BOT_TOKEN,
    signingSecret: dotenvVariables_1.SLACK_SIGNIN,
    socketMode: true,
    appToken: dotenvVariables_1.SLACK_APP_TOKEN,
    port: Number(dotenvVariables_1.PORT) || 3000
});
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.appSlack.start();
        const slackActions = new slackActions_1.SlackActions();
        yield slackActions.startCommands();
        console.log('Bolt is running');
    });
}
startApplication();
