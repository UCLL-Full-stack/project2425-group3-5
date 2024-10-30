import { User } from './user';
import { Venue} from './venue';

export class Event {
    private id?: number;
    private title: string;
    private start_date: string;
    private end_date: string;
    private userID: User;
    private venueID: Venue;

    constructor(event: {
        id?: number;
        title: string;
        start_date: string;
        end_date: string;
        userID: User;
        venueID: Venue;
    })
    {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
        this.userID = event.userID;
        this.venueID = event.venueID;
    }

    validate(event: {title: string; start_date: string; end_date: string; userID: User; venueID: Venue}) {
        if (!event.title){
            throw new Error("Title is required")
        }
        if (!event.start_date){
            throw new Error("Start date is required")
        }
        if (!event.end_date){
            throw new Error("End date is required")
        }
        if (!event.venueID){
            throw new Error("venueID is required")
        }
        if (!event.userID){
            throw new Error("User ID is required")
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getStartDate(): string {
        return this.start_date;
    }

    getEndDate(): string {
        return this.end_date;
    }

    getUser(): User {
        return this.userID;
    }

    getVenues(): Venue{
        return this.venueID;
    }

    equals(event: Event): boolean {
        return (
            this.id === event.getId() &&
                this.title === event.getTitle() &&
                this.start_date === event.getStartDate() &&
                this.end_date === event.getEndDate() &&
                this.userID.equal(event.getUser()) &&
                this.venueID.equals(event.getVenues())
        )
    }

}

