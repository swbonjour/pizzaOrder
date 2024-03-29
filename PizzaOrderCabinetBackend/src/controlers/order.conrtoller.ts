import { Request, Response } from "express";
import { AppDataSource } from "../db/dbConnection";
import { Order } from "../db/models/order.model";
import { ResponseHelper } from "../utils/responseHandler";
//@ts-ignore
import * as mongodb from 'mongodb';
import axios from 'axios';
import { SLACK_WEBHOOK } from "../utils/dotenvVariables";

const responseHelper = new ResponseHelper();

export async function getAllOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>  {
    try {
        const data: Order[] = await AppDataSource.mongoManager.find(Order);
        return responseHelper.completedRequest(res, { statusCode: 200, method: 'GET', payload: data})
    } catch(err) {
        return responseHelper.badRequest(res, { statusCode: 500, method: 'GET', payload: 'Error while getting orders list' })
    }
}

export async function createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {

    const payload: Order = req.body;

    try {
        const order = new Order();
    
        order.name = payload.name
        order.size = payload.size
        order.dough = payload.dough
        order.sideboard = payload.sideboard
        order.topping = payload.topping
        order.destination = payload.destination
        order.additional = payload.additional
        order.profileName = payload.profileName
        order.profileImg = payload.profileImg
        order.profileID = payload.profileID
        order.status = 'Accepted'

        for(let [key, value] of Object.entries(order)) {
            if(value == '' || value == undefined) {
                return responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Bad request, not all of the data is present'})
            }
        }
    
        await AppDataSource.mongoManager.save(order);

        return responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: payload})
    } catch(err) {
        return responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Error occured while creating order item'})
    }
}

export async function updateOrderStatus(req: Request, res: Response) {
    const payload = req.body;

    try {
        const order = await AppDataSource.mongoManager.findOneAndUpdate(Order, {
            //@ts-ignore
            _id: new mongodb.ObjectId(payload.orderID)
        },
        {
            $set: { status: payload.status }
        })

        if(order) {
            const updatedOrder = await AppDataSource.mongoManager.findOne(Order, {
                //@ts-ignore
                _id: new mongodb.ObjectId(payload.orderID)
            })
            responseHelper.completedRequest(res, { statusCode: 200, method: 'PUT', payload: updatedOrder || {} })
        } else {
            responseHelper.badRequest(res, { statusCode: 500, method: 'PUT', payload: 'There is no such order'})
        }
    } catch(err) {
        console.log(err);
        responseHelper.badRequest(res, { statusCode: 500, method: 'PUT', payload: 'Error occured trying to update status'})
    }
}

export async function notifyOrderStatus(req: Request, res: Response) {
    const payload = req.body;

    try {
        await axios.post(SLACK_WEBHOOK, {
            text: payload.text
        })
        responseHelper.completedRequest(res, { statusCode: 200, method: 'POST', payload: payload.text })
    } catch {
        responseHelper.badRequest(res, { statusCode: 500, method: 'POST', payload: 'Error occured trying to send status'})
    }
}