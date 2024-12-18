import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';
import eventDb from "../repository/event.db";
import { EventInput } from '../types';
import userService from './user.service';
import venueService from './venue.service';

const getAllEvents = async (): Promise<Event[]> => eventDb.getAllEvents();

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventDb.getEventById({id});
    if (!event) throw new Error('Event not found');
    return event;
};

const addEvent = async ({
    title: titleInput,
    start_date: start_dateInput,
    end_date: end_dateInput,
    users: usersInput,
    venues: venueInput,
}: EventInput): Promise<Event> => {
    // const users = await Promise.all(
    //     usersInput.userIds.map((userId) => userRepository.getUserById({id: userId}))
    // );


    // const venues = await Promise.all(
    //     eventData.venueIds.map((venueId) => venueRepository.getVenueById(venueId))
    // );

    // const event = new Event({
    //     title: eventData.title,
    //     start_date: eventData.start_date,
    //     end_date: eventData.end_date,
    //     users: users as any,
    //     venues: venues as any,
    // });

    // return eventRepository.addEvent(event);
    if(!titleInput) throw new Error("Event must have a title.");
    if(!start_dateInput) throw new Error("Event must have a start date.");
    if(!end_dateInput) throw new Error("Event must have end date.");
    if(!usersInput[0].id) throw new Error("Must have one user when creating an event.");
    if(!venueInput[0].id) throw new Error("Must have one Venue when creating an event.");
    
    const user = await userService.getUserById(usersInput[0].id);
    const venue = await venueService.getVenueById(venueInput[0].id)
    const users: User[] = [];
    const venues: Venue[] = [];
    users.push(user);
    venues.push(venue);

    const event = new Event({
        title: titleInput,
        start_date: start_dateInput,
        end_date: end_dateInput,
        users,
        venues
    })

    return await eventDb.addEvent(event);
};




export default {
    getAllEvents,
    getEventById,
    addEvent,
}