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
exports.initializePassportJWT = void 0;
const passportJWT = __importStar(require("passport-jwt"));
const dbConnection_1 = require("../db/dbConnection");
const auth_model_1 = require("../db/models/auth.model");
const dotenvVariables_1 = require("../utils/dotenvVariables");
//@ts-ignore
const mongodb = __importStar(require("mongodb"));
const JWTStrategy = passportJWT.Strategy;
const ExctractJWT = passportJWT.ExtractJwt;
const options = {
    jwtFromRequest: ExctractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: dotenvVariables_1.JWT_SECRET
};
function initializePassportJWT(passport) {
    passport.use(new JWTStrategy(options, (payload, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield dbConnection_1.AppDataSource.mongoManager.findOneBy(auth_model_1.User, {
                _id: new mongodb.ObjectId(payload.userID)
            });
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
        }
    })));
}
exports.initializePassportJWT = initializePassportJWT;
