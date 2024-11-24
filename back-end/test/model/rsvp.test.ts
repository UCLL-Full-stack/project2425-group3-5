/**

import { set } from "date-fns";
import { Event } from "../../model/event";
import { Rsvp } from "../../model/rsvp";
import { User } from "../../model/user";
import { Venue } from "../../model/venue";

test('given: valid values for rsvp, when: rsvp is created, then: rsvp is created with those value',() => {
    //given
    const organiser1 = new User({
        username: 'user123',
        firstname: 'Timmy',
        lastname: 'Tommy',
        email: 'timmy.tommy@email.com',
        password: 'pw123456',
        role: 'organiser'
    });

    const guest1 = new User({
        username: 'user123',
        firstname: 'Timmy',
        lastname: 'Tommy',
        email: 'timmy.tommy@email.com',
        password: 'pw123456',
        role: 'guest'
    });
    
    const venue1 = new Venue({
        name: 'Venue1',
        address: 'testingstraat 65',
        capacity: 35
    });
    const event1 = new Event({
        title: 'event1',
        start_date: set(new Date(), {year: 2024, month: 11, date: 15,}),
        end_date: set(new Date(), {year: 2024, month: 11, date: 24,}),
        userID: organiser1,
        venueID: venue1
    });

    const rsvpStatus1 = 'maybe';

    //when
    const rsvp1 = new Rsvp({
        event: event1,
        user: guest1,
        status: rsvpStatus1
    });

    //then
    expect(rsvp1.getEvent()).toEqual(event1);
    expect(rsvp1.getUser()).toEqual(guest1);
    expect(rsvp1.getStatus()).toEqual(rsvpStatus1);
})
 **/