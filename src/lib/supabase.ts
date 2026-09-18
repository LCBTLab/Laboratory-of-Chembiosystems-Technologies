import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          photo_url: string | null;
          designation: 'PI' | 'PhD' | 'M.Tech' | 'B.Tech' | 'Staff' | 'Intern' | null;
          research_focus: string | null;
          bio: string | null;
          linkedin_url: string | null;
          researchgate_url: string | null;
          google_scholar_url: string | null;
          orcid_url: string | null;
          phone: string | null;
          joined_date: string | null;
          is_active: boolean;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          photo_url?: string | null;
          designation?: 'PI' | 'PhD' | 'M.Tech' | 'B.Tech' | 'Staff' | 'Intern' | null;
          research_focus?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          researchgate_url?: string | null;
          google_scholar_url?: string | null;
          orcid_url?: string | null;
          phone?: string | null;
          joined_date?: string | null;
          is_active?: boolean;
          is_admin?: boolean;
        };
        Update: {
          email?: string;
          name?: string;
          photo_url?: string | null;
          designation?: 'PI' | 'PhD' | 'M.Tech' | 'B.Tech' | 'Staff' | 'Intern' | null;
          research_focus?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          researchgate_url?: string | null;
          google_scholar_url?: string | null;
          orcid_url?: string | null;
          phone?: string | null;
          joined_date?: string | null;
          is_active?: boolean;
          is_admin?: boolean;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status: 'Planning' | 'Ongoing' | 'Completed' | 'On Hold';
          start_date: string | null;
          end_date: string | null;
          funding_source: string | null;
          funding_amount: number | null;
          collaborators: string[] | null;
          keywords: string[] | null;
          created_by: string;
          team_members: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          status?: 'Planning' | 'Ongoing' | 'Completed' | 'On Hold';
          start_date?: string | null;
          end_date?: string | null;
          funding_source?: string | null;
          funding_amount?: number | null;
          collaborators?: string[] | null;
          keywords?: string[] | null;
          created_by: string;
          team_members?: string[];
        };
        Update: {
          title?: string;
          description?: string | null;
          status?: 'Planning' | 'Ongoing' | 'Completed' | 'On Hold';
          start_date?: string | null;
          end_date?: string | null;
          funding_source?: string | null;
          funding_amount?: number | null;
          collaborators?: string[] | null;
          keywords?: string[] | null;
          team_members?: string[];
        };
      };
      publications: {
        Row: {
          id: string;
          title: string;
          authors: string[];
          journal: string;
          year: number;
          volume: string | null;
          issue: string | null;
          pages: string | null;
          doi: string | null;
          abstract: string | null;
          keywords: string[] | null;
          publication_type: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Patent' | 'Thesis';
          pdf_url: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          authors: string[];
          journal: string;
          year: number;
          volume?: string | null;
          issue?: string | null;
          pages?: string | null;
          doi?: string | null;
          abstract?: string | null;
          keywords?: string[] | null;
          publication_type?: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Patent' | 'Thesis';
          pdf_url?: string | null;
          created_by: string;
        };
        Update: {
          title?: string;
          authors?: string[];
          journal?: string;
          year?: number;
          volume?: string | null;
          issue?: string | null;
          pages?: string | null;
          doi?: string | null;
          abstract?: string | null;
          keywords?: string[] | null;
          publication_type?: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Patent' | 'Thesis';
          pdf_url?: string | null;
        };
      };
      resources: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          category: 'Protocol' | 'Dataset' | 'Software' | 'Presentation' | 'Report' | 'Other';
          is_public: boolean;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          category?: 'Protocol' | 'Dataset' | 'Software' | 'Presentation' | 'Report' | 'Other';
          is_public?: boolean;
          uploaded_by: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          category?: 'Protocol' | 'Dataset' | 'Software' | 'Presentation' | 'Report' | 'Other';
          is_public?: boolean;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: 'News' | 'Achievement' | 'Event' | 'Publication' | 'General';
          is_featured: boolean;
          is_published: boolean;
          published_at: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content: string;
          category?: 'News' | 'Achievement' | 'Event' | 'Publication' | 'General';
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          created_by: string;
        };
        Update: {
          title?: string;
          content?: string;
          category?: 'News' | 'Achievement' | 'Event' | 'Publication' | 'General';
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
        };
      };
    };
  };
};

// Helper functions for authentication
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Helper functions for file uploads
export const uploadFile = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  return { data, error };
};

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  return data.publicUrl;
};