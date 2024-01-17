import React from 'react';
import SearchBar from '../Shared/SearchBar/SearchBar';
import ProductsCard from '../Home/ProductsCard/ProductsCard';
import { useLoaderData } from 'react-router-dom';

const AllToys = () => {
    const loadedToys = useLoaderData();
    return (
        <div className='container mx-auto px-5'>
            <SearchBar></SearchBar>
            <div>
                <h3 className='text-center text-2xl mb-6'>Total Products: {loadedToys.length}</h3>
            </div>
            <div className='grid lg:grid-cols-4 mb-10 gap-8 md:grid-cols-2'>
                {loadedToys.map((toy) => (
                    <ProductsCard key={toy._id} toy={toy} shopPage={true} />
                ))}
            </div>
        </div>
    );
};

export default AllToys;
