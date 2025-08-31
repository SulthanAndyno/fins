import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // `npm install uuid`

const TransactionForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !category || !date) return;

    const newTransaction = {
      id: uuidv4(),
      amount: parseFloat(amount),
      category,
      type,
      date,
    };
    addTransaction(newTransaction);
    setAmount('');
  };

  const expenseCategories = ['Makanan', 'Transportasi', 'Hiburan', 'Tagihan', 'Belanja', 'Lainnya'];
  const incomeCategories = ['Gaji', 'Bonus', 'Freelance', 'Hadiah', 'Lainnya'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-text-dark mb-4">Tambah Transaksi Baru</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Tipe</label>
          <div className="flex">
            <button type="button" onClick={() => setType('expense')} className={`w-1/2 p-2 rounded-l-md ${type === 'expense' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Pengeluaran</button>
            <button type="button" onClick={() => setType('income')} className={`w-1/2 p-2 rounded-r-md ${type === 'income' ? 'bg-secondary text-white' : 'bg-gray-200'}`}>Pemasukan</button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">Jumlah (Rp)</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., 50000" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md">
            {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">Tanggal</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-primary text-white p-2 rounded-md hover:bg-opacity-90 transition-colors">
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;