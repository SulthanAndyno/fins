import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Layout & Pages
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import GoalsPage from './pages/GoalsPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import GoalDetailPage from './pages/GoalDetailPage';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

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
      
      const defaultCategories = {
        expense: ['Makanan', 'Transportasi', 'Hiburan', 'Tagihan', 'Belanja', 'Investasi/Tujuan', 'Lainnya'],
        income: ['Gaji', 'Bonus', 'Freelance', 'Hadiah', 'Lainnya'],
      };
      
      if (budgetRes.error) {
        const { data } = await supabase.from('budget').insert({ user_id: userId, amount: 5000000, period: 'bulanan' }).select().single();
        setBudget(data);
      } else { setBudget(budgetRes.data); }
      
      if (catRes.error) {
        const { data } = await supabase.from('categories').insert({ user_id: userId, ...defaultCategories }).select().single();
        setCategories(data);
      } else { setCategories(catRes.data); }
      
      setLoading(false);
    };
    if (session) {
      fetchData();
    }
  }, [session]);

  const addTransaction = async (newTransactionData, isInternal = false) => {
    const { data, error } = await supabase.from('transactions').insert({ ...newTransactionData, user_id: session.user.id }).select().single();
    if (error) { if (!isInternal) toast.error('Gagal menyimpan transaksi.'); return; }
    setTransactions(prev => [data, ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
    if (!isInternal) toast.success('Transaksi ditambahkan!');
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) toast.error('Gagal hapus transaksi.');
    else { setTransactions(prev => prev.filter(t => t.id !== id)); toast('Transaksi dihapus.', { icon: '🗑️' }); }
  };

  const addGoal = async (newGoalData) => {
    const { data, error } = await supabase.from('goals').insert({ ...newGoalData, user_id: session.user.id }).select().single();
    if (error) toast.error('Gagal tambah tujuan.');
    else { setGoals(prev => [...prev, data]); toast.success('Tujuan baru ditambahkan!'); }
  };

  const deleteGoal = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) toast.error('Gagal hapus tujuan.');
    else { setGoals(prev => prev.filter(g => g.id !== id)); toast('Tujuan dihapus.', { icon: '🗑️' }); }
  };

  const updateGoalProgress = async (goal, amount) => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const currentBalance = totalIncome - totalExpense;
    if (amount > currentBalance) { toast.error(`Saldo tidak cukup! Saldo Anda hanya Rp ${currentBalance.toLocaleString()}.`); return; }
    const newProgress = Math.min(goal.current + amount, goal.target);
    const { data: updatedGoal, error } = await supabase.from('goals').update({ current: newProgress }).eq('id', goal.id).select().single();
    if (error) { toast.error('Gagal update progres.'); return; }
    await addTransaction({ id: uuidv4(), amount, category: 'Investasi/Tujuan', type: 'expense', date: new Date().toISOString().slice(0, 10) }, true);
    setGoals(prev => prev.map(g => (g.id === updatedGoal.id ? updatedGoal : g)));
    toast.success(`Rp ${amount.toLocaleString()} berhasil ditabung!`);
  };
  
  const updateBudget = async (newBudgetData) => {
    const { data, error } = await supabase.from('budget').update(newBudgetData).eq('user_id', session.user.id).select().single();
    if (error) toast.error('Gagal update budget.');
    else { setBudget(data); toast.success('Budget diperbarui!'); }
  };
  
  const updateCategories = async (newCategories) => {
    const { data, error } = await supabase.from('categories').update(newCategories).eq('user_id', session.user.id).select().single();
    if (error) toast.error('Gagal update kategori.');
    else { setCategories(data); toast.success('Kategori diperbarui!'); }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Memuat...</div>;
  if (!session) return <AuthPage />;
  if (!budget || !categories) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Menyiapkan Akun...</div>;

  return (
    <Router>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-900 text-gray-300">
        {/* --- PERBAIKAN DI SINI: Tambahkan prop setIsOpen --- */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main>
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} addTransaction={addTransaction} budget={budget} updateBudget={updateBudget} goals={goals} addGoal={addGoal} updateGoalProgress={updateGoalProgress} deleteGoal={deleteGoal} categories={categories} />} />
            <Route path="/history" element={<TransactionHistory transactions={transactions} deleteTransaction={deleteTransaction} />} />
            <Route path="/goals" element={<GoalsPage goals={goals} addGoal={addGoal} updateGoalProgress={updateGoalProgress} deleteGoal={deleteGoal} transactions={transactions} />} />
            <Route path="/goals/:goalId" element={<GoalDetailPage goals={goals} />} />
            <Route path="/settings" element={<SettingsPage categories={categories} updateCategories={updateCategories} user={session.user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;