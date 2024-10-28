import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate((user));

        this.id = user.id;
        this.username = user.username;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined{
        return this.id;
    }

    getUserName(): string {
        return this.username;
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

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error("Username is required");
        }
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

    equal(user: User): boolean {
        return (this.id === user.getId() &&
        this.username === user.getUserName() &&
        this.firstname === user.getFirstName() &&
        this.lastname === user.getLastName() &&
        this.email === user.getEmail() &&
        this.password === user.getPassword() &&
        this.role === user.getRole());
    }
}