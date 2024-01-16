import React from 'react';
import Hero from '../Hero/Hero';
import SearchBar from '../SearchBar/SearchBar';
import CategoryProducts from '../SearchBar/CategoryProducts/CategoryProducts';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchBar />
            <CategoryProducts />
        </>
    );
};

export default Home;
