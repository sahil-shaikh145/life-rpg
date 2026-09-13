import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-darker flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-display font-black text-rpg-gold mb-4 tracking-wider leading-tight">
          ⚔️ LIFE RPG
        </h1>

        <p className="text-2xl md:text-3xl text-slate-300 mb-6 font-light">
          Transform Your Real Life Into An Epic Adventure
        </p>

        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Turn mundane tasks into exciting quests. Earn experience, level up, unlock achievements,
          and watch your real-world progress become an epic story.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
            <p className="text-2xl mb-2">📊</p>
            <h3 className="font-semibold text-white mb-2">Track Progress</h3>
            <p className="text-sm text-slate-400">
              Monitor your level, experience, and character attributes
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
            <p className="text-2xl mb-2">🎯</p>
            <h3 className="font-semibold text-white mb-2">Complete Quests</h3>
            <p className="text-sm text-slate-400">
              Turn your goals into exciting quests with reward systems
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
            <p className="text-2xl mb-2">🏆</p>
            <h3 className="font-semibold text-white mb-2">Earn Rewards</h3>
            <p className="text-sm text-slate-400">
              Unlock badges, titles, and cosmetics as you progress
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded-lg transition hover:shadow-lg hover:shadow-rpg-gold/30 uppercase tracking-wider text-sm"
          >
            Create Character
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border-2 border-rpg-gold text-rpg-gold font-bold rounded-lg transition hover:bg-rpg-gold/10 uppercase tracking-wider text-sm"
          >
            Login
          </Link>
        </div>

        {/* Demo Note */}
        <p className="text-slate-500 text-sm mt-8">
          Demo: test@example.com / password123
        </p>
      </div>
    </div>
  );
}
