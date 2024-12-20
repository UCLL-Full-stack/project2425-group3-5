import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { eventRouter } from './controller/event.routes';
import { rsvpRouter } from './controller/rsvp.routes';
import { userRouter } from './controller/user.routes';
import { venueRouter } from './controller/venue.routes';
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/events', eventRouter);
app.use('/users', userRouter);
app.use('/venues', venueRouter);
app.use('/rsvps', rsvpRouter);
app.use('/tasks', venueRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        status: "application error",
        message: err.message
    });
});

const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});