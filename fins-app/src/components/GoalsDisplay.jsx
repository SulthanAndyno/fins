import React, { useState } from 'react';
import { PiggyBank, PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

// Terima props yang benar dari App.jsx, termasuk 'updateGoalProgress'
const GoalsDisplay = ({ goals, addGoal, deleteGoal, updateGoalProgress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [progressAmount, setProgressAmount] = useState('');
  
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const openProgressModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeProgressModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
    setProgressAmount('');
  };

  const handleAddProgress = (e) => {
    e.preventDefault();
    const amount = parseFloat(progressAmount);
    if (isNaN(amount) || amount <= 0) {
      return toast.error('Masukkan jumlah yang valid.');
    }
    // Panggil fungsi cerdas dari props App.jsx
    updateGoalProgress(selectedGoal, amount); 
    closeProgressModal();
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title.trim() || !target || isNaN(target)) return;
    addGoal({ id: uuidv4(), title: title.trim(), target: parseFloat(target), current: 0 });
    setTitle(''); setTarget(''); setShowForm(false);
  };

  const handleDeleteGoal = (id, goalTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tujuan "${goalTitle}"?`)) {
      deleteGoal(id);
    }
  };
  
  const inputStyle = "w-full p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
  
  // "Penjaga" untuk mencegah error saat 'goals' belum dimuat
  if (!goals) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center text-gray-400">
        Memuat tujuan...
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <PiggyBank className="mr-3 text-amber-400" /> Kelola Tujuan Finansial
        </h3>

        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-200">{goal.title}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openProgressModal(goal)} className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full hover:bg-emerald-600 transition-colors">
                    + Progress
                  </button>
                  <button onClick={() => handleDeleteGoal(goal.id, goal.title)} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Rp {goal.current.toLocaleString('id-ID')} / {goal.target.toLocaleString('id-ID')}
              </p>
            </div>
          ))}
          {goals.length === 0 && (
              <p className="text-center text-gray-500 py-4">Kamu belum punya tujuan. Ayo buat satu!</p>
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

      <Modal isOpen={isModalOpen} onClose={closeProgressModal} title={`Tambah Progress untuk "${selectedGoal?.title}"`}>
        <form onSubmit={handleAddProgress} className="space-y-4">
          <div>
            <label htmlFor="progressAmount" className="block text-sm font-medium text-gray-300 mb-2">
              Jumlah Progress (Rp)
            </label>
            <input
              type="number"
              id="progressAmount"
              value={progressAmount}
              onChange={(e) => setProgressAmount(e.target.value)}
              className={inputStyle}
              placeholder="e.g., 100000"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Simpan Progress
          </button>
        </form>
      </Modal>
    </>
  );
};

export default GoalsDisplay;