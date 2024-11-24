import { set } from 'date-fns';
import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventPrisma = await database.event.findMany({
            include: {user: true, venue: true},
        })
        return eventPrisma.map((eventPrisma) => Event.from(eventPrisma));
    }catch (error){
        throw new Error("DB error");
    }

}


export default {
    getAllEvents,
}