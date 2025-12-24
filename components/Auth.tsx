import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { User, View } from '../types';

interface AuthProps {
  type: 'LOGIN' | 'SIGNUP';
  onSuccess: (user: User) => void;
  setView: (view: View) => void;
}

const Auth: React.FC<AuthProps> = ({ type, onSuccess, setView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const users = storageService.getUsers();

    if (type === 'SIGNUP') {
      const exists = users.find(u => u.username === username);
      if (exists) {
        setError('Username already exists');
        return;
      }
      const newUser: User = { id: Date.now().toString(), username, password };
      storageService.saveUser(newUser);
      onSuccess(newUser);
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onSuccess(user);
      } else {
        setError('Invalid username or password');
      }
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 border border-white/50">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            {type === 'LOGIN' ? '👋' : '🎉'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {type === 'LOGIN' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mt-2">
            {type === 'LOGIN' ? 'Log in to your store' : 'Start managing your stock today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:border-blue-400 rounded-xl outline-none transition-all"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:border-blue-400 rounded-xl outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
          >
            {type === 'LOGIN' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setView(type === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
            className="text-blue-600 font-semibold hover:underline"
          >
            {type === 'LOGIN' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;