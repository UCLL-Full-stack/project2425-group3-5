import { User } from './user';

export class Venue{
    private id?: number;
    private name: string;
    private address: string;
    private capacity: number;

    constructor(venue: {
        id?: number;
        name: string;
        address: string;
        capacity: number;
    })
    {
        this.validate(venue);
        this.id = venue.id;
        this.name = venue.name;
        this.address = venue.address;
        this.capacity = venue.capacity;
    }

    validate(venue: {name: string; address: string; capacity: number}) {
        if(!venue.name){
            throw new Error("Name is required");
        }
        if(!venue.address){
            throw new Error("Address is required");
        }
        if(!venue.capacity){
            throw new Error("Capacity is required");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string{
        return this.name;
    }
    getCapacity(): number {
        return this.capacity;
    }

    equals(venue: Venue): boolean {
        return (
            this.id === venue.getId() &&
                this.name === venue.name &&
                this.address === venue.address &&
                this.capacity === venue.capacity
        )
    }

}