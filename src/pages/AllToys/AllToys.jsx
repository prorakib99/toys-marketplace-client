import React, { useEffect, useState } from 'react';
import SearchBar from '../Shared/SearchBar/SearchBar';
import ProductsCard from '../Home/ProductsCard/ProductsCard';
import Loader from '../Shared/Loader/Loader';
import { Pagination } from 'flowbite-react';

const AllToys = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(true);
    // Pagination
    const [total, setTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    const totalPage = Math.ceil(total / itemsPerPage);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/total-toys')
            .then((res) => res.json())
            .then((data) => setTotal(data.total));

        fetch(`http://localhost:5000/toys?page=${currentPage}&limit=${itemsPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                setToys(data);
                setLoading(false);
            });
    }, [currentPage, itemsPerPage]);

    return (
        <div className='container mx-auto px-5'>
            <SearchBar></SearchBar>

            {loading ? (
                <Loader></Loader>
            ) : (
                <>
                    <div>
                        <h3 className='text-center text-2xl mb-6'>Total Products: {total}</h3>
                    </div>
                    <div className='grid lg:grid-cols-4 mb-10 gap-8 md:grid-cols-2'>
                        {toys.map((toy) => (
                            <ProductsCard key={toy._id} toy={toy} shopPage={true} />
                        ))}
                    </div>
                </>
            )}
            <div className='text-center mb-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default AllToys;
