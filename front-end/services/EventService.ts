const getAllEvents = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/events',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const EventService = {
    getAllEvents,
}

export default EventService;