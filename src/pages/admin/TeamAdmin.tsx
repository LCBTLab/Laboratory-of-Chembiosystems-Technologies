import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import type { Database } from '../../lib/supabase';

type Member = Database['public']['Tables']['cms_team_members']['Row'];

const TeamAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_team_members');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      name: formData.name as string,
      fellowship: formData.fellowship as string,
      degree: formData.degree as string,
      year: formData.year as string,
      image: formData.image as string,
      email: (formData.email as string) || null,
      linkedin: (formData.linkedin as string) || null,
      specialization: (formData.specialization as string) || null,
      is_alumni: formData.is_alumni as boolean,
      placed_in: (formData.placed_in as string) || null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: Member) => ({
    id: d.id,
    primary: d.name,
    secondary: `${d.degree} - ${d.year} ${d.is_alumni ? '(Alumni)' : ''}`,
    image: d.image || undefined,
  }));

  return (
    <>
      <EntityList title="Team Members" items={items} loading={loading} addLabel="Add Member"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Member' : 'Add Member'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          name: editingItem.name, fellowship: editingItem.fellowship,
          degree: editingItem.degree, year: editingItem.year, image: editingItem.image,
          email: editingItem.email || '', linkedin: editingItem.linkedin || '',
          specialization: editingItem.specialization || '',
          is_alumni: editingItem.is_alumni, placed_in: editingItem.placed_in || '',
          sort_order: editingItem.sort_order, is_published: editingItem.is_published,
        } : {
          name: '', fellowship: '', degree: '', year: '', image: '',
          is_alumni: false, is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Name" value={data.name as string || ''} onChange={(v) => setData('name', v)} required />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Fellowship" value={data.fellowship as string || ''} onChange={(v) => setData('fellowship', v)} placeholder="DBT-JRF, MHRD..." />
              <TextField label="Degree" value={data.degree as string || ''} onChange={(v) => setData('degree', v)} placeholder="PhD, M.Tech..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Year" value={data.year as string || ''} onChange={(v) => setData('year', v)} placeholder="July 2024" />
              <TextField label="Image URL" value={data.image as string || ''} onChange={(v) => setData('image', v)} />
            </div>
            <TextField label="Email" value={data.email as string || ''} onChange={(v) => setData('email', v)} />
            <TextField label="LinkedIn URL" value={data.linkedin as string || ''} onChange={(v) => setData('linkedin', v)} />
            <TextField label="Specialization" value={data.specialization as string || ''} onChange={(v) => setData('specialization', v)} />
            <TextField label="Placed In" value={data.placed_in as string || ''} onChange={(v) => setData('placed_in', v)} placeholder="Where alumni went" />
            <div className="grid grid-cols-3 gap-4">
              <CheckboxField label="Alumni" checked={data.is_alumni as boolean} onChange={(v) => setData('is_alumni', v)} />
              <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default TeamAdmin;
