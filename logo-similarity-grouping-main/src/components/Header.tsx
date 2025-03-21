
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-br from-primary to-accent w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5 text-white"
          >
            <path d="M17.5 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 0L8 17.5m9.5-9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 0L8 3.5m0 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Logo Similarity</h1>
          <div className="h-0.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full mt-0.5"></div>
        </div>
      </div>
      <nav>
        <ul className="flex items-center space-x-6">
          <li>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <button
              className="text-sm bg-gradient-to-r from-primary/80 to-accent/80 text-white hover:from-primary hover:to-accent px-4 py-2 rounded-full transition-all shadow-sm hover:shadow"
            >
              Documentation
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
