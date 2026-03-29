import { useState } from 'react';

interface Widget {
  id: string;
  dashboard_id: string;
  type: string;
  config: any;
  position: any;
  created_at: string;
}

interface UseWidgetsReturn {
  widgets: Widget[];
  loading: boolean;
  error: string | null;
  createWidget: (widget: Partial<Widget>) => Promise<void>;
  updateWidget: (id: string, updates: Partial<Widget>) => Promise<void>;
  deleteWidget: (id: string) => Promise<void>;
  getWidgetData: (widgetId?: string) => Promise<any>;
}

export const useWidgets = (dashboardId?: string): UseWidgetsReturn => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWidget = async (widget: Partial<Widget>) => {
    // Stub implementation
    console.log('Widget created:', widget);
  };

  const updateWidget = async (id: string, updates: Partial<Widget>) => {
    // Stub implementation
    console.log('Widget updated:', id, updates);
  };

  const deleteWidget = async (id: string) => {
    // Stub implementation
    console.log('Widget deleted:', id);
  };

  const getWidgetData = async (widgetId?: string) => {
    // Stub implementation
    return null;
  };

  return {
    widgets,
    loading,
    error,
    createWidget,
    updateWidget,
    deleteWidget,
    getWidgetData,
  };
};
