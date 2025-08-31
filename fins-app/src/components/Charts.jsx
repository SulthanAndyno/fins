import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2ECCB0', '#5DADE2', '#F1C40F', '#F39C12', '#E74C3C', '#8E44AD'];

const Charts = ({ transactions, budget }) => {
  // Data untuk Pie Chart (Distribusi Pengeluaran)
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieChartData = Object.keys(expenseData).map(key => ({
    name: key,
    value: expenseData[key],
  }));

  // Data untuk Bar Chart (Income vs Expense)
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const barChartData = [
    { name: 'Pemasukan', amount: totalIncome },
    { name: 'Pengeluaran', amount: totalExpense },
    { name: 'Budget', amount: budget.amount },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-text-dark mb-4">Grafik Keuangan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-center font-medium text-gray-600 mb-2">Distribusi Pengeluaran</h4>
          {pieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-gray-500 mt-10">Belum ada data pengeluaran.</p>}
        </div>
        <div>
          <h4 className="text-center font-medium text-gray-600 mb-2">Perbandingan Pemasukan & Pengeluaran</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `Rp ${value/1000}k`} />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
              <Legend />
              <Bar dataKey="amount">
                <Cell fill="#2ECCB0" /> 
                <Cell fill="#E74C3C" /> 
                <Cell fill="#F39C12" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;