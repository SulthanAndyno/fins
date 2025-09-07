// import React, { useState } from 'react';
// import { supabase } from '../supabaseClient';

// const AuthPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     let error;
//     if (isLogin) {
//       ({ error } = await supabase.auth.signInWithPassword({ email, password }));
//     } else {
//       ({ error } = await supabase.auth.signUp({ email, password }));
//       if (!error) alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
//     }

//     if (error) {
//       alert(error.error_description || error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
//       <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-center">{isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}</h1>
//         <form onSubmit={handleAuth} className="space-y-6">
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
//           <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-500">
//             {loading ? 'Loading...' : (isLogin ? 'Login' : 'Daftar')}
//           </button>
//         </form>
//         <p className="text-center">
//           {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
//           <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-400 hover:underline">
//             {isLogin ? 'Daftar di sini' : 'Login di sini'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Coins, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Komponen untuk animasi teks decoding/glitch
const DecodingText = ({ text }) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayedText, setDisplayedText] = useState('');

  React.useEffect(() => {
    let interval;
    let iteration = 0;
    
    interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((char, index) => {
            if(index < iteration) {
              return text[index];
            }
            // Tambahkan spasi agar tidak terlalu 'noise'
            if (char === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      );
      
      if(iteration >= text.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30); // Percepat sedikit animasinya

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{displayedText}</span>; // Gunakan font mono untuk efek lebih baik
};

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    let error;
    if (isLogin) {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
      if (!error) {
        setSuccessMsg('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
      }
    }

    if (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };
  
  const inputStyle = "w-full p-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
  const buttonStyle = "w-full p-3 bg-blue-600 rounded-lg font-bold text-white uppercase tracking-wider hover:bg-blue-700 disabled:bg-gray-500/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden animated-gradient-bg">
      <div className="grid-overlay z-0"></div>
      <div className="scanline-overlay z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, ease: "easeOut" }} 
            className="flex justify-center items-center gap-3 mb-2"
          >
            <Coins className="text-blue-400" size={48} />
            <h1 className="text-5xl font-bold text-white tracking-tighter">
              <DecodingText text="FINS" />
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-400 text-lg"
          >
            Financial Insight
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
        >
          <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl font-bold text-white">{isLogin ? 'Login' : 'Daftar Akun'}</h2>
          </motion.div>

          <AnimatePresence>
            {errorMsg && <motion.div initial={{opacity:0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="p-3 bg-red-900/50 text-red-300 border border-red-500/50 rounded-lg text-center text-sm">{errorMsg}</motion.div>}
            {successMsg && <motion.div initial={{opacity:0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}} className="p-3 bg-emerald-900/50 text-emerald-300 border border-emerald-500/50 rounded-lg text-center text-sm">{successMsg}</motion.div>}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-400 block mb-2" htmlFor="email">Alamat Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyle} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium text-gray-400 block mb-2" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputStyle} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button type="submit" disabled={loading} className={buttonStyle}>
                {loading ? 'Memproses...' : (isLogin ? <><LogIn size={18} className="inline mr-2"/>Login</> : <><UserPlus size={18} className="inline mr-2"/>Daftar</>)}
              </button>
            </motion.div>
          </form>
          
          <motion.p variants={itemVariants} className="text-center text-sm text-gray-400">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setSuccessMsg(''); }} className="font-semibold text-blue-400 hover:text-blue-300 hover:underline">
              {isLogin ? 'Daftar sekarang' : 'Login di sini'}
            </button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;