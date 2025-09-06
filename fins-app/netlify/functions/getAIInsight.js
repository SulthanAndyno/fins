const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { financialData } = JSON.parse(event.body);

    const prompt = `
      You are FINS, a helpful and concise financial assistant. Analyze the following user financial data for the current month, provided in Indonesian Rupiah (IDR).

      <financial_data>
      Total Income: IDR ${financialData.totalIncome.toLocaleString()}
      Total Expense: IDR ${financialData.totalExpense.toLocaleString()}
      Top Spending Categories: ${financialData.topCategories.map(c => `${c.name} (${c.percent}%)`).join(', ')}
      Monthly Budget: IDR ${financialData.budget.amount.toLocaleString()} (Status: ${Math.round((financialData.totalExpense / (financialData.budget.amount || 1)) * 100)}% used)
      Financial Goal: "${financialData.goals[0]?.title || 'Not set'}" (Progress: ${Math.round(((financialData.goals[0]?.current || 0) / (financialData.goals[0]?.target || 1)) * 100)}%)
      </financial_data>

      Your task is to provide a concise financial analysis in BAHASA INDONESIA. Your response MUST be a valid JSON object, without any introductory text or markdown formatting. The JSON object must have these exact keys: "summary" (string), "recommendations" (array of 3 short strings), and "overBudgetAdvice" (string, empty if not over budget).
    `;

       const output = await replicate.run(
      // --- GUNAKAN MODEL CEPAT INI ---
      "ibm-granite/granite-3.3-8b-instruct:a325a0cacfb0aa9226e6bad1abe5385f1073f4c7f8c36e52ed040e5409e6c034",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 350,
        }
      }
    );

    const resultText = output.join("");
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: resultText,
    };

  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};