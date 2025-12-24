
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import AddStock from './components/AddStock';
import StockList from './components/StockList';

const App: React.FC = () => {
  const [view, setView] = useState<View>('HOME');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Persistence for user session
  useEffect(() => {
    const savedUser = localStorage.getItem('prime_toys_session');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('prime_toys_session', JSON.stringify(user));
    setView('HOME');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('prime_toys_session');
    setView('HOME');
  };

  const renderView = () => {
    switch (view) {
      case 'HOME':
        return <Home currentUser={currentUser} setView={setView} />;
      case 'LOGIN':
        return <Auth type="LOGIN" onSuccess={handleAuthSuccess} setView={setView} />;
      case 'SIGNUP':
        return <Auth type="SIGNUP" onSuccess={handleAuthSuccess} setView={setView} />;
      case 'ADD_STOCK':
        return currentUser ? (
          <AddStock currentUser={currentUser} setView={setView} />
        ) : (
          <Auth type="LOGIN" onSuccess={handleAuthSuccess} setView={setView} />
        );
      case 'STOCK_LIST':
        return currentUser ? (
          <StockList currentUser={currentUser} setView={setView} />
        ) : (
          <Auth type="LOGIN" onSuccess={handleAuthSuccess} setView={setView} />
        );
      default:
        return <Home currentUser={currentUser} setView={setView} />;
    }
  };

  return (
    <Layout>
      <Navbar 
        currentUser={currentUser} 
        setView={setView} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 flex flex-col relative">
        {renderView()}
      </main>
      
      {/* Footer Branding */}
      <footer className="py-4 text-center text-gray-500 text-xs bg-white/50 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Prime Toys Stock Management &bull; Built with Love 🧸
      </footer>
    </Layout>
  );
};

export default App;
