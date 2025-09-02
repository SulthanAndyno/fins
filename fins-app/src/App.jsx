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

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { loadState, saveState } from './utils/localStorage';

// // Layout
// import Sidebar from './components/Sidebar';
// import Header from './components/Header'; // Mungkin Header bisa kita gabungkan ke konten utama

// // Pages
// import Dashboard from './components/Dashboard';
// import TransactionHistory from './components/TransactionHistory';
// // Anda perlu membuat komponen halaman baru untuk Goals dan Settings

// const App = () => {
//   // ... (semua state management Anda tetap di sini) ...
//   const [transactions, setTransactions] = useState(() => loadState('transactions', []));
//   const [budget, setBudget] = useState(() => loadState('budget', { amount: 5000000, period: 'bulanan' }));
//   const [goals, setGoals] = useState(() => loadState('goals', [{ id: '1', title: 'Beli Motor', target: 15000000, current: 3250000 }]));

//   useEffect(() => { saveState('transactions', transactions); }, [transactions]);
//   useEffect(() => { saveState('budget', budget); }, [budget]);
//   useEffect(() => { saveState('goals', goals); }, [goals]);

//   const addTransaction = (transaction) => setTransactions(prev => [transaction, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
//   const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
//   const addGoal = (goal) => setGoals(prev => [...prev, goal]);


//   return (
//     <Router>
//       <div className="flex h-screen bg-background font-sans">
//         <Sidebar />
//         <main className="flex-1 overflow-y-auto">
//           {/* Header bisa diletakkan di sini jika ingin di setiap halaman */}
//           <Routes>
//             <Route path="/" element={
//               <Dashboard
//                 transactions={transactions}
//                 addTransaction={addTransaction}
//                 budget={budget}
//                 setBudget={setBudget}
//                 goals={goals}
//                 addGoal={addGoal}
//                 setGoals={setGoals}
//               />
//             } />
//             <Route path="/history" element={
//               <TransactionHistory transactions={transactions} deleteTransaction={deleteTransaction} />
//             } />
//             {/* Tambahkan rute untuk /goals dan /settings nanti */}
//             {/* <Route path="/goals" element={<GoalsPage ... />} /> */}
//             {/* <Route path="/settings" element={<SettingsPage ... />} /> */}
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster, toast } from 'react-hot-toast';
// import { loadState, saveState } from './utils/localStorage';

// // Layout Components
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';

// // Page Components
// import Dashboard from './components/Dashboard';
// import TransactionHistory from './components/TransactionHistory';
// import GoalsPage from './pages/GoalsPage';
// import SettingsPage from './pages/SettingsPage';

// const App = () => {
//   // State untuk UI
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
//   // --- STATE MANAGEMENT UTAMA ---
//   const [transactions, setTransactions] = useState(() => loadState('transactions', []));
//   const [budget, setBudget] = useState(() => loadState('budget', { amount: 5000000, period: 'bulanan' }));
//   const [goals, setGoals] = useState(() => loadState('goals', []));

//   // --- State untuk Fitur Baru: Kategori Kustom ---
//   const defaultCategories = {
//     expense: ['Makanan', 'Transportasi', 'Hiburan', 'Tagihan', 'Belanja', 'Lainnya'],
//     income: ['Gaji', 'Bonus', 'Freelance', 'Hadiah', 'Lainnya'],
//   };
//   const [categories, setCategories] = useState(() => loadState('categories', defaultCategories));

//   // --- SINKRONISASI SEMUA STATE KE LOCALSTORAGE ---
//   useEffect(() => { saveState('transactions', transactions); }, [transactions]);
//   useEffect(() => { saveState('budget', budget); }, [budget]);
//   useEffect(() => { saveState('goals', goals); }, [goals]);
//   useEffect(() => { saveState('categories', categories); }, [categories]);

//   // --- HANDLER FUNCTIONS ---
//   // Transaksi
//   const addTransaction = (transaction) => {
//     setTransactions(prev => [transaction, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
//     toast.success('Transaksi berhasil ditambahkan!');
//   };
  
//   const deleteTransaction = (id) => {
//     setTransactions(prev => prev.filter(t => t.id !== id));
//     toast('Transaksi dihapus.', { icon: '🗑️' });
//   };
  
//   // Tujuan Finansial
//   const addGoal = (goal) => { 
//     setGoals(prev => [...prev, goal]); 
//     toast.success('Tujuan baru ditambahkan!'); 
//   };

//   const deleteGoal = (id) => {
//     setGoals(prev => prev.filter(g => g.id !== id));
//     toast('Tujuan berhasil dihapus.', { icon: '🗑️' });
//   };

//   return (
//     <Router>
//       <Toaster 
//         position="top-center"
//         reverseOrder={false}
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#1F2937', // bg-gray-800
//             color: '#D1D5DB',     // text-gray-300
//             border: '1px solid rgba(255, 255, 255, 0.1)'
//           },
//         }}
//       />
      
