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


export default {
    getAllEvents,
    getEventById,
}