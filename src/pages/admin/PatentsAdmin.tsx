import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import type { Database } from '../../lib/supabase';

type Patent = Database['public']['Tables']['cms_patents']['Row'];

const statusOptions = ['Filed', 'Granted'];

const PatentsAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_patents');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      inventors: formData.inventors as string[] || [],
      application_number: formData.application_number as string,
      patent_number: (formData.patent_number as string) || null,
      status: formData.status as string,
      date: formData.date as string,
      description: formData.description as string,
      technology: (formData.technology as string) || null,
      graphical_abstract: (formData.graphical_abstract as string) || null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: Patent) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.status} - ${d.application_number}`,
    image: d.graphical_abstract || undefined,
  }));

  return (
    <>
      <EntityList title="Patents" items={items} loading={loading} addLabel="Add Patent"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Patent' : 'Add Patent'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title, inventors: editingItem.inventors,
          application_number: editingItem.application_number,
          patent_number: editingItem.patent_number || '',
          status: editingItem.status, date: editingItem.date,
          description: editingItem.description,
          technology: editingItem.technology || '',
          graphical_abstract: editingItem.graphical_abstract || '',
          sort_order: editingItem.sort_order, is_published: editingItem.is_published,
        } : {
          title: '', inventors: [], application_number: '', status: 'Filed',
          date: '', description: '', is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <StringListEditor label="Inventors" values={(data.inventors as string[]) || []} onChange={(v) => setData('inventors', v)} placeholder="Inventor name" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Application Number" value={data.application_number as string || ''} onChange={(v) => setData('application_number', v)} />
              <TextField label="Patent Number" value={data.patent_number as string || ''} onChange={(v) => setData('patent_number', v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Status" value={data.status as string || 'Filed'} onChange={(v) => setData('status', v)} options={statusOptions} />
              <TextField label="Date" value={data.date as string || ''} onChange={(v) => setData('date', v)} placeholder="2025" />
            </div>
            <TextArea label="Description" value={data.description as string || ''} onChange={(v) => setData('description', v)} rows={3} />
            <TextField label="Technology" value={data.technology as string || ''} onChange={(v) => setData('technology', v)} placeholder="e.g. Technology Transferred" />
            <TextField label="Graphical Abstract URL" value={data.graphical_abstract as string || ''} onChange={(v) => setData('graphical_abstract', v)} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
              <div className="flex items-end pb-2"><CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} /></div>
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default PatentsAdmin;
