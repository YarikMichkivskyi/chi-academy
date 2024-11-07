import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAppSelector} from "../hooks/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAllowed = useAppSelector(state => state.userData.isAuthenticated);
    return isAllowed ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;