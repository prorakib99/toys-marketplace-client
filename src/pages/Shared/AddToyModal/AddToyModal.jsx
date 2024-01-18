import React, { useContext, useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { Rating } from 'primereact/rating';
import {
    Button,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../providers/AuthProvider';

const AddToyModal = ({ addPage }) => {
    const [value, setValue] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: addPage });
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const { user } = useContext(AuthContext);

    function handleAddNewToy(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const picture = form.photo.value;
        const category = form.category.value.substring(2, 20);
        const categoryID = parseInt(form.category.value[0]);
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
        console.log(newToy);

        fetch('http://localhost:5000/toys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newToy)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    console.log('succuss');
                    onClose();
                    toast.success(`${name} has been Added`);
                } else {
                    toast.error('Something Wrong Operation Fail');
                }
            });
    }

    // if (addPage) {
    //     return onOpen();
    // }
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
            <Modal
                size={'4xl'}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                isCentered
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleAddNewToy}>
                        <ModalHeader>Add New Toy</ModalHeader>
                        <ModalCloseButton className='!text-red-600 !text-xl !p-3' />
                        <ModalBody pb={6}>
                            <div className='grid md:grid-cols-2 gap-4'>
                                {/* Row 1 */}
                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='name'
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id='name'
                                        className='!text-lg'
                                        name='name'
                                        type='text'
                                        placeholder='Toy Name'
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='Price'
                                    >
                                        Price
                                    </label>
                                    <Input
                                        id='Price'
                                        className='!text-lg'
                                        type='number'
                                        name='price'
                                        placeholder='$'
                                        required
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='Photo'
                                    >
                                        Photo
                                    </label>
                                    <Input
                                        id='Photo'
                                        className='!text-lg'
                                        type='url'
                                        name='photo'
                                        placeholder='Photo URL'
                                        required
                                    />
                                </InputGroup>

                                <Select
                                    name='category'
                                    size='md'
                                    placeholder='Select Category'
                                    required
                                >
                                    <option value={[1, 'Cars']}>Cars</option>
                                    <option value={[2, 'Bikes']}>Bikes</option>
                                    <option value={[3, 'Airplanes']}>Airplanes</option>
                                    <option value={[4, 'Trucks']}>Trucks</option>
                                </Select>

                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='user'
                                    >
                                        User
                                    </label>
                                    <Input
                                        id='user'
                                        className='!text-lg'
                                        name='user'
                                        type='text'
                                        defaultValue={user?.displayName}
                                        placeholder='User Name'
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='Email'
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id='Email'
                                        className='!text-lg'
                                        type='email'
                                        name='email'
                                        defaultValue={user?.email}
                                        placeholder='Email'
                                        required
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='Photo'
                                    >
                                        Quantity
                                    </label>
                                    <Input
                                        id='stock'
                                        className='!text-lg'
                                        type='number'
                                        name='stock'
                                        placeholder='12'
                                        required
                                    />
                                </InputGroup>

                                <div className='flex gap-3'>
                                    <label
                                        className='bg-gray-300 text-center px-3 flex w-24 items-center font-medium text-gray-600 !py-0 text-md rounded-tl-md rounded-bl-md'
                                        htmlFor='rating'
                                    >
                                        Rating
                                    </label>
                                    <Rating
                                        className='!flex gap-2'
                                        value={value}
                                        cancel={false}
                                        onChange={(e) => setValue(e.value)}
                                        pt={{
                                            onIcon: {
                                                className: 'text-orange-400 w-6 h-6'
                                            },
                                            offIcon: {
                                                className: 'w-6 h-6'
                                            }
                                        }}
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <Textarea
                                        name='description'
                                        required
                                        placeholder='Toy Description ...'
                                    />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <button
                                disabled={value ? false : true}
                                className={`bg-pink-600 text-white text-lg font-medium font-['Inter'] leading-normal rounded-md px-4 lg:px-6 py-2 mr-6 ${
                                    value ? '' : 'cursor-not-allowed opacity-50'
                                }`}
                                type='submit'
                            >
                                Save
                            </button>
                            <Button type='button' onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            {/* Modal End */}
        </>
    );
};

export default AddToyModal;
