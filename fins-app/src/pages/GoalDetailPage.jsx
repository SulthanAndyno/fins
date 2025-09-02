import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit } from 'lucide-react';

const GoalDetailPage = ({ goals }) => { // Terima 'goals' dari props
  const { goalId } = useParams();
  
  const goal = goals.find(g => g.id === goalId);

  if (!goal) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center text-white">
        <h1 className="text-2xl font-bold">Tujuan Tidak Ditemukan</h1>
        <p className="text-gray-400 mt-2">Mungkin URL salah atau tujuan telah dihapus.</p>
        <Link to="/goals" className="text-blue-400 hover:underline mt-6 inline-flex items-center justify-center gap-2">
          <ArrowLeft size={16} />
          Kembali ke Daftar Tujuan
        </Link>
      </motion.div>
    );
  }
  
  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      <Link to="/goals" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 font-semibold">
        <ArrowLeft size={20} />
        Kembali ke Semua Tujuan
      </Link>
      
      <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">{goal.title}</h1>
                <p className="text-lg text-gray-400">Target: Rp {goal.target.toLocaleString('id-ID')}</p>
            </div>
            <button className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-white/10">
                <Edit size={18} />
            </button>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Progress Saat Ini</h2>
          <p className="text-3xl font-bold text-amber-400 mt-2">Rp {goal.current.toLocaleString('id-ID')}</p>
          
          <div className="w-full bg-gray-700/50 rounded-full h-4 mt-4 border border-white/10">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-right text-sm mt-1 font-semibold text-white">{percentage.toFixed(1)}% Tercapai</p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-white">Riwayat Progres</h2>
            <p className="text-gray-500 mt-2 text-center py-8">Fitur riwayat progres akan segera hadir!</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalDetailPage;