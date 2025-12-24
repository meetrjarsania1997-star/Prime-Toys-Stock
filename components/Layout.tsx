import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Playful Background Layers */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1532330384785-f5587224857f?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)'
        }}
      />
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-yellow-100" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Layout;