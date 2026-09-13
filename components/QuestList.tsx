import React from 'react';
import axios from 'axios';
import QuestCard from './QuestCard';

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

interface QuestListProps {
  tasks: Task[];
  onTaskCompleted: (taskId: string) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function QuestList({
  tasks,
  onTaskCompleted,
  onTaskDeleted,
}: QuestListProps) {
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Delete this quest?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskDeleted(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Active Quests */}
      <div>
        <h3 className="text-lg font-display font-bold text-rpg-gold mb-4 uppercase tracking-wider">
          ⚔️ Active Quests ({activeTasks.length})
        </h3>

        {activeTasks.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-12 text-center">
            <p className="text-slate-400">No active quests. Create one to begin your adventure!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeTasks.map((task) => (
              <QuestCard
                key={task.id}
                task={task}
                onComplete={() => onTaskCompleted(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed Quests */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-display font-bold text-green-400 mb-4 uppercase tracking-wider">
            ✨ Completed Quests ({completedTasks.length})
          </h3>

          <div className="grid gap-4">
            {completedTasks.map((task) => (
              <QuestCard
                key={task.id}
                task={task}
                onComplete={() => {}}
                onDelete={() => handleDelete(task.id)}
                isCompleted
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
