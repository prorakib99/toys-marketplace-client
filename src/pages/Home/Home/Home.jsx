import React from 'react';
import Hero from '../Hero/Hero';
import SearchBar from '../../Shared/SearchBar/SearchBar';
import Offers from '../Offers/Offers';
import Gallery from '../Gallery/Gallery';
import CategoryProducts from '../CategoryProducts/CategoryProducts';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchBar homePage={true} />
            <CategoryProducts />
            <Gallery />
            <Offers />
        </>
    );
};

export default Home;
