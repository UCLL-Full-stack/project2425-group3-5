import { User } from '../model/user';
import userRepository from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const addUser = async (userData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}): Promise<User> => {
    const user = new User(userData);
    return userRepository.addUser(user);
};

export default {
    getAllUsers,
    getUserById,
    addUser,
};