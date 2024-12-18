import { Event, RSVP, RsvpStatus, User } from "@types";

const createRsvp = ({event, user}:{event: Event, user: User}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/rsvps',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event,
                user,
                status: "not_attending",
            })
        }
    );
}

const getAllRsvps = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/rsvps',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }
    );
}

const getAllRsvpsWithEventId = (eventId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/rsvps/event/${eventId}`,
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }
    );
}

const updateRsvp = (rsvp: RSVP) => {
    const event = rsvp.event
    const user = rsvp.user
    let newStatus: RsvpStatus

    if(rsvp.status === "attending") {
        newStatus = "not_attending"
    }else {
        newStatus= "attending"
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/rsvps',
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event,
                user,
                status: newStatus,
            })
        }
    );
}

const deleteRsvp = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/rsvps/${id}`,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }
    );
}

const RSVPService = {
    createRsvp,
    getAllRsvps,
    getAllRsvpsWithEventId,
    updateRsvp,
    deleteRsvp
};

export default RSVPService;