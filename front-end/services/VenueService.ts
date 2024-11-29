const getAllVenues = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/venues',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const VenueService = {
    getAllVenues,
}

export default VenueService;