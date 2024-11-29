import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import eventService from '../../services/EventService';
import userService from '../../services/UserService';
import venueService from '../../services/VenueService';
import { User, Venue } from '@types';

const AddEventForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        userId: null as number | null,
        venueId: null as number | null,
    });

    const [users, setUsers] = useState<User[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [statusMessage, setStatusMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await userService.getAllUsers();
                const venuesResponse = await venueService.getAllVenues();
                const usersData = await usersResponse.json();
                const venuesData = await venuesResponse.json();
                console.log('Fetched Users:', usersData);
                console.log('Fetched Venues:', venuesData);
                setUsers(usersData);
                setVenues(venuesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'userId' | 'venueId') => {
        const selectedValue = Number(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            [field]: selectedValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage('');
        try {
            await eventService.createEvent({
                title: formData.title,
                start_date: new Date(formData.startDate),
                end_date: new Date(formData.endDate),
                userIds: formData.userId ? [formData.userId] : [],
                venueIds: formData.venueId ? [formData.venueId] : [],
            });
            setStatusMessage('Event created successfully!');
            router.push('/events');
        } catch (error) {
            console.error('Error creating event:', error);
            setStatusMessage('Error creating event. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Add New Event</h1>

            {statusMessage && <p className="text-red-600">{statusMessage}</p>}

            <div>
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Start Date</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">End Date</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700">User</label>
                <select
                    name="userId"
                    value={formData.userId ?? ''}
                    onChange={(e) => handleSelectChange(e, 'userId')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="" disabled>
                        Select a user
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstname}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-gray-700">Venue</label>
                <select
                    name="venueId"
                    value={formData.venueId ?? ''}
                    onChange={(e) => handleSelectChange(e, 'venueId')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="" disabled>
                        Select a venue
                    </option>
                    {venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                            {venue.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
            >
                Create Event
            </button>
        </form>
    );
};

export default AddEventForm;
