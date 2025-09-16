
import React from 'react';
import { NavLink } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const FilmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
    <path d="M8 6v12" /><path d="M16 6v12" /><path d="M4 10h16" /><path d="M4 14h16" />
    <path d="M10 6.5v.01" /><path d="M10 17.5v.01" /><path d="M14 6.5v.01" /><path d="M14 17.5v.01" />
  </svg>
);


const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const activeLinkStyle = {
    color: '#a78bfa',
    borderBottom: '2px solid #8b5cf6'
  };

  return (
    <header className="bg-surface shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FilmIcon className="h-8 w-8 text-primary"/>
          <NavLink to="/" className="text-2xl font-bold text-text-primary hover:text-secondary transition-colors">
            StreamVerse
          </NavLink>
        </div>
        <div className="flex items-center space-x-6">
          {user && (
            <>
              <NavLink to="/videos" className="text-lg text-text-secondary hover:text-primary transition-colors pb-1" style={({ isActive }) => isActive ? activeLinkStyle : {}}>
                Videos
              </NavLink>
              <NavLink to="/chat" className="text-lg text-text-secondary hover:text-primary transition-colors pb-1" style={({ isActive }) => isActive ? activeLinkStyle : {}}>
                Chat
              </NavLink>
              <NavLink to="/hiring" className="text-lg text-text-secondary hover:text-primary transition-colors pb-1" style={({ isActive }) => isActive ? activeLinkStyle : {}}>
                Hiring
              </NavLink>
              {user.isAdmin && (
                <NavLink to="/admin" className="text-lg text-yellow-400 hover:text-yellow-300 transition-colors pb-1" style={({ isActive }) => isActive ? activeLinkStyle : {}}>
                  Admin
                </NavLink>
              )}
            </>
          )}
          {user ? (
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/auth" className="text-lg text-text-secondary hover:text-primary transition-colors">
              Login / Sign Up
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
