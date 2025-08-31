// import React, { useState, useEffect } from 'react';
// import { loadState, saveState } from './utils/localStorage';
// import Header from './components/Header';
// import Dashboard from './components/Dashboard';
// import TransactionHistory from './components/TransactionHistory'; // Komponen baru

// const App = () => {
//   // --- STATE MANAGEMENT ---
//   // Memuat state dari localStorage saat aplikasi pertama kali dibuka
//   const [transactions, setTransactions] = useState(() => loadState('transactions', []));
//   const [budget, setBudget] = useState(() => loadState('budget', { amount: 5000000, period: 'bulanan' }));
//   const [goals, setGoals] = useState(() => loadState('goals', [{ id: '1', title: 'Beli Motor', target: 15000000, current: 3250000 }]));
//   const [activeTab, setActiveTab] = useState('dashboard');

//   // --- LOCALSTORAGE SYNC ---
//   // Menyimpan state ke localStorage setiap kali ada perubahan
//   useEffect(() => {
//     saveState('transactions', transactions);
//   }, [transactions]);

//   useEffect(() => {
//     saveState('budget', budget);
//   }, [budget]);

//   useEffect(() => {
//     saveState('goals', goals);
//   }, [goals]);

//   // --- HANDLER FUNCTIONS ---
//   const addTransaction = (transaction) => {
//     setTransactions(prev => [transaction, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
//   };
  
//   const deleteTransaction = (id) => {
//     setTransactions(prev => prev.filter(t => t.id !== id));
//   }

//   const addGoal = (goal) => {
//     setGoals(prev => [...prev, goal]);
//   };
  
//   // Tab Navigation
//   const TabButton = ({ tabName, label }) => (
//     <button
//       onClick={() => setActiveTab(tabName)}
//       className={`px-4 py-2 font-semibold rounded-md ${activeTab === tabName ? 'bg-primary text-white' : 'text-text-dark hover:bg-gray-200'}`}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-background font-sans">
//       <Header />
//       <nav className="p-4 bg-white shadow-sm flex justify-center space-x-4">
//         <TabButton tabName="dashboard" label="Dashboard" />
//         <TabButton tabName="history" label="Riwayat Transaksi" />
//       </nav>
//       <main>
//         {activeTab === 'dashboard' && (
//           <Dashboard
//             transactions={transactions}
//             addTransaction={addTransaction}
//             budget={budget}
//             setBudget={setBudget}
//             goals={goals}
//             addGoal={addGoal}
//             setGoals={setGoals}
//           />
//         )}
//         {activeTab === 'history' && (
//           <TransactionHistory transactions={transactions} deleteTransaction={deleteTransaction} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadState, saveState } from './utils/localStorage';

// Layout
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Mungkin Header bisa kita gabungkan ke konten utama

// Pages
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
// Anda perlu membuat komponen halaman baru untuk Goals dan Settings

const App = () => {
  // ... (semua state management Anda tetap di sini) ...
  const [transactions, setTransactions] = useState(() => loadState('transactions', []));
  const [budget, setBudget] = useState(() => loadState('budget', { amount: 5000000, period: 'bulanan' }));
  const [goals, setGoals] = useState(() => loadState('goals', [{ id: '1', title: 'Beli Motor', target: 15000000, current: 3250000 }]));

  useEffect(() => { saveState('transactions', transactions); }, [transactions]);
  useEffect(() => { saveState('budget', budget); }, [budget]);
  useEffect(() => { saveState('goals', goals); }, [goals]);

  const addTransaction = (transaction) => setTransactions(prev => [transaction, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
  const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const addGoal = (goal) => setGoals(prev => [...prev, goal]);


  return (
    <Router>
      <div className="flex h-screen bg-background font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Header bisa diletakkan di sini jika ingin di setiap halaman */}
          <Routes>
            <Route path="/" element={
              <Dashboard
                transactions={transactions}
                addTransaction={addTransaction}
                budget={budget}
                setBudget={setBudget}
                goals={goals}
                addGoal={addGoal}
                setGoals={setGoals}
              />
            } />
            <Route path="/history" element={
              <TransactionHistory transactions={transactions} deleteTransaction={deleteTransaction} />
            } />
            {/* Tambahkan rute untuk /goals dan /settings nanti */}
            {/* <Route path="/goals" element={<GoalsPage ... />} /> */}
            {/* <Route path="/settings" element={<SettingsPage ... />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;