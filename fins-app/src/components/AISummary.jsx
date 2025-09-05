// // import React, { useState } from 'react';
// // import { Sparkles, BrainCircuit } from 'lucide-react';
// // import { getMockAIInsight } from '../api/aiSummary'; // Menggunakan mock
// // import { loadState, saveState } from '../utils/localStorage';

// // const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
// //   const [insight, setInsight] = useState(loadState('aiInsightCache', null));
// //   const [loading, setLoading] = useState(false);

// //   const getTopCategories = () => {
// //     const expenseByCategory = transactions
// //       .filter(t => t.type === 'expense')
// //       .reduce((acc, t) => {
// //         acc[t.category] = (acc[t.category] || 0) + t.amount;
// //         return acc;
// //       }, {});

// //     return Object.entries(expenseByCategory)
// //       .sort(([, a], [, b]) => b - a)
// //       .slice(0, 3)
// //       .map(([name, value]) => ({
// //         name,
// //         percent: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
// //       }));
// //   };

// //   const handleFetchInsight = async () => {
// //     setLoading(true);
// //     setInsight(null);
// //     try {
// //       const data = {
// //         totalIncome,
// //         totalExpense,
// //         topCategories: getTopCategories(),
// //         budget,
// //         goals,
// //       };
// //       // Ganti getMockAIInsight dengan getRealAIInsight jika sudah ada backend
// //       const result = await getMockAIInsight(data); 
// //       setInsight(result);
// //       saveState('aiInsightCache', result); // Cache response
// //     } catch (error) {
// //       console.error("Failed to get AI insight:", error);
// //       setInsight({ summary: "Gagal memuat insight. Coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-sm bg-gradient-to-br from-blue-50 to-green-50">
// //       <div className="flex justify-between items-center mb-4">
// //         <h3 className="text-xl font-semibold text-text-dark flex items-center">
// //           <BrainCircuit className="mr-2 text-primary" /> AI Financial Insight
// //         </h3>
// //         <button
// //           onClick={handleFetchInsight}
// //           disabled={loading}
// //           className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center disabled:bg-gray-400"
// //         >
// //           <Sparkles size={16} className="mr-2" />
// //           {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
// //         </button>
// //       </div>
      
// //       {loading && <p className="text-center text-gray-600">AI sedang menganalisis data keuangan Anda...</p>}

// //       {insight && !loading && (
// //         <div className="space-y-4">
// //           <div>
// //             <h4 className="font-semibold text-text-dark">Ringkasan</h4>
// //             <p className="text-gray-600">{insight.summary}</p>
// //           </div>

// //           {insight.overBudgetAdvice && (
// //             <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded-r-md">
// //               <h4 className="font-semibold text-red-800">Saran (Over Budget)</h4>
// //               <p className="text-red-700 whitespace-pre-line">{insight.overBudgetAdvice}</p>
// //             </div>
// //           )}
          
// //           <div>
// //             <h4 className="font-semibold text-text-dark">Rekomendasi Aksi</h4>
// //             <ul className="list-disc list-inside text-gray-600 space-y-1">
// //               {insight.recommendations.map((rec, i) => (
// //                 <li key={i}>{rec}</li>
// //               ))}
// //             </ul>
// //           </div>
// //           <p className="text-xs text-gray-400 text-center pt-2">Insight ini dihasilkan oleh AI dan hanya bersifat rekomendasi. Dibuat pada {new Date().toLocaleString()}.</p>
// //         </div>
// //       )}
// //       {!insight && !loading && <p className="text-center text-gray-500">Klik tombol untuk mendapatkan ringkasan dan rekomendasi dari AI.</p>}
// //     </div>
// //   );
// // };

// // export default AISummary;


// import React, { useState } from 'react';
// import { Sparkles, BrainCircuit } from 'lucide-react';
// import { getMockAIInsight } from '../api/aiSummary';
// import { loadState, saveState } from '../utils/localStorage';

