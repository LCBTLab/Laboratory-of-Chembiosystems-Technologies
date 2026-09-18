import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import type { Database } from '../../lib/supabase';

type Project = Database['public']['Tables']['cms_research_projects']['Row'];

const statusOptions = ['Ongoing', 'Approved', 'Complete'];
const typeOptions = ['research', 'industrial'];

const ResearchAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_research_projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      awarding_agency: formData.awarding_agency as string,
      role: formData.role as string,
      year: formData.year as string,
      status: formData.status as string,
      description: formData.description as string,
      image: (formData.image as string) || null,
      tags: formData.tags as string[] || [],
      project_type: formData.project_type as string,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: Project) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.project_type} - ${d.status} - ${d.year}`,
    image: d.image || undefined,
  }));

  return (
    <>
      <EntityList title="Research Projects" items={items} loading={loading} addLabel="Add Project"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit Project' : 'Add Project'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title, awarding_agency: editingItem.awarding_agency,
          role: editingItem.role, year: editingItem.year, status: editingItem.status,
          description: editingItem.description, image: editingItem.image || '',
          tags: editingItem.tags, project_type: editingItem.project_type,
          sort_order: editingItem.sort_order, is_published: editingItem.is_published,
        } : {
          title: '', awarding_agency: '', role: 'P.I.', year: '', status: 'Ongoing',
          description: '', tags: [], project_type: 'research', is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Awarding Agency" value={data.awarding_agency as string || ''} onChange={(v) => setData('awarding_agency', v)} />
              <TextField label="Role" value={data.role as string || ''} onChange={(v) => setData('role', v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Year" value={data.year as string || ''} onChange={(v) => setData('year', v)} placeholder="2024-27" />
              <SelectField label="Status" value={data.status as string || 'Ongoing'} onChange={(v) => setData('status', v)} options={statusOptions} />
            </div>
            <SelectField label="Project Type" value={data.project_type as string || 'research'} onChange={(v) => setData('project_type', v)} options={typeOptions} />
            <TextArea label="Description" value={data.description as string || ''} onChange={(v) => setData('description', v)} rows={3} />
            <StringListEditor label="Tags" values={(data.tags as string[]) || []} onChange={(v) => setData('tags', v)} placeholder="Tag" />
            <TextField label="Image URL" value={data.image as string || ''} onChange={(v) => setData('image', v)} />
            <div className="grid grid-cols-3 gap-4">
              <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default ResearchAdmin;
