import { User } from '../model/user';

const users = [
    new User({
        id: 1,
        username: 'test1',
        firstname: 'Jowan',
        lastname: 'Abdo',
        email: 'test@gmail.com',
        password: '12345',
        role: 'organiser'
    }),
];

const getUserById = ({ id }: {id: number}): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    }catch (error) {
        console.log(error);
        throw new Error('Error getting user with id ' + id);
    }
}


export default {
    getUserById
};