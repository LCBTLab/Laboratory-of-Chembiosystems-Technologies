import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { 
  Dashboard, 
  CreateDashboardForm, 
  ShareDashboardForm,
  UseDashboardsReturn 
} from '../types/dashboard';

export const useDashboards = (): UseDashboardsReturn => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchDashboards = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('dashboards')
        .select('*')
        .order('updated_at', { ascending: false });

      if (fetchError) throw fetchError;

      setDashboards(data || []);
    } catch (err) {
      console.error('Error fetching dashboards:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboards');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createDashboard = useCallback(async (data: CreateDashboardForm): Promise<Dashboard> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      let dashboardData: any = {
        title: data.title,
        description: data.description,
        is_public: data.is_public || false,
        layout: { type: 'grid', columns: 12, rows: 8 },
        settings: { 
          theme: 'light', 
          refresh_interval: 300, 
          auto_refresh: false,
          show_grid: true,
          snap_to_grid: true,
          allow_overlap: false
        },
        created_by: user.id
      };

      // If creating from template
      if (data.template_id) {
        const { data: template, error: templateError } = await supabase
          .from('dashboard_templates')
          .select('template_data')
          .eq('id', data.template_id)
          .single();

        if (templateError) throw templateError;

        if (template?.template_data) {
          dashboardData.layout = template.template_data.layout;
          dashboardData.settings = { ...dashboardData.settings, ...template.template_data.settings };
        }

        // Update template usage count
        await supabase
          .from('dashboard_templates')
          .update({ usage_count: supabase.sql`usage_count + 1` })
          .eq('id', data.template_id);
      }

      const { data: newDashboard, error: createError } = await supabase
        .from('dashboards')
        .insert(dashboardData)
        .select()
        .single();

      if (createError) throw createError;

      // If creating from template, create widgets
      if (data.template_id) {
        const { data: template } = await supabase
          .from('dashboard_templates')
          .select('template_data')
          .eq('id', data.template_id)
          .single();

        if (template?.template_data?.widgets) {
          const widgets = template.template_data.widgets.map((widget: any) => ({
            ...widget,
            dashboard_id: newDashboard.id,
            id: undefined // Let database generate new IDs
          }));

          await supabase
            .from('widgets')
            .insert(widgets);
        }
      }

      setDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } catch (err) {
      console.error('Error creating dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create dashboard';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const updateDashboard = useCallback(async (id: string, data: Partial<Dashboard>): Promise<Dashboard> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data: updatedDashboard, error: updateError } = await supabase
        .from('dashboards')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      setDashboards(prev => 
        prev.map(dashboard => 
          dashboard.id === id ? updatedDashboard : dashboard
        )
      );

      return updatedDashboard;
    } catch (err) {
      console.error('Error updating dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update dashboard';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const deleteDashboard = useCallback(async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('dashboards')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    } catch (err) {
      console.error('Error deleting dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete dashboard';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const cloneDashboard = useCallback(async (id: string, title: string): Promise<Dashboard> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      // Get original dashboard
      const { data: originalDashboard, error: fetchError } = await supabase
        .from('dashboards')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Create new dashboard
      const { data: newDashboard, error: createError } = await supabase
        .from('dashboards')
        .insert({
          title,
          description: `Clone of ${originalDashboard.title}`,
          layout: originalDashboard.layout,
          settings: originalDashboard.settings,
          is_public: false,
          created_by: user.id
        })
        .select()
        .single();

      if (createError) throw createError;

      // Clone widgets
      const { data: originalWidgets, error: widgetsError } = await supabase
        .from('widgets')
        .select('*')
        .eq('dashboard_id', id);

      if (widgetsError) throw widgetsError;

      if (originalWidgets && originalWidgets.length > 0) {
        const clonedWidgets = originalWidgets.map(widget => ({
          ...widget,
          id: undefined, // Let database generate new IDs
          dashboard_id: newDashboard.id
        }));

        await supabase
          .from('widgets')
          .insert(clonedWidgets);
      }

      setDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } catch (err) {
      console.error('Error cloning dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to clone dashboard';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const shareDashboard = useCallback(async (id: string, data: ShareDashboardForm): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      if (data.make_public) {
        // Make dashboard public
        await supabase
          .from('dashboards')
          .update({ is_public: true })
          .eq('id', id);
      } else if (data.user_email) {
        // Share with specific user
        const { data: targetUser, error: userError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', data.user_email)
          .single();

        if (userError) throw new Error('User not found');

        await supabase
          .from('dashboard_permissions')
          .upsert({
            dashboard_id: id,
            user_id: targetUser.id,
            permission_type: data.permission_type,
            granted_by: user.id,
            expires_at: data.expires_at
          });
      }

      await fetchDashboards();
    } catch (err) {
      console.error('Error sharing dashboard:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to share dashboard';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user, fetchDashboards]);

  const refreshDashboards = useCallback(async (): Promise<void> => {
    await fetchDashboards();
  }, [fetchDashboards]);

  useEffect(() => {
    fetchDashboards();
  }, [fetchDashboards]);

  return {
    dashboards,
    loading,
    error,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    cloneDashboard,
    shareDashboard,
    refreshDashboards
  };
};