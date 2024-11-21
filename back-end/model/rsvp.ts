import { Event } from './event';
import { User } from './user';
import { RsvpStatus } from '../types';
import { RSVP as RsvpPrisma, Event as EventPrisma, User as UserPrisma } from '@prisma/client';

export class RSVP {
    private event: Event;
    private user: User;
    private status: RsvpStatus;

    constructor(rsvp: {
        event: Event;
        user: User;
        status: RsvpStatus;
    }) {
        this.validate(rsvp);
        this.event = rsvp.event;
        this.user = rsvp.user;
        this.status = rsvp.status;
    }

    validate(rsvp: {
        event: Event;
        user: User;
        status: RsvpStatus;
    }) {
        if (!rsvp.event) throw new Error("Event ID is required");
        if (!rsvp.user) throw new Error("User ID is required");
        if (!rsvp.status) throw new Error("Status is required");
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

    equals(rsvp: RSVP): boolean {
        return (
            this.event.equals(rsvp.getEvent()) &&
            this.user.equal(rsvp.getUser()) &&
            this.status === rsvp.getStatus()
        );
    }

    static from({
                    event,
                    user,
                    status,
                }: RsvpPrisma & {
        event: EventPrisma;
        user: UserPrisma;
    }): RSVP {
        return new RSVP({
            event: Event.from(event),
            user: User.from(user),
            status: status as RsvpStatus,
        });
    }

}
