/*
  # Dashboard System Database Schema

  1. New Tables
    - `dashboards` - User dashboards with metadata
    - `widgets` - Individual widgets within dashboards
    - `data_sources` - Configurable data sources for widgets
    - `dashboard_permissions` - Sharing and permission management
    - `dashboard_versions` - Version history and snapshots
    - `dashboard_templates` - Reusable dashboard templates
    - `audit_logs` - Change tracking and auditing

  2. Security
    - Enable RLS on all tables
    - Comprehensive permission policies
    - User isolation and data security

  3. Features
    - Multi-user dashboard management
    - Widget-based composition
    - Data source integration
    - Sharing and permissions
    - Version control
    - Template system
    - Audit logging
*/

-- Create dashboards table
CREATE TABLE dashboards (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  layout jsonb DEFAULT '{}',
  settings jsonb DEFAULT '{}',
  is_public boolean DEFAULT false,
  is_template boolean DEFAULT false,
  template_category text,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now()
);

-- Create data sources table
CREATE TABLE data_sources (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  type text CHECK (type IN ('api', 'database', 'csv', 'json', 'webhook')) NOT NULL,
  connection_config jsonb NOT NULL,
  refresh_interval integer DEFAULT 300, -- seconds
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create widgets table
CREATE TABLE widgets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  dashboard_id uuid REFERENCES dashboards(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  type text CHECK (type IN ('chart', 'table', 'text', 'image', 'metric', 'alert', 'map', 'gauge')) NOT NULL,
  data_source_id uuid REFERENCES data_sources(id) ON DELETE SET NULL,
  config jsonb DEFAULT '{}',
  layout_config jsonb DEFAULT '{}', -- position, size, etc.
  filters jsonb DEFAULT '{}',
  refresh_interval integer DEFAULT 300,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dashboard permissions table
CREATE TABLE dashboard_permissions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  dashboard_id uuid REFERENCES dashboards(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  permission_type text CHECK (permission_type IN ('view', 'edit', 'admin')) NOT NULL,
  granted_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  granted_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  UNIQUE(dashboard_id, user_id)
);

-- Create dashboard versions table
CREATE TABLE dashboard_versions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  dashboard_id uuid REFERENCES dashboards(id) ON DELETE CASCADE NOT NULL,
  version_number integer NOT NULL,
  title text NOT NULL,
  layout jsonb NOT NULL,
  settings jsonb DEFAULT '{}',
  widgets_snapshot jsonb NOT NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(dashboard_id, version_number)
);

-- Create dashboard templates table
CREATE TABLE dashboard_templates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  template_data jsonb NOT NULL,
  preview_image text,
  is_public boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create audit logs table
CREATE TABLE audit_logs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  entity_type text NOT NULL, -- 'dashboard', 'widget', 'data_source'
  entity_id uuid NOT NULL,
  action text NOT NULL, -- 'create', 'update', 'delete', 'share', 'clone'
  old_values jsonb,
  new_values jsonb,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Dashboard policies
CREATE POLICY "Users can view own dashboards" ON dashboards
  FOR SELECT USING (
    created_by = auth.uid() OR
    is_public = true OR
    EXISTS (
      SELECT 1 FROM dashboard_permissions 
      WHERE dashboard_id = dashboards.id 
      AND user_id = auth.uid()
      AND (expires_at IS NULL OR expires_at > now())
    )
  );

CREATE POLICY "Users can create dashboards" ON dashboards
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own dashboards or with edit permission" ON dashboards
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM dashboard_permissions 
      WHERE dashboard_id = dashboards.id 
      AND user_id = auth.uid()
      AND permission_type IN ('edit', 'admin')
      AND (expires_at IS NULL OR expires_at > now())
    )
  );

CREATE POLICY "Users can delete own dashboards or with admin permission" ON dashboards
  FOR DELETE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM dashboard_permissions 
      WHERE dashboard_id = dashboards.id 
      AND user_id = auth.uid()
      AND permission_type = 'admin'
      AND (expires_at IS NULL OR expires_at > now())
    )
  );

-- Data source policies
CREATE POLICY "Users can view own data sources" ON data_sources
  FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can create data sources" ON data_sources
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own data sources" ON data_sources
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete own data sources" ON data_sources
  FOR DELETE USING (created_by = auth.uid());

