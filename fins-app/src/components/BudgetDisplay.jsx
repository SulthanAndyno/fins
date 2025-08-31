import React, { useState, useEffect } from 'react';
import { Target, AlertCircle } from 'lucide-react';

const BudgetDisplay = ({ budget, totalExpense, setBudget }) => {
  const [newBudget, setNewBudget] = useState(budget.amount);
  const [period, setPeriod] = useState(budget.period);

  useEffect(() => {
    setNewBudget(budget.amount);
    setPeriod(budget.period);
  }, [budget]);

  const handleSave = () => {
    setBudget({ amount: parseFloat(newBudget) || 0, period });
  };
  
  const percentage = budget.amount > 0 ? (totalExpense / budget.amount) * 100 : 0;
  const isOverBudget = percentage > 100;
  const isWarning = percentage > 90 && percentage <= 100;
  
  let progressBarColor = 'bg-secondary';
  if (isWarning) progressBarColor = 'bg-alert';
  if (isOverBudget) progressBarColor = 'bg-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-text-dark mb-4 flex items-center">
        <Target className="mr-2 text-primary" /> Atur Budget
      </h3>
      <div className="flex gap-4 mb-4">
        <input 
          type="number" 
          value={newBudget} 
          onChange={(e) => setNewBudget(e.target.value)}
          className="w-2/3 p-2 border rounded-md"
          placeholder="e.g., 5000000"
        />
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-1/3 p-2 border rounded-md">
          <option value="bulanan">Bulanan</option>
          <option value="mingguan">Mingguan</option>
          <option value="tahunan">Tahunan</option>
        </select>
      </div>
      <button onClick={handleSave} className="w-full bg-accent-blue text-white p-2 rounded-md hover:bg-opacity-90 transition-colors mb-4">
        Set Budget
      </button>

      {budget.amount > 0 && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Pengeluaran</span>
            <span>Rp {totalExpense.toLocaleString('id-ID')} / {budget.amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${progressBarColor}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-right text-sm mt-1 font-semibold">{percentage.toFixed(1)}% terpakai</p>
          {isWarning && !isOverBudget && (
             <div className="mt-2 text-alert flex items-center text-sm p-2 bg-yellow-50 rounded-md">
               <AlertCircle size={16} className="mr-2"/> Peringatan: Pengeluaran sudah mendekati budget!
             </div>
          )}
          {isOverBudget && (
             <div className="mt-2 text-red-600 flex items-center text-sm p-2 bg-red-50 rounded-md">
               <AlertCircle size={16} className="mr-2"/> Anda telah melebihi budget!
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetDisplay;