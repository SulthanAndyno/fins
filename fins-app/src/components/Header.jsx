import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="p-4 flex items-center">
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
      >
        <Menu size={24} />
      </button>
      {/* Anda bisa menambahkan judul halaman di sini nanti */}
    </header>
  );
};

export default Header;