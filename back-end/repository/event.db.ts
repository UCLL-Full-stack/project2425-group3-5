import { set } from 'date-fns';
import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const events = await database.event.findMany({
            include: { user: true, venue: true },
        });
        console.log("Fetched events:", JSON.stringify(events, null, 2)); // Log full event data
        return events.map((event) => Event.from(event));
    } catch (error: any) {
        console.error("Error fetching events from the database:", error);
        throw new Error("DB error");
    }
};

const getEventById = async (id: number): Promise<Event> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: { id },
            include: { user: true, venue: true },
        });

        if (!eventPrisma) {
            throw new Error('No event found');
        }

        return Event.from(eventPrisma);
    } catch (error) {
        throw new Error("DB error");
    }
};


const addEvent = async (event: Event): Promise<Event> => {
    try {
        const createdEvent = await database.event.create({
            data: {
                title: event.getTitle(),
                start_date: event.getStartDate(),
                end_date: event.getEndDate(),
                user: {
                    connect: event.getUsers()?.map((user) => ({ id: user.getId() })),
                },
                venue: {
                    connect: event.getVenues()?.map((venue) => ({ id: venue.getId() })),
                },
            },
            include: { user: true, venue: true },
        });
        return Event.from(createdEvent);
    } catch (error) {
        throw new Error('Failed to add event');
    }
};

export default {
    getAllEvents,
    getEventById,
    addEvent,
}