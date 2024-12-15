import { Venue } from '../model/venue'
import database from './database';
import {User} from "../model/user";


const getAllVenues = async (): Promise<Venue[]> => {
    try {
        const venuesPrisma = await database.venue.findMany();
        return venuesPrisma.map((venuePrisma) => Venue.from(venuePrisma));
    } catch (error) {
        throw new Error('Failed to retrieve venues');
    }
};


const getVenueById = async ({id}: {id: number}): Promise<Venue | null> => {
    try {
        const venuePrisma = await database.venue.findUnique({
            where: { id },
        });

        return venuePrisma ? Venue.from(venuePrisma) : null;
    } catch (error) {
        throw new Error('Failed to retrieve venue');
    }
};

const addVenue = async (venue: Venue): Promise<Venue> => {
    try {
        const createdVenue = await database.venue.create({
            data: {
                name: venue.getName(),
                address: venue.getAddress(),
                capacity: venue.getCapacity(),
            },
        });

        return Venue.from(createdVenue);
    } catch (error) {
        throw new Error('Failed to add venue');
    }
};

const editVenue = async (venue: Venue): Promise<Venue> => {
    try {
        const updatedVenue = await database.venue.update({
            where: { id: venue.getId() },
            data: {
                name: venue.getName(),
                address: venue.getAddress(),
                capacity: venue.getCapacity(),
            },
        });

        return Venue.from(updatedVenue);
    } catch (error) {
        console.error('Failed to update venue in database:', error);
        throw new Error('Failed to update venue');

    }
};


export default {
    getAllVenues,
    getVenueById,
    addVenue,
    editVenue,
}