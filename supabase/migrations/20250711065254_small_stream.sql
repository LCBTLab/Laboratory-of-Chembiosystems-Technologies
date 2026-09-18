/*
  # Complete Authentication and User Management System

  1. New Tables
    - `profiles` - Extended user profiles with research information
    - `projects` - Research projects managed by users
    - `publications` - Publications authored by users
    - `resources` - Files and resources uploaded by users

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for user data access
    - Secure file upload policies

  3. Authentication
    - Google OAuth integration
    - Email/password authentication
    - Profile creation triggers
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated profiles table
DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  photo_url text,
  designation text CHECK (designation IN ('PI', 'PhD', 'M.Tech', 'B.Tech', 'Staff', 'Intern')),
  research_focus text,
  bio text,
  linkedin_url text,
  researchgate_url text,
  google_scholar_url text,
  orcid_url text,
  phone text,
  joined_date date DEFAULT CURRENT_DATE,
  is_active boolean DEFAULT true,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  status text CHECK (status IN ('Planning', 'Ongoing', 'Completed', 'On Hold')) DEFAULT 'Planning',
  start_date date,
  end_date date,
  funding_source text,
  funding_amount numeric,
  collaborators text[],
  keywords text[],
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  team_members uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create publications table
CREATE TABLE publications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  authors text[] NOT NULL,
  journal text NOT NULL,
  year integer NOT NULL,
  volume text,
  issue text,
  pages text,
  doi text,
  abstract text,
  keywords text[],
  publication_type text CHECK (publication_type IN ('Journal Article', 'Conference Paper', 'Book Chapter', 'Patent', 'Thesis')) DEFAULT 'Journal Article',
  pdf_url text,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE resources (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text,
  file_size bigint,
  category text CHECK (category IN ('Protocol', 'Dataset', 'Software', 'Presentation', 'Report', 'Other')) DEFAULT 'Other',
  is_public boolean DEFAULT false,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create news/announcements table
CREATE TABLE announcements (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  category text CHECK (category IN ('News', 'Achievement', 'Event', 'Publication', 'General')) DEFAULT 'General',
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Projects policies
CREATE POLICY "Anyone can view active projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project creators and team members can update" ON projects
  FOR UPDATE USING (
    auth.uid() = created_by OR 
    auth.uid() = ANY(team_members) OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Project creators and admins can delete" ON projects
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Publications policies
CREATE POLICY "Anyone can view publications" ON publications
  FOR SELECT USING (true);

CREATE POLICY "Users can create publications" ON publications
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Publication creators can update" ON publications
  FOR UPDATE USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Publication creators and admins can delete" ON publications
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Resources policies
CREATE POLICY "Anyone can view public resources" ON resources
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own resources" ON resources
  FOR SELECT USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can upload resources" ON resources
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Resource owners can update" ON resources
  FOR UPDATE USING (
    auth.uid() = uploaded_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Resource owners and admins can delete" ON resources
  FOR DELETE USING (
    auth.uid() = uploaded_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Announcements policies
CREATE POLICY "Anyone can view published announcements" ON announcements
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all announcements" ON announcements
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can create announcements" ON announcements
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Announcement creators and admins can update" ON announcements
  FOR UPDATE USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Announcement creators and admins can delete" ON announcements
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, photo_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_designation ON profiles(designation);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_publications_created_by ON publications(created_by);
CREATE INDEX idx_publications_year ON publications(year);
CREATE INDEX idx_resources_uploaded_by ON resources(uploaded_by);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_announcements_created_by ON announcements(created_by);
CREATE INDEX idx_announcements_is_published ON announcements(is_published);