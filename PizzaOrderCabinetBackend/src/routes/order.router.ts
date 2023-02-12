import express from 'express'
import passport from 'passport';
import { createOrder, getAllOrders, notifyOrderStatus, updateOrderStatus } from '../controlers/order.conrtoller';
import { API_URL } from '../utils/dotenvVariables';

export const orderRouter = express.Router();

orderRouter.get(`${API_URL}/orders/list`, passport.authenticate('jwt', {session: false}), getAllOrders)

orderRouter.post(`${API_URL}/orders/create`, createOrder)

orderRouter.put(`${API_URL}/orders/update`, passport.authenticate('jwt', {session: false}), updateOrderStatus)

orderRouter.delete(`${API_URL}/orderse/delete`, (req, res) => {
    res.send('hell');
})

orderRouter.post(`${API_URL}/orders/notify`, notifyOrderStatus)