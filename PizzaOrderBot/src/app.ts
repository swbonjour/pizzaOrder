import { App } from '@slack/bolt';

import { SlackActions } from './slackActions/slackActions';
import { PORT, SLACK_APP_TOKEN, SLACK_BOT_TOKEN, SLACK_SIGNIN } from './utils/dotenvVariables';


export const appSlack = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNIN,
    socketMode: true,
    appToken: SLACK_APP_TOKEN,
    port: Number(PORT) || 3000
});

async function startApplication() {
    await appSlack.start();

    const slackActions = new SlackActions();
    await slackActions.startCommands();
    
    console.log('Bolt is running');
}

startApplication();