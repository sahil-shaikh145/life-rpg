import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      // Auto-login after registration
      await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const loginResponse = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-darker flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-rpg-gold mb-2 tracking-wider">
            ⚔️ LIFE RPG
          </h1>
          <p className="text-rpg-muted text-sm uppercase tracking-widest">
            Create Your Character
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 focus:ring-1 focus:ring-rpg-gold/20 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Character Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your Epic Name"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 focus:ring-1 focus:ring-rpg-gold/20 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-rpg-gold/50 focus:ring-1 focus:ring-rpg-gold/20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rpg-gold to-yellow-500 text-slate-900 font-bold rounded transition hover:shadow-lg hover:shadow-rpg-gold/30 disabled:opacity-50 uppercase tracking-wider text-sm mt-6"
            >
              {loading ? 'Creating Character...' : 'Create Character'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700/30">
            <p className="text-center text-slate-400 text-sm">
              Already a warrior?{' '}
              <Link
                href="/login"
                className="text-rpg-gold hover:text-yellow-400 font-medium transition"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
