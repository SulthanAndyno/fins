// import React from 'react';
// // Hapus import yang tidak perlu seperti BrowserRouter, Toaster, loadState, saveState, dll.
// import { LayoutDashboard, History, PiggyBank, Settings, X } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Sidebar = ({ isOpen, setIsOpen }) => {
//   const navItems = [
//     { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
//     { name: 'Riwayat Transaksi', icon: <History size={20} />, path: '/history' },
//     { name: 'Tujuan Finansial', icon: <PiggyBank size={20} />, path: '/goals' },
//     { name: 'Pengaturan', icon: <Settings size={20} />, path: '/settings' },
//   ];

//   const linkClass = "flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors";
//   const activeLinkClass = "bg-blue-500 text-white font-bold";

//   const sidebarVariants = {
//     hidden: { x: '-100%' },
//     visible: { x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
//   };

//   const backdropVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             onClick={() => setIsOpen(false)}
//             className="fixed inset-0 bg-black/60 z-40"
//           />
//           <motion.aside
//             variants={sidebarVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             className="fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-lg border-r border-white/10 flex flex-col p-4 z-50"
//           >
//             <div className="flex justify-between items-center mb-10">
//               <h1 className="text-2xl font-bold text-white">FINS</h1>
//               <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
//                 <X size={24} />
//               </button>
//             </div>
//             <nav className="flex flex-col space-y-2">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsOpen(false)}
//                   className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}
//                 >
//                   {item.icon}
//                   <span className="ml-4">{item.name}</span>
//                 </NavLink>
//               ))}
//             </nav>
//           </motion.aside>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Sidebar;

import React from 'react';
import { LayoutDashboard, History, PiggyBank, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Tujuan Finansial', icon: <PiggyBank size={20} />, path: '/goals' },
    { name: 'Riwayat Transaksi', icon: <History size={20} />, path: '/history' },
    { name: 'Pengaturan', icon: <Settings size={20} />, path: '/settings' },
  ];

  // --- VARIAN ANIMASI BARU ---
  const sidebarVariants = {
    hidden: { x: '-100%', transition: { type: 'tween', duration: 0.3, ease: 'easeIn' } },
    visible: { x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };
  
  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Jeda antar link
        delayChildren: 0.2, // Jeda sebelum animasi link dimulai
      },
    },
  };

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  // --- STYLING BARU ---
  const linkClass = "flex items-center px-4 py-3 text-gray-400 rounded-lg transition-all duration-200 relative hover:text-white hover:bg-white/10";
  const activeLinkClass = "!text-white bg-blue-600/50 shadow-lg shadow-blue-600/20 border-l-2 border-blue-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-between items-center mb-10"
            >
              <h1 className="text-2xl font-bold text-white tracking-wider">FINS</h1>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
            </motion.div>

            {/* Container untuk animasi stagger */}
            <motion.nav 
              variants={navListVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-2"
            >
              {navItems.map((item) => (
                // Setiap link sekarang punya animasi sendiri
                <motion.div key={item.name} variants={navItemVariants}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}
                  >
                    {item.icon}
                    <span className="ml-4">{item.name}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;