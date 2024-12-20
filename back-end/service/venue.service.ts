import { Venue } from '../model/venue';
import venueDb from '../repository/venue.db';
import { VenueInput } from '../types';

const getAllVenues = async (): Promise<Venue[]> => {
    return venueDb.getAllVenues();
};

const getVenueById = async (id: number): Promise<Venue> => {
    const venue = await venueDb.getVenueById({id});
    if (!venue) throw new Error('Venue not found');
    return venue;
};

const createVenue = async ({
    name: nameInput,
    address: addressInput,
    capacity: capacityInput,
}: VenueInput): Promise<Venue> => {
    if(!nameInput) throw new Error("Venue need a name.");
    if(!addressInput) throw new Error("Venue need a address.");
    if(!capacityInput) throw new Error("Venue need a capacity.");
    const exist = await venueDb.getVenueByName({name: nameInput});

    if(exist) throw new Error("Venue with name already exist.")
    const venue = new Venue({name: nameInput, address: addressInput, capacity: capacityInput});
    return venueDb.addVenue(venue);
};

const editVenue = async (
    id: number,
    venueData: { name: string; address: string; capacity: number }
): Promise<Venue | null> => {
    const venue = await venueDb.getVenueById({id});

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

    return venueDb.editVenue(updatedVenue);
};

const removeVenueById = async (id: number) => {
    const venue = await venueDb.removeVenueById({id});
        if(!venue) throw new Error(`This venue does not exist.`)
        return venue;
}

export default {
    getAllVenues,
    getVenueById,
    createVenue,
    editVenue,
    removeVenueById
};
