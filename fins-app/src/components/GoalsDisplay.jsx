// src/components/GoalsDisplay.jsx

import React, { useState } from 'react';
import { PiggyBank, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Hapus `totalIncome` dari sini
const GoalsDisplay = ({ goals, addGoal, setGoals }) => { 
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title || !target || isNaN(target)) return;
    addGoal({
      id: uuidv4(),
      title,
      target: parseFloat(target),
      current: 0,
    });
    setTitle('');
    setTarget('');
    setShowForm(false);
  };
  
  // Hapus `amount` dari sini
  const handleAddProgress = (id) => { 
    const progressAmount = parseFloat(prompt("Masukkan jumlah progress (Rp):", "100000"));
    if (!isNaN(progressAmount) && progressAmount > 0) {
      const updatedGoals = goals.map(g => 
        g.id === id ? { ...g, current: g.current + progressAmount } : g
      );
      setGoals(updatedGoals);
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-text-dark mb-4 flex items-center">
        <PiggyBank className="mr-2 text-alert" /> Tujuan Finansial
      </h3>
      <div className="space-y-4">
        {goals.map(goal => {
          const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
          return (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{goal.title}</span>
                <button 
                  onClick={() => handleAddProgress(goal.id)} // `amount` juga dihapus dari pemanggilan
                  className="text-xs bg-secondary text-white px-2 py-1 rounded-full hover:bg-opacity-80"
                >
                  + Tambah Progress
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Rp {goal.current.toLocaleString('id-ID')} / {goal.target.toLocaleString('id-ID')}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div 
                  className="bg-alert h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={() => setShowForm(!showForm)} className="mt-4 text-accent-blue flex items-center text-sm font-medium">
        <PlusCircle size={16} className="mr-1" /> {showForm ? 'Batal' : 'Tambah Tujuan Baru'}
      </button>

      {showForm && (
        <form onSubmit={handleAddGoal} className="mt-4 border-t pt-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nama Tujuan (e.g., Beli Motor)" className="w-full p-2 border rounded-md mb-2" required />
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target (Rp)" className="w-full p-2 border rounded-md mb-2" required />
          <button type="submit" className="w-full bg-primary text-white p-2 rounded-md">Simpan Tujuan</button>
        </form>
      )}
    </div>
  );
};

export default GoalsDisplay;