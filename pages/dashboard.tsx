import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';
import CharacterStats from '../components/CharacterStats';
import QuestList from '../components/QuestList';
import CreateQuestForm from '../components/CreateQuestForm';
import InventoryPanel from '../components/InventoryPanel';

interface User {
  id: string;
  username: string;
  email: string;
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
  theme: string;
}

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

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'quests' | 'stats' | 'inventory'
  >('quests');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserProfile();
    fetchTasks();
  }, [router]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      router.push('/login');
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskCompleted = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `/api/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );

      if (response.data.user) {
        setUser(response.data.user);
      }

      showLevelUpAnimation(response.data);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const showLevelUpAnimation = (data: any) => {
    if (data.leveledUp) {
      alert(`🎉 ${data.message} 🎉`);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-rpg-darker flex items-center justify-center">
        <div className="text-rpg-gold text-xl">
          Initializing Adventure...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-darker">
      <Header
        user={user}
        onProfileUpdate={(updatedUser) =>
          setUser((prev) =>
            prev ? { ...prev, ...updatedUser } : prev
          )
        }
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Character Stats */}
          <div className="lg:col-span-1">
            <CharacterStats user={user} />
          </div>

          {/* Right Column - Quests and Tabs */}
          <div className="lg:col-span-2">

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-slate-700/30">
              {(['quests', 'stats', 'inventory'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium text-sm uppercase tracking-wider transition ${
                    activeTab === tab
                      ? 'text-rpg-gold border-b-2 border-rpg-gold'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tab === 'quests'
                    ? '⚔️ Quests'
                    : tab === 'stats'
                    ? '📊 Stats'
                    : '🎁 Inventory'}
                </button>
              ))}
            </div>

            {/* Quests */}
            {activeTab === 'quests' && (
              <>
                <CreateQuestForm onQuestAdded={handleTaskAdded} />

                <QuestList
                  tasks={tasks}
                  onTaskCompleted={handleTaskCompleted}
                  onTaskDeleted={handleTaskDeleted}
                />
              </>
            )}

            {/* Stats */}
            {activeTab === 'stats' && (
              <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-slate-800/30 p-4 rounded">
                    <p className="text-slate-400 text-sm mb-1">
                      Total Quests
                    </p>

                    <p className="text-2xl font-bold text-rpg-gold">
                      {tasks.length}
                    </p>
                  </div>

                  <div className="bg-slate-800/30 p-4 rounded">
                    <p className="text-slate-400 text-sm mb-1">
                      Completed
                    </p>

                    <p className="text-2xl font-bold text-green-400">
                      {tasks.filter((t) => t.completed).length}
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* Inventory */}
            {activeTab === 'inventory' && (
              <InventoryPanel user={user} />
            )}

          </div>
        </div>
      </main>
    </div>
  );
}