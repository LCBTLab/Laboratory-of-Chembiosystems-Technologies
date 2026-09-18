import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import type { Database } from '../../lib/supabase';

type Award = Database['public']['Tables']['cms_awards']['Row'];

const categoryOptions = ['fellowship', 'recent', 'international', 'national', 'student'];

const AwardsAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_awards');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      year: formData.year as string,
      title: formData.title as string,
      organization: formData.organization as string,
      description: formData.description as string,
      category: formData.category as string,
      highlight: formData.highlight as boolean,
      link: (formData.link as string) || null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: Award) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.year} - ${d.category}`,
  }));

  return (
    <>
      <EntityList title="Awards & Honours" items={items} loading={loading} addLabel="Add Award"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Award' : 'Add Award'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          year: editingItem.year, title: editingItem.title,
          organization: editingItem.organization, description: editingItem.description,
          category: editingItem.category, highlight: editingItem.highlight,
          link: editingItem.link || '', sort_order: editingItem.sort_order,
          is_published: editingItem.is_published,
        } : {
          year: '', title: '', organization: '', description: '',
          category: 'international', highlight: false, is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Year" value={data.year as string || ''} onChange={(v) => setData('year', v)} placeholder="2025" required />
              <SelectField label="Category" value={data.category as string || 'international'} onChange={(v) => setData('category', v)} options={categoryOptions} />
            </div>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <TextField label="Organization" value={data.organization as string || ''} onChange={(v) => setData('organization', v)} />
            <TextArea label="Description" value={data.description as string || ''} onChange={(v) => setData('description', v)} rows={3} />
            <TextField label="Link URL" value={data.link as string || ''} onChange={(v) => setData('link', v)} />
            <div className="grid grid-cols-3 gap-4">
              <CheckboxField label="Highlight" checked={data.highlight as boolean} onChange={(v) => setData('highlight', v)} />
              <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default AwardsAdmin;
