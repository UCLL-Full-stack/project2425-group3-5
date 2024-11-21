import { Event } from './event';
import { User } from './user';
import { RsvpStatus } from '../types';
import { RSVP as RsvpPrisma, Event as EventPrisma, User as UserPrisma } from '@prisma/client';

export class RSVP {
    private id?: number
    private event: Event;
    private user: User;
    private status: string;

    constructor(rsvp: {
        id?: number;
        event: Event;
        user: User;
        status: string;
    }) {
        this.validate(rsvp);
        this.id = rsvp.id;
        this.event = rsvp.event;
        this.user = rsvp.user;
        this.status = rsvp.status;
    }

    validate(rsvp: {
        id?: number;
        event: Event;
        user: User;
        status: string;
    }) {
        if (!rsvp.event) throw new Error("Event ID is required");
        if (!rsvp.user) throw new Error("User ID is required");
        if (!rsvp.status) throw new Error("Status is required");
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

    getStatus(): string {
        return this.status;
    }

    equals (rsvp: RSVP): boolean {
        return (
            this.id === rsvp.getId() &&
                this.event === rsvp.getEvent() &&
                this.status === rsvp.getStatus() &&
                this.user === rsvp.getUser()
        )
    }

    static from({
                    id,
                    event,
                    user,
                    status
                }: RsvpPrisma & { event: EventPrisma; user: UserPrisma }) {
        return new RSVP({
            id,
            event: Event.from(event),
            user: User.from(user),
            status
        });
    }


}
