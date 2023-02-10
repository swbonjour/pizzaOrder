import { PassportStatic } from 'passport';
import * as passportJWT from 'passport-jwt'
import { AppDataSource } from '../db/dbConnection';
import { User } from '../db/models/auth.model';
import { JWT_SECRET } from '../utils/dotenvVariables';
//@ts-ignore
import * as mongodb from 'mongodb';

const JWTStrategy = passportJWT.Strategy;
const ExctractJWT = passportJWT.ExtractJwt;

const options: passportJWT.StrategyOptions = {
    jwtFromRequest: ExctractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

export function initializePassportJWT(passport: PassportStatic) {
    passport.use(
        new JWTStrategy(options, async (payload, done) => {
            try {
                const user = await AppDataSource.mongoManager.findOneBy(User, {
                    _id: new mongodb.ObjectId(payload.userID)
                })
    
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch(err) {
                
            }
        })
    )
}