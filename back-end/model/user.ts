import { Role } from '../types';
import {
    User as UserPrisma,
    Event as EventPrisma,
    Venue as VenuePrisma,
    Task as TaskPrisma,
    RSVP as RsvpPrisma,
} from '@prisma/client'

export class User {
    private id?: number;
    private firstname: string;
    private lastname: string;
    private username: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        firstname: string;
        lastname: string;
        username: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined{
        return this.id;
    }


    getFirstName(): string {
        return this.firstname;
    }

    getLastName(): string {
        return this.lastname;
    }
    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }


    validate(user: {
        firstname: string;
        lastname: string;
        username: string;
        password: string;
        role: Role;
    }) {
        if (!user.firstname?.trim()) {
            throw new Error("First name is required");
        }
        if (!user.lastname?.trim()) {
            throw new Error("Last name is required");
        }
        if (!user.username?.trim()) {
            throw new Error("username is required");
        }
        if (!user.password.trim()) {
            throw new Error("Password is required");
        }
        if (!user.role) {
            throw new Error("Role is required");
        }
        const validRoles: Role[] = ["admin", "organizer", "attendee"];
        if (!validRoles.includes(user.role)) {
            throw new Error(`Invalid role: ${user.role}. Allowed roles are ${validRoles.join(', ')}`);
        }
    }

    equals (user: User): boolean {
        return (
            this.id === user.getId() &&
            this.firstname === user.getFirstName() &&
            this.lastname === user.getLastName() &&
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        )
    }
    static from({
                    id,
                    firstname,
                    lastname,
                    username,
                    password,
                    role,
                }: UserPrisma ) {
        return new User({
            id,
            firstname,
            lastname,
            username,
            password,
            role: role as Role,
        });
    }
}