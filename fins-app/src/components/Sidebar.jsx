import React from 'react';
import { LayoutDashboard, History, PiggyBank, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // NavLink untuk styling link aktif

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Riwayat Transaksi', icon: <History size={20} />, path: '/history' },
    { name: 'Tujuan Finansial', icon: <PiggyBank size={20} />, path: '/goals' },
    { name: 'Pengaturan', icon: <Settings size={20} />, path: '/settings' },
  ];

  const linkClass = "flex items-center px-4 py-3 text-gray-300 hover:bg-primary/50 hover:text-white rounded-lg transition-colors";
  const activeLinkClass = "bg-secondary/80 text-white font-bold";

  return (
    <aside className="w-64 bg-primary text-white flex flex-col p-4 shadow-2xl">
      <div className="text-2xl font-bold text-white mb-10 p-2">FINS</div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}
          >
            {item.icon}
            <span className="ml-4">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;