import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import AllToys from '../pages/AllToys/AllToys';
import MyToys from '../pages/MyToys/MyToys';
import AddToys from '../pages/AddToys/AddToys';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PrivateRoute from '../providers/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'all-toys',
                element: <AllToys />
            },
            {
                path: 'my-toys',
                element: <MyToys />
            },
            {
                path: 'add-toy',
                element: (
                    <PrivateRoute>
                        <AddToys />
                    </PrivateRoute>
                )
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
]);

export default router;
