import { set } from 'date-fns';
import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';


const events = [
    new Event({
        id: 1,
        title: "Concert",
        start_date: set(new Date(), {year: 2024, month: 11, date: 5}),
        end_date: set(new Date(), {year: 2024, month: 11, date: 6}),
        userID: new User({
            id: 1,
            username: 'test1',
            firstname: 'Jowan',
            lastname: 'Abdo',
            email: 'test@gmail.com',
            password: '12345',
            role: 'organiser'
        }),
        venueID: new Venue({
            id: 1,
            name: "test",
            address: "Leuven",
            capacity: 300,
        })
    }),
];

const getAllEvents = (): Event[] => {
    return events;
}

const getEventById = ({ id }: { id: number }): Event | null => {
    try{
        return events.find((event) => event.getId() === id) || null;
    }catch (error) {
        console.log(error);
        throw new Error('Error getting event with id ' + id);
    }
}

const createEvent = (eventData: {
    id?: number;
    title: string;
    start_date: Date;
    end_date: Date;
    userID: User;
    venueID: Venue;
}): Event => {
    const newEvent = new Event(eventData);
    events.push(newEvent);
    return newEvent;
};

export default {
    getAllEvents,
    getEventById,
    createEvent
}