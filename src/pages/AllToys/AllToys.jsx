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
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);

    // Search
    const handleSearch = () => {
        setLoading(true);

        fetch(`http://localhost:5000/search?searchTerm=${searchTerm}&page=${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                setToys(data.result);
                setTotalPages(data.totalPages);
                setTotal(data.totalResults);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        handleSearch();
    }, [currentPage]);

    return (
        <div className='container mx-auto px-5'>
            <SearchBar
                handleSearch={handleSearch}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            ></SearchBar>

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
                    {/* {searchTerms && <h3 className='text-3xl text-center'>No Result Found</h3>} */}
                </>
            )}
            <div className='text-center mb-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default AllToys;
