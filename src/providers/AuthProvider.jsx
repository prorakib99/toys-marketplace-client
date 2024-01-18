import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
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
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        loading,
        loginUser,
        createUser,
        userProfile,
        logOut
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
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