//       <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
//         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
//         <main className="transition-all duration-300">
//           <Header setIsSidebarOpen={setIsSidebarOpen} />
//           <Routes>
//             <Route path="/" element={
//               <Dashboard
//                 transactions={transactions}
//                 addTransaction={addTransaction}
//                 budget={budget}
//                 setBudget={setBudget}
//                 goals={goals}
//                 addGoal={addGoal}
//                 setGoals={setGoals}
//                 deleteGoal={deleteGoal}
//                 categories={categories} // <-- Meneruskan kategori
//               />
//             } />
//             <Route path="/history" element={
//               <TransactionHistory transactions={transactions} deleteTransaction={deleteTransaction} />
//             } />
//             <Route path="/goals" element={
//               <GoalsPage 
//                 goals={goals} 
//                 addGoal={addGoal} 
//                 setGoals={setGoals} 
//                 deleteGoal={deleteGoal}
//                 transactions={transactions} // <-- Meneruskan transaksi untuk proyeksi
//               />
//             } />
//             <Route path="/settings" element={
//               <SettingsPage
//                 categories={categories}
//                 setCategories={updateCategories}
//                 user={session.user} // <-- PASTIKAN INI ADA
//               />
//             } />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './supabaseClient';

// Layout & Pages
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import GoalsPage from './pages/GoalsPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState(null);

  // --- CEK SESSION ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // --- FETCH DATA USER ---
  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      setLoading(true);
      const userId = session.user.id;

      const [transRes, goalsRes, budgetRes, catRes] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', userId).order('date', { ascending: false }),
        supabase.from('goals').select('*').eq('user_id', userId),
        supabase.from('budget').select('*').eq('user_id', userId).single(),
        supabase.from('categories').select('*').eq('user_id', userId).single(),
      ]);

      setTransactions(transRes.data || []);
      setGoals(goalsRes.data || []);

      // Budget default
      if (!budgetRes.data) {
        const { data } = await supabase.from('budget')
          .insert({ user_id: userId, amount: 5000000, period: 'bulanan' })
          .select()
          .single();
        setBudget(data);
      } else setBudget(budgetRes.data);

      // Categories default
      if (!catRes.data) {
        const defaultCategories = {
          expense: ['Makanan', 'Transportasi', 'Hiburan', 'Tagihan', 'Belanja', 'Lainnya'],
          income: ['Gaji', 'Bonus', 'Freelance', 'Hadiah', 'Lainnya'],
        };
        const { data } = await supabase.from('categories')
          .insert({ user_id: userId, ...defaultCategories })
          .select()
          .single();
        setCategories(data);
      } else setCategories(catRes.data);

      setLoading(false);
    };
    fetchData();
  }, [session]);

  // --- HANDLER FUNCTIONS (CRUD) ---
  const addTransaction = async (transaction) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert({ ...transaction, user_id: session.user.id })
      .select()
      .single();

    if (error) toast.error('Gagal menambahkan transaksi');
    else {
      setTransactions(prev => [data, ...prev]);
      toast.success('Transaksi berhasil ditambahkan!');
    }
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) toast.error('Gagal hapus transaksi');
    else {
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast('Transaksi dihapus', { icon: '🗑️' });
    }
  };

  const addGoal = async (goal) => {
    const { data, error } = await supabase
      .from('goals')
      .insert({ ...goal, user_id: session.user.id })
      .select()
      .single();

    if (error) toast.error('Gagal menambahkan tujuan');
    else {
      setGoals(prev => [...prev, data]);
      toast.success('Tujuan baru ditambahkan!');
    }
  };

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) toast.error('Gagal hapus tujuan');
    else {
      setGoals(prev => prev.filter(g => g.id !== id));
      toast('Tujuan dihapus', { icon: '🗑️' });
    }
  };

  const updateBudget = async (newBudget) => {
    const { data, error } = await supabase
      .from('budget')
      .update(newBudget)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) toast.error('Gagal update budget');
    else setBudget(data);
  };

  const updateCategories = async (newCategories) => {
    const { data, error } = await supabase
      .from('categories')
      .update(newCategories)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) toast.error('Gagal update kategori');
    else setCategories(data);
  };

  // --- UI LOADING & AUTH ---
  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">Memuat FINS...</div>;
  if (!session) return <AuthPage />;
  if (!budget || !categories) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">Menyiapkan akun...</div>;

  // --- MAIN UI ---
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="transition-all duration-300">
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          <Routes>
            <Route path="/" element={
              <Dashboard
                transactions={transactions}
                addTransaction={addTransaction}
                budget={budget}
                setBudget={updateBudget}
                goals={goals}
                addGoal={addGoal}
                setGoals={setGoals}
                deleteGoal={deleteGoal}
                categories={categories}
              />
            } />
            <Route path="/history" element={
              <TransactionHistory
                transactions={transactions}
                deleteTransaction={deleteTransaction}
              />
            } />
            <Route path="/goals" element={
              <GoalsPage
                goals={goals}
                addGoal={addGoal}
                setGoals={setGoals}
                deleteGoal={deleteGoal}
                transactions={transactions}
              />
            } />
            <Route path="/settings" element={
              <SettingsPage
                categories={categories}
                setCategories={updateCategories}
                user={session.user}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
