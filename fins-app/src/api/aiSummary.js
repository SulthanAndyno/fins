// Catatan: Di aplikasi production, JANGAN PERNAH mengekspos API key di frontend.
// Panggilan ini harus dilakukan melalui backend proxy (misal: Node.js/Express)
// untuk melindungi API key Anda.

// const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN'; // JANGAN TARUH DI SINI

// --- MOCK FUNCTION (untuk demo tanpa API) ---
// Fungsi ini mensimulasikan panggilan API dan mengembalikan response sesuai prompt.
export const getMockAIInsight = async (data) => {
  console.log("Fetching MOCK AI Insight with data:", data);
  // Memberi jeda 1.5 detik untuk simulasi loading
  await new Promise(resolve => setTimeout(resolve, 1500));

  const isOverBudget = data.totalExpense > data.budget.amount;

  let summary = `Your financial health this month is moderate. You've earned IDR ${data.totalIncome.toLocaleString()} and spent IDR ${data.totalExpense.toLocaleString()}, with Food & Transport as your main expenses.`;

  let recommendations = [
    "Review your 'Food' category for potential savings, like cooking more at home.",
    "Allocate a fixed amount to your 'Buy motorbike' goal right after receiving income.",
    "Use public transport on certain days to reduce 'Transport' costs."
  ];

  let overBudgetAdvice = "";
  if (isOverBudget) {
    summary = `This month, your expenses of IDR ${data.totalExpense.toLocaleString()} have exceeded your IDR ${data.budget.amount.toLocaleString()} budget. Your primary spending is on Food and Transport.`;
    overBudgetAdvice = `Step-by-step to get back on track:
1. Immediately pause non-essential spending (e.g., Entertainment, dining out).
2. Analyze your top 3 expenses and identify one specific cut for each.
3. For the rest of the month, track every single expense daily.`;
  }

  return {
    summary,
    recommendations,
    overBudgetAdvice,
  };
};


// --- REAL FUNCTION (contoh, butuh backend proxy) ---
/*
export const getRealAIInsight = async (data) => {
  const prompt = `
    System Instruction:
    You are a concise and actionable financial assistant.

    User Data (Current Month, IDR):
    Total Income: ${data.totalIncome}
    Total Expense: ${data.totalExpense}
    Top Categories: ${data.topCategories.map(c => `${c.name} ${c.percent}%`).join(', ')}
    Monthly Budget: ${data.budget.amount} → Used ${data.totalExpense} (${Math.round((data.totalExpense / data.budget.amount) * 100)}%)
    Goals: "${data.goals[0]?.title || 'N/A'}" – target ${data.goals[0]?.target || 0}, progress ${data.goals[0]?.current || 0} (${Math.round(((data.goals[0]?.current || 0) / (data.goals[0]?.target || 1)) * 100)}%)

    Task / Output Requirements:
    - 2–3 sentence summary of financial situation.
    - 3 actionable recommendations to save money.
    - Step-by-step advice if over budget.
    - Max 120 words, English.
    - Be concise, practical, friendly.
    - Output format should be a JSON object like: {"summary": "...", "recommendations": ["...", "...", "..."], "overBudgetAdvice": "..."}
  `;

  // Ini adalah PANGGILAN KE BACKEND PROXY ANDA, bukan langsung ke Replicate
  const response = await fetch('/api/ai/summary', { // Endpoint di backend Anda
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI insight');
  }

  const result = await response.json();
  return result; // Backend Anda akan mengembalikan JSON yang sudah diparsing
};
*/