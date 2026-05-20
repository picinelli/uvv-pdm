import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  'https://zygjlnjsdhgdghimblqh.supabase.co'
).trim();

const supabaseAnonKey = (
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z2psbmpzZGhnZGdoaW1ibHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjIwNDksImV4cCI6MjA5NDc5ODA0OX0.E1yqfIXo0Un9uHdVR5ukN5CRCdhE7oRO0A32rncAez4'
).trim();

let client;

export function getSupabaseClient() {
  if (!client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        '[supabase] Defina EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY no .env',
      );
    }
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

export const supabase = {
  get auth() {
    return getSupabaseClient().auth;
  },
  from(...args) {
    return getSupabaseClient().from(...args);
  },
  rpc(...args) {
    return getSupabaseClient().rpc(...args);
  },
};
