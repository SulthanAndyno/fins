import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast'; // Import toast untuk validasi

const TransactionForm = ({ addTransaction, categories }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    // Penjagaan jika 'categories' belum siap
    if (categories) {
      if (type === 'expense' && categories.expense.length > 0) {
        setCategory(categories.expense[0]);
      } else if (type === 'income' && categories.income.length > 0) {
        setCategory(categories.income[0]);
      } else {
        setCategory('');
      }
    }
  }, [type, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !category || !date) {
      toast.error("Harap isi semua kolom dengan benar.");
      return;
    }
    addTransaction({ id: uuidv4(), amount: parseFloat(amount), category, type, date });
    setAmount('');
  };

  const inputStyle = "w-full p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-2";
  const buttonBaseStyle = "w-1/2 p-2 rounded-md font-semibold transition-colors";

  // Penjaga jika 'categories' masih null
  if (!categories) {
    return <div className="bg-gray-800/50 p-6 rounded-xl text-center text-gray-400">Memuat form...</div>;
  }

  return (
    // --- PERBAIKAN DI SINI: Tambahkan class 'h-full' ---
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-6">Tambah Transaksi Baru</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelStyle}>Tipe</label>
          <div className="flex bg-gray-700/50 rounded-lg p-1 border border-white/10">
            <button type="button" onClick={() => setType('expense')} className={`${buttonBaseStyle} ${type === 'expense' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>Pengeluaran</button>
            <button type="button" onClick={() => setType('income')} className={`${buttonBaseStyle} ${type === 'income' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}>Pemasukan</button>
          </div>
        </div>
        <div>
          <label htmlFor="amount" className={labelStyle}>Jumlah (Rp)</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputStyle} placeholder="e.g., 50000" required />
        </div>
        <div>
          <label htmlFor="category" className={labelStyle}>Kategori</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputStyle} disabled={!categories[type] || categories[type].length === 0}>
            {(categories[type] || []).map(cat => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelStyle}>Tanggal</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputStyle} required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500">
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;