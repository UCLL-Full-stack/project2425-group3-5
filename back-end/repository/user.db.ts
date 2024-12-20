import { User } from '../model/user';
import database from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({id}: {id: number}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({username}: {username: string}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username},
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
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
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAttendees = async (): Promise<User[]> => {
    try {
        const organizers = await database.user.findMany({
            where: {
                role: 'attendee',
            },
        });

        return organizers.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const createdUser = await database.user.create({
            data: {
                firstname: user.getFirstName(),
                lastname: user.getLastName(),
                username: user.getUsername(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });

        return User.from(createdUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    getOrganizers,
    getAttendees,
};