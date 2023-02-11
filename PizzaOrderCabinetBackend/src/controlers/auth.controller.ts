import { Request, Response } from "express";
import { IUser, User } from "../db/models/auth.model";
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from "../db/dbConnection";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/dotenvVariables";
import { ResponseHelper } from "../utils/responseHandler";

const responseHelper = new ResponseHelper();

export async function register(req: Request, res: Response) {
    const data: IUser = req.body;

    try {
        const userExists = await AppDataSource.mongoManager.findOneBy(User, {
            username: data.username,
        })

        if(userExists) {
            responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The user is already exists' })
            return
        }

        const user = new User()
        const salt = bcrypt.genSaltSync(10)

        user.username = data.username
        user.password = bcrypt.hashSync(data.password, salt)
        

        await AppDataSource.mongoManager.save(user);

        const createdUser = await AppDataSource.mongoManager.findOneBy(User, {
            username: data.username
        })

        if(createdUser) {
            const token = jwt.sign({
                username: data.username,
                userID: createdUser.id
            }, JWT_SECRET, {expiresIn: 60 * 60})     
            responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: { user: user, token: `Bearer ${token}` }})
        }

    } catch(err) {
        responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Something went wrong trying to create user'})
    }
}

export async function login(req: Request, res: Response) {
    const data: IUser = req.body;

    try {
        const user = await AppDataSource.mongoManager.findOneBy(User, {
            username: data.username
        })

        if(user) {
            const comparedPassword = bcrypt.compareSync(data.password, user.password)

            if(comparedPassword) {
                const token = jwt.sign({
                    username: data.username,
                    userID: user.id,
                }, JWT_SECRET, {expiresIn: 60 * 60})

                responseHelper.completedRequest(res, {
                    statusCode: 200,
                    method: 'POST',
                    payload: {
                        token: `Bearer ${token}`
                    }
                })
            } else {
                responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The password is incorrect'})
            }
        } else {
            responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'The user doesn\'t exist'})
        }

    } catch(err) {
        responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Something went wrong trying to sign in. Propablt incorrect'})
    }
}