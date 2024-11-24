/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Event:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Event name.
 *            start_date:
 *              type: string
 *              description: Start date of event.
 *            end_date:
 *              type: string
 *              description: End date of event.
 */
import express, { NextFunction, Request, Response } from 'express';
import { User } from '../model/user';
import { Venue } from '../model/venue';
import eventService from '../service/event.service';


const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of all events.
 *     responses:
 *       200:
 *         description: A JSON array of all events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    }catch (error){
        const err = error as Error;
        res.status(400).json({status: 'error', errorMessage: err.message});
    }
});

export { eventRouter };
