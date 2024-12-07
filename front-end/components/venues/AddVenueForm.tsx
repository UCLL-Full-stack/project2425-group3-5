import React, { useState } from 'react';
import venueService from '../../services/VenueService';
import { StatusMessage } from '@types';
import classNames from 'classnames';

const AddVenueForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        capacity: '',
    });

    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [capacityError, setCapacityError] = useState('');

    const cleanMessages = () => {
        setNameError('');
        setAddressError('');
        setCapacityError('');
        setStatusMessage([]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
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
            await venueService.createVenue({
                name: formData.name,
                address: formData.address,
                capacity: Number(formData.capacity),
            });
            setStatusMessage([{ message: 'Venue created successfully!', type: 'success' }]);
        } catch (error) {
            setStatusMessage([{ message: 'Failed to create venue', type: 'error' }]);
        }
    };

    const validate = (): boolean => {
        let isValid = true;

        if (!formData.name.trim()) {
            setNameError('Name is required');
            isValid = false;
        }
        if (!formData.address.trim()) {
            setAddressError('Address is required');
            isValid = false;
        }
        if (!formData.capacity.trim() || isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
            setCapacityError('Capacity must be a positive number');
            isValid = false;
        }

        return isValid;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Add New Venue</h1>

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
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {nameError && <div className="text-red-600">{nameError}</div>}
            </div>

            <div>
                <label className="block text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {addressError && <div className="text-red-600">{addressError}</div>}
            </div>

            <div>
                <label className="block text-gray-700">Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {capacityError && <div className="text-red-600">{capacityError}</div>}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
            >
                Create Venue
            </button>
        </form>
    );
};

export default AddVenueForm;
