"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = exports.PORT = exports.SLACK_WEBHOOK = exports.SLACK_APP_TOKEN = exports.SLACK_SIGNIN = exports.SLACK_BOT_TOKEN = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
exports.SLACK_SIGNIN = process.env.SLACK_SIGNIN;
exports.SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;
exports.SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || '';
exports.PORT = process.env.PORT || 8080;
exports.API_URL = process.env.API_URL || 3000;
