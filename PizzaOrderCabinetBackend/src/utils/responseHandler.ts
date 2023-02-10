import { Response } from "express"

interface IResponseHelper {
    statusCode: number,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    payload: object | string
}

export class ResponseHelper {

    public badRequest(res: Response, { statusCode, method, payload }: IResponseHelper): Response<any, Record<string, any>> {
        const responseObject =  {
            statusCode: statusCode,
            method: method,
            payload: payload 
        }

        return res.status(responseObject.statusCode).json(responseObject)
    }

    public completedRequest(res: Response, { statusCode, method, payload }: IResponseHelper): Response<any, Record<string, any>> {
        const responseObject: IResponseHelper = {
            statusCode: statusCode,
            method: method,
            payload: payload
        }

        return res.status(responseObject.statusCode).json(responseObject);
    }
}