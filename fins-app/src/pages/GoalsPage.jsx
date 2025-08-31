import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // Tambahkan ResponsiveContainer
import GoalsDisplay from '../components/GoalsDisplay'; // Kita akan panggil GoalsDisplay untuk form-nya

// --- Fungsi helper DIPINDAHKAN ke luar komponen agar lebih bersih ---
const calculateProjection = (goal, transactions) => {
    // Penjagaan: Jika transactions belum ada, jangan lakukan apa-apa
    if (!transactions || !Array.isArray(transactions)) {
        return "Menganalisis data...";
    }

    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const incomes = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const monthlySavings = incomes - expenses; // Asumsi data adalah per bulan

    if (monthlySavings <= 0) {
        return "Perbaiki cash flow untuk melanjutkan progres.";
    }

    const remainingAmount = goal.target - goal.current;
    if (remainingAmount <= 0) {
        return "Selamat, tujuan tercapai!";
    }
    
    const monthsNeeded = Math.ceil(remainingAmount / monthlySavings);
    return `Estimasi tercapai dalam ${monthsNeeded} bulan.`;
};


// Komponen Kartu yang sudah diperbaiki
const GoalCard = ({ goal, projection }) => {
    const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
    const pieData = [
        { name: 'Progress', value: percentage },
        { name: 'Remaining', value: 100 - percentage },
    ];
    
    return (
        <motion.div 
            className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                        <p className="text-sm text-gray-400">Target: Rp {goal.target.toLocaleString('id-ID')}</p>
                    </div>
                    <div style={{ width: 80, height: 80 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={25} outerRadius={35} paddingAngle={2} startAngle={90} endAngle={450}>
                                    <Cell fill="#F59E0B" />
                                    <Cell fill="#4B5563" />
                                </Pie>
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="14">{`${Math.round(percentage)}%`}</text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <p className="text-lg font-semibold text-white mt-2">Rp {goal.current.toLocaleString('id-ID')}</p>
            </div>
            <p className="text-xs text-blue-400 mt-3 italic">{projection}</p>
        </motion.div>
    );
};


// --- Komponen UTAMA GoalsPage yang sudah dirapikan ---
const GoalsPage = ({ goals, addGoal, setGoals, deleteGoal, transactions }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Pusat Impian Finansial</h1>
      
      {/* Grid Kartu Tujuan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {goals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                // Pastikan 'transactions' diteruskan ke fungsi kalkulasi
                projection={calculateProjection(goal, transactions)} 
              />
          ))}
          {goals.length === 0 && (
              <p className="text-gray-500 md:col-span-2 lg:col-span-3 text-center py-10">Kamu belum punya tujuan. Ayo buat satu!</p>
          )}
      </div>

      {/* Komponen form tetap di bawah, sekarang terpisah dengan jelas */}
      <div className="max-w-xl">
        <GoalsDisplay 
            goals={goals} 
            addGoal={addGoal} 
            setGoals={setGoals} 
            deleteGoal={deleteGoal} 
            isPage={true} 
        />
      </div>
    </motion.div>
  );
};

export default GoalsPage;