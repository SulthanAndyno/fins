// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Trash2, Sun, Moon, Edit, PlusCircle, Save } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const CategoryManager = ({ title, type, categories, setCategories }) => {
//   // ... (kode lengkap CategoryManager dari sebelumnya)
//   const [newCategory, setNewCategory] = useState('');
//   const [editing, setEditing] = useState({ id: null, text: '' });

//   const handleAdd = () => { /* ... */ };
//   const handleDelete = (categoryToDelete) => { /* ... */ };
//   const handleUpdate = () => { /* ... */ };
  
//   return (
//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
//       <div className="space-y-2">
//         {categories[type].map(cat => (
//           <div key={cat} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
//             {editing.id === cat ? (
//               <input type="text" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="bg-transparent text-white focus:outline-none w-full" autoFocus/>
//             ) : (
//               <span>{cat}</span>
//             )}
//             <div className="flex items-center gap-2">
//               {editing.id === cat ? (
//                 <button onClick={handleUpdate} className="text-emerald-400 hover:text-emerald-300"><Save size={16}/></button>
//               ) : (
//                 <button onClick={() => setEditing({ id: cat, text: cat })} className="text-blue-400 hover:text-blue-300"><Edit size={16}/></button>
//               )}
//               <button onClick={() => handleDelete(cat)} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2 mt-3">
//         <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nama kategori baru..." className="flex-grow p-2 bg-gray-700/50 border border-white/10 rounded-md text-white placeholder-gray-500"/>
//         <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"><PlusCircle size={20}/></button>
//       </div>
//     </div>
//   );
// };


// const SettingsPage = ({ categories, setCategories, defaultCategories }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove(theme === 'dark' ? 'light' : 'dark');
//     root.classList.add(theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const handleResetData = () => {
//     if (window.confirm('APAKAH ANDA YAKIN? Semua data akan dihapus permanen!')) {
//       localStorage.clear();
//       toast.success('Semua data berhasil direset.');
//       localStorage.setItem('theme', theme);
//       setTimeout(() => window.location.reload(), 1500);
//     }
//   };

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold text-white mb-8">Pengaturan</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-8">
//           <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
//             <h2 className="text-xl font-semibold text-white mb-4">Tampilan</h2>
//             <div className="flex items-center justify-between">
//               <p>Mode Tampilan</p>
//               <button onClick={toggleTheme} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600">
//                 {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//                 <span>Ganti ke {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
//               </button>
//             </div>
//           </div>
//           <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
//             <h2 className="text-xl font-semibold text-white mb-4">Zona Berbahaya</h2>
//             <div className="flex items-center justify-between">
//               <div>
//                   <p>Reset Semua Data</p>
//                   <p className="text-sm text-gray-400">Aksi ini tidak bisa dibatalkan.</p>
//               </div>
//               <button onClick={handleResetData} className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700">
//                 <Trash2 size={20} />
//                 <span>Reset Data</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
//           <h2 className="text-xl font-semibold text-white mb-6">Manajemen Kategori</h2>
//           <div className="space-y-6">
//             <CategoryManager title="Kategori Pengeluaran" type="expense" categories={categories} setCategories={setCategories} />
//             <CategoryManager title="Kategori Pemasukan" type="income" categories={categories} setCategories={setCategories} />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default SettingsPage;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Trash2, Edit, PlusCircle, Save } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// // Komponen CategoryManager tetap sama, karena fungsinya tidak berubah
// const CategoryManager = ({ title, type, categories, setCategories }) => {
//   const [newCategory, setNewCategory] = useState('');
//   const [editing, setEditing] = useState({ id: null, text: '' });

//   const handleAdd = () => {
//     if (newCategory && !categories[type].includes(newCategory)) {
//       setCategories(prev => ({ ...prev, [type]: [...prev[type], newCategory] }));
//       setNewCategory('');
//       toast.success(`Kategori "${newCategory}" ditambahkan!`);
//     } else if (!newCategory) {
//       toast.error("Nama kategori tidak boleh kosong.");
//     } else {
//       toast.error("Kategori sudah ada.");
//     }
//   };

//   const handleDelete = (categoryToDelete) => {
//     if (categories[type].length > 1) {
//       setCategories(prev => ({
//         ...prev,
//         [type]: prev[type].filter(cat => cat !== categoryToDelete),
//       }));
//       toast.error(`Kategori "${categoryToDelete}" dihapus.`);
//     } else {
//       toast.error("Harus ada minimal satu kategori tersisa.");
//     }
//   };

//   const handleUpdate = () => {
//     setCategories(prev => ({
//       ...prev,
//       [type]: prev[type].map(cat => (cat === editing.id ? editing.text : cat)),
//     }));
//     toast.success(`Kategori berhasil diupdate!`);
//     setEditing({ id: null, text: '' });
//   };
  
//   return (
//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
//       <div className="space-y-2">
//         {categories[type].map(cat => (
//           <div key={cat} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
//             {editing.id === cat ? (
//               <input type="text" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="bg-transparent text-white focus:outline-none w-full" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}/>
//             ) : (
//               <span className="text-gray-300">{cat}</span>
//             )}
//             <div className="flex items-center gap-2">
//               {editing.id === cat ? (
//                 <button onClick={handleUpdate} className="text-emerald-400 hover:text-emerald-300"><Save size={16}/></button>
//               ) : (
//                 <button onClick={() => setEditing({ id: cat, text: cat })} className="text-blue-400 hover:text-blue-300"><Edit size={16}/></button>
//               )}
//               <button onClick={() => handleDelete(cat)} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2 mt-3">
//         <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Nama kategori baru..." className="flex-grow p-2 bg-gray-700/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-500"/>
//         <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"><PlusCircle size={20}/></button>
//       </div>
//     </div>
//   );
// };


