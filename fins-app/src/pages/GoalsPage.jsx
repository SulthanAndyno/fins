import React from 'react';
import GoalsDisplay from '../components/GoalsDisplay'; // Kita akan re-use komponen ini

const GoalsPage = ({ goals, addGoal, setGoals }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Tujuan Finansial</h1>
      <p className="mb-8 max-w-2xl">Lacak semua impian finansialmu di sini. Tetapkan target dan lihat progresmu bertumbuh seiring waktu.</p>
      
      {/* Kita akan gunakan komponen yang sudah ada dengan styling baru */}
      <GoalsDisplay goals={goals} addGoal={addGoal} setGoals={setGoals} isPage={true} />
    </motion.div>
  );
};

export default GoalsPage;