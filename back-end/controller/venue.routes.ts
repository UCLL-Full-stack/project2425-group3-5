import express, { NextFunction, Request, Response } from 'express';
import venueService from '../service/venue.service';
import { VenueInput } from '../types';

const venueRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Venue:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Name of the venue.
 *         address:
 *           type: string
 *           description: Address of the venue.
 *         capacity:
 *           type: number
 *           description: Maximum capacity of the venue.
 */

/**
 * @swagger
 * /venues:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all venues
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: A list of all venues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 */
venueRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const venues = await venueService.getAllVenues();
        res.status(200).json(venues);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the venue to retrieve.
 *     responses:
 *       200:
 *         description: Venue details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Venue not found.
 */
venueRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const venue = await venueService.getVenueById(Number(req.params.id));

        if (!venue) {
            return res.status(404).json({ status: 'error', errorMessage: 'Venue not found' });
        }

        res.status(200).json(venue);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /venues:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venue successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       400:
 *         description: Invalid request.
 */
venueRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const venueInput = <VenueInput>req.body;

        const newVenue = await venueService.createVenue(venueInput);

        res.status(201).json(newVenue);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /venues/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The venue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Venue not found
 */
/**
venueRouter.put('/:id', async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.id, 10);
    const { name, address, capacity } = req.body;

    const updatedVenue = await venueService.editVenue(venueId, {
        name,
        address,
        capacity
    });

    if (!updatedVenue) {
        return res.status(404).json({ error: 'Venue not found' });
    }

    res.status(200).json(updatedVenue);
});

/**
 * @swagger
 * /venues/{id}:
 *   delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete venue by id.
 *      tags: [Venues]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *      responses:
 *         200:
 *            description: Deleted venue with id.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/venue'
 */
venueRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rsvp = await venueService.removeVenueById(Number(req.params.id));
        res.status(200).json(rsvp);
    }catch(error) {
        next(error);
    };
});

export { venueRouter };

