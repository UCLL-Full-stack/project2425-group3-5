import { RsvpStatus } from '../types';
import { Event } from './event';
import { User } from './user';

export class Rsvp {
    private  id?: number;
    private event: Event;
    private user: User;
    private status: RsvpStatus

    constructor(rsvp: {
        id?: number;
        event: Event;
        user: User;
        status: RsvpStatus;
    }) {
        this.validate(rsvp)

        this.id = rsvp.id;
        this.event = rsvp.event;
        this.user = rsvp.user;
        this.status = rsvp.status;
    }

    getId(): number | undefined {
        return this.id;
    }

    getEvent(): Event {
        return this.event;
    }

    getUser(): User {
        return this.user;
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
                this.user === rsvp.getUser() &&
                this.status === rsvp.getStatus()
        );
    }
}