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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_model_1 = require("../db/models/auth.model");
const bcrypt = __importStar(require("bcryptjs"));
const dbConnection_1 = require("../db/dbConnection");
const jwt = __importStar(require("jsonwebtoken"));
const dotenvVariables_1 = require("../utils/dotenvVariables");
const responseHandler_1 = require("../utils/responseHandler");
const responseHelper = new responseHandler_1.ResponseHelper();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const userExists = yield dbConnection_1.AppDataSource.mongoManager.findOneBy(auth_model_1.User, {
                username: data.username,
            });
            if (userExists) {
                responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The user is already exists' });
                return;
            }
            const user = new auth_model_1.User();
            const salt = bcrypt.genSaltSync(10);
            user.username = data.username;
            user.password = bcrypt.hashSync(data.password, salt);
            yield dbConnection_1.AppDataSource.mongoManager.save(user);
            const createdUser = yield dbConnection_1.AppDataSource.mongoManager.findOneBy(auth_model_1.User, {
                username: data.username
            });
            if (createdUser) {
                const token = jwt.sign({
                    username: data.username,
                    userID: createdUser.id
                }, dotenvVariables_1.JWT_SECRET, { expiresIn: 60 * 60 });
                responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: { user: user, token: `Bearer ${token}` } });
            }
        }
        catch (err) {
            console.log(err);
            responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Something went wrong trying to create user' });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const user = yield dbConnection_1.AppDataSource.mongoManager.findOneBy(auth_model_1.User, {
                username: data.username
            });
            if (user) {
                const comparedPassword = bcrypt.compareSync(data.password, user.password);
                if (comparedPassword) {
                    const token = jwt.sign({
                        username: data.username,
                        userID: user.id,
                    }, dotenvVariables_1.JWT_SECRET, { expiresIn: 60 * 60 });
                    responseHelper.completedRequest(res, {
                        statusCode: 200,
                        method: 'POST',
                        payload: {
                            token: `Bearer ${token}`
                        }
                    });
                }
                else {
                    responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The password is incorrect' });
                }
            }
            else {
                responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The user doesn\'t exist' });
            }
        }
        catch (err) {
            responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Something went wrong trying to sign in. Propablt incorrect' });
        }
    });
}
exports.login = login;
