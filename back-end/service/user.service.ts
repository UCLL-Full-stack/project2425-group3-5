import { User } from '../model/user';
import userRepository from '../repository/user.db';
import { Role } from '../types';

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userRepository.getUserById({id});
    if (!user) throw new Error('User not found');
    return user;
};

const getOrganizers = async (): Promise<User[]> => {
    return userRepository.getOrganizers();
};

const addUser = async (userData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
}): Promise<User> => {
    const validRoles: Role[] = ["admin", "organizer", "attendee"];
    if (!validRoles.includes(userData.role)) {
        throw new Error(`Invalid role: ${userData.role}. Allowed roles are ${validRoles.join(', ')}`);
    }
    const user = new User(userData);
    return userRepository.addUser(user);
};

export default {
    getAllUsers,
    getUserById,
    addUser,
    getOrganizers
};