
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../types';

interface ProtectedRouteProps {
  user: User | null;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
