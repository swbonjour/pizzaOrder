import axios from "axios";
import { API_URL } from "../utils/dotenvVariables";
import { ISlackActions } from "./slackActionsInterface";

export async function sendOrderData(payload: ISlackActions): Promise<void> {
    await axios.post(`${API_URL}/orders/create`, payload)
        .then((data) => { })
        .catch((err) => {
            console.log(err);
        })
}