
import React from 'react';
import { View, User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  setView: (view: View) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, setView, onLogout }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setView('HOME')}
      >
        <span className="text-3xl">🧸</span>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          PRIME TOYS
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="hidden md:inline text-sm font-medium text-gray-600">
              Welcome, <span className="text-blue-600">{currentUser.username}</span>
            </span>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-2">
            <button 
              onClick={() => setView('LOGIN')}
              className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => setView('SIGNUP')}
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-colors shadow-md"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
