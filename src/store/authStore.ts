import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut as supabaseSignOut } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,

  initialize: async () => {
    try {
      set({ loading: true, error: null });
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        set({ loading: false, error: sessionError.message });
        return;
      }

      if (session?.user) {
        set({ user: session.user });
        await get().fetchProfile();
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          set({ user: session.user, error: null });
          await get().fetchProfile();
        } else {
          set({ user: null, profile: null });
        }
        
        set({ loading: false });
      });

    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ error: 'Failed to initialize authentication', loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await signInWithGoogle();
      
      if (error) {
        set({ error: error.message, loading: false });
        return { error: error.message };
      }
      
      // Don't set loading to false here - let the auth state change handler do it
      return {};
    } catch (error) {
      const errorMessage = 'Failed to sign in with Google';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await signInWithEmail(email, password);
      
      if (error) {
        set({ error: error.message, loading: false });
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      const errorMessage = 'Failed to sign in';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  signUpWithEmail: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await signUpWithEmail(email, password, name);
      
      if (error) {
        set({ error: error.message, loading: false });
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      const errorMessage = 'Failed to sign up';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabaseSignOut();
      set({ user: null, profile: null, loading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: 'Failed to sign out', loading: false });
    }
  },

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, it will be created by the trigger
          console.log('Profile not found, will be created automatically');
          return;
        }
        console.error('Error fetching profile:', error);
        set({ error: error.message });
        return;
      }

      if (data) {
        set({ profile: data });
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      set({ error: 'Failed to fetch profile' });
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const { user, profile } = get();
    if (!user || !profile) {
      return { error: 'No user logged in' };
    }

    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { error: error.message };
      }

      if (data) {
        set({ profile: data, loading: false });
      }

      return {};
    } catch (error) {
      const errorMessage = 'Failed to update profile';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));