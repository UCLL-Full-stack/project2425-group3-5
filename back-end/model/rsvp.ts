import {
    Event as EventPrisma,
    RSVP as RsvpPrisma,
    User as UserPrisma,
    Venue as VenuePrisma,
} from '@prisma/client';
import { RsvpStatus } from '../types';
import { Event } from './event';
import { User } from './user';

export class RSVP {
    private id?: number
    private event: Event;
    private user: User;
    private status: RsvpStatus;

    constructor(rsvp: {
        id?: number;
        event: Event;
        user: User;
        status: RsvpStatus;
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
        status: RsvpStatus;
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

    getStatus(): RsvpStatus {
        return this.status;
    }

    equals (rsvp: RSVP): boolean {
        return (
            this.id === rsvp.getId() &&
                this.event === rsvp.getEvent() &&
                this.user === rsvp.getUser() &&
                this.status === rsvp.getStatus()
        )
    }

    static from({
                    id,
                    event,
                    user,
                    status
                }: RsvpPrisma & {
                    event: EventPrisma & {
                        user: UserPrisma[]
                        venue: VenuePrisma[]
                    };
                    user: UserPrisma }) {
        return new RSVP({
            id,
            event: Event.from(event),
            user: User.from(user),
            status: status as RsvpStatus
        });
    }
}
