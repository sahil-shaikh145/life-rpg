import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Store token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-darker flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-rpg-gold mb-2 tracking-wider">
            ⚔️ LIFE RPG
          </h1>
          <p className="text-rpg-muted text-sm uppercase tracking-widest">
            Transform Your Life Into An Epic Adventure
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adventurer@example.com"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 focus:ring-1 focus:ring-rpg-gold/20 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 focus:ring-1 focus:ring-rpg-gold/20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded transition hover:shadow-lg hover:shadow-rpg-gold/30 disabled:opacity-50 uppercase tracking-wider text-sm"
            >
              {loading ? 'Entering World...' : 'Begin Adventure'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700/30">
            <p className="text-center text-slate-400 text-sm">
              No character yet?{' '}
              <Link
                href="/register"
                className="text-rpg-gold hover:text-yellow-400 font-medium transition"
              >
                Create One
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Demo: test@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}
