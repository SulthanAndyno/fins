import { createClient } from '@supabase/supabase-js'

// 1. Ambil "kunci rahasia" dari file .env dan simpan di variabel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Berikan variabel itu ke Supabase untuk membuat koneksi
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

