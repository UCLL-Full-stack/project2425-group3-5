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
import eventService from '../service/event.service';
import { User } from '../model/user';
import { Venue } from '../model/venue';

const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of all events.
 *     responses:
 *       200:
 *         description: A JSON array of all lecturers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturer = await eventService.getAllEvents();
        res.status(200).json(lecturer);
    }catch (error){
        const err = error as Error;
        res.status(400).json({status: 'error', errorMessage: err.message});
    }
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Event title.
 *                 example: "Hackathon"
 *               start_date:
 *                 type: string
 *                 description: Start date of the event.
 *                 example: "05/11/2024"
 *               end_date:
 *                 type: string
 *                 description: End date of the event.
 *                 example: "07/11/2024"
 *               userID:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *               venueID:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *     responses:
 *       200:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid input.
 */
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, start_date, end_date, userID, venueID } = req.body;

        const user = new User(userID);
        const venue = new Venue(venueID);

        const newEvent = eventService.createEvent({
            title,
            start_date,
            end_date,
            userID: user,
            venueID: venue
        });

        res.status(200).json(newEvent);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

export { eventRouter };