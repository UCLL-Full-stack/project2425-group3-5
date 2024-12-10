/**
 * @swagger
 *   components:
 *     schemas:
 *       RSVP:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *             event:
 *               $ref: '#/components/schemas/Event'
 *             user:
 *               $ref: '#/components/schemas/User'
 *             status:
 *               $ref: '#/components/schemas/RsvpStatus'
 *       RsvpInput:
 *           type: object
 *           properties:
 *             event:
 *               type: object
 *               properties:
 *                   id:
 *                       type: number
 *                       formate: int64
 *             user:
 *               type: object
 *               properties:
 *                   id:
 *                       type: number
 *                       formate: int64
 *             status:
 *               $ref: '#/components/schemas/RsvpStatus'
 *       RsvpStatus:
 *           type: string
 *           enum: [attending, not attending]
 */

import express, { NextFunction, Request, Response } from 'express';
import rsvpService from '../service/rsvp.service';
import { RSVPInput } from '../types';

export const rsvpRouter = express.Router();

/**
 * @swagger
 * /rsvps:
 *   post:
 *      summary: Create a new RSVP with existing event and user.
 *      tags: [RSVPs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RsvpInput'
 *      responses:
 *         200:
 *            description: The created rsvp.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = <RSVPInput>req.body;
        const result = await rsvpService.createRsvp(rsvp);
        res.status(201).json(result);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps:
 *   get:
 *      summary: Get all RSVPs.
 *      tags: [RSVPs]
 *      responses:
 *         200:
 *            description: List of RSVPs.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await rsvpService.getAllRsvp();
        res.status(200).json(result);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps:
 *   put:
 *      summary: Update RSVP data.
 *      tags: [RSVPs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RsvpInput'
 *      responses:
 *         200:
 *            description: Update RSVP status.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvpInput = <RSVPInput>req.body
        const rsvp = await rsvpService.updateStatusFromRsvp(rsvpInput);
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/{id}:
 *   get:
 *      summary: Get Rsvp by id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: RSVP with id.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.getRsvpById(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/user/{id}:
 *   get:
 *      summary: Get All RSVPs by user id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: List of RSVPs of user.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.getAllRsvpsFromUserByUserId(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/event/{id}:
 *   get:
 *      summary: Get all RSVPs by event id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: List of RSVPs of event.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.get('/event/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.getAllRsvpsFromEventByEventId(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/{id}:
 *   delete:
 *      summary: Delete Rsvp by id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: Deleted RSVP with id.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/RSVP'
 */
rsvpRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.removeRsvpById(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/event/{id}:
 *   delete:
 *      summary: Remove all RSVPs with event id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: Amount of deleted RSVPs.
 *            content:
 *              application/json:
 *                schema:
 *                  type: integer
 */
rsvpRouter.delete('/event/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.removeAllRsvpByEventId(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

/**
 * @swagger
 * /rsvps/user/{id}:
 *   delete:
 *      summary: Remove all RSVPs with user id.
 *      tags: [RSVPs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: Amount of deleted RSVPs.
 *            content:
 *              application/json:
 *                schema:
 *                  type: integer
 */
rsvpRouter.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await rsvpService.removeAllRsvpByUserId(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

