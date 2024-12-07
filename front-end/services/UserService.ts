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

const UserService = {
    getAllUsers,
    getAllOrganizers,
}

export default UserService ;