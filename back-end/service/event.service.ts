import { Event } from '../model/event';
import eventRepository from "../repository/event.db";
import userRepository from "../repository/user.db";
import venueRepository from "../repository/venue.db";

const getAllEvents = (): Event[] => {
    return eventRepository.getAllEvents();
}

const getEventById = (id: number): Event => {
    const event = eventRepository.getEventById({id})
    if(!event) {
        throw new Error('No event with id ' + id);
    }
    return event;
}

const createEvent = async (eventData: {
    id?: number;
    title: string;
    start_date: Date;
    end_date: Date;
    userID: { id: number };
    venueID: { id: number };
}): Promise<Event> => {
    const user = await userRepository.getUserById(eventData.userID);
    const venue = await venueRepository.getVenueById(eventData.venueID);

    if (!user || !venue) {
        throw new Error('User or Venue not found');
    }

    return eventRepository.createEvent({
        ...eventData,
        userID: user,
        venueID: venue
    });
};

export default {
    getAllEvents,
    getEventById,
    createEvent
}