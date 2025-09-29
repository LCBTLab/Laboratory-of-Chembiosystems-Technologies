import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { 
  DataSource, 
  CreateDataSourceForm, 
  DataSourceConfig,
  UseDataSourcesReturn 
} from '../types/dashboard';

export const useDataSources = (): UseDataSourcesReturn => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchDataSources = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setDataSources(data || []);
    } catch (err) {
      console.error('Error fetching data sources:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data sources');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createDataSource = useCallback(async (data: CreateDataSourceForm): Promise<DataSource> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const dataSourceData = {
        ...data,
        refresh_interval: data.refresh_interval || 300,
        is_active: true,
        created_by: user.id
      };

      const { data: newDataSource, error: createError } = await supabase
        .from('data_sources')
        .insert(dataSourceData)
        .select()
        .single();

      if (createError) throw createError;

      setDataSources(prev => [newDataSource, ...prev]);
      return newDataSource;
    } catch (err) {
      console.error('Error creating data source:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create data source';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const updateDataSource = useCallback(async (id: string, data: Partial<DataSource>): Promise<DataSource> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data: updatedDataSource, error: updateError } = await supabase
        .from('data_sources')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      setDataSources(prev => 
        prev.map(dataSource => 
          dataSource.id === id ? updatedDataSource : dataSource
        )
      );

      return updatedDataSource;
    } catch (err) {
      console.error('Error updating data source:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update data source';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const deleteDataSource = useCallback(async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setDataSources(prev => prev.filter(dataSource => dataSource.id !== id));
    } catch (err) {
      console.error('Error deleting data source:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete data source';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user]);

  const testDataSource = useCallback(async (config: DataSourceConfig): Promise<boolean> => {
    try {
      setError(null);

      switch (config.url ? 'api' : 'json') {
        case 'api':
          if (!config.url) throw new Error('URL is required for API data source');
          
          const response = await fetch(config.url, {
            method: config.method || 'GET',
            headers: config.headers || {},
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          await response.json(); // Try to parse JSON
          return true;
          
        case 'json':
          if (!config.json_data) throw new Error('JSON data is required');
          
          // Validate JSON structure
          if (typeof config.json_data !== 'object') {
            throw new Error('Invalid JSON data format');
          }
          
          return true;
          
        default:
          throw new Error('Unsupported data source type for testing');
      }
    } catch (err) {
      console.error('Error testing data source:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to test data source';
      setError(errorMessage);
      return false;
    }
  }, []);

  const refreshDataSources = useCallback(async (): Promise<void> => {
    await fetchDataSources();
  }, [fetchDataSources]);

  useEffect(() => {
    fetchDataSources();
  }, [fetchDataSources]);

  return {
    dataSources,
    loading,
    error,
    createDataSource,
    updateDataSource,
    deleteDataSource,
    testDataSource,
    refreshDataSources
  };
};