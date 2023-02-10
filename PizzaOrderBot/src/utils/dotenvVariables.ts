import * as dotenv from 'dotenv'

dotenv.config();

export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
export const SLACK_SIGNIN = process.env.SLACK_SIGNIN;
export const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;
export const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || '';

export const PORT = process.env.PORT || 8080;

export const API_URL = process.env.API_URL || 3000;