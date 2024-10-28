import { Venue } from '../model/venue';

type Role = 'admin' | 'organiser' | 'helper' | 'guest';
type RsvpStatus = 'attending' | 'maybe' | 'notAttending';
type TaskStatus = 'done' | 'undone';

type UserInput = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
}

type EventInput = {
    id?: number;
    title: string;
    start_date: Date;
    end_date: Date;
    userID: UserInput;
    venueID: VenueInput;
}

type VenueInput = {
    id?: number;
    name: string;
    address: string;
    capacity: number;
}




export {
    Role,
    TaskStatus,
    RsvpStatus,
    UserInput,
    EventInput,
    VenueInput
};