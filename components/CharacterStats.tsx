import React, { useMemo } from 'react';
import { getXpProgress, calculateLevelUpThreshold, ATTRIBUTE_COLORS } from '../utils/progression';

interface User {
  id: string;
  username: string;
  level: number;
  totalExp: number;
  currentExp: number;
  strength: number;
  intellect: number;
  charisma: number;
  endurance: number;
  gold: number;
  currentStreak: number;
  maxStreak: number;
  title: string;
}

interface CharacterStatsProps {
  user: User;
}

export default function CharacterStats({ user }: CharacterStatsProps) {
  const xpProgress = useMemo(
    () => getXpProgress(user.currentExp, user.level),
    [user.currentExp, user.level]
  );

  const attributes = [
    { name: 'Strength', value: user.strength, color: 'bg-red-500' },
    { name: 'Intellect', value: user.intellect, color: 'bg-blue-500' },
    { name: 'Charisma', value: user.charisma, color: 'bg-pink-500' },
    { name: 'Endurance', value: user.endurance, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Character Card */}
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold text-rpg-gold mb-1">
            {user.username}
          </h2>
          <p className="text-sm text-slate-400">{user.title}</p>
        </div>

        {/* Level Display */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Level</p>
          <p className="text-4xl font-bold text-rpg-gold">{user.level}</p>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Experience</span>
            <span>
              {xpProgress.current} / {xpProgress.needed}
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rpg-gold to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${xpProgress.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          {attributes.map((attr) => (
            <div key={attr.name} className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-300 w-20">{attr.name}</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-slate-800/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${attr.color} h-full rounded-full`}
                    style={{ width: `${Math.min((attr.value / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-300 w-8 text-right">
                {attr.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Streaks */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 border border-slate-700/20 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Streak</p>
          <p className="text-2xl font-bold text-orange-400">🔥 {user.currentStreak}</p>
        </div>
        <div className="bg-slate-800/30 border border-slate-700/20 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Best Streak</p>
          <p className="text-2xl font-bold text-rpg-gold">⭐ {user.maxStreak}</p>
        </div>
      </div>

      {/* Gold Display */}
      <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border border-yellow-600/30 rounded-lg p-4">
        <p className="text-yellow-400 font-display font-bold text-xl">
          💰 {user.gold} Gold
        </p>
        <p className="text-xs text-slate-400 mt-1">Use gold to unlock rewards</p>
      </div>
    </div>
  );
}
