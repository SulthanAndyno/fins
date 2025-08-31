import React from 'react';
// Hapus import yang tidak perlu seperti BrowserRouter, Toaster, loadState, saveState, dll.
import { LayoutDashboard, History, PiggyBank, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Riwayat Transaksi', icon: <History size={20} />, path: '/history' },
    { name: 'Tujuan Finansial', icon: <PiggyBank size={20} />, path: '/goals' },
    { name: 'Pengaturan', icon: <Settings size={20} />, path: '/settings' },
  ];

  const linkClass = "flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors";
  const activeLinkClass = "bg-blue-500 text-white font-bold";

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-lg border-r border-white/10 flex flex-col p-4 z-50"
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-2xl font-bold text-white">FINS</h1>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}
                >
                  {item.icon}
                  <span className="ml-4">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;