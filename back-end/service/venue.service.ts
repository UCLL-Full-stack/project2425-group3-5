import { Venue } from '../model/venue';
import venueRepository from '../repository/venue.db';

const getAllVenues = async (): Promise<Venue[]> => {
    return venueRepository.getAllVenues();
};

const getVenueById = async (id: number): Promise<Venue> => {
    const venue = await venueRepository.getVenueById({id});
    if (!venue) {
        throw new Error('Venue not found');
    }
    return venue;
};

const addVenue = async (venueData: {
    name: string;
    address: string;
    capacity: number;
}): Promise<Venue> => {
    const venue = new Venue(venueData);
    return venueRepository.addVenue(venue);
};
/**
const editVenue = async (
    id: number,
    venueData: { name: string; address: string; capacity: number }
): Promise<Venue | null> => {
    const venue = await venueRepository.getVenueById(id);

    if (!venue) {
        throw new Error('Venue not found');
    }

    if (!venueData.name || !venueData.address || venueData.capacity === undefined) {
        throw new Error('Name, address, and capacity are required for editing');
    }

    const updatedVenue = new Venue({
        id,
        ...venueData,
    });

    return venueRepository.editVenue(updatedVenue);
};
**/
export default {
    getAllVenues,
    getVenueById,
    addVenue,
    //editVenue,
};
