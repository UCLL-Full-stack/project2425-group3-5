import { set } from "date-fns";
import { Event } from "../../model/event";
import { User } from "../../model/user";
import { Venue } from "../../model/venue";

test('given: valid values for event, when: event is created, then: event is created with those value',() => {
    //given
    const user1 = new User({
        username: 'user123',
        firstname: 'Timmy',
        lastname: 'Tommy',
        email: 'timmy.tommy@email.com',
        password: 'pw123456',
        role: 'organiser'
    });

    const venue1 = new Venue({
        name: 'Venue1',
        address: 'testingstraat 65',
        capacity: 35
    });

    const title1 = 'event1';
    const startDate1 = set(new Date(), {year: 2024, month: 11, date: 15,});
    const endDate1 = set(new Date(), {year: 2024, month: 11, date: 24,});

    //when
    const event1 = new Event({
        title: title1,
        start_date: startDate1,
        end_date: endDate1,
        userID: user1,
        venueID: venue1
    });

    //then
    expect(event1.getTitle()).toEqual(title1);
    expect(event1.getStartDate()).toEqual(startDate1);
    expect(event1.getEndDate()).toEqual(endDate1);
    expect(event1.getUser()).toEqual(user1);
    expect(event1.getVenues()).toEqual(venue1);
    
})