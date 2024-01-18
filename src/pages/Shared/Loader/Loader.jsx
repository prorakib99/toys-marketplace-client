import { Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader = ({ global }) => {
    return (
        <div className={global ? 'h-screen flex justify-center items-center' : 'text-center my-10'}>
            <Spinner size='xl' />
        </div>
    );
};

export default Loader;