// const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
//   const [insight, setInsight] = useState(loadState('aiInsightCache', null));
//   const [loading, setLoading] = useState(false);

//   const getTopCategories = () => {
//     // ... (fungsi ini tetap sama)
//     const expenseByCategory = transactions
//       .filter(t => t.type === 'expense')
//       .reduce((acc, t) => {
//         acc[t.category] = (acc[t.category] || 0) + t.amount;
//         return acc;
//       }, {});

//     return Object.entries(expenseByCategory)
//       .sort(([, a], [, b]) => b - a)
//       .slice(0, 3)
//       .map(([name, value]) => ({
//         name,
//         percent: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
//       }));
//   };

//   const handleFetchInsight = async () => {
//     setLoading(true);
//     setInsight(null);
//     try {
//       const data = { totalIncome, totalExpense, topCategories: getTopCategories(), budget, goals };
//       const result = await getMockAIInsight(data); 
//       setInsight(result);
//       saveState('aiInsightCache', result);
//     } catch (error) {
//       console.error("Failed to get AI insight:", error);
//       setInsight({ summary: "Gagal memuat insight. Coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-bold text-white flex items-center">
//             <BrainCircuit className="mr-3 text-blue-400" size={24} /> AI Financial Insight
//           </h3>
//           <p className="text-sm text-gray-400 mt-1">Analisis otomatis kondisi keuanganmu.</p>
//         </div>
//         <button
//           onClick={handleFetchInsight}
//           disabled={loading}
//           className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Sparkles size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
//           {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
//         </button>
//       </div>
      
//       {loading && <div className="text-center text-gray-400 py-8">AI sedang menganalisis data keuangan Anda...</div>}

//       {insight && !loading && (
//         <div className="space-y-4 mt-4 border-t border-white/10 pt-4">
//           <div>
//             <h4 className="font-semibold text-gray-200">Ringkasan</h4>
//             <p className="text-gray-400 text-sm mt-1">{insight.summary}</p>
//           </div>

//           {insight.overBudgetAdvice && (
//             <div className="p-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-lg">
//               <h4 className="font-semibold text-red-300">Saran (Over Budget)</h4>
//               <p className="text-red-400 text-sm mt-1 whitespace-pre-line">{insight.overBudgetAdvice}</p>
//             </div>
//           )}
          
//           <div>
//             <h4 className="font-semibold text-gray-200">Rekomendasi Aksi</h4>
//             <ul className="list-disc list-inside text-gray-400 space-y-1 mt-2 text-sm">
//               {insight.recommendations.map((rec, i) => (
//                 <li key={i}>{rec}</li>
//               ))}
//             </ul>
//           </div>
//           <p className="text-xs text-gray-500 text-center pt-4">Insight ini dihasilkan oleh AI dan hanya bersifat rekomendasi.</p>
//         </div>
//       )}
//       {!insight && !loading && (
//         <div className="text-center text-gray-500 py-8 border-t border-white/10 mt-4">Klik tombol untuk mendapatkan ringkasan dan rekomendasi dari AI.</div>
//       )}
//     </div>
//   );
// };

// export default AISummary;

// import React, { useState } from 'react';
// import { Sparkles, BrainCircuit } from 'lucide-react';

// const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
//   // Caching: Coba ambil dari localStorage dulu
//   const [insight, setInsight] = useState(() => {
//     const cached = localStorage.getItem('aiInsightCache');
//     if (cached) {
//       const { data, timestamp } = JSON.parse(cached);
//       // Cek apakah cache sudah kedaluwarsa (misal, 12 jam)
//       if (Date.now() - timestamp < 12 * 60 * 60 * 1000) {
//         return data;
//       }
//     }
//     return null;
//   });

//   const [loading, setLoading] = useState(false);

//   const getTopCategories = () => { /* ... (kode tidak berubah) ... */ };

//   const handleFetchInsight = async () => {
//     setLoading(true);
//     setInsight(null); // Hapus insight lama saat fetching
//     try {
//       const financialData = {
//         totalIncome,
//         totalExpense,
//         topCategories: getTopCategories(),
//         budget,
//         goals,
//       };

