
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
      <div className="max-w-md w-full bg-white/80 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-12 border border-white/50">
        <div className="text-center mb-10">
          <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300 inline-block">
            {type === 'LOGIN' ? '👋' : '🎉'}
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">
            {type === 'LOGIN' ? 'Welcome Back!' : 'Join Us!'}
          </h2>
          <p className="text-gray-600 mt-3 font-medium">
            {type === 'LOGIN' ? 'Log in to your toy kingdom' : 'Start your management journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-black text-gray-700 mb-2 px-1 uppercase tracking-widest">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-5 bg-white/50 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-2xl transition-all outline-none shadow-sm font-medium"
              placeholder="e.g. MasterToy"
            />
          </div>
          <div>
            <label className="block text-sm font-black text-gray-700 mb-2 px-1 uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 bg-white/50 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-2xl transition-all outline-none shadow-sm font-medium"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 font-bold text-center animate-shake">{error}</p>}

          <button
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95"
          >
            {type === 'LOGIN' ? 'Let\'s Go!' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            onClick={() => setView(type === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
            className="text-indigo-600 font-black hover:text-indigo-800 transition-colors"
          >
            {type === 'LOGIN' ? "New here? Sign Up" : 'Already a member? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
