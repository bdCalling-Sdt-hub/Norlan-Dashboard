import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const user =  JSON.parse(localStorage.getItem('user'));

    if (user?.id && user?.role === "ADMIN") {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
}

export default ProtectedRoute