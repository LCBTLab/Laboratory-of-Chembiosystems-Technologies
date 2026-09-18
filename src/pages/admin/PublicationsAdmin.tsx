import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, NumberField, CheckboxField, SelectField } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import type { Database } from '../../lib/supabase';

type Pub = Database['public']['Tables']['cms_publications']['Row'];

const categories = ['Sustainable Materials', 'Biomedical Materials', 'Food Packaging', 'Photodynamic Therapy', 'Environmental Remediation', 'Agricultural Applications', 'Enzyme Technology', 'Computational Biology', 'Food Preservation', 'Other'];

const PublicationsAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_publications');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      authors: formData.authors as string[] || [],
      journal: formData.journal as string,
      year: Number(formData.year) || new Date().getFullYear(),
      volume: (formData.volume as string) || null,
      issue: (formData.issue as string) || null,
      pages: (formData.pages as string) || null,
      doi: (formData.doi as string) || null,
      category: formData.category as string,
      keywords: formData.keywords as string[] || [],
      graphical_abstract: (formData.graphical_abstract as string) || null,
      impact_factor: formData.impact_factor ? Number(formData.impact_factor) : null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) {
      return update(editingId, record);
    }
    return insert(record);
  };

  const items = data.map((d: Pub) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.journal} (${d.year})`,
    image: d.graphical_abstract || undefined,
  }));

  return (
    <>
      <EntityList
        title="Publications"
        items={items}
        loading={loading}
        addLabel="Add Publication"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal
        open={modalOpen}
        title={editingId ? 'Edit Publication' : 'Add Publication'}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title,
          authors: editingItem.authors,
          journal: editingItem.journal,
          year: editingItem.year,
          volume: editingItem.volume || '',
          issue: editingItem.issue || '',
          pages: editingItem.pages || '',
          doi: editingItem.doi || '',
          category: editingItem.category,
          keywords: editingItem.keywords,
          graphical_abstract: editingItem.graphical_abstract || '',
          impact_factor: editingItem.impact_factor || '',
          sort_order: editingItem.sort_order,
          is_published: editingItem.is_published,
        } : {
          title: '', authors: [], journal: '', year: new Date().getFullYear(),
          category: categories[0], keywords: [], is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <StringListEditor label="Authors" values={(data.authors as string[]) || []} onChange={(v) => setData('authors', v)} placeholder="Author name" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Journal" value={data.journal as string || ''} onChange={(v) => setData('journal', v)} />
              <NumberField label="Year" value={data.year as number || ''} onChange={(v) => setData('year', v)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Volume" value={data.volume as string || ''} onChange={(v) => setData('volume', v)} />
              <TextField label="Issue" value={data.issue as string || ''} onChange={(v) => setData('issue', v)} />
              <TextField label="Pages" value={data.pages as string || ''} onChange={(v) => setData('pages', v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="DOI" value={data.doi as string || ''} onChange={(v) => setData('doi', v)} placeholder="10.xxxx/xxxxx" />
              <NumberField label="Impact Factor" value={data.impact_factor as number || ''} onChange={(v) => setData('impact_factor', v)} />
            </div>
            <SelectField label="Category" value={data.category as string || categories[0]} onChange={(v) => setData('category', v)} options={categories} />
            <StringListEditor label="Keywords" values={(data.keywords as string[]) || []} onChange={(v) => setData('keywords', v)} placeholder="Keyword" />
            <TextField label="Graphical Abstract URL" value={data.graphical_abstract as string || ''} onChange={(v) => setData('graphical_abstract', v)} placeholder="https://..." />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
              <div className="flex items-end pb-2">
                <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              </div>
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default PublicationsAdmin;
