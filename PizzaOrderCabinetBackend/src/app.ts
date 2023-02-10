import express from 'express';
import cors from 'cors';
import passport from 'passport'

import { PORT } from './utils/dotenvVariables';
import { DatabaseConnection } from './db/dbConnection';
import { orderRouter } from './routes/order.router';
import { authRouter } from './routes/auth.router';
import { initializePassportJWT } from './middlewares/passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize())
initializePassportJWT(passport)

app.use(orderRouter);
app.use(authRouter);

async function startApplication() {
    await DatabaseConnection();

    await app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    })
}

startApplication();