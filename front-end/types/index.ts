export type Role = "admin" | "organizer" | "attendee";
export type RsvpStatus = "attending" | "not attending" | "maybe";

export type RSVP = {
    event: Event;
    user: User;
    status: RsvpStatus;
}

export type Task = {
    id?: number;
    description: string;
    status: string;
    due_date: string;
    event: Event;
    user: User;

}

export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
}

export type Venue = {
    id?: number;
    name: string;
    address: string;
    capacity: number;
}

export type Event = {
    id?: number;
    title: string;
    start_date: string;
    end_date: string;
    user: User;
    venue: Venue;
    tasks?: Task[];
    RSVPs?: RSVP[];

}

