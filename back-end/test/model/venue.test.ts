/**

import { Venue } from "../../model/venue";

test('given: valid values for venue, when: venue is created, then: venue is created with those value',() => {
    //given
    const name1 = 'Venue1';
    const address1 = 'testingstraat 65';
    const capacity1 = 35;
    //when
    const venue1 = new Venue({
        name: name1,
        address: address1,
        capacity: capacity1
    })
    //then
    expect(venue1.getName()).toEqual(name1);
    expect(venue1.getAddress()).toEqual(address1);
    expect(venue1.getCapacity()).toEqual(capacity1);
})

 **/