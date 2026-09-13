import React, { useState } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  completed: boolean;
  baseXp: number;
  dueDate?: string;
}

interface CreateQuestFormProps {
  onQuestAdded: (task: Task) => void;
}

export default function CreateQuestForm({ onQuestAdded }: CreateQuestFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    difficulty: 'Normal',
    baseXp: 10,
    strengthXp: 0,
    intellectXp: 0,
    charismaXp: 0,
    enduranceXp: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onQuestAdded(response.data.task);
      setFormData({
        title: '',
        description: '',
        category: 'General',
        difficulty: 'Normal',
        baseXp: 10,
        strengthXp: 0,
        intellectXp: 0,
        charismaXp: 0,
        enduranceXp: 0,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create quest:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded-lg transition hover:shadow-lg hover:shadow-rpg-gold/30 uppercase tracking-wider text-sm mb-6"
      >
        + Create New Quest
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Quest Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Complete your quest..."
            required
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded text-white focus:outline-none focus:border-rpg-gold/50 transition"
          >
            <option>General</option>
            <option>Fitness</option>
            <option>Learning</option>
            <option>Work</option>
            <option>Health</option>
            <option>Creative</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your quest..."
          rows={2}
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 transition resize-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded text-white focus:outline-none focus:border-rpg-gold/50 transition"
          >
            <option>Easy</option>
            <option>Normal</option>
            <option>Hard</option>
            <option>Legendary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Base XP</label>
          <input
            type="number"
            value={formData.baseXp}
            onChange={(e) => setFormData({ ...formData, baseXp: parseInt(e.target.value) })}
            min="5"
            max="100"
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded text-white focus:outline-none focus:border-rpg-gold/50 transition"
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-slate-300 mb-2">Attribute Bonuses (optional)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['strengthXp', 'intellectXp', 'charismaXp', 'enduranceXp'].map((attr) => (
            <div key={attr}>
              <label className="text-xs text-slate-400 block mb-1">
                {attr.replace('Xp', '')}
              </label>
              <input
                type="number"
                value={formData[attr as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [attr]: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                max="20"
                className="w-full px-3 py-1 bg-slate-800/50 border border-slate-600/30 rounded text-white focus:outline-none focus:border-rpg-gold/50 transition text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded transition hover:shadow-lg hover:shadow-rpg-gold/30 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Quest'}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 py-2 bg-slate-800/50 border border-slate-600/30 text-slate-300 font-medium rounded transition hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
