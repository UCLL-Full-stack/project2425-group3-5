/**

import { set } from "date-fns";
import { Event } from "../../model/event";
import { Task } from "../../model/task";
import { User } from "../../model/user";
import { Venue } from "../../model/venue";

test('given: valid values for task, when: task is created, then: task is created with those value',() => {
    //given
    const organiser1 = new User({
        username: 'user123',
        firstname: 'Timmy',
        lastname: 'Tommy',
        email: 'timmy.tommy@email.com',
        password: 'pw123456',
        role: 'organiser'
    });

    const helper1 = new User({
        username: 'user123',
        firstname: 'Timmy',
        lastname: 'Tommy',
        email: 'timmy.tommy@email.com',
        password: 'pw123456',
        role: 'helper'
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

    const description1 = 'Do something.';
    const taskStatus1 = 'undone';
    const dueDate = set(new Date(), {year: 2024, month: 11, date: 14});

    //when
    const task1 = new Task({
        description: description1,
        status: taskStatus1,
        dueDate: dueDate,
        event: event1,
        assignedUsers: [helper1]
    });
    //then
    expect(task1.getDescription()).toEqual(description1);
    expect(task1.getStatus()).toEqual(taskStatus1);
    expect(task1.getDueDate()).toEqual(dueDate);
    expect(task1.getEvent()).toEqual(event1);
    expect(task1.getAssignedUsers()).toContain(helper1);
    
})

 **/