
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* High-Quality Toy Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558060370-d644479cb975?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Decorative Overlays for Readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-white/40 via-blue-50/20 to-purple-50/30 backdrop-blur-[3px] pointer-events-none" />
      
      {/* Animated Floating Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Layout;
