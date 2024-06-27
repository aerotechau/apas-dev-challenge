// src/shared/protected-routes.tsx (or the correct file path)
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ children }: { children: React.ReactElement }): React.ReactElement => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className={'text-center'}>{'Loading...'}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
