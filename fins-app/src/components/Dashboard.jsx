// import React from 'react';
// import { Wallet, TrendingUp, TrendingDown, Package, PiggyBank } from 'lucide-react';
// import TransactionForm from './TransactionForm';
// import Charts from './Charts';
// import AISummary from './AISummary';
// import GoalsDisplay from './GoalsDisplay';
// import BudgetDisplay from './BudgetDisplay';

// const Dashboard = ({ transactions, addTransaction, budget, goals, setBudget, addGoal, setGoals }) => {
//   const totalIncome = transactions
//     .filter(t => t.type === 'income')
//     .reduce((acc, t) => acc + t.amount, 0);

//   const totalExpense = transactions
//     .filter(t => t.type === 'expense')
//     .reduce((acc, t) => acc + t.amount, 0);

//   const balance = totalIncome - totalExpense;

//   const InfoCard = ({ title, amount, icon, color }) => (
//     <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
//       <div className={`p-3 rounded-full mr-4 ${color}`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-xl font-semibold text-text-dark">
//           Rp {amount.toLocaleString('id-ID')}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 bg-background min-h-screen">
//       <h2 className="text-3xl font-bold text-text-dark mb-6">Dashboard</h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         <InfoCard title="Total Pemasukan" amount={totalIncome} icon={<TrendingUp size={24} className="text-white"/>} color="bg-secondary" />
//         <InfoCard title="Total Pengeluaran" amount={totalExpense} icon={<TrendingDown size={24} className="text-white"/>} color="bg-red-400" />
//         <InfoCard title="Saldo Saat Ini" amount={balance} icon={<Wallet size={24} className="text-white"/>} color="bg-accent-blue" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column: Forms and Goals */}
//         <div className="lg:col-span-1 space-y-6">
//           <TransactionForm addTransaction={addTransaction} />
//           <BudgetDisplay budget={budget} totalExpense={totalExpense} setBudget={setBudget} />
//           <GoalsDisplay goals={goals} addGoal={addGoal} setGoals={setGoals} totalIncome={totalIncome} />
//         </div>

//         {/* Right Column: Charts and AI */}
//         <div className="lg:col-span-2 space-y-6">
//           <AISummary 
//             totalIncome={totalIncome} 
//             totalExpense={totalExpense}
//             transactions={transactions}
//             budget={budget}
//             goals={goals}
//           />
//           <Charts transactions={transactions} budget={budget} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import TransactionForm from './TransactionForm';
import Charts from './Charts';
import AISummary from './AISummary';
import GoalsDisplay from './GoalsDisplay';
import BudgetDisplay from './BudgetDisplay';

// InfoCard dengan desain baru
const InfoCard = ({ title, amount, icon, color, bgColor }) => (
    <div className={`p-5 rounded-xl shadow-lg flex items-center transition-transform transform hover:-translate-y-1 ${bgColor}`}>
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-2xl font-bold text-text-dark">
                Rp {amount.toLocaleString('id-ID')}
            </p>
        </div>
    </div>
);

const Dashboard = ({ transactions, addTransaction, budget, goals, setBudget, addGoal, setGoals }) => {
    // ... (logika kalkulasi totalIncome, totalExpense, balance tetap sama) ...
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-text-dark mb-6">Dashboard</h1>

            {/* Kartu Ringkasan dengan Desain Baru */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <InfoCard title="Total Pemasukan" amount={totalIncome} icon={<TrendingUp size={28} className="text-white"/>} color="bg-secondary" bgColor="bg-white" />
                <InfoCard title="Total Pengeluaran" amount={totalExpense} icon={<TrendingDown size={28} className="text-white"/>} color="bg-red-500" bgColor="bg-white" />
                <InfoCard title="Saldo Saat Ini" amount={balance} icon={<Wallet size={28} className="text-white"/>} color="bg-accent-blue" bgColor="bg-white" />
            </div>

            {/* Layout Grid Dua Kolom */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kanan (Lebih besar) */}
                <div className="lg:col-span-2 space-y-8">
                    <AISummary 
                        totalIncome={totalIncome} 
                        totalExpense={totalExpense}
                        transactions={transactions}
                        budget={budget}
                        goals={goals}
                    />
                    <Charts transactions={transactions} budget={budget} />
                </div>

                {/* Kolom Kiri (Lebih kecil) */}
                <div className="lg:col-span-1 space-y-8">
                    <TransactionForm addTransaction={addTransaction} />
                    <BudgetDisplay budget={budget} totalExpense={totalExpense} setBudget={setBudget} />
                    <GoalsDisplay goals={goals} addGoal={addGoal} setGoals={setGoals} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;