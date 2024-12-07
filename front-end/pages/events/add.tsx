import React, { useState, useEffect } from 'react';
import AddEventForm from '../../components/events/AddEventForm';
import userService from '../../services/UserService';
import venueService from '../../services/VenueService';

const AddEventPage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [venues, setVenues] = useState([]);

    const fetchData = async () => {
        try {
            const usersResponse = await userService.getAllOrganizers();
            const venuesResponse = await venueService.getAllVenues();
            const usersData = await usersResponse.json();
            const venuesData = await venuesResponse.json();

            setUsers(usersData);
            setVenues(venuesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="container mx-auto p-8">
            <AddEventForm users={users} venues={venues} />
        </div>
    );
};

export default AddEventPage;
