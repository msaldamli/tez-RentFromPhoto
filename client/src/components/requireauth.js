import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../Hooks/useauth';
// import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectUsers } from '../api/features/userslice';

function RequireAuth() {
  const user = localStorage.getItem('user');

  if (user) {
    return <Outlet />;
  }

  return <Navigate to='/home' replace />;
}
export default RequireAuth;
