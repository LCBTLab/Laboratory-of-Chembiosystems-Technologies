import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import type { Database } from '../../lib/supabase';

type Opportunity = Database['public']['Tables']['cms_opportunities']['Row'];

const typeOptions = ['PhD', 'M.Tech', 'B.Tech', 'Internship', 'Postdoc'];

const OpportunitiesAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_opportunities');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      type: formData.type as string,
      duration: formData.duration as string,
      description: formData.description as string,
      requirements: formData.requirements as string[] || [],
      benefits: formData.benefits as string[] || [],
      deadline: (formData.deadline as string) || null,
      is_active: formData.is_active as boolean,
      sort_order: Number(formData.sort_order) || 0,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: Opportunity) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.type} - ${d.duration} ${d.is_active ? '(Active)' : '(Inactive)'}`,
  }));

  return (
    <>
      <EntityList title="Opportunities" items={items} loading={loading} addLabel="Add Opportunity"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Opportunity' : 'Add Opportunity'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title, type: editingItem.type, duration: editingItem.duration,
          description: editingItem.description, requirements: editingItem.requirements,
          benefits: editingItem.benefits, deadline: editingItem.deadline || '',
          is_active: editingItem.is_active, sort_order: editingItem.sort_order,
        } : {
          title: '', type: 'PhD', duration: '', description: '',
          requirements: [], benefits: [], is_active: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Type" value={data.type as string || 'PhD'} onChange={(v) => setData('type', v)} options={typeOptions} />
              <TextField label="Duration" value={data.duration as string || ''} onChange={(v) => setData('duration', v)} placeholder="4-5 years" />
            </div>
            <TextArea label="Description" value={data.description as string || ''} onChange={(v) => setData('description', v)} rows={3} />
            <StringListEditor label="Requirements" values={(data.requirements as string[]) || []} onChange={(v) => setData('requirements', v)} placeholder="Requirement" />
            <StringListEditor label="Benefits" values={(data.benefits as string[]) || []} onChange={(v) => setData('benefits', v)} placeholder="Benefit" />
            <TextField label="Deadline" value={data.deadline as string || ''} onChange={(v) => setData('deadline', v)} placeholder="2024-03-15" />
            <div className="grid grid-cols-2 gap-4">
              <CheckboxField label="Active" checked={data.is_active as boolean} onChange={(v) => setData('is_active', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default OpportunitiesAdmin;
