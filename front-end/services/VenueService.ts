const getAllVenues = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/venues',
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
}

const createVenue = async (formData: any) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/venues',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
}

const editVenue = async (venueId: number, formData: any) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/venues/${venueId}`,
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
};

const getVenueById = (venueId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/venues/${venueId}`,
        {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
}

const deleteVenueById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/venues/${id}`,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }
    );}


const VenueService = {
    getAllVenues,
    createVenue,
    editVenue,
    getVenueById,
    deleteVenueById
}

export default VenueService;