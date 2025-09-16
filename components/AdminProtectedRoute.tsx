
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../types';

interface AdminProtectedRouteProps {
  user: User | null;
  children: JSX.Element;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ user, children }) => {
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
