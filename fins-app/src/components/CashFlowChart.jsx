import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { id } from 'date-fns/locale';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-white/10 p-3 rounded-lg shadow-lg">
        <p className="label text-sm text-gray-300">{`${payload[0].payload.formattedDate}`}</p>
        <p className="intro font-bold - text-white">Rp {payload[0].value.toLocaleString('id-ID')}</p>
      </div>
    );
  }
  return null;
};

const CashFlowChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    // ... (Logika tidak berubah)
  }, [transactions]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Aliran Dana (7 Hari Terakhir)</h3>
      
      {/* --- PERBAIKAN DI SINI: Atur tinggi secara eksplisit --- */}
      <div className="h-72 w-full"> {/* <-- Beri tinggi 288px (h-72) */}
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `Rp${value/1000}k`}
              width={50} // Beri ruang untuk label Y-Axis
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Pastikan logika useMemo lengkap
const CashFlowChartFull = ({ transactions }) => {
    const chartData = useMemo(() => {
        const today = new Date();
        const last7Days = eachDayOfInterval({
          start: subDays(today, 6),
          end: today,
        });
        let startingBalance = transactions
          .filter(t => new Date(t.date) < last7Days[0])
          .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
        const dataPoints = last7Days.map(day => {
          const dateString = format(day, 'yyyy-MM-dd');
          const dailyTransactions = transactions.filter(t => t.date === dateString);
          const dailyNet = dailyTransactions.reduce((acc, t) => {
            return acc + (t.type === 'income' ? t.amount : -t.amount);
          }, 0);
          startingBalance += dailyNet;
          return {
            date: format(day, 'dd/MM'),
            formattedDate: format(day, 'eeee, dd MMMM yyyy', { locale: id }),
            balance: startingBalance,
          };
        });
        return dataPoints;
      }, [transactions]);

    return (
        <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Aliran Dana (7 Hari Terakhir)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value/1000}k`} width={50} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}
export default CashFlowChartFull;