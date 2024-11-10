export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export type Event = {
    id?: number;
    title: string;
    start_date: Date;
    end_date: Date;
    userID: User;
    venueID: Venue;
}

export type Venue = {
    id?: number;
    name: string;
    address: string;
    capacity: number;
}
