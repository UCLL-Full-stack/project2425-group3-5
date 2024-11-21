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
    private email: string;
    private password: string;
    private role: string;

    constructor(user: {
        id?: number;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: string;
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
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
    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): string {
        return this.role;
    }


    validate(user: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: string;
    }) {
        if (!user.firstname?.trim()) {
            throw new Error("First name is required");
        }
        if (!user.lastname?.trim()) {
            throw new Error("Last name is required");
        }
        if (!user.email?.trim()) {
            throw new Error("Email is required");
        }
        if (!user.password.trim()) {
            throw new Error("Password is required");
        }
        if (!user.role?.trim()) {
            throw new Error("Role is required");
        }
    }

    equals (user: User): boolean {
        return (
            this.id === user.getId() &&
            this.firstname === user.getFirstName() &&
            this.lastname === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        )
    }
    static from({
                    id,
                    firstname,
                    lastname,
                    email,
                    password,
                    role,
                }: UserPrisma ) {
        return new User({
            id,
            firstname,
            lastname,
            email,
            password,
            role,
        });
    }
}