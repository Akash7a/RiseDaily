import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { user, token, loading } = useSelector((state) => state.user);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }


    return user || token ? children : <Navigate to="/login" replace={true} />
};

export default ProtectedRoute;