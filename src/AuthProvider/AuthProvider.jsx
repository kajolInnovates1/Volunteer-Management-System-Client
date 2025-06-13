import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthProvider = ({ children }) => {
    const userInfo = {
        ami: 5
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