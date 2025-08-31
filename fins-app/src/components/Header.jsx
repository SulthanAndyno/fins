import React from 'react';
import { Coins } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-white p-4 flex items-center shadow-md">
      <Coins className="text-accent-gold mr-3" size={32} />
      <h1 className="text-2xl font-bold">FINS – Financial Insight</h1>
    </header>
  );
};

export default Header;