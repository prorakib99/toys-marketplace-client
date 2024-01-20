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
    Textarea
} from '@chakra-ui/react';
import { Rating } from 'primereact/rating';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const FormModal = ({
    initialRef,
    finalRef,
    isOpen,
    onClose,
    handleAddNewToy,
    handleUpdate,
    setValue,
    value,
    addToy,
    toy
}) => {
    const { user } = useContext(AuthContext);
    return (
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
                <form onSubmit={addToy ? handleAddNewToy : handleUpdate}>
                    <ModalHeader>{addToy ? 'Add New Toy' : 'Update Toy Info'}</ModalHeader>
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
                                    defaultValue={toy?.name}
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
                                    type='text'
                                    name='price'
                                    placeholder='$'
                                    defaultValue={toy?.price}
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
                                    defaultValue={toy?.picture}
                                    required
                                />
                            </InputGroup>

                            <Select
                                name='category'
                                size='md'
                                placeholder='Select Category'
                                className='pt-0'
                                defaultValue={toy?.category}
                                disabled={!addToy}
                                required
                            >
                                <option value={'Cars'}>Cars</option>
                                <option value={'Bikes'}>Bikes</option>
                                <option value={'Airplanes'}>Airplanes</option>
                                <option value={'Trucks'}>Trucks</option>
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
                                    readOnly
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
                                    defaultValue={toy?.stock}
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
                                    value={value || toy?.ratings}
                                    cancel={false}
                                    onChange={(e) => setValue(e.value)}
                                    pt={{
                                        onIcon: {
                                            className: 'text-pink-500 w-6 h-6'
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
                                    className='!text-lg'
                                    defaultValue={toy?.description}
                                    placeholder='Toy Description ...'
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button
                            className={`bg-pink-600 text-white text-lg font-medium font-['Inter'] leading-normal rounded-md px-4 lg:px-6 py-2 mr-6`}
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
    );
};

export default FormModal;
