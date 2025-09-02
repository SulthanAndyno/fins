import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let error;
    if (isLogin) {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
      if (!error) alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
    }

    if (error) {
      alert(error.error_description || error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">{isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}</h1>
        <form onSubmit={handleAuth} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-500">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Daftar')}
          </button>
        </form>
        <p className="text-center">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-400 hover:underline">
            {isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;