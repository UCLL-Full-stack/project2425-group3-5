import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { default as userDb, default as userRepository } from '../repository/user.db';
import { Role, UserInput } from '../types';

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

const createUser = async ({
    firstname: firstnameInput,
    lastname: lastnameInput,
    username: usernameInput,
    password: passwordInput,
    role: roleInput
}: UserInput): Promise<User> => {
    if(!firstnameInput) throw new Error("Firstname can't be null.")
    if(!lastnameInput) throw new Error("Lastname can't be null.")
    if(!usernameInput) throw new Error("Username can't be null.")
    if(!passwordInput) throw new Error("Password can't be null.")

    const role = isValidRole(roleInput);
    const exist = await userDb.getUserByUsername({username: usernameInput});
    if(exist) throw new Error("User with username already exist.");
    
    const hashedPassword = await bcrypt.hash(passwordInput, 12)
    const user = new User({
        firstname: firstnameInput,
        lastname: lastnameInput,
        username: usernameInput,
        password: hashedPassword,
        role
    });
        
    return userRepository.addUser(user);
};




const isValidRole = (role: Role) => {
    const validRole: Role[] = ["admin", "organizer", "attendee"];
    if(!validRole.includes(role)) throw new Error("Role status is invalid.")
    return role
}


export default {
    getAllUsers,
    getUserById,
    createUser,
    getOrganizers
};