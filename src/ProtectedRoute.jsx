import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return isAuthenticated ? Component : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
