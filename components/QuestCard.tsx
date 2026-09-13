import React from 'react';

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

interface QuestCardProps {
  task: Task;
  onComplete: () => void;
  onDelete: () => void;
  isCompleted?: boolean;
}

const difficultyColors = {
  Easy: 'bg-green-500/20 border-green-500/30 text-green-400',
  Normal: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  Hard: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
  Legendary: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
};

const categoryIcons: { [key: string]: string } = {
  General: '📋',
  Fitness: '💪',
  Learning: '📚',
  Work: '💼',
  Health: '🏥',
  Creative: '🎨',
};

export default function QuestCard({
  task,
  onComplete,
  onDelete,
  isCompleted = false,
}: QuestCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 transition ${
        isCompleted
          ? 'bg-slate-900/20 border-slate-700/20'
          : 'bg-slate-900/40 border-slate-700/30 hover:border-rpg-gold/50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">
              {categoryIcons[task.category] || '📋'}
            </span>
            <h3 className={`font-semibold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-sm text-slate-400 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-2 py-1 rounded border ${
                difficultyColors[task.difficulty as keyof typeof difficultyColors] || difficultyColors.Normal
              }`}
            >
              {task.difficulty}
            </span>
            <span className="px-2 py-1 bg-slate-800/50 text-slate-300 rounded">
              {task.category}
            </span>
            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded font-medium">
              +{task.baseXp} XP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isCompleted && (
            <button
              onClick={onComplete}
              className="px-3 py-2 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded transition hover:shadow-lg hover:shadow-rpg-gold/30 text-sm whitespace-nowrap"
            >
              ✓ Complete
            </button>
          )}
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded transition hover:bg-red-500/20 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
