import React, { useState } from 'react';
import { useCMSCollection } from '../../hooks/useCMS';
import { EntityList, EntityModal } from '../../components/cms/EntityModal';
import { TextField, TextArea, SelectField, CheckboxField, NumberField } from '../../components/cms/FormFields';
import { StringListEditor, LinkListEditor } from '../../components/cms/Editors';
import type { Database } from '../../lib/supabase';

type NewsItem = Database['public']['Tables']['cms_news']['Row'];

const categoryOptions = ['Awards', 'Publications', 'Research', 'Team', 'Events', 'Infrastructure', 'Partnerships', 'General'];

const NewsAdmin: React.FC = () => {
  const { data, loading, insert, update, remove } = useCMSCollection('cms_news');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? data.find((d) => d.id === editingId) : null;

  const handleSave = async (formData: Record<string, unknown>) => {
    const record = {
      title: formData.title as string,
      category: formData.category as string,
      date: formData.date as string,
      author: formData.author as string,
      excerpt: formData.excerpt as string,
      content: formData.content as string,
      image: formData.image as string,
      tags: formData.tags as string[] || [],
      featured: formData.featured as boolean,
      external_links: (formData.external_links as { title: string; url: string }[]) || null,
      video_links: (formData.video_links as { title: string; url: string }[]) || null,
      sort_order: Number(formData.sort_order) || 0,
      is_published: formData.is_published as boolean,
    };
    if (editingId) return update(editingId, record);
    return insert(record);
  };

  const items = data.map((d: NewsItem) => ({
    id: d.id,
    primary: d.title,
    secondary: `${d.category} - ${d.date}`,
    image: d.image || undefined,
  }));

  return (
    <>
      <EntityList title="News" items={items} loading={loading} addLabel="Add News"
        onAdd={() => { setEditingId(null); setModalOpen(true); }}
        onEdit={(id) => { setEditingId(id); setModalOpen(true); }}
        onDelete={(id) => remove(id)}
      />
      <EntityModal open={modalOpen} title={editingId ? 'Edit News' : 'Add News'}
        onClose={() => setModalOpen(false)} onSave={handleSave}
        initialData={editingItem ? {
          title: editingItem.title, category: editingItem.category, date: editingItem.date,
          author: editingItem.author, excerpt: editingItem.excerpt, content: editingItem.content,
          image: editingItem.image, tags: editingItem.tags, featured: editingItem.featured,
          external_links: editingItem.external_links || [], video_links: editingItem.video_links || [],
          sort_order: editingItem.sort_order, is_published: editingItem.is_published,
        } : {
          title: '', category: 'General', date: new Date().toISOString().split('T')[0],
          author: '', excerpt: '', content: '', image: '', tags: [],
          featured: false, external_links: [], video_links: [],
          is_published: true, sort_order: 0,
        }}
      >
        {(data, setData) => (
          <>
            <TextField label="Title" value={data.title as string || ''} onChange={(v) => setData('title', v)} required />
            <div className="grid grid-cols-3 gap-4">
              <SelectField label="Category" value={data.category as string || 'General'} onChange={(v) => setData('category', v)} options={categoryOptions} />
              <TextField label="Date" value={data.date as string || ''} onChange={(v) => setData('date', v)} placeholder="2024-01-15" />
              <TextField label="Author" value={data.author as string || ''} onChange={(v) => setData('author', v)} />
            </div>
            <TextField label="Image URL" value={data.image as string || ''} onChange={(v) => setData('image', v)} />
            <TextArea label="Excerpt" value={data.excerpt as string || ''} onChange={(v) => setData('excerpt', v)} rows={2} />
            <TextArea label="Full Content" value={data.content as string || ''} onChange={(v) => setData('content', v)} rows={6} />
            <StringListEditor label="Tags" values={(data.tags as string[]) || []} onChange={(v) => setData('tags', v)} placeholder="Tag" />
            <LinkListEditor label="External Links" values={(data.external_links as { title: string; url: string }[]) || []} onChange={(v) => setData('external_links', v)} />
            <LinkListEditor label="Video Links" values={(data.video_links as { title: string; url: string }[]) || []} onChange={(v) => setData('video_links', v)} />
            <div className="grid grid-cols-3 gap-4">
              <CheckboxField label="Featured" checked={data.featured as boolean} onChange={(v) => setData('featured', v)} />
              <CheckboxField label="Published" checked={data.is_published as boolean} onChange={(v) => setData('is_published', v)} />
              <NumberField label="Sort Order" value={data.sort_order as number || 0} onChange={(v) => setData('sort_order', v)} />
            </div>
          </>
        )}
      </EntityModal>
    </>
  );
};

export default NewsAdmin;
