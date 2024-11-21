
import { User } from './user';
import { Event } from './event';

import { User as UserPrisma } from "@prisma/client"
import {
    Event as EventPrisma,
    Venue as VenuePrisma,
    Task as TaskPrisma,
    RSVP as RsvpPrisma,
} from '@prisma/client'


export class Task {
    private id: number;
    private description: string;
    private status: string;
    private due_date: Date;
    private event: Event;
    private user: User;

    constructor(task: {
        id: number;
        description: string;
        status: string;
        due_date: Date;
        event: Event;
        user: User;
    }) {
        this.validate(task);
        this.id = task.id;
        this.description = task.description;
        this.status = task.status;
        this.due_date = task.due_date;
        this.event = task.event;
        this.user = task.user;
    }

    validate(task: {
        description: string;
        status: string;
        due_date: Date;
        event: Event;
        user: User;
    }) {
        if (!task.description) throw new Error("Description is required");
        if (!task.status) throw new Error("Status is required");
        if (!task.due_date) throw new Error("Due date is required");
        if (!task.event) throw new Error("Event ID is required");
        if (!task.user) throw new Error("Assigned user is required");
    }

    getId(): number {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): string {
        return this.status;
    }

    getDueDate(): Date {
        return this.due_date;
    }

    getEvent(): Event {
        return this.event;
    }

    getUser(): User {
        return this.user;
    }

    equals(task: Task): boolean {
        return (
            this.id === task.getId() &&
            this.description === task.getDescription() &&
            this.status === task.getStatus() &&
            this.due_date.getTime() === task.getDueDate().getTime() &&
            this.event.equals(task.getEvent()) &&
            this.user.equal(task.getUser())
        );
    }

    static from({
                    id,
                    description,
                    status,
                    due_date,
                    event,
                    user,
                }: TaskPrisma & {
        event: EventPrisma;
        user: UserPrisma;
    }): Task {
        return new Task({
            id,
            description,
            status: status as string,
            due_date,
            event: Event.from(event),
            user: User.from(user),
        });
    }

}
