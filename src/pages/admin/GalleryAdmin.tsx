import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import type { Database } from '../../lib/supabase';

type GalleryItem = Database['public']['Tables']['cms_gallery_items']['Row'];

const categoryOptions = ['Research', 'Equipment', 'Team', 'Events'];

const GalleryAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_gallery_items');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      category: formData.category as string,
      image: formData.image as string,
      description: (formData.description as string) || null,
      date: (formData.date as string) || null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: GalleryItem) => ({
    id: d.id,
    primary: d.title,
    secondary: d.category,
    image: d.image || undefined,
  }));

  return (
    <>
      <EntityList title="Gallery" items={items} loading={loading} addLabel="Add Image"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Image' : 'Add Image'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title, category: editingItem.category,
          image: editingItem.image, description: editingItem.description || '',
          date: editingItem.date || '', sort_order: editingItem.sort_order,
          is_published: editingItem.is_published,
        } : {
          title: '', category: 'Research', image: '', is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Category" value={data.category as string || 'Research'} onChange={(v) => setData('category', v)} options={categoryOptions} />
              <TextField label="Date" value={data.date as string || ''} onChange={(v) => setData('date', v)} />
            </div>
            <TextField label="Image URL" value={data.image as string || ''} onChange={(v) => setData('image', v)} required />
            <TextField label="Description" value={data.description as string || ''} onChange={(v) => setData('description', v)} />
            <div className="grid grid-cols-2 gap-4">
              <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default GalleryAdmin;
