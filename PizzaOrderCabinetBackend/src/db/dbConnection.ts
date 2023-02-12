import { DataSource } from "typeorm";
import { DATABASE_NAME, DATABASE_TYPE, DATABASE_URL } from "../utils/dotenvVariables";
import { User } from "./models/auth.model";
import { Order } from "./models/order.model";

export const AppDataSource = new DataSource({
    type: DATABASE_TYPE,
    url: DATABASE_URL,
    database: DATABASE_NAME,
    entities: [Order, User],
    synchronize: true,
    useUnifiedTopology: true
})

export async function DatabaseConnection() {
    await AppDataSource.initialize()
        .then(() => {
            console.log('Database Connected')
        })
        .catch((err) => {
            console.log(err);
            console.log('Error occured in database connection')
        })
}