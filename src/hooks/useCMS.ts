import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export function useCMSCollection<T extends keyof Tables>(tableName: T) {
  type Row = Tables[T]['Row'];
  type Insert = Tables[T]['Insert'];
  type Update = Tables[T]['Update'];

  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase
      .from(tableName)
      .select('*')
      .order('sort_order', { ascending: true });
    if (err) {
      setError(err.message);
    } else {
      setData((rows || []) as Row[]);
    }
    setLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const insert = useCallback(async (record: Insert): Promise<{ error?: string }> => {
    const { error: err } = await supabase.from(tableName).insert([record]).select();
    if (err) return { error: err.message };
    await fetch();
    return {};
  }, [tableName, fetch]);

  const update = useCallback(async (id: string, record: Update): Promise<{ error?: string }> => {
    const { error: err } = await supabase.from(tableName).update(record).eq('id', id).select();
    if (err) return { error: err.message };
    await fetch();
    return {};
  }, [tableName, fetch]);

  const remove = useCallback(async (id: string): Promise<{ error?: string }> => {
    const { error: err } = await supabase.from(tableName).delete().eq('id', id);
    if (err) return { error: err.message };
    await fetch();
    return {};
  }, [tableName, fetch]);

  return { data, loading, error, fetch, insert, update, remove };
}

export function useCMSSingle<T extends keyof Tables>(tableName: T) {
  type Row = Tables[T]['Row'];
  type Update = Tables[T]['Update'];

  const [data, setData] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1);
    if (err) {
      setError(err.message);
    } else {
      setData((rows && rows[0] ? rows[0] : null) as Row | null);
    }
    setLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const upsert = useCallback(async (record: Partial<Row> & Record<string, unknown>): Promise<{ error?: string }> => {
    const existingId = data?.id;
    if (existingId) {
      const { error: err } = await supabase.from(tableName).update(record as Update).eq('id', existingId).select();
      if (err) return { error: err.message };
    } else {
      const { error: err } = await supabase.from(tableName).insert([record]).select();
      if (err) return { error: err.message };
    }
    await fetch();
    return {};
  }, [tableName, fetch, data]);

  return { data, loading, error, fetch, upsert };
}
