import { create } from 'zustand';
import { supabase } from '../supabase';

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithOtp: (email: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
    set({ loading: true });
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('User fetch error:', error.message);
    }
    set({ user: data?.user ?? null, loading: false });
  },

  signInWithPassword: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      set({ error: error.message, loading: false });
      return { error: error.message };
    }

    set({ user: data.user, loading: false });
    return { error: null };
  },

  signInWithOtp: async (email) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      set({ error: error.message, loading: false });
      return { error: error.message };
    }

    set({ loading: false });
    return { error: null };
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // or your redirect URL
      },
    });

    if (error) {
      set({ error: error.message });
      return { error: error.message };
    }

    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
