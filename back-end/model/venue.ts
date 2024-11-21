import { Venue as VenuePrisma } from '@prisma/client'

export class Venue{
    private id?: number;
    private name: string;
    private address: string;
    private capacity: number;
    private events: Event[];

    constructor(venue: {
        id?: number;
        name: string;
        address: string;
        capacity: number;
        events: Event[];
    })
    {
        this.validate(venue);
        this.id = venue.id;
        this.name = venue.name;
        this.address = venue.address;
        this.capacity = venue.capacity;
        this.events = venue.events;
    }

    validate(venue: {name: string; address: string; capacity: number; events: Event[]}): void {
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

    getAddress(): string{
        return this.address;
    }
    
    getCapacity(): number {
        return this.capacity;
    }

    getEvents(): Event[] {
        return this.events;
    }
    equals(venue: Venue): boolean {
        return (
            this.id === venue.getId() &&
                this.name === venue.getName() &&
                this.address === venue.getAddress() &&
                this.capacity === venue.getCapacity() &&
                this.events === venue.getEvents()
        )
    }

}