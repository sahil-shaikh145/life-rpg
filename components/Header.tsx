import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  level: number;
  gold: number;
}

interface HeaderProps {
  user: User;
  onProfileUpdate: (user: User) => void;
}

export default function Header({ user, onProfileUpdate }: HeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="bg-slate-950/80 backdrop-blur border-b border-slate-700/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <span className="text-2xl">⚔️</span>
            <span className="text-lg font-display font-bold text-rpg-gold group-hover:text-yellow-400 transition">
              LIFE RPG
            </span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-white font-medium">{user.username}</p>
              <p className="text-sm text-rpg-gold">Level {user.level}</p>
            </div>

            <div className="text-center">
              <p className="text-yellow-400 font-bold text-lg">💰 {user.gold}</p>
              <p className="text-xs text-slate-400">Gold</p>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-slate-800/50 rounded transition"
              >
                <svg
                  className="w-6 h-6 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-slate-700/50 rounded-lg shadow-xl">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
