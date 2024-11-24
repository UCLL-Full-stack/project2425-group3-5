import { Event } from '../model/event';
import eventRepository from "../repository/event.db";
import userRepository from "../repository/user.db";
import venueRepository from "../repository/venue.db";

const getAllEvents = async (): Promise<Event[]> => {
    return eventRepository.getAllEvents();
}




export default {
    getAllEvents,
}