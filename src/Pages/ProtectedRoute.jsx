import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import baseURL from '../../baseURL';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const response = await baseURL.get('/auth/get-profile', {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            });
            setProfile(response.data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        };

        checkAuth();

    }, []);

    /* if (isLoading) {
        return <div>Loading...</div>;
    }

    if (profile?.role !== "ADMIN") {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children; */
};

export default PrivateRoute;