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
exports.DatabaseConnection = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenvVariables_1 = require("../utils/dotenvVariables");
const auth_model_1 = require("./models/auth.model");
const order_model_1 = require("./models/order.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: dotenvVariables_1.DATABASE_TYPE,
    host: dotenvVariables_1.DATABASE_HOST,
    port: dotenvVariables_1.DATABASE_PORT,
    database: dotenvVariables_1.DATABASE_NAME,
    entities: [order_model_1.Order, auth_model_1.User],
    synchronize: true,
    useUnifiedTopology: true
});
function DatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.AppDataSource.initialize()
            .then(() => {
            console.log('Database Connected');
        })
            .catch((err) => {
            console.log('Error occured in database connection');
        });
    });
}
exports.DatabaseConnection = DatabaseConnection;
