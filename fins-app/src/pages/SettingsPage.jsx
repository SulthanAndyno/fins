// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Trash2, Edit, PlusCircle, Save, LogOut } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import { supabase } from '../supabaseClient';

// const CategoryManager = ({ title, type, categories, setCategories }) => {
//   const [newCategory, setNewCategory] = useState('');
//   const [editing, setEditing] = useState({ id: null, text: '' });

//   const handleAdd = () => {
//     if (!newCategory.trim()) return toast.error("Nama kategori tidak boleh kosong.");
//     if (categories[type].includes(newCategory.trim())) return toast.error("Kategori sudah ada.");
//     const updatedCategories = { ...categories, [type]: [...categories[type], newCategory.trim()] };
//     setCategories(updatedCategories);
//     setNewCategory('');
//     toast.success(`Kategori "${newCategory.trim()}" ditambahkan!`);
//   };
//   const handleDelete = (categoryToDelete) => {
//     if (categories[type].length <= 1) return toast.error("Harus ada minimal satu kategori tersisa.");
//     const updatedCategories = { ...categories, [type]: categories[type].filter(cat => cat !== categoryToDelete) };
//     setCategories(updatedCategories);
//     toast.error(`Kategori "${categoryToDelete}" dihapus.`);
//   };
//   const handleUpdate = () => {
//     if (!editing.text.trim()) return toast.error("Nama kategori tidak boleh kosong.");
//     const updatedCategories = { ...categories, [type]: categories[type].map(cat => (cat === editing.id ? editing.text.trim() : cat)) };
//     setCategories(updatedCategories);
//     setEditing({ id: null, text: '' });
//     toast.success(`Kategori berhasil diupdate!`);
//   };
  
//   return (
//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
//       <div className="space-y-2">
//         {categories[type].map(cat => (
//           <div key={cat} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
//             {editing.id === cat ? (
//               <input type="text" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="bg-transparent text-white focus:outline-none w-full" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}/>
//             ) : ( <span className="text-gray-300">{cat}</span> )}
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
//         <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Nama kategori baru..." className="flex-grow p-2 bg-gray-700/50 border border-white/10 rounded-md text-white placeholder-gray-500"/>
//         <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"><PlusCircle size={20}/></button>
//       </div>
//     </div>
//   );
// };


// const SettingsPage = ({ categories, updateCategories, user }) => {
//   const handleResetData = () => toast.error("Fitur reset data belum diaktifkan demi keamanan.");
//   const handleLogout = async () => {
//     toast('Sampai jumpa lagi!', { icon: '👋' });
//     await supabase.auth.signOut();
//   };

//   if (!categories) {
//     return <div className="p-8 text-center text-white">Memuat pengaturan...</div>;
//   }

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold text-white mb-2">Pengaturan</h1>
//       {user && <p className="text-center text-gray-400 mb-8">Login sebagai: <span className="font-semibold text-white">{user.email}</span></p>}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-8">
//           <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
//             <h2 className="text-xl font-semibold text-white mb-4">Akun</h2>
//             <div className="flex items-center justify-between">
//               <p>Keluar dari sesi saat ini</p>
//               <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg font-semibold text-white hover:bg-gray-700"><LogOut size={20} /><span>Logout</span></button>
//             </div>
//           </div>
//           <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
//             <h2 className="text-xl font-semibold text-white mb-4">Manajemen Data</h2>
//             <div className="flex items-center justify-between">
//               <p>Reset Semua Data</p>
//               <button onClick={handleResetData} className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700"><Trash2 size={20} /><span>Reset Data</span></button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
//           <h2 className="text-xl font-semibold text-white mb-6">Manajemen Kategori</h2>
//           <div className="space-y-6">
//             <CategoryManager title="Kategori Pengeluaran" type="expense" categories={categories} setCategories={updateCategories} />
//             <CategoryManager title="Kategori Pemasukan" type="income" categories={categories} setCategories={updateCategories} />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default SettingsPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, PlusCircle, Save, LogOut, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../supabaseClient';
import Modal from '../components/Modal'; // Pastikan Modal di-import

// Komponen CategoryManager tidak berubah, jadi kita masukkan di sini
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
              <input type="text" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="bg-transparent text-white focus:outline-none w-full" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}/>
            ) : ( <span className="text-gray-300">{cat}</span> )}
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
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Nama kategori baru..." className="flex-grow p-2 bg-gray-700/50 border border-white/10 rounded-md text-white placeholder-gray-500"/>
        <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"><PlusCircle size={20}/></button>
      </div>
    </div>
  );
};


const SettingsPage = ({ categories, updateCategories, user }) => {
  // --- STATE BARU UNTUK MODAL & KONTROL TOMBOL ---
  const [isResetting, setIsResetting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // --- FUNGSI BARU UNTUK MENANGANI KONFIRMASI RESET ---
  const handleConfirmReset = async () => {
    setIsConfirmModalOpen(false);
    setIsResetting(true);
    
    const { error } = await supabase.rpc('reset_user_data');
    
    if (error) {
      toast.error('Gagal mereset data. Coba lagi.');
      console.error("Reset error:", error);
    } else {
      toast.success('Semua data berhasil direset!');
      setTimeout(() => window.location.reload(), 2000);
    }
    setIsResetting(false);
  };

  const handleLogout = async () => {
    toast('Sampai jumpa lagi!', { icon: '👋' });
    await supabase.auth.signOut();
  };

  if (!categories) {
    return <div className="p-8 text-center text-white">Memuat pengaturan...</div>;
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pengaturan</h1>
        {user && <p className="text-center text-gray-400 mb-8">Login sebagai: <span className="font-semibold text-white">{user.email}</span></p>}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Akun</h2>
              <div className="flex items-center justify-between">
                <p>Keluar dari sesi saat ini</p>
                <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg font-semibold text-white hover:bg-gray-700"><LogOut size={20} /><span>Logout</span></button>
              </div>
            </div>
            <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
              <h2 className="text-xl font-semibold text-white mb-4">Manajemen Data</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Reset Semua Data</p>
                  <p className="text-sm text-gray-400">Kembalikan akun ke kondisi awal.</p>
                </div>
                {/* Tombol ini sekarang membuka modal */}
                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  disabled={isResetting}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700 disabled:bg-red-800/50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={20} />
                  <span>{isResetting ? 'Mereset...' : 'Reset Data'}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Manajemen Kategori</h2>
            <div className="space-y-6">
              <CategoryManager title="Kategori Pengeluaran" type="expense" categories={categories} setCategories={updateCategories} />
              <CategoryManager title="Kategori Pemasukan" type="income" categories={categories} setCategories={updateCategories} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL KONFIRMASI --- */}
      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        title="Konfirmasi Aksi Berbahaya"
        maxWidth="max-w-lg"
      >
        <div className="text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-lg font-bold text-white">Apakah Anda Benar-benar Yakin?</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-400">
              Aksi ini akan **menghapus semua data transaksi dan tujuan** Anda secara permanen. Data yang sudah dihapus tidak dapat dikembalikan.
            </p>
          </div>
          <div className="items-center px-4 py-3 mt-4 flex gap-4">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Batalkan
            </button>
            <button
              onClick={handleConfirmReset}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Ya, Hapus Semuanya
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsPage;