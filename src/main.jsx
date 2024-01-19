import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import AuthProvider from './providers/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <ChakraProvider>
                <PrimeReactProvider>
                    <RouterProvider router={router} />
                </PrimeReactProvider>
            </ChakraProvider>
        </AuthProvider>
    </React.StrictMode>
);
