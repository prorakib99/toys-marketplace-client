import React from 'react';
import Hero from '../Hero/Hero';
import SearchBar from '../SearchBar/SearchBar';
import CategoryProducts from '../SearchBar/CategoryProducts/CategoryProducts';
import Offers from '../Offers/Offers';
import Gallery from '../Gallery/Gallery';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchBar />
            <CategoryProducts />
            <Gallery />
            <Offers />
        </>
    );
};

export default Home;
