import { Venue } from '../model/venue'

const venues = [
    new Venue({
        id: 1,
        name: "Test",
        address: "Test",
        capacity: 50
    }),
];

const getVenueById = ({id}: {id: number}): Venue | null => {
    try{
        return venues.find((user) => user.getId() === id) || null;
    }catch (error) {
        console.log(error);
        throw new Error('Error getting venue with id ' + id);
    }
}

export default {
    getVenueById
}