import { User } from './user';
import { Event } from './event';
import { RsvpStatus } from '../types';

export class Rsvp {
    private  id?: number;
    private event: Event;
    private users: User[];
    private status: RsvpStatus

    constructor(rsvp: {
        id?: number;
        event: Event;
        users: User[];
        status: RsvpStatus;
    }) {
        this.validate(rsvp)

        this.id = rsvp.id;
        this.event = rsvp.event;
        this.users = rsvp.users || [];
        this.status = rsvp.status;
    }

    getId(): number | undefined {
        return this.id;
    }

    getEvent(): Event {
        return this.event;
    }

    getUsers(): User[] {
        return this.users;
    }

    getStatus(): RsvpStatus {
        return this.status;
    }

    validate(rsvp: {event: Event; status: RsvpStatus}) {
        if (!rsvp.event) {
            throw new Error("Event is required");
        }
        if (!rsvp.status) {
            throw new Error("Status is required");
        }
    }

    equals(rsvp: Rsvp): boolean {
        return (
            this.id === rsvp.getId() &&
                this.event.equals(rsvp.getEvent()) &&
                this.users === rsvp.getUsers() &&
                this.status === rsvp.getStatus()
        );
    }
}