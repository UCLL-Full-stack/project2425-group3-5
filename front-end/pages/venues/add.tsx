import React from 'react';

import AddVenueForm from '@components/venues/AddVenueForm';

const AddVenuePage: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <AddVenueForm />
        </div>
    );
};

export default AddVenuePage;