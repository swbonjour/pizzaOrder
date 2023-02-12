import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const DATABASE_TYPE: any = process.env.DATABASE_TYPE || '';
export const DATABASE_NAME: string = process.env.DATABASE_NAME || '';
export const DATABASE_URL: string = process.env.DATABASE_URL || '';

export const API_URL: string = process.env.API_URL || '';
export const JWT_SECRET: string = process.env.JWT_SECRET || '';

export const SLACK_WEBHOOK: string = process.env.SLACK_WEBHOOK || '';