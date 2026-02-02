import React from 'react';
import { UserProfile } from '../types';
import { Button } from './Button';

interface NavbarProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
             {/* Logo minimalista regular */}
            <span className="text-xl text-gray-900 tracking-tight">
              Alpacka.ai
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm text-gray-900">{user.displayName}</span>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm border border-blue-200">
                {user.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <Button variant="ghost" onClick={onLogout} title="Cerrar Sesión" className="text-gray-500 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};