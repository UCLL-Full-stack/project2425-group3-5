import { Event } from '../model/event';
import eventRepository from "../repository/event.db";
import userRepository from "../repository/user.db";
import venueRepository from "../repository/venue.db";
import { Role, EventInput, UserInput, VenueInput } from "../types";
import {UnauthorizedError} from "express-jwt";
import userDb from "../repository/user.db";
import venueDb from "../repository/venue.db";

const getAllEvents = async (): Promise<Event[]> => {
    return eventRepository.getAllEvents();
}

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventRepository.getEventById({id});

    if (!event) {
        throw new Error('Event not found');
    }

    return event;
};

const addEvent = async ({
    title,
    start_date,
    end_date,
    user: userInputs,
    venue: venueInputs,
}: EventInput): Promise<Event> => {
    console.log("Processing event with inputs:", { title, start_date, end_date, userInputs, venueInputs });

    //if(user.role !== "admin" && user.role !== "organizer" && user.role !== "attendee") {
    //    throw new UnauthorizedError('credentials_required', {message:'Ubauthorized user'})
    //}
    if (!Array.isArray(userInputs) || userInputs.length === 0) {
        throw new Error("Invalid input: userInputs must be a non-empty array");
    }
    if (!Array.isArray(venueInputs) || venueInputs.length === 0) {
        throw new Error("Invalid input: venueInputs must be a non-empty array");
    }
    const users = []


    for (const userInput of userInputs) {
        if(!userInput?.id){
            throw new Error("User with id is requring")
        }
        const getUsers = await userDb.getUserById({id:userInput.id})

        if(!getUsers){
            throw new Error("No users found for user")
        }else if (getUsers){
            users.push(getUsers)
        }
    }
    const venues = []
    for (const venueInput of venueInputs) {
        if(!venueInput?.id){
            throw new Error("Venue with id is requring")
        }
        const getVenues = await venueDb.getVenueById({id:venueInput.id})

        if(!getVenues){
            throw new Error("No venue with id is requring")
        }else if (getVenues){
            venues.push(getVenues)
        }

    }



    const event = new Event({
        title,
        start_date,
        end_date,
        users,
        venues,
    });

    return eventRepository.addEvent(event);
};


export default {
    getAllEvents,
    getEventById,
    addEvent,
}