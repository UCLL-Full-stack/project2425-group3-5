import {
    Event as EventPrisma,
    User as UserPrisma,
    Venue as VenuePrisma
} from '@prisma/client';
import { User } from './user';
import { Venue } from './venue';
export class Event {
    private id?: number;
    private title: string;
    private start_date: Date;
    private end_date: Date;
    private users: User[];
    private venues: Venue[];

    constructor(event: {
        id?: number;
        title: string;
        start_date: Date;
        end_date: Date;
        users: User[];
        venues: Venue[];
    }) {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
        this.users = event.users;
        this.venues = event.venues;
    }

    validate(event: {
        id?: number;
        title: string;
        start_date: Date;
        end_date: Date;
        users: User[];
        venues: Venue[];

    }) {
        if (!event.title) throw new Error("Title is required");
        if (!event.start_date) throw new Error("Start date is required");
        if (!event.end_date) throw new Error("End date is required");
    }

    getId(): number | undefined{
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getStartDate(): Date {
        return this.start_date;
    }

    getEndDate(): Date {
        return this.end_date;
    }
    getUsers(): User[] | undefined {
        return this.users;
    }

    getVenues(): Venue[] | undefined {
        return this.venues;
    }

    equals(event: Event): boolean {
        return (
            this.id === event.getId() &&
                this.title === event.getTitle() &&
                this.start_date === event.getStartDate() &&
                this.end_date === event.getEndDate() &&
                this.users === event.getUsers() &&
            this.venues === event.getVenues()
        );

    }

    static from({
                    id,
                    title,
                    start_date,
                    end_date,
                    user,
                    venue,
                }: EventPrisma &  {
                    user: UserPrisma[]
                    venue: VenuePrisma[]
        }) {
        return new Event({
            id,
            title,
            start_date,
            end_date,
            users: user.map((user) => User.from(user)),
            venues: venue.map((venue) => Venue.from(venue)),
        })
    }
}
