import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = localStorage.getItem('user');

  // If user exists in local storage, show the page. Otherwise, redirect to login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;