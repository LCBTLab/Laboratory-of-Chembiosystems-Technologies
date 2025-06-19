import { create } from 'zustand';
import { supabase } from '../supabase'; // make sure this file exports a valid Supabase client

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
  set({ loading: true });

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    // No session at all
    set({ user: null, loading: false });
    return;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    // Invalid or deleted user
    await supabase.auth.signOut(); // Clear the invalid session
    set({ user: null, loading: false });
    return;
  }

  // Valid user
  set({ user: data.user, loading: false });
},

    set({ user: data.user, loading: false });
  },

  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      set({ error: error.message, loading: false });
      return { error: error.message };
    }

    set({ user: data.user, loading: false });
    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
