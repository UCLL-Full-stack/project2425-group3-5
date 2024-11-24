/**

import { User } from "../../model/user";

test('given: valid values for user, when: user is created, then: user is created with those value',() => {
    //given
    const user1 = 'user123';
    const firstname1 = 'Timmy';
    const lastname1 = 'Tommy';
    const email1 = 'timmy.tommy@email.com';
    const password1 = 'pw123456';
    const role1 = 'guest';

    //when
    const user = new User({
        username: user1,
        firstname: firstname1,
        lastname: lastname1,
        email: email1,
        password: password1,
        role: role1
    })
    //then
    expect(user.getUserName()).toEqual(user1);
    expect(user.getFirstName()).toEqual(firstname1);
    expect(user.getLastName()).toEqual(lastname1);
    expect(user.getEmail()).toEqual(email1);
    expect(user.getPassword()).toEqual(password1);
    expect(user.getRole()).toEqual(role1);
})
 **/