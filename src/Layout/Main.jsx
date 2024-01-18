import React, { useContext } from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProvider';
import Loader from '../pages/Shared/Loader/Loader';
import { ToastContainer } from 'react-toastify';

const Main = () => {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <Loader global={true}></Loader>;
    }
    return (
        <>
            <ToastContainer />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Main;
