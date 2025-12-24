import React from 'react';
import { View, User } from '../types';

interface HomeProps {
  currentUser: User | null;
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ currentUser, setView }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full bg-white/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/50 shadow-2xl">
        <div className="mb-8">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-lg mb-6 transform -rotate-2">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-blue-600 drop-shadow-lg mb-4">
            PRIME TOYS
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Manage your magical toy kingdom's inventory with ease!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {!currentUser ? (
            <>
              <button 
                onClick={() => setView('SIGNUP')}
                className="group p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-4 border-yellow-400 hover:scale-105"
              >
                <div className="text-4xl mb-2">✨</div>
                <div className="text-xl font-bold text-gray-800">Sign Up</div>
                <div className="text-sm text-gray-500">Join the toy family</div>
              </button>
              <button 
                onClick={() => setView('LOGIN')}
                className="group p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-4 border-blue-400 hover:scale-105"
              >
                <div className="text-4xl mb-2">🔑</div>
                <div className="text-xl font-bold text-gray-800">Login</div>
                <div className="text-sm text-gray-500">Back to your store</div>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setView('ADD_STOCK')}
                className="group p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-4 border-green-400 hover:scale-105"
              >
                <div className="text-4xl mb-2">➕</div>
                <div className="text-xl font-bold text-gray-800">Add Stock</div>
                <div className="text-sm text-gray-500">Add new arrivals</div>
              </button>
              <button 
                onClick={() => setView('STOCK_LIST')}
                className="group p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-4 border-purple-400 hover:scale-105"
              >
                <div className="text-4xl mb-2">📋</div>
                <div className="text-xl font-bold text-gray-800">Stock List</div>
                <div className="text-sm text-gray-500">View current inventory</div>
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-12 flex space-x-4">
        {['🧸', '🧩', '🚂', '🚁', '🎨'].map((emoji, i) => (
          <span key={i} className={`text-4xl animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;