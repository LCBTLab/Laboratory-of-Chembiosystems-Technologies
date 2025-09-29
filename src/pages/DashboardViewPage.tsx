import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard as Edit3, Share2, RefreshCw, Settings, MoreVertical, Maximize2, Download, Clock } from 'lucide-react';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';
import { useDashboards } from '../hooks/useDashboards';
import { Dashboard } from '../types/dashboard';

const DashboardViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dashboards, loading, error } = useDashboards();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    if (id && dashboards.length > 0) {
      const foundDashboard = dashboards.find(d => d.id === id);
      setDashboard(foundDashboard || null);
    }
  }, [id, dashboards]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh && refreshInterval > 0) {
      interval = setInterval(() => {
        setLastRefresh(new Date());
        // Trigger refresh of all widgets
        window.dispatchEvent(new CustomEvent('dashboard-refresh'));
      }, refreshInterval * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
    window.dispatchEvent(new CustomEvent('dashboard-refresh'));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleExport = () => {
    // Implementation for exporting dashboard as PDF/PNG
    console.log('Export dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The dashboard you are looking for does not exist or you do not have permission to view it.'}
          </p>
          <Link
            to="/dashboards"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? 'p-0' : ''}`}>
      {/* Header */}
      {!isFullscreen && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboards"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {dashboard.title}
                  </h1>
                  {dashboard.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {dashboard.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Auto Refresh Toggle */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Auto-refresh</span>
                  </label>
                  {autoRefresh && (
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="text-xs border-gray-300 rounded px-2 py-1"
                    >
                      <option value={10}>10s</option>
                      <option value={30}>30s</option>
                      <option value={60}>1m</option>
                      <option value={300}>5m</option>
                    </select>
                  )}
                </div>

                {/* Manual Refresh */}
                <button
                  onClick={handleManualRefresh}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh Dashboard"
                >
                  <RefreshCw className="h-5 w-5 text-gray-600" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                </button>

                {/* Export */}
                <button
                  onClick={handleExport}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Export Dashboard"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </button>

                {/* Edit */}
                <Link
                  to={`/dashboard/${dashboard.id}/edit`}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Link>

                {/* More Options */}
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Last Refresh Info */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div>
                Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
              {autoRefresh && (
                <div>
                  Auto-refresh: Every {refreshInterval}s
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className={`${isFullscreen ? 'p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
        <DashboardGrid
          dashboardId={dashboard.id}
          isEditing={false}
        />
      </div>

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className="fixed top-4 right-4 z-50 p-2 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          title="Exit Fullscreen"
        >
          <Maximize2 className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default DashboardViewPage;