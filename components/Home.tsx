import React from 'react';
import { View, User } from '../types';

interface HomeProps {
  currentUser: User | null;
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ currentUser, setView }) => {
  // Array of toy emojis for floating decoration
  const floatingToys = [
    { emoji: '🧸', size: 'text-6xl', top: '10%', left: '5%', delay: '0s', duration: '15s' },
    { emoji: '🧩', size: 'text-4xl', top: '20%', left: '85%', delay: '2s', duration: '12s' },
    { emoji: '🏎️', size: 'text-5xl', top: '70%', left: '10%', delay: '1s', duration: '18s' },
    { emoji: '🎨', size: 'text-4xl', top: '80%', left: '80%', delay: '3s', duration: '14s' },
    { emoji: '🎈', size: 'text-5xl', top: '40%', left: '90%', delay: '0.5s', duration: '20s' },
    { emoji: '🚂', size: 'text-6xl', top: '15%', left: '45%', delay: '4s', duration: '25s' },
  ];

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Home Specific Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Floating Toys Decoration */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
      
      {floatingToys.map((toy, idx) => (
        <div
          key={idx}
          className={`absolute z-0 ${toy.size} animate-float opacity-30 select-none pointer-events-none hidden lg:block`}
          style={{
            top: toy.top,
            left: toy.left,
            animationDelay: toy.delay,
            animationDuration: toy.duration
          }}
        >
          {toy.emoji}
        </div>
      ))}

      <div className="relative z-10 max-w-4xl w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 border border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_45px_70px_-15px_rgba(0,0,0,0.15)]">
        <div className="mb-8">
          <div className="inline-block p-5 bg-white rounded-full shadow-2xl mb-8 transform -rotate-6 hover:rotate-12 transition-transform duration-500 cursor-default group">
            <span className="text-7xl group-hover:scale-125 inline-block transition-transform">🚀</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-blue-600 drop-shadow-xl mb-6 tracking-tight">
            PRIME TOYS
          </h1>
          <p className="text-2xl text-gray-700 font-semibold mb-2">
            The Ultimate Toy Inventory Hub
          </p>
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Organize, track, and manage your collection of magic and joy with the most delightful stock management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mt-10">
          {!currentUser ? (
            <>
              <button 
                onClick={() => setView('SIGNUP')}
                className="group p-8 bg-gradient-to-br from-yellow-50 to-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-4 border-yellow-400 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-150 transition-transform">✨</div>
                <div className="text-5xl mb-3">👶</div>
                <div className="text-2xl font-black text-gray-800">Join Us</div>
                <div className="text-sm font-medium text-gray-500 mt-1">Become a Toy Master</div>
              </button>
              <button 
                onClick={() => setView('LOGIN')}
                className="group p-8 bg-gradient-to-br from-blue-50 to-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-4 border-blue-400 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-150 transition-transform">🔑</div>
                <div className="text-5xl mb-3">👋</div>
                <div className="text-2xl font-black text-gray-800">Welcome Back</div>
                <div className="text-sm font-medium text-gray-500 mt-1">Access your store</div>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setView('ADD_STOCK')}
                className="group p-8 bg-gradient-to-br from-green-50 to-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-4 border-green-400 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-150 transition-transform">➕</div>
                <div className="text-5xl mb-3">🎁</div>
                <div className="text-2xl font-black text-gray-800">New Toy</div>
                <div className="text-sm font-medium text-gray-500 mt-1">Add to inventory</div>
              </button>
              <button 
                onClick={() => setView('STOCK_LIST')}
                className="group p-8 bg-gradient-to-br from-purple-50 to-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-4 border-purple-400 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-150 transition-transform">📋</div>
                <div className="text-5xl mb-3">🏰</div>
                <div className="text-2xl font-black text-gray-800">The Vault</div>
                <div className="text-sm font-medium text-gray-500 mt-1">View full stock</div>
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-16 flex space-x-6 z-10">
        {['🧸', '🧩', '🚂', '🚁', '🎨'].map((emoji, i) => (
          <span 
            key={i} 
            className={`text-5xl animate-bounce hover:scale-150 transition-transform cursor-pointer`} 
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;