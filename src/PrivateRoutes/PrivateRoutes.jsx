import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <h1>Loading......</h1>
    }

    if (!user) {
        return <Navigate to='/login' state={location.pathname}></Navigate>

    }
    return children;
};

export default PrivateRoutes;