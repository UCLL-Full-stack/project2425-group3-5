import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById({id});
    if (!user) throw new Error('User not found');
    return user;
};

const getOrganizers = async (): Promise<User[]> => {
    return userDb.getOrganizers();
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
        
    return userDb.addUser(user);
};

const autehntication = async ({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername({username});
    if(!user) throw new Error("User does not exist.");

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if(!isValidPassword) throw new Error("Incorrect password");
    return {
        token: generateJwtToken({username}),
        username,
        fullname: `${user.getFirstName()} ${user?.getLastName()}`
    }
}

const isValidRole = (role: Role) => {
    const validRole: Role[] = ["admin", "organizer", "attendee"];
    if(!validRole.includes(role)) throw new Error("Role status is invalid.")
    return role
};


export default {
    getAllUsers,
    getUserById,
    createUser,
    getOrganizers,
    autehntication
};