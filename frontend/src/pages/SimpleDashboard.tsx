import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  User, 
  Edit, 
  LogOut, 
  Mail, 
  Briefcase,
  BookOpen,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const SimpleDashboard: React.FC = () => {
  const { user, signOut, initialize, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
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

  const isProfileComplete = user.designation && user.research_focus && user.bio;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Member Dashboard</h1>
              <p className="text-gray-600">Manage your profile information</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.designation || 'No designation set'}</p>
                <div className="w-full space-y-2 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {user.phone}
                    </div>
                  )}
                  {user.joined_date && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined: {new Date(user.joined_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Completion Status */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
              {isProfileComplete ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Profile Complete</span>
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Profile Incomplete</span>
                </div>
              )}
              <p className="mt-3 text-sm text-gray-600">
                {isProfileComplete
                  ? 'Your profile is complete and visible on the team page.'
                  : 'Complete your profile to appear on the team page.'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/profile/edit"
                  className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Profile
                </Link>
                <Link
                  to="/team"
                  className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5 mr-2" />
                  View Team Page
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Lab Website
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Profile Information</h2>
                <Link
                  to="/profile/edit"
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </div>

              <div className="space-y-6">
                {/* Research Focus */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Research Focus
                  </h3>
                  <p className="text-gray-900">
                    {user.research_focus || (
                      <span className="text-gray-400 italic">Not set - Click edit to add your research focus</span>
                    )}
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
                  <p className="text-gray-900 whitespace-pre-line">
                    {user.bio || (
                      <span className="text-gray-400 italic">Not set - Click edit to add your bio</span>
                    )}
                  </p>
                </div>

                {/* Academic Links */}
                {(user.linkedin_url || user.google_scholar_url || user.researchgate_url || user.orcid_url) && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Academic & Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {user.linkedin_url && (
                        <a
                          href={user.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">LinkedIn</span>
                        </a>
                      )}
                      {user.google_scholar_url && (
                        <a
                          href={user.google_scholar_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">Google Scholar</span>
                        </a>
                      )}
                      {user.researchgate_url && (
                        <a
                          href={user.researchgate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">ResearchGate</span>
                        </a>
                      )}
                      {user.orcid_url && (
                        <a
                          href={user.orcid_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">ORCID</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Help Text */}
                {!isProfileComplete && (
                  <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-900 mb-1">Complete Your Profile</h4>
                        <p className="text-sm text-amber-700">
                          Please add your designation, research focus, and bio to appear on the public team page.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
