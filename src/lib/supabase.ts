import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Don't throw when env vars are missing: that would crash the whole app (blank page).
// Public pages still render; login and CMS requests fail gracefully until configured.
if (!isSupabaseConfigured) {
  console.warn("Missing Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY). Login and CMS features are disabled.")
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)

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
          category?: 'News' | 'Achievement' | 'Event' | 'Publication' | 'Generic';
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          created_by: string;
        };
        Update: {
          title?: string;
          content?: string;
          category?: 'News' | 'Achievement' | 'Event' | 'Publication' | 'Generic';
          is_featured?: boolean;
          is_published?: boolean;
          published_at?: string | null;
        };
      };
      cms_publications: {
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
          category: string;
          keywords: string[];
          graphical_abstract: string | null;
          impact_factor: number | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          authors?: string[];
          journal?: string;
          year: number;
          volume?: string | null;
          issue?: string | null;
          pages?: string | null;
          doi?: string | null;
          category?: string;
          keywords?: string[];
          graphical_abstract?: string | null;
          impact_factor?: number | null;
          sort_order?: number;
          is_published?: boolean;
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
          category?: string;
          keywords?: string[];
          graphical_abstract?: string | null;
          impact_factor?: number | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_patents: {
        Row: {
          id: string;
          title: string;
          inventors: string[];
          application_number: string;
          patent_number: string | null;
          status: string;
          date: string;
          description: string;
          technology: string | null;
          graphical_abstract: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          inventors?: string[];
          application_number?: string;
          patent_number?: string | null;
          status?: string;
          date?: string;
          description?: string;
          technology?: string | null;
          graphical_abstract?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          inventors?: string[];
          application_number?: string;
          patent_number?: string | null;
          status?: string;
          date?: string;
          description?: string;
          technology?: string | null;
          graphical_abstract?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_team_members: {
        Row: {
          id: string;
          name: string;
          fellowship: string;
          degree: string;
          year: string;
          image: string;
          email: string | null;
          linkedin: string | null;
          specialization: string | null;
          is_alumni: boolean;
          placed_in: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          fellowship?: string;
          degree?: string;
          year?: string;
          image?: string;
          email?: string | null;
          linkedin?: string | null;
          specialization?: string | null;
          is_alumni?: boolean;
          placed_in?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          name?: string;
          fellowship?: string;
          degree?: string;
          year?: string;
          image?: string;
          email?: string | null;
          linkedin?: string | null;
          specialization?: string | null;
          is_alumni?: boolean;
          placed_in?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_research_projects: {
        Row: {
          id: string;
          title: string;
          awarding_agency: string;
          role: string;
          year: string;
          status: string;
          description: string;
          image: string | null;
          tags: string[];
          project_type: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          awarding_agency?: string;
          role?: string;
          year?: string;
          status?: string;
          description?: string;
          image?: string | null;
          tags?: string[];
          project_type?: string;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          awarding_agency?: string;
          role?: string;
          year?: string;
          status?: string;
          description?: string;
          image?: string | null;
          tags?: string[];
          project_type?: string;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_awards: {
        Row: {
          id: string;
          year: string;
          title: string;
          organization: string;
          description: string;
          category: string;
          highlight: boolean;
          link: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          year: string;
          title: string;
          organization?: string;
          description?: string;
          category?: string;
          highlight?: boolean;
          link?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          year?: string;
          title?: string;
          organization?: string;
          description?: string;
          category?: string;
          highlight?: boolean;
          link?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_gallery_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          image: string;
          description: string | null;
          date: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category?: string;
          image?: string;
          description?: string | null;
          date?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          category?: string;
          image?: string;
          description?: string | null;
          date?: string | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_opportunities: {
        Row: {
          id: string;
          title: string;
          type: string;
          duration: string;
          description: string;
          requirements: string[];
          benefits: string[];
          deadline: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          type?: string;
          duration?: string;
          description?: string;
          requirements?: string[];
          benefits?: string[];
          deadline?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          title?: string;
          type?: string;
          duration?: string;
          description?: string;
          requirements?: string[];
          benefits?: string[];
          deadline?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      cms_news: {
        Row: {
          id: string;
          title: string;
          category: string;
          date: string;
          author: string;
          excerpt: string;
          content: string;
          image: string;
          tags: string[];
          featured: boolean;
          external_links: { title: string; url: string }[] | null;
          video_links: { title: string; url: string }[] | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category?: string;
          date?: string;
          author?: string;
          excerpt?: string;
          content?: string;
          image?: string;
          tags?: string[];
          featured?: boolean;
          external_links?: { title: string; url: string }[] | null;
          video_links?: { title: string; url: string }[] | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          category?: string;
          date?: string;
          author?: string;
          excerpt?: string;
          content?: string;
          image?: string;
          tags?: string[];
          featured?: boolean;
          external_links?: { title: string; url: string }[] | null;
          video_links?: { title: string; url: string }[] | null;
          sort_order?: number;
          is_published?: boolean;
        };
      };
      cms_pi_info: {
        Row: {
          id: string;
          name: string;
          title: string;
          photo: string;
          bio_paragraphs: string[];
          qualifications: string[];
          expertise: string[];
          email: string;
          location: string;
          google_scholar_url: string | null;
          orcid_url: string | null;
          linkedin_url: string | null;
          updated_at: string;
        };
        Insert: {
          name?: string;
          title?: string;
          photo?: string;
          bio_paragraphs?: string[];
          qualifications?: string[];
          expertise?: string[];
          email?: string;
          location?: string;
          google_scholar_url?: string | null;
          orcid_url?: string | null;
          linkedin_url?: string | null;
        };
        Update: {
          name?: string;
          title?: string;
          photo?: string;
          bio_paragraphs?: string[];
          qualifications?: string[];
          expertise?: string[];
          email?: string;
          location?: string;
          google_scholar_url?: string | null;
          orcid_url?: string | null;
          linkedin_url?: string | null;
        };
      };
      cms_site_settings: {
        Row: {
          id: string;
          lab_name: string;
          institution: string;
          tagline: string;
          hero_description: string;
          hero_images: string[];
          quote_banner: string;
          stat_projects: string;
          stat_publications: string;
          stat_team: string;
          stat_years: string;
          contact_address: string[];
          contact_emails: string[];
          contact_phones: string[];
          contact_hours: string[];
          updated_at: string;
        };
        Insert: {
          lab_name?: string;
          institution?: string;
          tagline?: string;
          hero_description?: string;
          hero_images?: string[];
          quote_banner?: string;
          stat_projects?: string;
          stat_publications?: string;
          stat_team?: string;
          stat_years?: string;
          contact_address?: string[];
          contact_emails?: string[];
          contact_phones?: string[];
          contact_hours?: string[];
        };
        Update: {
          lab_name?: string;
          institution?: string;
          tagline?: string;
          hero_description?: string;
          hero_images?: string[];
          quote_banner?: string;
          stat_projects?: string;
          stat_publications?: string;
          stat_team?: string;
          stat_years?: string;
          contact_address?: string[];
          contact_emails?: string[];
          contact_phones?: string[];
          contact_hours?: string[];
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