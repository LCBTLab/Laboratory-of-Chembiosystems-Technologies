// Dashboard system type definitions

export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  layout: DashboardLayout;
  settings: DashboardSettings;
  is_public: boolean;
  is_template: boolean;
  template_category?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
}

export interface DashboardLayout {
  type: 'grid' | 'flex';
  columns?: number;
  rows?: number;
  gap?: number;
  responsive?: boolean;
}

export interface DashboardSettings {
  theme?: 'light' | 'dark' | 'auto';
  refresh_interval?: number;
  auto_refresh?: boolean;
  show_grid?: boolean;
  snap_to_grid?: boolean;
  allow_overlap?: boolean;
}

export interface Widget {
  id: string;
  dashboard_id: string;
  title: string;
  type: WidgetType;
  data_source_id?: string;
  config: WidgetConfig;
  layout_config: WidgetLayoutConfig;
  filters: WidgetFilters;
  refresh_interval: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export type WidgetType = 
  | 'chart' 
  | 'table' 
  | 'text' 
  | 'image' 
  | 'metric' 
  | 'alert' 
  | 'map' 
  | 'gauge';

export interface WidgetConfig {
  // Chart specific
  chart_type?: 'line' | 'bar' | 'pie' | 'scatter' | 'area' | 'gantt';
  x_axis?: string;
  y_axis?: string;
  color_scheme?: string[];
  
  // Table specific
  columns?: string[];
  page_size?: number;
  sortable?: boolean;
  searchable?: boolean;
  
  // Metric specific
  metric_type?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  unit?: string;
  color?: string;
  target_value?: number;
  
  // Gauge specific
  min?: number;
  max?: number;
  thresholds?: Array<{value: number; color: string}>;
  
  // Text specific
  content?: string;
  markdown?: boolean;
  
  // Image specific
  src?: string;
  alt?: string;
  
  // Alert specific
  condition?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  
  // Map specific
  center?: [number, number];
  zoom?: number;
  markers?: Array<{lat: number; lng: number; label: string}>;
}

export interface WidgetLayoutConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  resizable?: boolean;
  draggable?: boolean;
}

export interface WidgetFilters {
  [key: string]: any;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  connection_config: DataSourceConfig;
  refresh_interval: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type DataSourceType = 'api' | 'database' | 'csv' | 'json' | 'webhook';

export interface DataSourceConfig {
  // API specific
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: string;
  
  // Database specific
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  query?: string;
  
  // CSV specific
  file_url?: string;
  delimiter?: string;
  has_header?: boolean;
  
  // JSON specific
  json_data?: any;
  
  // Webhook specific
  webhook_url?: string;
  secret?: string;
}

export interface DashboardPermission {
  id: string;
  dashboard_id: string;
  user_id?: string;
  permission_type: 'view' | 'edit' | 'admin';
  granted_by: string;
  granted_at: string;
  expires_at?: string;
}

export interface DashboardVersion {
  id: string;
  dashboard_id: string;
  version_number: number;
  title: string;
  layout: DashboardLayout;
  settings: DashboardSettings;
  widgets_snapshot: Widget[];
  created_by: string;
  created_at: string;
}

export interface DashboardTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  template_data: {
    layout: DashboardLayout;
    widgets: Partial<Widget>[];
  };
  preview_image?: string;
  is_public: boolean;
  usage_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'share' | 'clone';
  old_values?: any;
  new_values?: any;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// API Response types
export interface DashboardListResponse {
  dashboards: Dashboard[];
  total: number;
  page: number;
  limit: number;
}

export interface WidgetDataResponse {
  data: any[];
  metadata?: {
    total_rows?: number;
    columns?: string[];
    last_updated?: string;
  };
}

// Form types
export interface CreateDashboardForm {
  title: string;
  description?: string;
  template_id?: string;
  is_public?: boolean;
}

export interface CreateWidgetForm {
  title: string;
  type: WidgetType;
  data_source_id?: string;
  config: Partial<WidgetConfig>;
  layout_config: WidgetLayoutConfig;
}

export interface CreateDataSourceForm {
  name: string;
  type: DataSourceType;
  connection_config: Partial<DataSourceConfig>;
  refresh_interval?: number;
}

export interface ShareDashboardForm {
  user_email?: string;
  permission_type: 'view' | 'edit' | 'admin';
  expires_at?: string;
  make_public?: boolean;
}

// Hook return types
export interface UseDashboardsReturn {
  dashboards: Dashboard[];
  loading: boolean;
  error: string | null;
  createDashboard: (data: CreateDashboardForm) => Promise<Dashboard>;
  updateDashboard: (id: string, data: Partial<Dashboard>) => Promise<Dashboard>;
  deleteDashboard: (id: string) => Promise<void>;
  cloneDashboard: (id: string, title: string) => Promise<Dashboard>;
  shareDashboard: (id: string, data: ShareDashboardForm) => Promise<void>;
  refreshDashboards: () => Promise<void>;
}

export interface UseWidgetsReturn {
  widgets: Widget[];
  loading: boolean;
  error: string | null;
  createWidget: (data: CreateWidgetForm) => Promise<Widget>;
  updateWidget: (id: string, data: Partial<Widget>) => Promise<Widget>;
  deleteWidget: (id: string) => Promise<void>;
  getWidgetData: (id: string) => Promise<WidgetDataResponse>;
  refreshWidgets: () => Promise<void>;
}

export interface UseDataSourcesReturn {
  dataSources: DataSource[];
  loading: boolean;
  error: string | null;
  createDataSource: (data: CreateDataSourceForm) => Promise<DataSource>;
  updateDataSource: (id: string, data: Partial<DataSource>) => Promise<DataSource>;
  deleteDataSource: (id: string) => Promise<void>;
  testDataSource: (config: DataSourceConfig) => Promise<boolean>;
  refreshDataSources: () => Promise<void>;
}