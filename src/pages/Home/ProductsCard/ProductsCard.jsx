import { Rating } from 'primereact/rating';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import React from 'react';

const OverlayOne = () => (
    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px) hue-rotate(90deg)' />
);

const ProductsCard = ({ toy, shopPage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    const { _id, name, price, categoryID, category, description, ratings, picture } = toy;
    const stock = 0;
    return (
        <div
            className={`bg-white rounded-lg border flex flex-col ${
                shopPage || 'mx-4'
            } border-stone-300`}
        >
            <div className='px-8 flex-1 flex items-center justify-center py-4'>
                <img className={`w-full ${shopPage || 'h-36 md:h-44'}`} src={picture} alt='' />
            </div>
            <footer className='bg-[#FAF5F9] w-full rounded-lg border border-stone-300 py-[15px] px-[30px] flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <div>
                        <h2 className="text-black text-lg font-medium font-['Inter'] leading-tight">
                            {name}
                        </h2>
                        {shopPage && (
                            <div className='flex mt-1 gap-1'>
                                <Rating
                                    className='text-red-400 flex gap-1'
                                    value={ratings}
                                    readOnly
                                    cancel={false}
                                />
                                <span>({ratings})</span>
                            </div>
                        )}
                    </div>
                    {shopPage && (
                        <h2 className="text-pink-500 text-sm font-bold font-['Inter'] leading-tight">
                            {stock === 0 ? <span>Stock Out</span> : <span>Stock({stock})</span>}
                        </h2>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <h4 className="text-pink-600 text-xl font-bold font-['Inter'] leading-tight">
                        ${price}
                    </h4>

                    <button
                        onClick={() => {
                            setOverlay(<OverlayOne />);
                            onOpen();
                        }}
                        className="bg-pink-600 text-white text-base font-medium font-['Inter'] leading-normal rounded-md px-3 lg:px-5 py-2"
                    >
                        Details
                    </button>
                    {/* Modal */}
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        {overlay}
                        <ModalContent>
                            <ModalHeader>{name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div>
                                    <img className='w-full py-4' src={picture} alt={name} />
                                    <div className='flex flex-col gap-3'>
                                        <h6 className="text-black text-lg font-medium font-['Inter'] leading-tight">
                                            Price:{' '}
                                            <span className="text-pink-600 text-xl font-bold font-['Inter'] leading-tight">
                                                ${price}
                                            </span>
                                        </h6>
                                        <h6 className="text-black text-lg font-medium font-['Inter'] leading-tight flex gap-2">
                                            Ratings:{' '}
                                            <Rating
                                                className='text-yellow-400 flex gap-1'
                                                value={ratings}
                                                readOnly
                                                cancel={false}
                                            />
                                            <span className='text-base'>({ratings})</span>
                                        </h6>
                                        <h6 className="text-black text-lg font-medium font-['Inter'] leading-tight">
                                            Category: <span>{category}</span>
                                        </h6>
                                        <p className="text-black text-md font-normal font-['Inter'] leading-tight">
                                            <span className='font-bold'>Description: </span>
                                            <span className='leading-6'>{description}</span>
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </footer>
        </div>
    );
};

export default ProductsCard;
