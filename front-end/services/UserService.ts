import { User } from "@types"

const getAllUsers = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const getAllOrganizers = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/organizers',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const login = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllUsers,
    getAllOrganizers,
    login
}

export default UserService ;