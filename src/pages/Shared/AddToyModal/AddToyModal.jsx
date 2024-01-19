import React, { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { Button, useDisclosure } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import FormModal from '../FormModal/FormModal';

const AddToyModal = ({ addPage }) => {
    const [value, setValue] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: addPage });
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    function handleAddNewToy(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const picture = form.photo.value;
        const category = form.category.value;
        const categoryID = form.category.options.selectedIndex;
        const seller = form.user.value;
        const email = form.email.value;
        const stock = parseInt(form.stock.value);
        const ratings = value;
        const description = form.description.value;
        const newToy = {
            name,
            price,
            picture,
            category,
            categoryID,
            seller,
            email,
            stock,
            ratings,
            description
        };

        fetch('http://localhost:5000/toys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newToy)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    onClose();
                    toast.success(`${name} has been Added`);
                } else {
                    toast.error('Something Wrong Operation Fail');
                }
            });
    }

    return (
        <>
            {/* Add New Toy */}
            <div
                className={`text-center ${
                    addPage
                        ? 'flex justify-center items-center h-[10vh] md:h-[30vh] lg:h-[50vh]'
                        : 'md:text-end mt-4 md:mt-0'
                }`}
            >
                <Button
                    className="!bg-pink-600 !text-white !text-base !font-medium !font-['Inter'] !leading-normal !rounded-md !px-3 !lg:px-5 !py-2"
                    onClick={onOpen}
                >
                    <IoCreateOutline className='w-8 h-6' /> Add New Toy
                </Button>
            </div>
            {/* Modal */}
            <FormModal
                initialRef={initialRef}
                finalRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                handleAddNewToy={handleAddNewToy}
                setValue={setValue}
                value={value}
                addToy={true}
            ></FormModal>
            {/* Modal End */}
        </>
    );
};

export default AddToyModal;
