import { Request, Response } from "express";
import { AppDataSource } from "../db/dbConnection";
import { Order } from "../db/models/order.model";
import { ResponseHelper } from "../utils/responseHandler";

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