import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser, not UserContext

const ProtectedRoute = ({ element, adminOnly }) => {
    const { user } = useUser();

    if (!user.loggedIn) {
        // Redirect to login if not logged in
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !user.isAdmin) {
        // Redirect to a "Not Authorized" page if not an admin
        return <Navigate to="/home" replace />;
    }

    return element;
};

export default ProtectedRoute;
