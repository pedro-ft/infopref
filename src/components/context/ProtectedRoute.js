import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;