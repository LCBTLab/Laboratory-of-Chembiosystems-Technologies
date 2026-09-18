-- CMS Publications
CREATE TABLE cms_publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text[] NOT NULL DEFAULT '{}',
  journal text NOT NULL DEFAULT '',
  year int NOT NULL,
  volume text,
  issue text,
  pages text,
  doi text,
  category text NOT NULL DEFAULT 'Sustainable Materials',
  keywords text[] NOT NULL DEFAULT '{}',
  graphical_abstract text,
  impact_factor numeric,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_publications" ON cms_publications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_publications" ON cms_publications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_publications" ON cms_publications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_publications" ON cms_publications FOR DELETE TO authenticated USING (true);

-- CMS Patents
CREATE TABLE cms_patents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  inventors text[] NOT NULL DEFAULT '{}',
  application_number text NOT NULL DEFAULT '',
  patent_number text,
  status text NOT NULL DEFAULT 'Filed',
  date text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  technology text,
  graphical_abstract text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_patents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_patents" ON cms_patents FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_patents" ON cms_patents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_patents" ON cms_patents FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_patents" ON cms_patents FOR DELETE TO authenticated USING (true);

-- CMS Team Members
CREATE TABLE cms_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  fellowship text NOT NULL DEFAULT '',
  degree text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  email text,
  linkedin text,
  specialization text,
  is_alumni boolean NOT NULL DEFAULT false,
  placed_in text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_team" ON cms_team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_team" ON cms_team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_team" ON cms_team_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_team" ON cms_team_members FOR DELETE TO authenticated USING (true);

-- CMS Research Projects
CREATE TABLE cms_research_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  awarding_agency text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'P.I.',
  year text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Ongoing',
  description text NOT NULL DEFAULT '',
  image text,
  tags text[] NOT NULL DEFAULT '{}',
  project_type text NOT NULL DEFAULT 'research',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_research_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_projects" ON cms_research_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_projects" ON cms_research_projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_projects" ON cms_research_projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_projects" ON cms_research_projects FOR DELETE TO authenticated USING (true);

-- CMS Awards
CREATE TABLE cms_awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  organization text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'international',
  highlight boolean NOT NULL DEFAULT false,
  link text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_awards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_awards" ON cms_awards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_awards" ON cms_awards FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_awards" ON cms_awards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_awards" ON cms_awards FOR DELETE TO authenticated USING (true);

-- CMS Gallery Items
CREATE TABLE cms_gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Research',
  image text NOT NULL DEFAULT '',
  description text,
  date text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_gallery" ON cms_gallery_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_gallery" ON cms_gallery_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_gallery" ON cms_gallery_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_gallery" ON cms_gallery_items FOR DELETE TO authenticated USING (true);

-- CMS Opportunities
CREATE TABLE cms_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'PhD',
  duration text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  requirements text[] NOT NULL DEFAULT '{}',
  benefits text[] NOT NULL DEFAULT '{}',
  deadline text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_opportunities" ON cms_opportunities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_opportunities" ON cms_opportunities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_opportunities" ON cms_opportunities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_opportunities" ON cms_opportunities FOR DELETE TO authenticated USING (true);

-- CMS News
CREATE TABLE cms_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  date text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  external_links jsonb,
  video_links jsonb,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_news" ON cms_news FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_news" ON cms_news FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_news" ON cms_news FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_news" ON cms_news FOR DELETE TO authenticated USING (true);

-- CMS PI Info (single-row table)
CREATE TABLE cms_pi_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Dr. Prodyut Dhar',
  title text NOT NULL DEFAULT 'Principal Investigator & Assistant Professor',
  photo text NOT NULL DEFAULT '',
  bio_paragraphs text[] NOT NULL DEFAULT '{}',
  qualifications text[] NOT NULL DEFAULT '{}',
  expertise text[] NOT NULL DEFAULT '{}',
  email text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  google_scholar_url text,
  orcid_url text,
  linkedin_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_pi_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_pi_info" ON cms_pi_info FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_pi_info" ON cms_pi_info FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_pi_info" ON cms_pi_info FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_pi_info" ON cms_pi_info FOR DELETE TO authenticated USING (true);

-- CMS Site Settings (single-row table)
CREATE TABLE cms_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_name text NOT NULL DEFAULT 'Laboratory of Chembiosystems Technologies',
  institution text NOT NULL DEFAULT 'IIT (BHU) Varanasi',
  tagline text NOT NULL DEFAULT 'Exploring the Interface of Chemistry and Biology for Sustainable Solutions',
  hero_description text NOT NULL DEFAULT '',
  hero_images text[] NOT NULL DEFAULT '{}',
  quote_banner text NOT NULL DEFAULT '',
  stat_projects text NOT NULL DEFAULT '15+',
  stat_publications text NOT NULL DEFAULT '25+',
  stat_team text NOT NULL DEFAULT '12',
  stat_years text NOT NULL DEFAULT '5+',
  contact_address text[] NOT NULL DEFAULT '{}',
  contact_emails text[] NOT NULL DEFAULT '{}',
  contact_phones text[] NOT NULL DEFAULT '{}',
  contact_hours text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_settings" ON cms_site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_settings" ON cms_site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_settings" ON cms_site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_settings" ON cms_site_settings FOR DELETE TO authenticated USING (true);