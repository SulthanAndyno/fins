// import React, { useState } from 'react';
// import { Sparkles, BrainCircuit } from 'lucide-react';
// import { getMockAIInsight } from '../api/aiSummary'; // Menggunakan mock
// import { loadState, saveState } from '../utils/localStorage';

// const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
//   const [insight, setInsight] = useState(loadState('aiInsightCache', null));
//   const [loading, setLoading] = useState(false);

//   const getTopCategories = () => {
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
//       const data = {
//         totalIncome,
//         totalExpense,
//         topCategories: getTopCategories(),
//         budget,
//         goals,
//       };
//       // Ganti getMockAIInsight dengan getRealAIInsight jika sudah ada backend
//       const result = await getMockAIInsight(data); 
//       setInsight(result);
//       saveState('aiInsightCache', result); // Cache response
//     } catch (error) {
//       console.error("Failed to get AI insight:", error);
//       setInsight({ summary: "Gagal memuat insight. Coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm bg-gradient-to-br from-blue-50 to-green-50">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold text-text-dark flex items-center">
//           <BrainCircuit className="mr-2 text-primary" /> AI Financial Insight
//         </h3>
//         <button
//           onClick={handleFetchInsight}
//           disabled={loading}
//           className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center disabled:bg-gray-400"
//         >
//           <Sparkles size={16} className="mr-2" />
//           {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
//         </button>
//       </div>
      
//       {loading && <p className="text-center text-gray-600">AI sedang menganalisis data keuangan Anda...</p>}

//       {insight && !loading && (
//         <div className="space-y-4">
//           <div>
//             <h4 className="font-semibold text-text-dark">Ringkasan</h4>
//             <p className="text-gray-600">{insight.summary}</p>
//           </div>

//           {insight.overBudgetAdvice && (
//             <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded-r-md">
//               <h4 className="font-semibold text-red-800">Saran (Over Budget)</h4>
//               <p className="text-red-700 whitespace-pre-line">{insight.overBudgetAdvice}</p>
//             </div>
//           )}
          
//           <div>
//             <h4 className="font-semibold text-text-dark">Rekomendasi Aksi</h4>
//             <ul className="list-disc list-inside text-gray-600 space-y-1">
//               {insight.recommendations.map((rec, i) => (
//                 <li key={i}>{rec}</li>
//               ))}
//             </ul>
//           </div>
//           <p className="text-xs text-gray-400 text-center pt-2">Insight ini dihasilkan oleh AI dan hanya bersifat rekomendasi. Dibuat pada {new Date().toLocaleString()}.</p>
//         </div>
//       )}
//       {!insight && !loading && <p className="text-center text-gray-500">Klik tombol untuk mendapatkan ringkasan dan rekomendasi dari AI.</p>}
//     </div>
//   );
// };

// export default AISummary;


import React, { useState } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { getMockAIInsight } from '../api/aiSummary'; // mock API
import { loadState, saveState } from '../utils/localStorage';

const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
  const [insight, setInsight] = useState(loadState('aiInsightCache', null));
  const [loading, setLoading] = useState(false);

  // Hitung kategori pengeluaran terbesar
  const getTopCategories = () => {
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return Object.entries(expenseByCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, value]) => ({
        name,
        percent: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
      }));
  };

  const handleFetchInsight = async () => {
    setLoading(true);
    setInsight(null);
    try {
      const data = {
        totalIncome,
        totalExpense,
        topCategories: getTopCategories(),
        budget,
        goals,
      };
      // sementara pakai mock
      const result = await getMockAIInsight(data);
      setInsight(result);
      saveState('aiInsightCache', result);
    } catch (error) {
      console.error("Failed to get AI insight:", error);
      setInsight({
        summary: "Gagal memuat insight. Coba lagi nanti.",
        recommendations: [],
        overBudgetAdvice: ""
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl shadow-lg border border-gray-200/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-text-dark flex items-center">
            <BrainCircuit className="mr-3 text-primary" size={24} /> AI Financial Insight
          </h3>
          <p className="text-sm text-gray-500">Analisis otomatis kondisi keuanganmu.</p>
        </div>
        <button
          onClick={handleFetchInsight}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} className="mr-2" />
          {loading ? 'Menganalisis...' : 'Dapatkan Insight'}
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600">
          AI sedang menganalisis data keuangan Anda...
        </p>
      )}

      {insight && !loading && (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-text-dark">Ringkasan</h4>
            <p className="text-gray-600">{insight.summary}</p>
          </div>

          {insight.overBudgetAdvice && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded-r-md">
              <h4 className="font-semibold text-red-800">Saran (Over Budget)</h4>
              <p className="text-red-700 whitespace-pre-line">
                {insight.overBudgetAdvice}
              </p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-text-dark">Rekomendasi Aksi</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {insight.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-400 text-center pt-2">
            Insight ini dihasilkan oleh AI dan hanya bersifat rekomendasi. Dibuat pada{" "}
            {new Date().toLocaleString()}.
          </p>
        </div>
      )}

      {!insight && !loading && (
        <p className="text-center text-gray-500">
          Klik tombol untuk mendapatkan ringkasan dan rekomendasi dari AI.
        </p>
      )}
    </div>
  );
};

export default AISummary;
