import React, { useState, useEffect } from 'react';
import { useCMSSingle } from '../../hooks/useCMS';
import { TextField, TextArea } from '../../components/cms/FormFields';
import { StringListEditor } from '../../components/cms/Editors';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const SettingsAdmin: React.FC = () => {
  const { data, loading, upsert } = useCMSSingle('cms_site_settings');
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        lab_name: data.lab_name,
        institution: data.institution,
        tagline: data.tagline,
        hero_description: data.hero_description,
        hero_images: data.hero_images,
        quote_banner: data.quote_banner,
        stat_projects: data.stat_projects,
        stat_publications: data.stat_publications,
        stat_team: data.stat_team,
        stat_years: data.stat_years,
        contact_address: data.contact_address,
        contact_emails: data.contact_emails,
        contact_phones: data.contact_phones,
        contact_hours: data.contact_hours,
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

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
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Homepage</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Lab Name" value={formData.lab_name as string || ''} onChange={(v) => setData('lab_name', v)} />
          <TextField label="Institution" value={formData.institution as string || ''} onChange={(v) => setData('institution', v)} />
        </div>
        <TextField label="Tagline" value={formData.tagline as string || ''} onChange={(v) => setData('tagline', v)} />
        <TextField label="Quote Banner" value={formData.quote_banner as string || ''} onChange={(v) => setData('quote_banner', v)} />
        <TextArea label="Hero Description" value={formData.hero_description as string || ''} onChange={(v) => setData('hero_description', v)} rows={3} />
        <StringListEditor label="Hero Images" values={(formData.hero_images as string[]) || []} onChange={(v) => setData('hero_images', v)} placeholder="https://..." />

        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 pt-4">Statistics</h2>
        <div className="grid grid-cols-4 gap-4">
          <TextField label="Projects" value={formData.stat_projects as string || ''} onChange={(v) => setData('stat_projects', v)} />
          <TextField label="Publications" value={formData.stat_publications as string || ''} onChange={(v) => setData('stat_publications', v)} />
          <TextField label="Team" value={formData.stat_team as string || ''} onChange={(v) => setData('stat_team', v)} />
          <TextField label="Years" value={formData.stat_years as string || ''} onChange={(v) => setData('stat_years', v)} />
        </div>

        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 pt-4">Contact Information</h2>
        <StringListEditor label="Address Lines" values={(formData.contact_address as string[]) || []} onChange={(v) => setData('contact_address', v)} placeholder="Address line" />
        <StringListEditor label="Emails" values={(formData.contact_emails as string[]) || []} onChange={(v) => setData('contact_emails', v)} placeholder="email@example.com" />
        <StringListEditor label="Phone Numbers" values={(formData.contact_phones as string[]) || []} onChange={(v) => setData('contact_phones', v)} placeholder="+91..." />
        <StringListEditor label="Office Hours" values={(formData.contact_hours as string[]) || []} onChange={(v) => setData('contact_hours', v)} placeholder="Mon-Fri: 9AM-6PM" />

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

export default SettingsAdmin;
