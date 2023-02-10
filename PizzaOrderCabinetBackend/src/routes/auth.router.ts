import express from 'express'
import { login, register } from '../controlers/auth.controller';
import { API_URL } from '../utils/dotenvVariables';

export const authRouter = express.Router();

authRouter.post(`${API_URL}/auth/register`, register)

authRouter.post(`${API_URL}/auth/login`, login)