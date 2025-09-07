// import React, { useState, useEffect } from 'react';
// import { Target, AlertCircle } from 'lucide-react';

// const BudgetDisplay = ({ budget, totalExpense, setBudget }) => {
//   const [newBudget, setNewBudget] = useState(budget.amount);
//   const [period, setPeriod] = useState(budget.period);

//   useEffect(() => {
//     setNewBudget(budget.amount);
//     setPeriod(budget.period);
//   }, [budget]);

//   const handleSave = () => {
//     setBudget({ amount: parseFloat(newBudget) || 0, period });
//   };
  
//   const percentage = budget.amount > 0 ? (totalExpense / budget.amount) * 100 : 0;
//   const isOverBudget = percentage > 100;
//   const isWarning = percentage > 90 && percentage <= 100;
  
//   let progressBarColor = 'bg-emerald-500';
//   if (isWarning) progressBarColor = 'bg-amber-500';
//   if (isOverBudget) progressBarColor = 'bg-red-600';

//   const inputStyle = "p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";

//   return (
//     <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
//       <h3 className="text-xl font-bold text-white mb-4 flex items-center">
//         <Target className="mr-3 text-blue-400" /> Atur Budget
//       </h3>
//       <div className="flex gap-4 mb-4">
//         <input type="number" value={newBudget} onChange={(e) => setNewBudget(e.target.value)} className={`w-2/3 ${inputStyle}`} placeholder="e.g., 5000000" />
//         <select value={period} onChange={(e) => setPeriod(e.target.value)} className={`w-1/3 ${inputStyle}`}>
//           <option className="bg-gray-800" value="bulanan">Bulanan</option>
//           <option className="bg-gray-800" value="mingguan">Mingguan</option>
//           <option className="bg-gray-800" value="tahunan">Tahunan</option>
//         </select>
//       </div>
//       <button onClick={handleSave} className="w-full bg-blue-500/80 text-white font-semibold p-2 rounded-lg hover:bg-blue-500 transition-colors mb-6">
//         Set Budget
//       </button>

//       {budget.amount > 0 && (
//         <div>
//           <div className="flex justify-between text-sm text-gray-300 mb-1">
//             <span>Pengeluaran</span>
//             <span className="font-semibold text-white">Rp {totalExpense.toLocaleString('id-ID')} / {budget.amount.toLocaleString('id-ID')}</span>
//           </div>
//           <div className="w-full bg-gray-700/50 rounded-full h-4 border border-white/10">
//             <div className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
//           </div>
//           <p className="text-right text-sm mt-1 font-semibold text-white">{percentage.toFixed(1)}% terpakai</p>
//           {(isWarning || isOverBudget) && (
//              <div className={`mt-3 flex items-center text-sm p-3 rounded-lg ${isOverBudget ? 'bg-red-900/50 text-red-300' : 'bg-amber-900/50 text-amber-300'}`}>
//                <AlertCircle size={20} className="mr-3 flex-shrink-0"/> 
//                {isOverBudget ? 'Peringatan: Anda telah melebihi budget!' : 'Perhatian: Pengeluaran sudah mendekati budget!'}
//              </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BudgetDisplay;

import React, { useState, useEffect } from 'react';
import { Target, AlertCircle } from 'lucide-react';

// Terima 'updateBudget' sebagai props, bukan 'setBudget'
const BudgetDisplay = ({ budget, totalExpense, updateBudget }) => {
  const [newBudget, setNewBudget] = useState('');
  const [period, setPeriod] = useState('bulanan');

  // Efek untuk mengisi form saat data budget dari Supabase datang
  useEffect(() => {
    if (budget) {
      setNewBudget(budget.amount);
      setPeriod(budget.period);
    }
  }, [budget]);

  const handleSave = () => {
    // Panggil fungsi 'updateBudget' dari App.jsx
    updateBudget({ amount: parseFloat(newBudget) || 0, period });
  };
  
  // Penjaga jika 'budget' masih null
  if (!budget) {
    return <div className="bg-gray-800/50 p-6 rounded-xl text-center text-gray-400">Memuat budget...</div>;
  }
  
  const percentage = budget.amount > 0 ? (totalExpense / budget.amount) * 100 : 0;
  const isOverBudget = percentage > 100;
  const isWarning = percentage > 90 && percentage <= 100;
  
  let progressBarColor = 'bg-emerald-500';
  if (isWarning) progressBarColor = 'bg-amber-500';
  if (isOverBudget) progressBarColor = 'bg-red-600';

  const inputStyle = "p-3 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Target className="mr-3 text-blue-400" /> Atur Budget
      </h3>
      <div className="flex gap-4 mb-4">
        <input type="number" value={newBudget} onChange={(e) => setNewBudget(e.target.value)} className={`w-2/3 ${inputStyle}`} placeholder="e.g., 5000000" />
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className={`w-1/3 ${inputStyle}`}>
          <option className="bg-gray-800" value="bulanan">Bulanan</option>
          <option className="bg-gray-800" value="mingguan">Mingguan</option>
          <option className="bg-gray-800" value="tahunan">Tahunan</option>
        </select>
      </div>
      <button onClick={handleSave} className="w-full bg-blue-500/80 text-white font-semibold p-2 rounded-lg hover:bg-blue-500 transition-colors mb-6">
        Set Budget
      </button>

      {budget.amount > 0 && (
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Terpakai</span>
            {/* --- PERBAIKAN DI SINI: Gunakan font-mono untuk angka --- */}
            <span className="font-semibold text-white">Rp {totalExpense.toLocaleString('id-ID')} / {budget.amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-4 border border-white/10">
            <div className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
          </div>
          <p className="text-right text-sm mt-1 font-semibold text-white">{percentage.toFixed(1)}% terpakai</p>
          {(isWarning || isOverBudget) && (
             <div className={`mt-3 flex items-center text-sm p-3 rounded-lg ${isOverBudget ? 'bg-red-900/50 text-red-300' : 'bg-amber-900/50 text-amber-300'}`}>
               <AlertCircle size={20} className="mr-3 flex-shrink-0"/> 
               {isOverBudget ? 'Peringatan: Anda telah melebihi budget!' : 'Perhatian: Pengeluaran sudah mendekati budget!'}
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetDisplay;