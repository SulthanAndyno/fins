import React, { useState } from 'react';
import { PiggyBank, PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

const GoalsDisplay = ({ goals, addGoal, setGoals, deleteGoal, isPage = false }) => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title || !target || isNaN(target)) return;
    addGoal({ id: uuidv4(), title, target: parseFloat(target), current: 0 });
    setTitle(''); setTarget(''); setShowForm(false);
  };
  
  const handleAddProgress = (id) => {
    const progressAmount = parseFloat(prompt("Masukkan jumlah progress (Rp):", "100000"));
    if (!isNaN(progressAmount) && progressAmount > 0) {
      const updatedGoals = goals.map(g => 
        g.id === id ? { ...g, current: Math.min(g.current + progressAmount, g.target) } : g
      );
      setGoals(updatedGoals);
      toast.success('Progress berhasil ditambahkan!');
    }
  };

  const handleDeleteGoal = (id, goalTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tujuan "${goalTitle}"?`)) {
      deleteGoal(id);
    }
  };
  
  const inputStyle = "w-full p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";

  // Gunakan styling yang sedikit berbeda jika ini adalah halaman penuh
  const cardStyle = isPage 
    ? "bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6" 
    : "bg-transparent"; // Di dashboard, buat lebih simpel

  return (
    <div className={cardStyle}>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <PiggyBank className="mr-3 text-amber-400" /> Tujuan Finansial
      </h3>
      <div className="space-y-6">
        {goals.map(goal => {
          const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
          return (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-200">{goal.title}</span>
                <div>
                  <button onClick={() => handleAddProgress(goal.id)} className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full hover:bg-emerald-600 transition-colors mr-2">
                    + Progress
                  </button>
                  <button onClick={() => handleDeleteGoal(goal.id, goal.title)} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Rp {goal.current.toLocaleString('id-ID')} / {goal.target.toLocaleString('id-ID')}
              </p>
              <div className="w-full bg-gray-700/50 rounded-full h-2.5 mt-2 border border-white/10">
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
            <p className="text-center text-gray-500 py-4">Belum ada tujuan yang ditetapkan.</p>
        )}
      </div>
      
      <button onClick={() => setShowForm(!showForm)} className="mt-6 text-blue-400 hover:text-blue-300 flex items-center text-sm font-semibold transition-colors">
        <PlusCircle size={16} className="mr-2" /> {showForm ? 'Batal' : 'Tambah Tujuan Baru'}
      </button>

      {showForm && (
        <form onSubmit={handleAddGoal} className="mt-4 border-t border-white/10 pt-4 space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nama Tujuan (e.g., Beli Motor)" className={inputStyle} required />
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target (Rp)" className={inputStyle} required />
          <button type="submit" className="w-full bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105">Simpan Tujuan</button>
        </form>
      )}
    </div>
  );
};

export default GoalsDisplay;