-- Widget policies
CREATE POLICY "Users can view widgets of accessible dashboards" ON widgets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id
      AND (
        dashboards.created_by = auth.uid() OR
        dashboards.is_public = true OR
        EXISTS (
          SELECT 1 FROM dashboard_permissions 
          WHERE dashboard_permissions.dashboard_id = dashboards.id 
          AND dashboard_permissions.user_id = auth.uid()
          AND (dashboard_permissions.expires_at IS NULL OR dashboard_permissions.expires_at > now())
        )
      )
    )
  );

CREATE POLICY "Users can create widgets in own dashboards" ON widgets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id
      AND dashboards.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update widgets in editable dashboards" ON widgets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id
      AND (
        dashboards.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM dashboard_permissions 
          WHERE dashboard_permissions.dashboard_id = dashboards.id 
          AND dashboard_permissions.user_id = auth.uid()
          AND dashboard_permissions.permission_type IN ('edit', 'admin')
          AND (dashboard_permissions.expires_at IS NULL OR dashboard_permissions.expires_at > now())
        )
      )
    )
  );

CREATE POLICY "Users can delete widgets in own dashboards" ON widgets
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id
      AND dashboards.created_by = auth.uid()
    )
  );

-- Dashboard permissions policies
CREATE POLICY "Users can view permissions for own dashboards" ON dashboard_permissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = dashboard_permissions.dashboard_id
      AND dashboards.created_by = auth.uid()
    ) OR
    user_id = auth.uid()
  );

CREATE POLICY "Dashboard owners can manage permissions" ON dashboard_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = dashboard_permissions.dashboard_id
      AND dashboards.created_by = auth.uid()
    )
  );

-- Dashboard versions policies
CREATE POLICY "Users can view versions of accessible dashboards" ON dashboard_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = dashboard_versions.dashboard_id
      AND (
        dashboards.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM dashboard_permissions 
          WHERE dashboard_permissions.dashboard_id = dashboards.id 
          AND dashboard_permissions.user_id = auth.uid()
          AND (dashboard_permissions.expires_at IS NULL OR dashboard_permissions.expires_at > now())
        )
      )
    )
  );

CREATE POLICY "Users can create versions for editable dashboards" ON dashboard_versions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = dashboard_versions.dashboard_id
      AND (
        dashboards.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM dashboard_permissions 
          WHERE dashboard_permissions.dashboard_id = dashboards.id 
          AND dashboard_permissions.user_id = auth.uid()
          AND dashboard_permissions.permission_type IN ('edit', 'admin')
          AND (dashboard_permissions.expires_at IS NULL OR dashboard_permissions.expires_at > now())
        )
      )
    )
  );

-- Template policies
CREATE POLICY "Anyone can view public templates" ON dashboard_templates
  FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create templates" ON dashboard_templates
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own templates" ON dashboard_templates
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete own templates" ON dashboard_templates
  FOR DELETE USING (created_by = auth.uid());

-- Audit log policies
CREATE POLICY "Users can view audit logs for their entities" ON audit_logs
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = audit_logs.entity_id::uuid
      AND dashboards.created_by = auth.uid()
    )
  );

CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_dashboards_created_by ON dashboards(created_by);
CREATE INDEX idx_dashboards_is_public ON dashboards(is_public);
CREATE INDEX idx_dashboards_is_template ON dashboards(is_template);
CREATE INDEX idx_dashboards_updated_at ON dashboards(updated_at);

CREATE INDEX idx_widgets_dashboard_id ON widgets(dashboard_id);
CREATE INDEX idx_widgets_type ON widgets(type);
CREATE INDEX idx_widgets_data_source_id ON widgets(data_source_id);

CREATE INDEX idx_data_sources_created_by ON data_sources(created_by);
CREATE INDEX idx_data_sources_type ON data_sources(type);
CREATE INDEX idx_data_sources_is_active ON data_sources(is_active);

CREATE INDEX idx_dashboard_permissions_dashboard_id ON dashboard_permissions(dashboard_id);
CREATE INDEX idx_dashboard_permissions_user_id ON dashboard_permissions(user_id);
CREATE INDEX idx_dashboard_permissions_expires_at ON dashboard_permissions(expires_at);

CREATE INDEX idx_dashboard_versions_dashboard_id ON dashboard_versions(dashboard_id);
CREATE INDEX idx_dashboard_versions_created_at ON dashboard_versions(created_at);

CREATE INDEX idx_dashboard_templates_category ON dashboard_templates(category);
CREATE INDEX idx_dashboard_templates_is_public ON dashboard_templates(is_public);

