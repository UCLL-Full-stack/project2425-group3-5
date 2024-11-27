import { Event } from '../model/event';
import eventRepository from "../repository/event.db";
import userRepository from "../repository/user.db";
import venueRepository from "../repository/venue.db";

const getAllEvents = async (): Promise<Event[]> => {
    return eventRepository.getAllEvents();
}

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventRepository.getEventById(id);

    if (!event) {
        throw new Error('Event not found');
    }

    return event;
};

const addEvent = async (eventData: {
    title: string;
    start_date: Date;
    end_date: Date;
    userIds: number[];
    venueIds: number[];
}): Promise<Event> => {

    const users = await Promise.all(
        eventData.userIds.map((userId) => userRepository.getUserById(userId))
    );


    const venues = await Promise.all(
        eventData.venueIds.map((venueId) => venueRepository.getVenueById(venueId))
    );


    if (users.some((user) => !user)) {
        throw new Error("One or more users do not exist");
    }
    if (venues.some((venue) => !venue)) {
        throw new Error("One or more venues do not exist");
    }


    const event = new Event({
        title: eventData.title,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        users: users as any,
        venues: venues as any,
    });

    return eventRepository.addEvent(event);
};


export default {
    getAllEvents,
    getEventById,
    addEvent,
}