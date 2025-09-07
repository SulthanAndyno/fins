import React, { useState } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';

// Terima semua props yang dibutuhkan dari Dashboard
const AISummary = ({ totalIncome, totalExpense, transactions, budget, goals }) => {
  const [insight, setInsight] = useState(() => {
    try {
      const cached = localStorage.getItem('aiInsightCache');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 12 * 60 * 60 * 1000) {
          return data;
        }
      }
    } catch (e) {
      localStorage.removeItem('aiInsightCache');
      return null;
    }
    return null;
  });

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
      const financialData = {
        totalIncome,
        totalExpense,
        topCategories: getTopCategories(),
        budget: budget || { amount: 0 },
        goals: goals || [],
      };

      // Panggil backend proxy dengan nama yang sudah benar
      const response = await fetch('/.netlify/functions/getAIInsight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ financialData }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorBody}`);
      }

      const result = await response.json();
      
      if (!result.summary || !Array.isArray(result.recommendations)) {
        throw new Error("Invalid response format from AI");
      }

      setInsight(result);
      localStorage.setItem('aiInsightCache', JSON.stringify({ data: result, timestamp: Date.now() }));
    } catch (error) {
      console.error("Failed to get AI insight:", error);
      setInsight({ summary: "Gagal memuat insight dari AI. Pastikan koneksi internet stabil dan coba lagi nanti.", recommendations: [], overBudgetAdvice: "" });
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
      
      {loading && (
        <div className="text-center text-gray-400 py-8 border-t border-white/10 mt-4">
          <p>AI sedang menganalisis data keuangan Anda...</p>
          <p className="text-xs text-gray-500">(Bisa memakan waktu beberapa detik)</p>
        </div>
      )}

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