import { ISlackActions } from "./slackActionsInterface";

export function checkEmptyVariables(payload: ISlackActions): boolean {
    for(let [key, value] of Object.entries(payload)) {
        if(value == '' || value == null || value == undefined || value == 'undefined') {
            return false;
        }
    }

    return true
}