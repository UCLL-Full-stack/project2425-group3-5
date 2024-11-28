const getAllEvents = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/events',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const getEventById = (eventId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`,
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
}

const EventService = {
    getAllEvents,
    getEventById,
}

export default EventService;