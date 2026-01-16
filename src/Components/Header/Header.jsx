import React from 'react';

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-rose-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 bg-rose-100 rounded-xl group-hover:rotate-6 transition-transform duration-300">
              <span className="text-xl">💞</span>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent leading-none">
                SoulConnect AI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                Deep Connection
              </span>
            </div>
          </div>

          {/* Navigation Links - Centered (Optional/Hidden on Mobile) */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-rose-500 transition-colors">How it Works</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Safety</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Success Stories</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-rose-500 transition-colors px-4 py-2">
              Log in
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-rose-200 transition-all active:scale-95">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;