// // Komponen utama SettingsPage yang sudah bersih
// const SettingsPage = ({ categories, setCategories }) => {

//   const handleResetData = () => {
//     // Kita tidak perlu menyimpan tema lagi, karena sudah permanen
//     if (window.confirm('APAKAH ANDA YAKIN? Semua data transaksi, budget, dan tujuan akan dihapus permanen!')) {
//       localStorage.clear();
//       toast.success('Semua data berhasil direset.');
//       setTimeout(() => window.location.reload(), 1500);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold text-white mb-8">Pengaturan</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Kolom kiri sekarang hanya berisi Zona Berbahaya */}
//         <div className="space-y-8">
//           <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
//             <h2 className="text-xl font-semibold text-white mb-4">Manajemen Data</h2>
//             <div className="flex items-center justify-between">
//               <div>
//                   <p className="text-white font-medium">Reset Semua Data</p>
//                   <p className="text-sm text-gray-400">Semua data akan kembali ke awal. Aksi ini tidak bisa dibatalkan.</p>
//               </div>
//               <button onClick={handleResetData} className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700">
//                 <Trash2 size={20} />
//                 <span>Reset Data</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Kolom kanan tetap berisi Manajemen Kategori */}
//         <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
//           <h2 className="text-xl font-semibold text-white mb-6">Manajemen Kategori</h2>
//           <div className="space-y-6">
//             <CategoryManager title="Kategori Pengeluaran" type="expense" categories={categories} setCategories={setCategories} />
//             <CategoryManager title="Kategori Pemasukan" type="income" categories={categories} setCategories={setCategories} />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default SettingsPage;

import React, { useState } from 'react';
import { Trash2, Edit, PlusCircle, Save, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../supabaseClient';

// --- KOMPONEN CATEGORY MANAGER DENGAN JSX LENGKAP ---
const CategoryManager = ({ title, type, categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editing, setEditing] = useState({ id: null, text: '' });

  const handleAdd = () => {
    if (!newCategory.trim()) return toast.error("Nama kategori tidak boleh kosong.");
    if (categories[type].includes(newCategory.trim())) return toast.error("Kategori sudah ada.");
    
    const updatedCategories = { ...categories, [type]: [...categories[type], newCategory.trim()] };
    setCategories(updatedCategories);
    setNewCategory('');
    toast.success(`Kategori "${newCategory.trim()}" ditambahkan!`);
  };

  const handleDelete = (categoryToDelete) => {
    if (categories[type].length <= 1) return toast.error("Harus ada minimal satu kategori tersisa.");
    
    const updatedCategories = { ...categories, [type]: categories[type].filter(cat => cat !== categoryToDelete) };
    setCategories(updatedCategories);
    toast.error(`Kategori "${categoryToDelete}" dihapus.`);
  };

  const handleUpdate = () => {
    if (!editing.text.trim()) return toast.error("Nama kategori tidak boleh kosong.");
    
    const updatedCategories = { ...categories, [type]: categories[type].map(cat => (cat === editing.id ? editing.text.trim() : cat)) };
    setCategories(updatedCategories);
    setEditing({ id: null, text: '' });
    toast.success(`Kategori berhasil diupdate!`);
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="space-y-2">
        {categories[type].map(cat => (
          <div key={cat} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
            {editing.id === cat ? (
              <input 
                type="text" 
                value={editing.text} 
                onChange={(e) => setEditing({ ...editing, text: e.target.value })} 
                className="bg-transparent text-white focus:outline-none w-full" 
                autoFocus 
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              />
            ) : (
              <span className="text-gray-300">{cat}</span>
            )}
            <div className="flex items-center gap-2">
              {editing.id === cat ? (
                <button onClick={handleUpdate} className="text-emerald-400 hover:text-emerald-300"><Save size={16}/></button>
              ) : (
                <button onClick={() => setEditing({ id: cat, text: cat })} className="text-blue-400 hover:text-blue-300"><Edit size={16}/></button>
              )}
              <button onClick={() => handleDelete(cat)} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <input 
          type="text" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nama kategori baru..." 
          className="flex-grow p-2 bg-gray-700/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-500"
        />
        <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"><PlusCircle size={20}/></button>
      </div>
    </div>
  );
};


const SettingsPage = ({ categories, setCategories, user }) => {

  const handleResetData = () => {
    toast.error("Fitur reset data belum diaktifkan demi keamanan.");
  };

  const handleLogout = async () => {
    toast('Sampai jumpa lagi!', { icon: '👋' });
    await supabase.auth.signOut();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Pengaturan</h1>
      {user && <p className="text-center text-gray-400 mb-8">Login sebagai: <span className="font-semibold text-white">{user.email}</span></p>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Akun</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Keluar dari sesi saat ini</p>
              <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg font-semibold text-white hover:bg-gray-700">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
            <h2 className="text-xl font-semibold text-white mb-4">Manajemen Data</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Reset Semua Data</p>
                <p className="text-sm text-gray-400">Menghapus semua data transaksi, budget, dan tujuan.</p>
              </div>
              <button onClick={handleResetData} className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700">
                <Trash2 size={20} />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Manajemen Kategori</h2>
          <div className="space-y-6">
            <CategoryManager title="Kategori Pengeluaran" type="expense" categories={categories} setCategories={setCategories} />
            <CategoryManager title="Kategori Pemasukan" type="income" categories={categories} setCategories={setCategories} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;