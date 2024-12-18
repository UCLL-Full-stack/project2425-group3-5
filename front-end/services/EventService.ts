const getAllEvents = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/events',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const getEventById = (eventId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`,
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
}

const createEvent = async (formData: any) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/events',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
}

const EventService = {
    getAllEvents,
    getEventById,
    createEvent
}

export default EventService;