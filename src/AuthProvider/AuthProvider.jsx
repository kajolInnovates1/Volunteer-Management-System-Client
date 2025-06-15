import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userSignUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const userUpdate = (dataInfo) => {
        return updateProfile(auth.currentUser, {
            ...dataInfo
        });
    }
    const logout = () => {
        return signOut(auth);
    }
    const userSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        })
        return () => {
            unsubscirbe();

        }

    }, [])
    const userInfo = {
        userSignUp,
        userSignIn,
        logout,
        userUpdate,
        user,
        setUser,
        loading,
        setLoading,
        userSignInWithGoogle


    }
    return (
        <AuthContext value={userInfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;