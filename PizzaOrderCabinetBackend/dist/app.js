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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const dotenvVariables_1 = require("./utils/dotenvVariables");
const dbConnection_1 = require("./db/dbConnection");
const order_router_1 = require("./routes/order.router");
const auth_router_1 = require("./routes/auth.router");
const passport_2 = require("./middlewares/passport");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
(0, passport_2.initializePassportJWT)(passport_1.default);
app.use(order_router_1.orderRouter);
app.use(auth_router_1.authRouter);
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, dbConnection_1.DatabaseConnection)();
        yield app.listen(dotenvVariables_1.PORT, () => {
            console.log(`Server is listening on ${dotenvVariables_1.PORT}`);
        });
    });
}
startApplication();
