import React, { useState, useEffect } from 'react';
import { Trash2, Sun, Moon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleResetData = () => {
    if (window.confirm('APAKAH ANDA YAKIN? Semua data transaksi, budget, dan tujuan akan dihapus permanen!')) {
      localStorage.clear();
      toast.success('Semua data berhasil direset.');
      // Simpan tema lagi karena localStorage.clear() menghapus semuanya
      localStorage.setItem('theme', theme); 
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-3xl font-bold text-white mb-8">Pengaturan</h1>

      <div className="space-y-8 max-w-2xl">
        {/* Pengaturan Tampilan */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Tampilan</h2>
          <div className="flex items-center justify-between">
            <p>Mode Tampilan</p>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>

        {/* Pengaturan Data */}
        <div className="bg-red-900/30 p-6 rounded-lg border border-red-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">Zona Berbahaya</h2>
          <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-white">Reset Semua Data</p>
                <p className="text-sm text-gray-400">Aksi ini tidak bisa dibatalkan.</p>
            </div>
            <button
              onClick={handleResetData}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              <Trash2 size={20} />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;