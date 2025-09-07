// import React from 'react';
// import { Menu } from 'lucide-react';

// const Header = ({ setIsSidebarOpen }) => {
//   return (
//     <header className="p-4 flex items-center">
//       <button 
//         onClick={() => setIsSidebarOpen(true)}
//         className="p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
//       >
//         <Menu size={24} />
//       </button>
//       {/* Anda bisa menambahkan judul halaman di sini nanti */}
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { Menu, Coins } from 'lucide-react'; // Import ikon Coins

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="p-4 flex items-center justify-between sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      
      {/* Kiri: Tombol Burger & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Buka menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <Coins className="text-blue-400" size={28} />
          <span className="text-xl font-bold text-white tracking-wider">FINS</span>
        </div>
      </div>

      {/* Kanan: (Placeholder untuk fitur masa depan) */}
      <div className="flex items-center gap-4">
        {/* Di sini kamu bisa menambahkan ikon notifikasi, profil pengguna, dll. */}
        {/* Contoh:
        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        */}
      </div>
    </header>
  );
};

export default Header;