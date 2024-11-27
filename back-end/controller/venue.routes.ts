import express, { Request, Response, NextFunction } from 'express';
import venueService from '../service/venue.service';

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
 *     summary: Get all venues
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
 *     summary: Get venue by ID
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
        const venueId = parseInt(req.params.id, 10);
        const venue = await venueService.getVenueById(venueId);

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
 *     summary: Create a new venue
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
        const { name, address, capacity } = req.body;

        const newVenue = await venueService.addVenue({
            name,
            address,
            capacity,
        });

        res.status(201).json(newVenue);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

export { venueRouter };
