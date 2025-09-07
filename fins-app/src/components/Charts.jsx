import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EmptyState from './EmptyState';
import { BarChart as BarChartIcon } from 'lucide-react';

// --- PERBAIKAN DI SINI: Tambahkan lebih banyak warna cerah ---
const COLORS = [
  '#10B981', // emerald-500
  '#3B82F6', // blue-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF0', // violet-500
  '#EC4899', // pink-500
  '#FACC15', // indigo
  '#D946EF', // fuchsia-500
];
const tickStyle = { fill: '#9CA3AF', fontSize: '12px' };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-white/10 p-3 rounded-lg shadow-lg">
        <p className="label text-white font-bold">{`${label}`}</p>
        <p className="intro text-emerald-400">{`Jumlah : Rp ${payload[0].value.toLocaleString('id-ID')}`}</p>
      </div>
    );
  }
  return null;
};

const Charts = ({ transactions, budget }) => {
  // Penjaga jika props belum siap
  if (!transactions || !budget) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl text-center text-gray-400">
        Memuat grafik...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<BarChartIcon size={32} />}
        title="Grafik Belum Tersedia"
        message="Tambahkan beberapa transaksi untuk melihat visualisasi data keuanganmu."
      />
    );
  }

  const expenseData = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  const pieChartData = Object.keys(expenseData).map(key => ({ name: key, value: expenseData[key] }));

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const barChartData = [
    { name: 'Pemasukan', amount: totalIncome },
    { name: 'Pengeluaran', amount: totalExpense },
    { name: 'Budget', amount: budget.amount },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Grafik Keuangan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ fontFamily: 'sans-serif' }}>
        <div>
          <h4 className="text-center font-medium text-gray-300 mb-4">Distribusi Pengeluaran</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={pieChartData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                fill="#8884d8" 
                labelLine={false} 
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                fontSize={12}
                stroke="none"
              >
                {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="text-center font-medium text-gray-300 mb-4">Perbandingan Keuangan</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#9CA3AF" tick={tickStyle} />
              <YAxis stroke="#9CA3AF" tick={tickStyle} tickFormatter={(value) => `Rp${value/1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}/>
              <Bar dataKey="amount">
                <Cell fill="#10B981" /> 
                <Cell fill="#EF4444" /> 
                <Cell fill="#F59E0B" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;