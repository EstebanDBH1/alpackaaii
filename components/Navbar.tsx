import React from 'react';
import { UserProfile } from '../types';
import { Button } from './Button';

interface NavbarProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-[#E5E5E5] transition-all">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
             {/* Logo minimalista con serif */}
            <span className="text-xl font-['Source_Serif_4',serif] font-medium text-[#242424] tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              Alpacka.ai
            </span>
            <span className="hidden sm:inline-flex items-center justify-center bg-[#F5F5F4] text-[#656565] border border-[#E5E5E5] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-['Inter',sans-serif] font-medium">
              Beta
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-['Inter',sans-serif] font-medium text-[#383838]">
                {user.displayName}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Avatar" 
                    className="h-8 w-8 rounded-full ring-1 ring-[#E5E5E5] object-cover shadow-sm" 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#F5F5F4] text-[#656565] flex items-center justify-center text-xs border border-[#E5E5E5] font-['Inter',sans-serif] font-bold shadow-sm">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                
                <div className="h-5 w-px bg-[#E5E5E5]"></div>

                <Button 
                    variant="ghost" 
                    onClick={onLogout} 
                    title="Cerrar Sesión" 
                    className="text-[#A8A8A8] hover:text-[#DA7756] hover:bg-[#F5F5F4] p-1.5 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};