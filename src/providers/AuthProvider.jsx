import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const userProfile = (createdUser, name, photo) => {
        return updateProfile(createdUser, {
            displayName: name,
            photoURL: photo
        });
    };
    const loginWithPopup = (Provider) => {
        return signInWithPopup(auth, Provider);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        loading,
        setLoading,
        loginUser,
        loginWithPopup,
        createUser,
        userProfile,
        logOut
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                };
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        localStorage.setItem('toy-access-token', data.token);
                    });
            } else {
                localStorage.removeItem('toy-access-token');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
