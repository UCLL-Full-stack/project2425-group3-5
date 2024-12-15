export type Role = "admin" | "organizer" | "attendee";
export type RsvpStatus = "attending" | "not attending" | "maybe";

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type RSVP = {
    id: number;
    event: Event;
    user: User;
    status: RsvpStatus;
}

export type Task = {
    id: number;
    description: string;
    status: string;
    due_date: string;
    user: User;
}

export type User = {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    role?: string;
}

export type Venue = {
    id: number;
    name: string;
    address: string;
    capacity: number;
    event: Event[];
}

export type Event = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    users: User[];
}

