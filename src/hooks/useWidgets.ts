import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { 
  Widget, 
  CreateWidgetForm, 
  WidgetDataResponse,
  UseWidgetsReturn 
} from '../types/dashboard';

export const useWidgets = (dashboardId?: string): UseWidgetsReturn => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchWidgets = useCallback(async () => {
    if (!user || !dashboardId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('widgets')
        .select('*')
        .eq('dashboard_id', dashboardId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      setWidgets(data || []);
    } catch (err) {
      console.error('Error fetching widgets:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch widgets');
    } finally {
      setLoading(false);
    }
  }, [user, dashboardId]);

  const createWidget = useCallback(async (data: CreateWidgetForm): Promise<Widget> => {
    if (!user || !dashboardId) throw new Error('User not authenticated or dashboard not specified');

    try {
      setError(null);

      const widgetData = {
        ...data,
        dashboard_id: dashboardId,
        filters: {},
        refresh_interval: 300,
        is_visible: true
      };

      const { data: newWidget, error: createError } = await supabase
        .from('widgets')
        .insert(widgetData)
        .select()
        .single();

      if (createError) throw createError;

      setWidgets(prev => [...prev, newWidget]);
      return newWidget;
    } catch (err) {
      console.error('Error creating widget:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create widget';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user, dashboardId]);

  const updateWidget = useCallback(async (id: string, data: Partial<Widget>): Promise<Widget> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data: updatedWidget, error: updateError } = await supabase
        .from('widgets')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      setWidgets(prev => 
        prev.map(widget => 
          widget.id === id ? updatedWidget : widget
        )
      );

      return updatedWidget;
    } catch (err) {
      console.error('Error updating widget:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update widget';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const deleteWidget = useCallback(async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('widgets')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setWidgets(prev => prev.filter(widget => widget.id !== id));
    } catch (err) {
      console.error('Error deleting widget:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete widget';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const getWidgetData = useCallback(async (id: string): Promise<WidgetDataResponse> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      // Get widget with data source
      const { data: widget, error: widgetError } = await supabase
        .from('widgets')
        .select(`
          *,
          data_sources (*)
        `)
        .eq('id', id)
        .single();

      if (widgetError) throw widgetError;

      if (!widget.data_sources) {
        return { data: [] };
      }

      const dataSource = widget.data_sources;

      // Fetch data based on data source type
      let data: any[] = [];
      
      switch (dataSource.type) {
        case 'api':
          const response = await fetch(dataSource.connection_config.url, {
            method: dataSource.connection_config.method || 'GET',
            headers: dataSource.connection_config.headers || {},
          });
          data = await response.json();
          break;
          
        case 'json':
          data = dataSource.connection_config.json_data || [];
          break;
          
        case 'csv':
          // For CSV, you'd need to implement CSV parsing
          // This is a simplified example
          data = [];
          break;
          
        default:
          data = [];
      }

      return {
        data: Array.isArray(data) ? data : [data],
        metadata: {
          total_rows: Array.isArray(data) ? data.length : 1,
          last_updated: new Date().toISOString()
        }
      };
    } catch (err) {
      console.error('Error fetching widget data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch widget data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const refreshWidgets = useCallback(async (): Promise<void> => {
    await fetchWidgets();
  }, [fetchWidgets]);

  useEffect(() => {
    if (dashboardId) {
      fetchWidgets();
    }
  }, [fetchWidgets, dashboardId]);

  return {
    widgets,
    loading,
    error,
    createWidget,
    updateWidget,
    deleteWidget,
    getWidgetData,
    refreshWidgets
  };
};