import { User } from './user';
import { Venue } from './venue';
import { Task } from './task';
import { RSVP } from './rsvp';

export class Event {
    private id?: number;
    private title: string;
    private start_date: Date;
    private end_date: Date;

    constructor(event: {
        id?: number;
        title: string;
        start_date: Date;
        end_date: Date;

    }) {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
    }

    validate(event: {
        id?: number;
        title: string;
        start_date: Date;
        end_date: Date;

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

    equals(event: Event): boolean {
        return (
            this.id === event.getId() &&
                this.title === event.getTitle() &&
                this.start_date === event.getStartDate() &&
                this.end_date === event.getEndDate()
        );

    }




}
