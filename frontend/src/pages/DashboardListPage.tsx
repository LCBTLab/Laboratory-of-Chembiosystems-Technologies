import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, CreditCard as Edit3, Trash2, Share2, Copy, Eye, Calendar, User, LayoutGrid as Layout } from 'lucide-react';
import { useDashboards } from '../hooks/useDashboards';
import { Dashboard } from '../types/dashboard';

const DashboardListPage: React.FC = () => {
  const { dashboards, loading, error, deleteDashboard, cloneDashboard } = useDashboards();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'own' | 'shared' | 'public'>('all');
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredDashboards = dashboards.filter(dashboard => {
    const matchesSearch = dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dashboard.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter logic would depend on user permissions and dashboard ownership
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'public' && dashboard.is_public);
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (dashboard: Dashboard) => {
    try {
      await deleteDashboard(dashboard.id);
      setShowDeleteModal(false);
      setSelectedDashboard(null);
    } catch (err) {
      console.error('Failed to delete dashboard:', err);
    }
  };

  const handleClone = async (dashboard: Dashboard) => {
    try {
      await cloneDashboard(dashboard.id, `${dashboard.title} (Copy)`);
    } catch (err) {
      console.error('Failed to clone dashboard:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboards</h1>
              <p className="text-gray-600 mt-1">
                Create and manage your research dashboards
              </p>
            </div>
            <Link
              to="/dashboard/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dashboards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dashboards</option>
              <option value="own">My Dashboards</option>
              <option value="shared">Shared with Me</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Dashboard Preview */}
              <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layout className="h-12 w-12 text-gray-400" />
                </div>
                {dashboard.is_public && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Public
                    </span>
                  </div>
                )}
              </div>

              {/* Dashboard Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate flex-1">
                    {dashboard.title}
                  </h3>
                  <div className="relative ml-2">
                    <button
                      onClick={() => setSelectedDashboard(
                        selectedDashboard?.id === dashboard.id ? null : dashboard
                      )}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                    
                    {selectedDashboard?.id === dashboard.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[140px]">
                        <Link
                          to={`/dashboard/${dashboard.id}`}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                        >
                          <Eye className="h-3 w-3 mr-2" />
                          View
                        </Link>
                        <Link
                          to={`/dashboard/${dashboard.id}/edit`}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                        >
                          <Edit3 className="h-3 w-3 mr-2" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleClone(dashboard)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                        >
                          <Copy className="h-3 w-3 mr-2" />
                          Clone
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDashboard(dashboard);
                            setShowDeleteModal(true);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center"
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {dashboard.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {dashboard.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(dashboard.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>Owner</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <Link
                  to={`/dashboard/${dashboard.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors text-center"
                >
                  Open
                </Link>
                <button
                  onClick={() => {
                    // Handle share functionality
                  }}
                  className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDashboards.length === 0 && !loading && (
          <div className="text-center py-12">
            <Layout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No dashboards found' : 'No dashboards yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or filters.'
                : 'Create your first dashboard to get started with data visualization.'
              }
            </p>
            {!searchTerm && (
              <Link
                to="/dashboard/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Dashboard
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedDashboard.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedDashboard(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedDashboard)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardListPage;