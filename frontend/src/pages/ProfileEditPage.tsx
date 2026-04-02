import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  User, 
  Mail, 
  Briefcase, 
  BookOpen, 
  Globe, 
  Phone, 
  Calendar,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Linkedin,
  GraduationCap
} from 'lucide-react';

const ProfileEditPage: React.FC = () => {
  const { user, updateProfile, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    research_focus: '',
    bio: '',
    phone: '',
    linkedin_url: '',
    researchgate_url: '',
    google_scholar_url: '',
    orcid_url: '',
    joined_date: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        designation: user.designation || '',
        research_focus: user.research_focus || '',
        bio: user.bio || '',
        phone: user.phone || '',
        linkedin_url: user.linkedin_url || '',
        researchgate_url: user.researchgate_url || '',
        google_scholar_url: user.google_scholar_url || '',
        orcid_url: user.orcid_url || '',
        joined_date: user.joined_date || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfile(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
          <p className="mt-2 text-gray-600">Update your information to display on the team page</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select designation</option>
                  <option value="PI">Principal Investigator (PI)</option>
                  <option value="PhD">PhD Scholar</option>
                  <option value="M.Tech">M.Tech Student</option>
                  <option value="B.Tech">B.Tech Student</option>
                  <option value="Staff">Research Staff</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="joined_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Joining Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="joined_date"
                    name="joined_date"
                    value={formData.joined_date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Research Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Research Information
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="research_focus" className="block text-sm font-medium text-gray-700 mb-2">
                  Research Focus
                </label>
                <input
                  type="text"
                  id="research_focus"
                  name="research_focus"
                  value={formData.research_focus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Synthetic Biology, Metabolic Engineering"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio / About
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write a brief bio about your research interests, academic background, and achievements..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  This will be displayed on the team page
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Academic & Social Links
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="google_scholar_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Google Scholar Profile
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="google_scholar_url"
                    name="google_scholar_url"
                    value={formData.google_scholar_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://scholar.google.com/citations?user=..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="researchgate_url" className="block text-sm font-medium text-gray-700 mb-2">
                  ResearchGate Profile
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="researchgate_url"
                    name="researchgate_url"
                    value={formData.researchgate_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.researchgate.net/profile/..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="orcid_url" className="block text-sm font-medium text-gray-700 mb-2">
                  ORCID
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="orcid_url"
                    name="orcid_url"
                    value={formData.orcid_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://orcid.org/0000-0000-0000-0000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