CREATE INDEX idx_audit_logs_entity_type_id ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create functions for versioning
CREATE OR REPLACE FUNCTION create_dashboard_version()
RETURNS trigger AS $$
BEGIN
  -- Create a new version when dashboard is updated
  INSERT INTO dashboard_versions (
    dashboard_id,
    version_number,
    title,
    layout,
    settings,
    widgets_snapshot,
    created_by
  )
  SELECT 
    NEW.id,
    COALESCE((
      SELECT MAX(version_number) + 1 
      FROM dashboard_versions 
      WHERE dashboard_id = NEW.id
    ), 1),
    NEW.title,
    NEW.layout,
    NEW.settings,
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', id,
          'title', title,
          'type', type,
          'config', config,
          'layout_config', layout_config,
          'filters', filters
        )
      )
      FROM widgets 
      WHERE dashboard_id = NEW.id
    ),
    NEW.created_by;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for dashboard versioning
CREATE TRIGGER dashboard_versioning_trigger
  AFTER UPDATE ON dashboards
  FOR EACH ROW
  WHEN (OLD.layout IS DISTINCT FROM NEW.layout OR OLD.settings IS DISTINCT FROM NEW.settings)
  EXECUTE FUNCTION create_dashboard_version();

-- Create function for audit logging
CREATE OR REPLACE FUNCTION log_dashboard_changes()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (entity_type, entity_id, action, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'create', to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (entity_type, entity_id, action, old_values, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'update', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (entity_type, entity_id, action, old_values, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, 'delete', to_jsonb(OLD), auth.uid());
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers
CREATE TRIGGER audit_dashboards_trigger
  AFTER INSERT OR UPDATE OR DELETE ON dashboards
  FOR EACH ROW EXECUTE FUNCTION log_dashboard_changes();

CREATE TRIGGER audit_widgets_trigger
  AFTER INSERT OR UPDATE OR DELETE ON widgets
  FOR EACH ROW EXECUTE FUNCTION log_dashboard_changes();

CREATE TRIGGER audit_data_sources_trigger
  AFTER INSERT OR UPDATE OR DELETE ON data_sources
  FOR EACH ROW EXECUTE FUNCTION log_dashboard_changes();

-- Insert some default templates
INSERT INTO dashboard_templates (name, description, category, template_data, is_public, created_by) VALUES
(
  'Research Analytics Dashboard',
  'Template for tracking research metrics, publications, and project progress',
  'Research',
  '{
    "layout": {"type": "grid", "columns": 12, "rows": 8},
    "widgets": [
      {
        "type": "metric",
        "title": "Total Publications",
        "config": {"metric_type": "count", "color": "blue"},
        "layout": {"x": 0, "y": 0, "w": 3, "h": 2}
      },
      {
        "type": "chart",
        "title": "Publications by Year",
        "config": {"chart_type": "line", "x_axis": "year", "y_axis": "count"},
        "layout": {"x": 3, "y": 0, "w": 6, "h": 4}
      },
      {
        "type": "table",
        "title": "Recent Publications",
        "config": {"columns": ["title", "journal", "year"], "page_size": 10},
        "layout": {"x": 0, "y": 4, "w": 12, "h": 4}
      }
    ]
  }',
  true,
  (SELECT id FROM profiles WHERE email = 'prodyut.dhar@iitbhu.ac.in' LIMIT 1)
),
(
  'Project Management Dashboard',
  'Template for tracking project status, timelines, and team progress',
  'Management',
  '{
    "layout": {"type": "grid", "columns": 12, "rows": 8},
    "widgets": [
      {
        "type": "gauge",
        "title": "Project Completion",
        "config": {"min": 0, "max": 100, "unit": "%"},
        "layout": {"x": 0, "y": 0, "w": 4, "h": 3}
      },
      {
        "type": "chart",
        "title": "Project Timeline",
        "config": {"chart_type": "gantt"},
        "layout": {"x": 4, "y": 0, "w": 8, "h": 4}
      },
      {
        "type": "table",
        "title": "Team Tasks",
        "config": {"columns": ["task", "assignee", "status", "due_date"]},
        "layout": {"x": 0, "y": 4, "w": 12, "h": 4}
      }
    ]
  }',
  true,
  (SELECT id FROM profiles WHERE email = 'prodyut.dhar@iitbhu.ac.in' LIMIT 1)
);