//       // Panggil backend proxy kita di Netlify
//       const response = await fetch('/.netlify/functions/getAIInsight', {
//         method: 'POST',
//         body: JSON.stringify({ financialData }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setInsight(result);

//       // Simpan hasil ke cache dengan timestamp
//       const cacheData = {
//         data: result,
//         timestamp: Date.now(),
//       };
//       localStorage.setItem('aiInsightCache', JSON.stringify(cacheData));

//     } catch (error) {
//       console.error("Failed to get AI insight:", error);
//       setInsight({ summary: "Gagal memuat insight dari AI. Coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ... (JSX tidak perlu diubah, karena sudah bagus)
//   return (
//     <div className="bg-gray-800/50 ...">
//       {/* ... */}
//       <button onClick={handleFetchInsight} /* ... */ >
//         {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
//       </button>
//       {/* ... (Tampilan hasil insight) ... */}
//     </div>
//   );
// };

// export default AISummary;

import React, { useState } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
// Hapus semua import yang tidak berhubungan dengan UI, kita akan pakai mock sederhana
// import { getMockAIInsight } from '../api/aiSummary';

const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTopCategories = () => {
    const expenseByCategory = (transactions || []).filter(t => t.type === 'expense').reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(expenseByCategory).sort(([, a], [, b]) => b - a).slice(0, 3).map(([name, value]) => ({
        name,
        percent: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
      }));
  };

  const handleFetchInsight = async () => {
    setLoading(true);
    setInsight(null);
    try {
      await new Promise(res => setTimeout(res, 1500)); // Simulasi loading
      const isOverBudget = budget ? totalExpense > budget.amount : false;
      const mockResult = {
        summary: `Analisis mock: Pemasukan Anda Rp ${totalIncome.toLocaleString()} & pengeluaran Rp ${totalExpense.toLocaleString()}.`,
        recommendations: ["Tinjau kembali pengeluaran terbesar Anda.", "Alokasikan dana untuk tujuan finansial.", "Cari cara untuk menambah pemasukan."],
        overBudgetAdvice: isOverBudget ? "Anda sudah melebihi budget! Segera kurangi pengeluaran tidak penting." : ""
      };
      setInsight(mockResult);
    } catch (error) {
      console.error("Failed to get AI insight:", error);
      setInsight({ summary: "Gagal memuat insight. Coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <BrainCircuit className="mr-3 text-blue-400" size={24} /> AI Financial Insight
          </h3>
          <p className="text-sm text-gray-400 mt-1">Analisis otomatis kondisi keuanganmu.</p>
        </div>
        <button
          onClick={handleFetchInsight}
          disabled={loading || !budget}
          className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
        </button>
      </div>
      
      {loading && <div className="text-center text-gray-400 py-8">AI sedang menganalisis data keuangan Anda...</div>}

      {insight && !loading && (
        <div className="space-y-4 mt-4 border-t border-white/10 pt-4">
          <div>
            <h4 className="font-semibold text-gray-200">Ringkasan</h4>
            <p className="text-gray-400 text-sm mt-1">{insight.summary}</p>
          </div>
          {insight.overBudgetAdvice && (
            <div className="p-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-lg">
              <h4 className="font-semibold text-red-300">Saran (Over Budget)</h4>
              <p className="text-red-400 text-sm mt-1 whitespace-pre-line">{insight.overBudgetAdvice}</p>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-200">Rekomendasi Aksi</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mt-2 text-sm">
              {insight.recommendations.map((rec, i) => (<li key={i}>{rec}</li>))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 text-center pt-4">Insight ini dihasilkan oleh AI dan hanya bersifat rekomendasi.</p>
        </div>
      )}
      {!insight && !loading && (
        <div className="text-center text-gray-500 py-8 border-t border-white/10 mt-4">Klik tombol untuk mendapatkan ringkasan dan rekomendasi dari AI.</div>
      )}
    </div>
  );
};

export default AISummary;