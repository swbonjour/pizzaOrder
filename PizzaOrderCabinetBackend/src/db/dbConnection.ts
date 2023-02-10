import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT, DATABASE_TYPE } from "../utils/dotenvVariables";
import { User } from "./models/auth.model";
import { Order } from "./models/order.model";

export const AppDataSource = new DataSource({
    type: DATABASE_TYPE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
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
            console.log('Error occured in database connection')
        })
}