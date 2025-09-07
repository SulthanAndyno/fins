# 💸 FINS - Financial Insight
*Asisten Keuangan Pribadi Berbasis AI*

[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-NETLIFY-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Demo](URL_SCREENSHOT_ATAU_GIF)

🚀 [Lihat Live Demo](https://YOUR-SITE-NAME.netlify.app/)

---

## 📖 Daftar Isi
- [Gambaran Umum Proyek](#-gambaran-umum-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Arsitektur Aplikasi](#-arsitektur-aplikasi)
- [Tumpukan Teknologi](#-tumpukan-teknologi)
- [Panduan Instalasi & Setup](#-panduan-instalasi--setup)
- [Penjelasan Dukungan AI](#-penjelasan-dukungan-ai)
- [Rencana Pengembangan](#-rencana-pengembangan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Gambaran Umum Proyek

**Masalah:**  
Banyak orang mencatat pengeluaran, tapi bingung mengubah data mentah jadi *wawasan nyata*. Akibatnya, keuangan berjalan reaktif, bukan proaktif.

**Solusi FINS:**  
FINS hadir sebagai *jembatan* antara data & keputusan. Dengan UI modern dan dukungan AI (IBM Granite), FINS memberikan:
- Catatan transaksi sederhana  
- Visualisasi data elegan  
- Analisis cerdas berbasis AI  

**Target Pengguna:**  
Mahasiswa, profesional, freelancer, atau siapa pun yang ingin mengelola keuangan dengan teknologi modern.

---

## ✨ Fitur Unggulan
- 🔐 **Autentikasi Aman (Supabase Auth + RLS)**  
- 📊 **Dashboard Futuristik** dengan dark mode + animasi halus  
- 💸 **CRUD Transaksi** dengan filter & pencarian real-time  
- 🎯 **Tujuan Finansial Realistis** (sinkronisasi otomatis ke saldo & grafik)  
- 🧠 **AI Financial Insight (IBM Granite via Replicate)**  
  - Ringkasan kondisi keuangan  
  - 3 rekomendasi praktis  
  - Saran darurat saat over-budget  
- 🔧 **Kustomisasi Kategori** pemasukan/pengeluaran sesuai gaya hidup

---

## 🏗️ Arsitektur Aplikasi
React (Vite) ←→ Supabase (DB + Auth)
↓
Netlify Functions (Proxy)
↓
Replicate API → IBM Granite

yaml
Copy code

- **Frontend:** React SPA (Vite) + Tailwind CSS  
- **Backend:** Supabase (PostgreSQL, Auth, API otomatis, RLS)  
- **Serverless Proxy:** Netlify Functions (menyimpan API Key rahasia)  
- **AI Engine:** IBM Granite (via Replicate API)

---

## 🛠️ Tumpukan Teknologi

| Kategori         | Teknologi                            | Alasan Pemilihan |
|------------------|--------------------------------------|------------------|
| **Frontend**     | React (Vite), Tailwind CSS, React Router | Cepat, modular, UI responsif |
| **Database**     | Supabase (Postgres + Auth)           | API otomatis, RLS, cepat setup |
| **Serverless**   | Netlify Functions                    | Aman, simpan API key, integrasi mulus |
| **AI**           | IBM Granite (via Replicate API)      | Analisis finansial cerdas, output JSON |
| **State Mgmt**   | React Hooks (useState, useEffect)    | Simple & efektif untuk skala saat ini |
| **Deployment**   | Netlify                              | CI/CD otomatis dari GitHub |

---

## 🚀 Panduan Instalasi & Setup

### 1. Clone & Install
```bash
git clone https://github.com/[USERNAME]/[NAMA-REPO].git
cd [NAMA-REPO]
npm install
2. Buat File .env
env
Copy code
# Supabase
VITE_SUPABASE_URL="https://xxx.supabase.co"
VITE_SUPABASE_ANON_KEY="ey..."

# Replicate
REPLICATE_API_TOKEN="r8_..."
3. Setup Database Supabase
Buat tabel: transactions, goals, budget, categories.
Tambahkan RLS policies agar setiap user hanya bisa akses datanya sendiri.

4. Jalankan Lokal
bash
Copy code
netlify login
netlify link
netlify dev
Akses di: http://localhost:8888

🤖 Penjelasan Dukungan AI
Sebagai Partner Dev: AI bantu generate boilerplate, debugging, arsitektur.

Sebagai Fitur Inti: IBM Granite → memberi insight finansial dalam Bahasa Indonesia, ringkas & actionable.

Keamanan: API key aman karena hanya diakses via Netlify Functions.

📜 Lisensi
Proyek ini dilisensikan di bawah MIT License.
Lihat file LICENSE untuk detailnya.
