import React from 'react';

interface User {
  id: string;
  username: string;
  level: number;
  gold: number;
  inventory?: any[];
}

interface InventoryPanelProps {
  user: User;
}

const rewards = [
  {
    id: 1,
    name: 'Dark Knight Title',
    cost: 500,
    description: 'Unlock the elite Dark Knight title',
    icon: '🏴',
  },
  {
    id: 2,
    name: 'Gold Theme',
    cost: 300,
    description: 'Unlock the golden theme',
    icon: '✨',
  },
  {
    id: 3,
    name: 'Master Badge',
    cost: 1000,
    description: 'Achieve master status',
    icon: '👑',
  },
  {
    id: 4,
    name: 'Celestial Avatar',
    cost: 750,
    description: 'Unlock celestial cosmetics',
    icon: '🌟',
  },
];

export default function InventoryPanel({ user }: InventoryPanelProps) {
  const handlePurchase = (reward: any) => {
    if (user.gold < reward.cost) {
      alert('Not enough gold!');
      return;
    }
    alert(`Purchased ${reward.name}!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-lg font-display font-bold text-rpg-gold mb-4">Reward Shop</h3>
        <p className="text-sm text-slate-400 mb-6">
          Earn gold by completing quests and spend it here on exclusive rewards!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const canAfford = user.gold >= reward.cost;

            return (
              <div
                key={reward.id}
                className={`border rounded-lg p-4 transition ${
                  canAfford
                    ? 'bg-slate-800/30 border-slate-700/30 hover:border-rpg-gold/50'
                    : 'bg-slate-900/30 border-slate-800/30 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{reward.icon}</span>
                  <span className="text-lg font-bold text-yellow-400">
                    💰 {reward.cost}
                  </span>
                </div>

                <h4 className="font-semibold text-white mb-1">{reward.name}</h4>
                <p className="text-xs text-slate-400 mb-4">{reward.description}</p>

                <button
                  onClick={() => handlePurchase(reward)}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded font-medium text-sm transition ${
                    canAfford
                      ? 'bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 hover:shadow-lg hover:shadow-rpg-gold/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Purchase' : 'Not Enough Gold'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-300">
          <strong>💡 Tip:</strong> Complete quests, especially harder ones, to earn more gold and
          level up faster!
        </p>
      </div>
    </div>
  );
}
