import React from 'react';
import AddToyModal from '../Shared/AddToyModal/AddToyModal';

const AddToys = () => {
    return (
        <div>
            <AddToyModal addPage={true}></AddToyModal>
        </div>
    );
};

export default AddToys;
