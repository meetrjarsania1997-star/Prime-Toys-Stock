
import React from 'react';
import { View, User } from '../types';

interface HomeProps {
  currentUser: User | null;
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ currentUser, setView }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 border border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transform transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)]">
        <div className="mb-10">
          <div className="inline-block p-6 bg-white rounded-[2rem] shadow-xl mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-7xl animate-bounce inline-block">🚀</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-6 tracking-tight">
            PRIME TOYS
          </h1>
          <p className="text-2xl text-gray-800 font-semibold max-w-2xl mx-auto leading-relaxed">
            Where inventory management meets pure imagination. Manage your magical toy kingdom with ease!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {!currentUser ? (
            <>
              <button 
                onClick={() => setView('SIGNUP')}
                className="group relative p-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-[2.5rem] shadow-lg hover:shadow-orange-200 transition-all hover:-translate-y-2 active:scale-95"
              >
                <div className="text-5xl mb-3">✨</div>
                <div className="text-2xl font-black text-white">Join the Fun</div>
                <div className="text-sm text-yellow-50 font-medium opacity-90">Create your store account</div>
              </button>
              <button 
                onClick={() => setView('LOGIN')}
                className="group relative p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] shadow-lg hover:shadow-blue-200 transition-all hover:-translate-y-2 active:scale-95"
              >
                <div className="text-5xl mb-3">🔑</div>
                <div className="text-2xl font-black text-white">Open Store</div>
                <div className="text-sm text-blue-50 font-medium opacity-90">Log in to dashboard</div>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setView('ADD_STOCK')}
                className="group relative p-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-[2.5rem] shadow-lg hover:shadow-green-200 transition-all hover:-translate-y-2 active:scale-95"
              >
                <div className="text-5xl mb-3">➕</div>
                <div className="text-2xl font-black text-white">New Arrivals</div>
                <div className="text-sm text-green-50 font-medium opacity-90">Restock the shelves</div>
              </button>
              <button 
                onClick={() => setView('STOCK_LIST')}
                className="group relative p-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-[2.5rem] shadow-lg hover:shadow-purple-200 transition-all hover:-translate-y-2 active:scale-95"
              >
                <div className="text-5xl mb-3">📋</div>
                <div className="text-2xl font-black text-white">Warehouse</div>
                <div className="text-sm text-purple-50 font-medium opacity-90">View current stock</div>
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-16 flex space-x-8">
        {['🧸', '🧩', '🚂', '🚁', '🎨', '🎠'].map((emoji, i) => (
          <span 
            key={i} 
            className="text-5xl drop-shadow-md animate-bounce" 
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2.5s' }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
