import { User } from '../model/user';
import database from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        throw new Error('Failed to retrieve users');
    }
};

const getUserById = async ({id}: {id: number}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        throw new Error('Failed to retrieve user');
    }
};

const getOrganizers = async (): Promise<User[]> => {
    try {
        const organizers = await database.user.findMany({
            where: {
                role: 'organizer',
            },
        });

        return organizers.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        throw new Error('Failed to retrieve organizers');
    }
};

const addUser = async (user: User): Promise<User> => {
    try {
        const createdUser = await database.user.create({
            data: {
                firstname: user.getFirstName(),
                lastname: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });

        return User.from(createdUser);
    } catch (error) {
        throw new Error('Failed to add user');
    }
};



export default {
    getAllUsers,
    getUserById,
    addUser,
    getOrganizers
};