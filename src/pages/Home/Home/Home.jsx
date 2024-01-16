import React from 'react';
import Hero from '../Hero/Hero';
import SearchBar from '../SearchBar/SearchBar';
import CategoryProducts from '../SearchBar/CategoryProducts/CategoryProducts';
import Offers from '../Offers/Offers';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchBar />
            <CategoryProducts />
            <Offers />
        </>
    );
};

export default Home;
