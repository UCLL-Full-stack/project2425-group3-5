type Role = "admin" | "organizer" | "attendee";
type RsvpStatus = "attending" | "not attending" | "maybe";


type RSVPInput = {
    event: EventInput;
    user: UserInput;
    status: RsvpStatus;
};

type TaskInput = {
    id?: number;
    description: string;
    status: string;
    due_date: Date;
    event: EventInput;
    user: UserInput;
};

type UserInput = {
    id?: number;
    username: string;
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
    user: UserInput;
    venue: VenueInput;
    tasks?: TaskInput[];
    RSVPs?: RSVPInput[];
};

export {
    Role,
    RSVPInput,
    RsvpStatus,
    TaskInput,
    UserInput,
    VenueInput,
    EventInput,
}
