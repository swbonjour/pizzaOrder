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
exports.notifyOrderStatus = exports.updateOrderStatus = exports.createOrder = exports.getAllOrders = void 0;
const dbConnection_1 = require("../db/dbConnection");
const order_model_1 = require("../db/models/order.model");
const responseHandler_1 = require("../utils/responseHandler");
//@ts-ignore
const mongodb = __importStar(require("mongodb"));
const axios_1 = __importDefault(require("axios"));
const dotenvVariables_1 = require("../utils/dotenvVariables");
const responseHelper = new responseHandler_1.ResponseHelper();
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield dbConnection_1.AppDataSource.mongoManager.find(order_model_1.Order);
            return responseHelper.completedRequest(res, { statusCode: 200, method: 'GET', payload: data });
        }
        catch (err) {
            return responseHelper.badRequest(res, { statusCode: 500, method: 'GET', payload: 'Error while getting orders list' });
        }
    });
}
exports.getAllOrders = getAllOrders;
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        try {
            const order = new order_model_1.Order();
            order.name = payload.name;
            order.size = payload.size;
            order.dough = payload.dough;
            order.sideboard = payload.sideboard;
            order.topping = payload.topping;
            order.destination = payload.destination;
            order.additional = payload.additional;
            order.profileName = payload.profileName;
            order.profileImg = payload.profileImg;
            order.profileID = payload.profileID;
            order.status = 'Accepted';
            for (let [key, value] of Object.entries(order)) {
                if (value == '' || value == undefined) {
                    return responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Bad request, not all of the data is present' });
                }
            }
            yield dbConnection_1.AppDataSource.mongoManager.save(order);
            return responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: payload });
        }
        catch (err) {
            return responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Error occured while creating order item' });
        }
    });
}
exports.createOrder = createOrder;
function updateOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        try {
            const order = yield dbConnection_1.AppDataSource.mongoManager.findOneAndUpdate(order_model_1.Order, {
                //@ts-ignore
                _id: new mongodb.ObjectId(payload.orderID)
            }, {
                $set: { status: payload.status }
            });
            if (order) {
                const updatedOrder = yield dbConnection_1.AppDataSource.mongoManager.findOne(order_model_1.Order, {
                    //@ts-ignore
                    _id: new mongodb.ObjectId(payload.orderID)
                });
                responseHelper.completedRequest(res, { statusCode: 200, method: 'PUT', payload: updatedOrder || {} });
            }
            else {
                responseHelper.badRequest(res, { statusCode: 500, method: 'PUT', payload: 'There is no such order' });
            }
        }
        catch (err) {
            console.log(err);
            responseHelper.badRequest(res, { statusCode: 500, method: 'PUT', payload: 'Error occured trying to update status' });
        }
    });
}
exports.updateOrderStatus = updateOrderStatus;
function notifyOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        try {
            yield axios_1.default.post(dotenvVariables_1.SLACK_WEBHOOK, {
                text: payload.text
            });
            responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: payload.text });
        }
        catch (_a) {
            responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Error occured trying to send status' });
        }
    });
}
exports.notifyOrderStatus = notifyOrderStatus;
