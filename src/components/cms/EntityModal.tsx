import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, AlertCircle } from 'lucide-react';

interface EntityModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => Promise<{ error?: string }>;
  initialData?: Record<string, unknown> | null;
  children: (data: Record<string, unknown>, setData: (field: string, value: unknown) => void) => React.ReactNode;
}

export const EntityModal: React.FC<EntityModalProps> = ({ open, title, onClose, onSave, initialData, children }) => {
  const [data, setDataState] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDataState(initialData || {});
      setError(null);
    }
  }, [open, initialData]);

  const setData = (field: string, value: unknown) => {
    setDataState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const result = await onSave(data);
    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            {children(data, setData)}
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EntityListProps {
  title: string;
  items: { id: string; primary: string; secondary?: string; image?: string }[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  addLabel?: string;
}

export const EntityList: React.FC<EntityListProps> = ({ title, items, loading, onAdd, onEdit, onDelete, addLabel = 'Add New' }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          + {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No items yet. Click "{addLabel}" to add one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              {item.image && (
                <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(item.id)}>
                <p className="text-sm font-medium text-gray-900 truncate">{item.primary}</p>
                {item.secondary && <p className="text-xs text-gray-500 truncate">{item.secondary}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(item.id)}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this item?')) {
                      onDelete(item.id);
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
