import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';


const events = [
    new Event({
        id: 1,
        title: "Concert",
        start_date: "05/11/2024",
        end_date: "06/11/2024",
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
    start_date: string;
    end_date: string;
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