"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const order_conrtoller_1 = require("../controlers/order.conrtoller");
const dotenvVariables_1 = require("../utils/dotenvVariables");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get(`${dotenvVariables_1.API_URL}/orders/list`, passport_1.default.authenticate('jwt', { session: false }), order_conrtoller_1.getAllOrders);
exports.orderRouter.post(`${dotenvVariables_1.API_URL}/orders/create`, order_conrtoller_1.createOrder);
exports.orderRouter.put(`${dotenvVariables_1.API_URL}/orders/update`, passport_1.default.authenticate('jwt', { session: false }), order_conrtoller_1.updateOrderStatus);
exports.orderRouter.delete(`${dotenvVariables_1.API_URL}/orderse/delete`, (req, res) => {
    res.send('hell');
});
exports.orderRouter.post(`${dotenvVariables_1.API_URL}/orders/notify`, order_conrtoller_1.notifyOrderStatus);
