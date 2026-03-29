import { useState } from 'react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  config: any;
}

interface UseDataSourcesReturn {
  dataSources: DataSource[];
  loading: boolean;
  error: string | null;
}

export const useDataSources = (): UseDataSourcesReturn => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    dataSources,
    loading,
    error,
  };
};
