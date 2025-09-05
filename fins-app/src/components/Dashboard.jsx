// import React from 'react';
// import { motion } from 'framer-motion';
// import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
// import TransactionForm from './TransactionForm';
// import Charts from './Charts';
// import AISummary from './AISummary';
// import GoalsDisplay from './GoalsDisplay';
// import BudgetDisplay from './BudgetDisplay';

// const InfoCard = ({ title, amount, icon, iconBgColor }) => (
//     <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center transition-all duration-300 hover:border-white/20 hover:bg-white/10 transform hover:-translate-y-1">
//         <div className={`p-3 rounded-full mr-4 ${iconBgColor}`}>{icon}</div>
//         <div>
//             <p className="text-sm text-gray-400 font-medium">{title}</p>
//             <p className="text-2xl font-bold text-white">Rp {amount.toLocaleString('id-ID')}</p>
//         </div>
//     </div>
// );

// // --- SEMUA PROPS YANG DIBUTUHKAN SUDAH DITERIMA DI SINI ---
// const Dashboard = ({ 
//   transactions, 
//   addTransaction, 
//   budget, 
//   setBudget, 
//   goals, 
//   addGoal, 
//   setGoals, 
//   deleteGoal,
//   categories // <-- PROPS PENTING SUDAH DITERIMA
// }) => {
//     const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
//     const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
//     const balance = totalIncome - totalExpense;

//     const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
//     const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

//     return (
//         <motion.div className="p-4 sm:p-6 lg:p-8" initial="hidden" animate="visible" variants={containerVariants}>
//             <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-8">Dashboard</motion.h1>

//             <motion.div variants={containerVariants} className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 <motion.div variants={itemVariants}><InfoCard title="Total Pemasukan" amount={totalIncome} icon={<TrendingUp size={28} className="text-white"/>} iconBgColor="bg-emerald-500" /></motion.div>
//                 <motion.div variants={itemVariants}><InfoCard title="Total Pengeluaran" amount={totalExpense} icon={<TrendingDown size={28} className="text-white"/>} iconBgColor="bg-red-500" /></motion.div>
//                 <motion.div variants={itemVariants}><InfoCard title="Saldo Saat Ini" amount={balance} icon={<Wallet size={28} className="text-white"/>} iconBgColor="bg-blue-500" /></motion.div>
//             </motion.div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <motion.div variants={containerVariants} className="lg:col-span-2 space-y-8">
//                     <motion.div variants={itemVariants}><AISummary totalIncome={totalIncome} totalExpense={totalExpense} transactions={transactions} budget={budget} goals={goals} /></motion.div>
//                     <motion.div variants={itemVariants}><Charts transactions={transactions} budget={budget} /></motion.div>
//                 </motion.div>
//                 <motion.div variants={containerVariants} className="lg:col-span-1 space-y-8">
//                     <motion.div variants={itemVariants}>
//                         {/* --- PROP 'categories' DITERUSKAN KE TRANSACTIONFORM --- */}
//                         <TransactionForm 
//                             addTransaction={addTransaction} 
//                             categories={categories} 
//                         />
//                     </motion.div>
//                     <motion.div variants={itemVariants}>
//                         <BudgetDisplay budget={budget} totalExpense={totalExpense} setBudget={setBudget} />
//                     </motion.div>
//                     <motion.div variants={itemVariants}>
//                         {/* --- PROP 'deleteGoal' DITERUSKAN KE GOALSDISPLAY --- */}
//                         <GoalsDisplay 
//                             goals={goals} 
//                             addGoal={addGoal} 
//                             setGoals={setGoals} 
//                             deleteGoal={deleteGoal} 
//                         />
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </motion.div>
//     );
// };

// export default Dashboard;

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

// Import komponen anak
import TransactionForm from './TransactionForm';
import Charts from './Charts';
import AISummary from './AISummary';
import GoalsDisplay from './GoalsDisplay';
import BudgetDisplay from './BudgetDisplay';

const InfoCard = ({ title, amount, icon, iconBgColor }) => (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center transition-all duration-300 hover:border-white/20 hover:bg-white/10 transform hover:-translate-y-1">
        <div className={`p-3 rounded-full mr-4 ${iconBgColor}`}>{icon}</div>
        <div>
            <p className="text-sm text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-white">Rp {amount.toLocaleString('id-ID')}</p>
        </div>
    </div>
);

// Terima semua props yang dibutuhkan dari App.jsx
const Dashboard = ({ transactions, budget, goals, categories, addTransaction, deleteGoal, updateBudget, updateGoalProgress, addGoal }) => {

  if (!transactions || !budget || !goals || !categories) {
    return <div className="p-8 text-center text-gray-400">Memuat data dashboard...</div>;
  }

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <motion.div className="p-4 sm:p-6 lg:p-8" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-8">Dashboard</motion.h1>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants}><InfoCard title="Total Pemasukan" amount={totalIncome} icon={<TrendingUp size={28} className="text-white"/>} iconBgColor="bg-emerald-500" /></motion.div>
          <motion.div variants={itemVariants}><InfoCard title="Total Pengeluaran" amount={totalExpense} icon={<TrendingDown size={28} className="text-white"/>} iconBgColor="bg-red-500" /></motion.div>
          <motion.div variants={itemVariants}><InfoCard title="Saldo Saat Ini" amount={balance} icon={<Wallet size={28} className="text-white"/>} iconBgColor="bg-blue-500" /></motion.div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={containerVariants} className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}><AISummary totalIncome={totalIncome} totalExpense={totalExpense} transactions={transactions} budget={budget} goals={goals} /></motion.div>
          <motion.div variants={itemVariants}><Charts transactions={transactions} budget={budget} /></motion.div>
        </motion.div>
        <motion.div variants={containerVariants} className="lg:col-span-1 space-y-8">
          <motion.div variants={itemVariants}><TransactionForm addTransaction={addTransaction} categories={categories} /></motion.div>
          <motion.div variants={itemVariants}><BudgetDisplay totalExpense={totalExpense} budget={budget} updateBudget={updateBudget} /></motion.div>
          <motion.div variants={itemVariants}><GoalsDisplay goals={goals} addGoal={addGoal} deleteGoal={deleteGoal} updateGoalProgress={updateGoalProgress} /></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;