import { User } from './user';
import { Venue } from './venue';
import { Task } from './task';
import { RSVP } from './rsvp';
import {
    Event as EventPrisma,
    Venue as VenuePrisma,
    Task as TaskPrisma,
    RSVP as RsvpPrisma,
} from '@prisma/client'
import { id } from 'date-fns/locale';

export class Event {
    private id: number;
    private title: string;
    private start_date: Date;
    private end_date: Date;
    private user: User;
    private venue: Venue;
    private tasks?: Task[];
    private RSVPs?: RSVP[];

    constructor(event: {
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
        user: User;
        venue: Venue;
        tasks?: Task[];
        RSVPs?: RSVP[];
    }) {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
        this.user = event.user;
        this.venue = event.venue;
        this.tasks = event.tasks;
        this.RSVPs = event.RSVPs;
    }

    validate(event: {
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
        user: User;
        venue: Venue;
        tasks?: Task[];
        RSVPs?: RSVP[]
    }) {
        if (!event.title) throw new Error("Title is required");
        if (!event.start_date) throw new Error("Start date is required");
        if (!event.end_date) throw new Error("End date is required");
        if (!event.user) throw new Error("Organizer ID is required");
        if (!event.venue) throw new Error("Venue ID is required");
    }

    getId(): number {
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

    getUser(): User {
        return this.user;
    }

    getVenue(): Venue {
        return this.venue;
    }

    getTasks(): Task[] | undefined {
        return this.tasks;
    }

    getRSVPs(): RSVP[] | undefined {
        return this.RSVPs;
    }

    equals(event: Event): boolean {
        return (
            this.id === event.getId() &&
            this.title === event.getTitle() &&
            this.start_date.getTime() === event.getStartDate().getTime() &&
            this.end_date.getTime() === event.getEndDate().getTime() &&
            this.user.equal(event.getUser()) &&
            this.venue.equals(event.getVenue())
        );
    }

    static from({
                    id,
                    title,
                    start_date,
                    end_date,
                    user,
                    venue,
                    tasks,
                    RSVPs,
                }: EventPrisma & {
        user: User;
        venue: VenuePrisma;
        tasks: TaskPrisma[];
        RSVPs: (RsvpPrisma & { user: User })[];
    }): Event {
        return new Event({
            id,
            title,
            start_date,
            end_date,
            user: User.from(user),
            venue: Venue.from(venue),
            tasks: tasks.map(Task.from),
            RSVPs: RSVPs.map(RSVP.from)
        });
    }
}
