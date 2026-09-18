import React, { useState, useEffect } from 'react';
import { useCMSSingle } from '../../hooks/useCMS';
import { TextField, TextArea } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const PIInfoAdmin: React.FC = () => {
  const { data, loading, upsert } = useCMSSingle('cms_pi_info');
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        title: data.title,
        photo: data.photo,
        bio_paragraphs: data.bio_paragraphs,
        qualifications: data.qualifications,
        expertise: data.expertise,
        email: data.email,
        location: data.location,
        google_scholar_url: data.google_scholar_url || '',
        orcid_url: data.orcid_url || '',
        linkedin_url: data.linkedin_url || '',
      });
    }
  }, [data]);

  const setData = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    const result = await upsert(formData);
    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">PI Information</h1>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg mb-4">
          <CheckCircle className="h-4 w-4" /> Saved successfully!
        </div>
      )}

      <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Name" value={formData.name as string || ''} onChange={(v) => setData('name', v)} required />
          <TextField label="Title" value={formData.title as string || ''} onChange={(v) => setData('title', v)} />
        </div>
        <TextField label="Photo URL" value={formData.photo as string || ''} onChange={(v) => setData('photo', v)} />
        <TextField label="Email" value={formData.email as string || ''} onChange={(v) => setData('email', v)} />
        <TextField label="Location" value={formData.location as string || ''} onChange={(v) => setData('location', v)} />
        <StringListEditor label="Bio Paragraphs" values={(formData.bio_paragraphs as string[]) || []} onChange={(v) => setData('bio_paragraphs', v)} placeholder="Write a paragraph..." />
        <StringListEditor label="Qualifications" values={(formData.qualifications as string[]) || []} onChange={(v) => setData('qualifications', v)} placeholder="e.g. PhD in Chemical Engineering..." />
        <StringListEditor label="Research Expertise" values={(formData.expertise as string[]) || []} onChange={(v) => setData('expertise', v)} placeholder="Research area" />
        <div className="grid grid-cols-3 gap-4">
          <TextField label="Google Scholar URL" value={formData.google_scholar_url as string || ''} onChange={(v) => setData('google_scholar_url', v)} />
          <TextField label="ORCID URL" value={formData.orcid_url as string || ''} onChange={(v) => setData('orcid_url', v)} />
          <TextField label="LinkedIn URL" value={formData.linkedin_url as string || ''} onChange={(v) => setData('linkedin_url', v)} />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PIInfoAdmin;
