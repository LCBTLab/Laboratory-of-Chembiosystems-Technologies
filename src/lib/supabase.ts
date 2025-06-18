leimport { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.example.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.example.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          designation: string;
          bio: string;
          research_interests: string;
          ongoing_projects: string[];
          profile_picture_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          designation: string;
          bio?: string;
          research_interests?: string;
          ongoing_projects?: string[];
          profile_picture_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          designation?: string;
          bio?: string;
          research_interests?: string;
          ongoing_projects?: string[];
          profile_picture_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};
