/**
 * @swagger
 *   components:
 *     schemas:
 *       Event:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *             title:
 *               type: string
 *               description: Event name.
 *             start_date:
 *               type: string
 *               description: Start date of event.
 *             end_date:
 *               type: string
 *               description: End date of event.
 *             users:
 *               type: array
 *               description: List of users.
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             venues:
 *               type: array
 *               description: List of venues.
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       EventInput:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *             title:
 *               type: string
 *               description: Event name.
 *             start_date:
 *               type: string
 *               description: Start date of event.
 *             end_date:
 *               type: string
 *               description: End date of event.
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 *             venues:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import eventService from '../service/event.service';
import { EventInput } from '../types';


const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all events.
 *     tags: [events]
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

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get event details by ID.
 *     tags: [events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the event to get.
 *     responses:
 *       200:
 *         description: Event details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 */
eventRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));

        if (!event) {
            return res.status(404).json({ status: 'error', errorMessage: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});


/**
 * @swagger
 * /events:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new event.
 *     tags: [events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - start_date
 *               - end_date
 *               - user
 *               - venue
 *             properties:
 *               title:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               users:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *               venues:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Venue'
 *     responses:
 *       201:
 *         description: Event successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request.
 */
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventInput = <EventInput>req.body;
        const newEvent = await eventService.createEvent(eventInput);
        res.status(201).json(newEvent);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Get event details by ID.
 *     tags: [events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the event to get.
 *     responses:
 *       200:
 *         description: Event details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 */
eventRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.removeEventById(Number(req.params.id));
        res.status(200).json(event);
    } catch(error) {
        next(error);
    };
});

export { eventRouter };

