import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://zygjlnjsdhgdghimblqh.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z2psbmpzZGhnZGdoaW1ibHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjIwNDksImV4cCI6MjA5NDc5ODA0OX0.E1yqfIXo0Un9uHdVR5ukN5CRCdhE7oRO0A32rncAez4';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] Variáveis EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY ausentes. Copie .env.example para .env e preencha.',
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: { persistSession: false },
});
