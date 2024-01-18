import React, { useEffect, useState } from 'react';
import SearchBar from '../Shared/SearchBar/SearchBar';
import ProductsCard from '../Home/ProductsCard/ProductsCard';
import Loader from '../Shared/Loader/Loader';

const AllToys = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/toys')
            .then((res) => res.json())
            .then((data) => {
                setToys(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container mx-auto px-5'>
            <SearchBar></SearchBar>

            {loading ? (
                <Loader></Loader>
            ) : (
                <>
                    <div>
                        <h3 className='text-center text-2xl mb-6'>Total Products: {toys.length}</h3>
                    </div>
                    <div className='grid lg:grid-cols-4 mb-10 gap-8 md:grid-cols-2'>
                        {toys.map((toy) => (
                            <ProductsCard key={toy._id} toy={toy} shopPage={true} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllToys;
