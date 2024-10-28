import { TaskStatus } from '../types';
import { User } from './user';
import { Event } from './event';


export class Task {
    private id?: number;
    private description: string;
    private status: TaskStatus;
    private dueDate : Date;
    private event: Event;
    private assignedUsers: User[];

    constructor(task: {
        id?: number;
        description: string;
        status: TaskStatus;
        dueDate: Date;
        event: Event;
        assignedUsers: User[];
    }) {
        this.validate(task)

        this.id = task.id;
        this.description = task.description;
        this.status = task.status;
        this.dueDate = task.dueDate;
        this.event = task.event;
        this.assignedUsers = task.assignedUsers || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): TaskStatus {
        return this.status;
    }

    getDueDate(): Date {
        return this.dueDate;
    }

    getEvent(): Event {
        return this.event;
    }

    getAssignedUsers(): User[] {
        return this.assignedUsers;
    }

    validate(task: {description: string; status: TaskStatus; dueDate: Date; event: Event}) {
        if (!task.description) {
            throw new Error("Description is required")
        }
        if (!task.status) {
            throw new Error("Status is required")
        }
        if (!task.dueDate) {
            throw new Error("DueDate is required")
        }
        if (!task.event) {
            throw new Error("Event is required")
        }
    }

    equal(task: Task): boolean {
        return (
            this.id !== task.getId() &&
            this.description !== task.getDescription() &&
            this.status !== task.getStatus() &&
            this.dueDate !== task.getDueDate() &&
            this.event.equals(task.getEvent()) &&
            this.assignedUsers.every((assignedUser, index) => assignedUser.equal(task.getAssignedUsers()[index]))
        );
    }
}