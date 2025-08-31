import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Trash2, ArrowUpCircle, ArrowDownCircle, Search, CalendarDays } from 'lucide-react';
import EmptyState from './EmptyState';

const TransactionHistory = ({ transactions, deleteTransaction }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Memoize hasil filter agar tidak dihitung ulang setiap kali render
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        // Filter berdasarkan tipe (pemasukan/pengeluaran)
        if (filter !== 'all' && t.type !== filter) return false;
        // Filter berdasarkan pencarian (tidak case-sensitive)
        if (searchTerm && !t.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
      });
  }, [transactions, filter, searchTerm]);

  const FilterButton = ({ type, label }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
        filter === type ? 'bg-blue-500 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Riwayat Transaksi</h1>
            <p className="text-gray-400 mt-1">Lihat dan kelola semua catatan keuanganmu.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-gray-800/80 rounded-full border border-white/10">
          <FilterButton type="all" label="Semua" />
          <FilterButton type="income" label="Pemasukan" />
          <FilterButton type="expense" label="Pengeluaran" />
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Cari berdasarkan kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <AnimatePresence>
          {filteredTransactions.length > 0 ? (
            <motion.ul layout className="divide-y divide-white/10">
              {filteredTransactions.map(t => (
                <motion.li
                  layout
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                  className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                     {t.type === 'income' 
                       ? <ArrowUpCircle className="text-emerald-400" size={28}/> 
                       : <ArrowDownCircle className="text-red-400" size={28}/>
                     }
                     <div>
                       <p className="font-semibold text-white">{t.category}</p>
                       <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
                          <CalendarDays size={14}/>
                          {format(new Date(t.date), 'dd MMMM yyyy', { locale: id })}
                       </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-bold text-lg ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'}Rp {t.amount.toLocaleString('id-ID')}
                    </p>
                    <button onClick={() => deleteTransaction(t.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="p-10">
                <EmptyState 
                    icon={<Search size={32} />}
                    title="Tidak Ada Transaksi"
                    message={searchTerm ? "Tidak ada transaksi yang cocok dengan pencarianmu." : "Catatan transaksimu masih kosong."}
                />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;