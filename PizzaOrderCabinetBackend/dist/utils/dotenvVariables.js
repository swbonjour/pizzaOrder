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
exports.SLACK_WEBHOOK = exports.JWT_SECRET = exports.API_URL = exports.DATABASE_NAME = exports.DATABASE_PORT = exports.DATABASE_HOST = exports.DATABASE_TYPE = exports.PORT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.PORT = Number(process.env.PORT) || 3000;
exports.DATABASE_TYPE = process.env.DATABASE_TYPE || '';
exports.DATABASE_HOST = process.env.DATABASE_HOST || '';
exports.DATABASE_PORT = Number(process.env.DATABASE_PORT) || 27017;
exports.DATABASE_NAME = process.env.DATABASE_NAME || '';
exports.API_URL = process.env.API_URL || '';
exports.JWT_SECRET = process.env.JWT_SECRET || '';
exports.SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || '';
