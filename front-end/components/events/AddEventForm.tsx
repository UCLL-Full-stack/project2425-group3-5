import React, { useState } from 'react';
import { User, Venue, StatusMessage } from '@types';
import eventService from '../../services/EventService';
import classNames from 'classnames';

type Props = {
    users: User[];
    venues: Venue[];
};

const AddEventForm: React.FC<Props> = ({ users, venues }) => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        userId: null as number | null,
        venueId: null as number | null,
    });

    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const [titleError, setTitleError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [venueIdError, setVenueIdError] = useState('');
    const [userIdError, setUserIdError] = useState('');

    const cleanMessages = () => {
        setTitleError('');
        setStartDateError('');
        setEndDateError('');
        setUserIdError('');
        setVenueIdError('');
        setStatusMessage([]);
    };

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
        cleanMessages();
        const isValid = validate();
        if (!isValid) {
            setStatusMessage([{ message: 'Please correct the errors below', type: 'error' }]);
            return;
        }
        try {
            await eventService.createEvent({
                title: formData.title,
                start_date: new Date(formData.startDate),
                end_date: new Date(formData.endDate),
                userIds: formData.userId ? [formData.userId] : [],
                venueIds: formData.venueId ? [formData.venueId] : [],
            });
            setStatusMessage([{ message: 'Your event is created', type: 'success' }]);
        } catch (error) {
            setStatusMessage([{ message: 'Failed to create event', type: 'error' }]);
        }
    };

    const validate = (): boolean => {
        let isValid = true;

        if (!formData.title.trim()) {
            setTitleError('Title is required');
            isValid = false;
        }
        if (!formData.startDate) {
            setStartDateError('Start date is required');
            isValid = false;
        }
        if (!formData.endDate) {
            setEndDateError('End date is required');
            isValid = false;
        }
        if (!formData.userId) {
            setUserIdError('Organizer is required');
            isValid = false;
        }
        if (!formData.venueId) {
            setVenueIdError('Venue is required');
            isValid = false;
        }
        return isValid;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Add New Event</h1>

            {statusMessage.length > 0 && (
                <ul className="mb-4 space-y-2">
                    {statusMessage.map(({ message, type }, index) => (
                        <li
                            key={index}
                            className={classNames('text-sm p-2 rounded', {
                                'bg-red-100 text-red-600': type === 'error',
                                'bg-green-100 text-green-600': type === 'success',
                            })}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {titleError && <div className="text-red-600">{titleError}</div>}
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
                    />
                    {startDateError && <div className="text-red-600">{startDateError}</div>}
                </div>
                <div>
                    <label className="block text-gray-700">End Date</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {endDateError && <div className="text-red-600">{endDateError}</div>}
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Organizer</label>
                <select
                    name="userId"
                    value={formData.userId ?? ''}
                    onChange={(e) => handleSelectChange(e, 'userId')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="" disabled>
                        Select an organizer
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstname}
                        </option>
                    ))}
                </select>
                {userIdError && <div className="text-red-600">{userIdError}</div>}
            </div>

            <div>
                <label className="block text-gray-700">Venue</label>
                <select
                    name="venueId"
                    value={formData.venueId ?? ''}
                    onChange={(e) => handleSelectChange(e, 'venueId')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                {venueIdError && <div className="text-red-600">{venueIdError}</div>}
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
