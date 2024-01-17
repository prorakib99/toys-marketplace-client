import { Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
    return (
        <div className='text-center my-10'>
            <Spinner size='xl' />
        </div>
    );
};

export default Loader;
