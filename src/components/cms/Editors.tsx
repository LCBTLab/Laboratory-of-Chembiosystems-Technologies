import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface StringListEditorProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const StringListEditor: React.FC<StringListEditorProps> = ({ label, values, onChange, placeholder }) => {
  const handleChange = (index: number, value: string) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...values, '']);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>
    </div>
  );
};

interface LinkListEditorProps {
  label: string;
  values: { title: string; url: string }[];
  onChange: (values: { title: string; url: string }[]) => void;
}

export const LinkListEditor: React.FC<LinkListEditorProps> = ({ label, values, onChange }) => {
  const handleChange = (index: number, field: 'title' | 'url', value: string) => {
    const next = [...values];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...values, { title: '', url: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Link title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="url"
                value={item.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 mt-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Link
        </button>
      </div>
    </div>
  );
};
