import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// --- TERIMA PROPS BARU: 'categories' ---
const TransactionForm = ({ addTransaction, categories }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(''); // Default dikosongkan dulu
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // --- LOGIKA BARU: OTOMATIS SET KATEGORI PERTAMA SAAT TIPE BERUBAH ---
  useEffect(() => {
    // Saat tipe transaksi berubah (misal dari pengeluaran ke pemasukan),
    // otomatis set state 'category' ke pilihan pertama yang tersedia.
    // Ini mencegah bug di mana kategori lama yang tidak valid tetap terpilih.
    if (type === 'expense' && categories.expense.length > 0) {
      setCategory(categories.expense[0]);
    } else if (type === 'income' && categories.income.length > 0) {
      setCategory(categories.income[0]);
    } else {
      setCategory(''); // Kosongkan jika tidak ada kategori tersedia
    }
  }, [type, categories]); // Jalankan efek ini setiap kali 'type' atau 'categories' berubah

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !category || !date) return;
    addTransaction({ id: uuidv4(), amount: parseFloat(amount), category, type, date });
    setAmount('');
  };

  // --- HAPUS DAFTAR KATEGORI HARDCODED ---
  // const expenseCategories = ['Makanan', ...];
  // const incomeCategories = ['Gaji', ...];

  // --- STYLING KEREN DARI KAMU (TETAP SAMA) ---
  const inputStyle = "w-full p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-2";
  const buttonBaseStyle = "w-1/2 p-2 rounded-md font-semibold transition-colors";

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
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
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputStyle} disabled={type === 'expense' ? !categories.expense.length : !categories.income.length}>
            {/* --- GUNAKAN KATEGORI DINAMIS DARI PROPS --- */}
            {(type === 'expense' ? categories.expense : categories.income).map(cat => (
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