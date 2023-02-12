"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    badRequest(res, { statusCode, method, payload }) {
        const responseObject = {
            statusCode: statusCode,
            method: method,
            payload: payload
        };
        return res.status(responseObject.statusCode).json(responseObject);
    }
    completedRequest(res, { statusCode, method, payload }) {
        const responseObject = {
            statusCode: statusCode,
            method: method,
            payload: payload
        };
        return res.status(responseObject.statusCode).json(responseObject);
    }
}
exports.ResponseHelper = ResponseHelper;
