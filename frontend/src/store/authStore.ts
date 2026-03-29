import { create } from 'zustand';
import { authAPI, profilesAPI } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  photo_url?: string;
  designation?: string;
  research_focus?: string;
  bio?: string;
  linkedin_url?: string;
  researchgate_url?: string;
  google_scholar_url?: string;
  orcid_url?: string;
  phone?: string;
  joined_date?: string;
  is_active: boolean;
  is_admin: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error?: string }>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
    try {
      set({ loading: true, error: null });
      
      const token = localStorage.getItem('auth_token');
      if (!token) {
        set({ loading: false });
        return;
      }

      const user = await authAPI.getCurrentUser();
      set({ user, loading: false });
    } catch (error: any) {
      console.error('Error initializing auth:', error);
      localStorage.removeItem('auth_token');
      set({ error: error.message || 'Failed to initialize authentication', loading: false, user: null });
    }
  },

  signInWithGoogle: async () => {
    // Google OAuth not implemented yet in backend
    return { error: 'Google sign-in not available. Please use email/password.' };
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      await authAPI.login(email, password);
      
      // Fetch user data
      const user = await authAPI.getCurrentUser();
      set({ user, loading: false });
      
      return {};
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  signUpWithEmail: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      await authAPI.register(email, password, name);
      
      // Fetch user data
      const user = await authAPI.getCurrentUser();
      set({ user, loading: false });
      
      return {};
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign up';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await authAPI.logout();
      set({ user: null, loading: false });
    } catch (error: any) {
      console.error('Error signing out:', error);
      // Clear user anyway
      localStorage.removeItem('auth_token');
      set({ user: null, error: 'Failed to sign out', loading: false });
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    const { user } = get();
    if (!user) {
      return { error: 'No user logged in' };
    }

    try {
      set({ loading: true, error: null });
      
      const updatedUser = await profilesAPI.update(user.id, updates);
      set({ user: updatedUser, loading: false });

      return {};
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update profile';
      set({ error: errorMessage, loading: false });
      return { error: errorMessage };
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
