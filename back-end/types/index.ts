type Role = "admin" | "organizer" | "attendee";
type RsvpStatus = "attending" | "not_attending";


type RSVPInput = {
    id?: number;
    event: EventInput;
    user: UserInput;
    status: RsvpStatus;
};

type TaskInput = {
    id?: number;
    description: string;
    status: string;
    due_date: Date;
    user: UserInput;
};

type UserInput = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
};

type VenueInput = {
    id?: number;
    name: string;
    address: string;
    capacity: number;
};

type EventInput = {
    id?: number;
    title: string;
    start_date: Date;
    end_date: Date;
    users: UserInput[];
    venues: VenueInput[];
};

export {
    EventInput, Role, RSVPInput, RsvpStatus,
    TaskInput,
    UserInput,
    VenueInput
};

