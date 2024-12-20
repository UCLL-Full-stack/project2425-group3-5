import { RSVP } from "../model/rsvp";
import eventDb from "../repository/event.db";
import rsvpDb from "../repository/rsvp.db";
import userDb from "../repository/user.db";

import { RSVPInput, RsvpStatus } from "../types";

const createRsvp = async ({
    event: eventInput,
    user: userInput,
    status: rsvpStatus,
}: RSVPInput): Promise<RSVP> => {
    if(!eventInput.id) throw new Error("Event id is required.");
    if(!userInput.id) throw new Error("User if is required.");
    if(!rsvpStatus) throw new Error("Status if is required.");

    const rsvp = await isValidRsvp({eventId: eventInput.id, userId: userInput.id, rsvpStatus}, {mode: "create"})

    return await rsvpDb.createRsvp(rsvp);
}

const getAllRsvp = async (): Promise<RSVP[]> => await rsvpDb.getAllRsvp();


const getRsvpById = async (id: number): Promise<RSVP> => {
    const existingRsvp = await rsvpDb.getRsvpById({id});
    if(!existingRsvp) throw new Error(`This Rsvp does not exist.`)
    return existingRsvp;
}

const getAllRsvpsFromEventByEventId = async (id: number): Promise<RSVP[]> => {
    const event = await eventDb.getEventById({id});
    if(!event) throw new Error(`Event with id: ${id} does not exist.`)
    return rsvpDb.getAllRsvpsFromEventByEventId({eventId: id})
}

const getAllRsvpsFromUserByUserId = async (id: number): Promise<RSVP[]> => {
    const user = await eventDb.getEventById({id});
    if(!user) throw new Error(`User with id: ${id} does not exist.`)
    return rsvpDb.getAllRsvpsFromUserByUserId({userId: id})
}

const updateStatusFromRsvp = async ({
    event: eventInput,
    user: userInput,
    status: rsvpStatus
}: RSVPInput): Promise<RSVP> => {
    if(!eventInput.id) throw new Error("Event id is required.");
    if(!userInput.id) throw new Error("User if is required.");
    if(!rsvpStatus) throw new Error("Status if is required.");

    const status = isValidRsvpStatus(rsvpStatus);
    const rsvp = await isValidRsvp({eventId: eventInput.id, userId: userInput.id, rsvpStatus}, {mode: "update"})

    const event = rsvp.getEvent();
    const venues = event.getVenues();
    if(!venues) throw new Error("event don't have venue yet.");
    const totalCapacity = venues.reduce((total, venue) => {
        return total + venue.getCapacity();
    }, 0);
    if(((event.getUsers()?.length || 0) > totalCapacity) && rsvpStatus == "attending") throw new Error("event is already full.")
        
    return await rsvpDb.updateStatusFromRsvp({rsvp, status});
}

const removeRsvpById = async (id: number) => {
    const rsvp = await rsvpDb.removeRsvpById({id});
    if(!rsvp) throw new Error(`This Rsvp does not exist.`)
    return rsvp;
}

const removeAllRsvpByEventId = async (id: number) => {
    const event = await eventDb.getEventById({id});
    if(!event) throw new Error(`Event with id: ${id} does not exist.`)
    await rsvpDb.removeAllRsvpByEventId({id})
};

const removeAllRsvpByUserId = async (id: number) => {
    const user = await userDb.getUserById({id});
    if(!user) throw new Error(`Event with id: ${id} does not exist.`)
    await rsvpDb.removeAllRsvpByUserId({id})
};

const isValidRsvp = async ({eventId, userId, rsvpStatus}: {eventId: number, userId: number, rsvpStatus: RsvpStatus}, {mode}: {mode: string}): Promise<RSVP> => {
    const event = await eventDb.getEventById({id: eventId});
    const user = await userDb.getUserById({id: userId});
    const status = isValidRsvpStatus(rsvpStatus);

    if(!event) throw new Error(`Event with id: ${eventId} does not exist.`);
    if(!user) throw new Error(`Event with id: ${userId} does not exist.`);

    const existingRsvp = await rsvpDb.getRsvpByEventAndUser({eventId,userId});

    if(existingRsvp && (mode == "create")) throw new Error("RSVP already exist.");
    if(!existingRsvp && (mode == "update")) throw new Error("RSVP does not exist.");

    if(existingRsvp && mode == "update") return existingRsvp;
    const rsvp = new RSVP({event, user, status});
    return rsvp
}

const isValidRsvpStatus = (rsvpStatus: RsvpStatus) => {
    const validRsvpStatus: RsvpStatus[] = ["attending" , "not_attending"];
    if(!validRsvpStatus.includes(rsvpStatus)) throw new Error("RSVP status is invalid.")
    return rsvpStatus
}

export default {
    createRsvp,
    getAllRsvp,
    getRsvpById,
    getAllRsvpsFromEventByEventId,
    getAllRsvpsFromUserByUserId,
    updateStatusFromRsvp,
    removeRsvpById,
    removeAllRsvpByEventId,
    removeAllRsvpByUserId
}