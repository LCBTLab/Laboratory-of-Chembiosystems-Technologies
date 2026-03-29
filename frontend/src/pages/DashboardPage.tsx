import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Upload, 
  Camera, 
  LogOut, 
  Mail, 
  Briefcase,
  FileText,
  Target,
  Plus,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  Folder,
  Settings,
  Bell,
  ExternalLink,
  Phone,
  MapPin
} from 'lucide-react';
import type { Database } from '../lib/supabase';

type Project = Database['public']['Tables']['projects']['Row'];
type Publication = Database['public']['Tables']['publications']['Row'];
type Resource = Database['public']['Tables']['resources']['Row'];

const DashboardPage: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [formData, setFormData] = useState({
    name: profile?.name || '',
    designation: profile?.designation || '',
    bio: profile?.bio || '',
    research_focus: profile?.research_focus || '',
    phone: profile?.phone || '',
    linkedin_url: profile?.linkedin_url || '',
    researchgate_url: profile?.researchgate_url || '',
    google_scholar_url: profile?.google_scholar_url || '',
    orcid_url: profile?.orcid_url || '',
  });

  // Project form state
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    status: 'Planning' as const,
    start_date: '',
    end_date: '',
    funding_source: '',
    funding_amount: '',
    collaborators: [] as string[],
    keywords: [] as string[],
  });

  // Publication form state
  const [showPublicationForm, setShowPublicationForm] = useState(false);
  const [publicationForm, setPublicationForm] = useState({
    title: '',
    authors: [] as string[],
    journal: '',
    year: new Date().getFullYear(),
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    abstract: '',
    keywords: [] as string[],
    publication_type: 'Journal Article' as const,
    pdf_url: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        designation: profile.designation || '',
        bio: profile.bio || '',
        research_focus: profile.research_focus || '',
        phone: profile.phone || '',
        linkedin_url: profile.linkedin_url || '',
        researchgate_url: profile.researchgate_url || '',
        google_scholar_url: profile.google_scholar_url || '',
        orcid_url: profile.orcid_url || '',
      });
    }
  }, [profile]);

  React.useEffect(() => {
    if (user && activeTab !== 'profile') {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    if (!user) return;

    try {
      if (activeTab === 'projects') {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .or(`created_by.eq.${user.id},team_members.cs.{${user.id}}`)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProjects(data || []);
      } else if (activeTab === 'publications') {
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .eq('created_by', user.id)
          .order('year', { ascending: false });
        
        if (error) throw error;
        setPublications(data || []);
      } else if (activeTab === 'resources') {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('uploaded_by', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setResources(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await updateProfile(formData);
    
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      designation: profile?.designation || '',
      bio: profile?.bio || '',
      research_focus: profile?.research_focus || '',
      phone: profile?.phone || '',
      linkedin_url: profile?.linkedin_url || '',
      researchgate_url: profile?.researchgate_url || '',
      google_scholar_url: profile?.google_scholar_url || '',
      orcid_url: profile?.orcid_url || '',
    });
    setIsEditing(false);
    setError('');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleCreateProject = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('projects')
        .insert({
          ...projectForm,
          funding_amount: projectForm.funding_amount ? parseFloat(projectForm.funding_amount) : null,
          created_by: user.id,
        });

      if (error) throw error;

      setSuccess('Project created successfully!');
      setShowProjectForm(false);
      setProjectForm({
        title: '',
        description: '',
        status: 'Planning',
        start_date: '',
        end_date: '',
        funding_source: '',
        funding_amount: '',
        collaborators: [],
        keywords: [],
      });
      fetchData();
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePublication = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('publications')
        .insert({
          ...publicationForm,
          created_by: user.id,
        });

      if (error) throw error;

      setSuccess('Publication added successfully!');
      setShowPublicationForm(false);
      setPublicationForm({
        title: '',
        authors: [],
        journal: '',
        year: new Date().getFullYear(),
        volume: '',
        issue: '',
        pages: '',
        doi: '',
        abstract: '',
        keywords: [],
        publication_type: 'Journal Article',
        pdf_url: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error creating publication:', error);
      setError('Failed to add publication');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Folder },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Research Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {profile.photo_url ? (
                    <img 
                      src={profile.photo_url} 
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.designation || 'Member'}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                          {profile.photo_url ? (
                            <img 
                              src={profile.photo_url} 
                              alt={profile.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                          >
                            <Camera className="h-4 w-4" />
                          </button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <div className="text-white">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-blue-100">{profile.designation || 'Member'}</p>
                        <div className="flex items-center mt-2">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-blue-100">{profile.email}</span>
                        </div>
                        {profile.phone && (
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 mr-2" />
                            <span className="text-blue-100">{profile.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6 space-y-6">
                  {isEditing ? (
                    /* Edit Mode */
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Designation
                          </label>
                          <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select designation</option>
                            <option value="PI">Principal Investigator</option>
                            <option value="PhD">PhD Scholar</option>
                            <option value="M.Tech">M.Tech Student</option>
                            <option value="B.Tech">B.Tech Student</option>
                            <option value="Staff">Staff</option>
                            <option value="Intern">Intern</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself, your background, and interests..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Research Focus
                        </label>
                        <textarea
                          name="research_focus"
                          value={formData.research_focus}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe your research interests and areas of expertise..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ResearchGate URL
                          </label>
                          <input
                            type="url"
                            name="researchgate_url"
                            value={formData.researchgate_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://researchgate.net/profile/yourprofile"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Scholar URL
                          </label>
                          <input
                            type="url"
                            name="google_scholar_url"
                            value={formData.google_scholar_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://scholar.google.com/citations?user=yourprofile"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 pt-4">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center mb-3">
                          <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                          <h3 className="text-lg font-semibold text-gray-900">About</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {profile.bio || 'No bio provided yet. Click "Edit Profile" to add your bio.'}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center mb-3">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <h3 className="text-lg font-semibold text-gray-900">Research Focus</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {profile.research_focus || 'No research focus specified yet. Click "Edit Profile" to add your research focus.'}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center mb-3">
                          <ExternalLink className="h-5 w-5 text-gray-400 mr-2" />
                          <h3 className="text-lg font-semibold text-gray-900">Academic Profiles</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {profile.linkedin_url && (
                            <a
                              href={profile.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              LinkedIn
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                          {profile.researchgate_url && (
                            <a
                              href={profile.researchgate_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              ResearchGate
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                          {profile.google_scholar_url && (
                            <a
                              href={profile.google_scholar_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Google Scholar
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                          {!profile.linkedin_url && !profile.researchgate_url && !profile.google_scholar_url && (
                            <p className="text-gray-500 italic">
                              No academic profiles added yet. Click "Edit Profile" to add your profiles.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </button>
                </div>

                {showProjectForm && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Project</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter project title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={projectForm.status}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Planning">Planning</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={projectForm.description}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe your project"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleCreateProject}
                          disabled={loading || !projectForm.title}
                          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Creating...' : 'Create Project'}
                        </button>
                        <button
                          onClick={() => setShowProjectForm(false)}
                          className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Created {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                {projects.length === 0 && !showProjectForm && (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first research project.</p>
                    <button
                      onClick={() => setShowProjectForm(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Project
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Publications</h2>
                  <button
                    onClick={() => setShowPublicationForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Publication
                  </button>
                </div>

                {showPublicationForm && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Publication</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={publicationForm.title}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter publication title"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Journal
                          </label>
                          <input
                            type="text"
                            value={publicationForm.journal}
                            onChange={(e) => setPublicationForm(prev => ({ ...prev, journal: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Journal name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="number"
                            value={publicationForm.year}
                            onChange={(e) => setPublicationForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Publication year"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Authors (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={publicationForm.authors.join(', ')}
                          onChange={(e) => setPublicationForm(prev => ({ 
                            ...prev, 
                            authors: e.target.value.split(',').map(a => a.trim()).filter(a => a) 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Author 1, Author 2, Author 3"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleCreatePublication}
                          disabled={loading || !publicationForm.title || !publicationForm.journal}
                          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Adding...' : 'Add Publication'}
                        </button>
                        <button
                          onClick={() => setShowPublicationForm(false)}
                          className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {publications.map((publication) => (
                    <div key={publication.id} className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{publication.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {publication.authors.join(', ')}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">{publication.journal}</span> • {publication.year}
                      </p>
                      {publication.doi && (
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                        >
                          DOI: {publication.doi}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {publications.length === 0 && !showPublicationForm && (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No publications yet</h3>
                    <p className="text-gray-600 mb-4">Add your research publications to showcase your work.</p>
                    <button
                      onClick={() => setShowPublicationForm(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Publication
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Resources</h2>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </button>
                </div>

                {resources.length === 0 && (
                  <div className="text-center py-12">
                    <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resources yet</h3>
                    <p className="text-gray-600 mb-4">Upload and share your research resources, protocols, and datasets.</p>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First Resource
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Account Information</h3>
                    <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Email Address</p>
                          <p className="text-sm text-gray-600">{profile.email}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Password</p>
                          <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-gray-900">Account Status</p>
                          <p className="text-sm text-gray-600">
                            {profile.is_active ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {profile.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;