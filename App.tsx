
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import VideosPage from './pages/VideosPage';
import ChatPage from './pages/ChatPage';
import HiringPage from './pages/HiringPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './constants';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('streamverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    setAuthError(null);
    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      const adminUser: User = { id: 'admin', email, isAdmin: true };
      localStorage.setItem('streamverse_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return;
    }
    
    // Mock user login
    const storedUsers = JSON.parse(localStorage.getItem('streamverse_users') || '{}');
    if (storedUsers[email] && storedUsers[email] === pass) {
        const regularUser: User = { id: email, email, isAdmin: false };
        localStorage.setItem('streamverse_user', JSON.stringify(regularUser));
        setUser(regularUser);
    } else {
        setAuthError("Invalid credentials.");
    }
  };
  
  const handleSignUp = async (email: string, pass: string) => {
    setAuthError(null);
    const storedUsers = JSON.parse(localStorage.getItem('streamverse_users') || '{}');
    if (storedUsers[email]) {
        setAuthError("User with this email already exists.");
        return;
    }
    storedUsers[email] = pass;
    localStorage.setItem('streamverse_users', JSON.stringify(storedUsers));
    // auto-login after signup
    const newUser: User = { id: email, email, isAdmin: false };
    localStorage.setItem('streamverse_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('streamverse_user');
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  return (
    <HashRouter>
      <Header user={user} onLogout={handleLogout} />
      <main className="bg-background min-h-[calc(100vh-68px)]">
        <Routes>
          <Route path="/auth" element={user ? <Navigate to="/videos" /> : <AuthPage onLogin={handleLogin} onSignUp={handleSignUp} authError={authError} />} />
          
          <Route path="/videos" element={<ProtectedRoute user={user}><VideosPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute user={user}><ChatPage /></ProtectedRoute>} />
          <Route path="/hiring" element={<ProtectedRoute user={user}><HiringPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute user={user}><AdminPage /></AdminProtectedRoute>} />

          <Route path="/" element={<Navigate to={user ? "/videos" : "/auth"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
