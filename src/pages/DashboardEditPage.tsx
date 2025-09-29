import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Settings, Eye, Undo, Redo, Grid2x2 as Grid, Layers } from 'lucide-react';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';
import { useDashboards } from '../hooks/useDashboards';
import { useWidgets } from '../hooks/useWidgets';
import { Dashboard, Widget, CreateWidgetForm } from '../types/dashboard';

const DashboardEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dashboards, updateDashboard } = useDashboards();
  const { createWidget } = useWidgets(id);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  useEffect(() => {
    if (id && dashboards.length > 0) {
      const foundDashboard = dashboards.find(d => d.id === id);
      setDashboard(foundDashboard || null);
    }
  }, [id, dashboards]);

  const handleSave = async () => {
    if (!dashboard) return;

    try {
      await updateDashboard(dashboard.id, dashboard);
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to save dashboard:', err);
    }
  };

  const handleAddWidget = async (widgetType: string) => {
    if (!dashboard) return;

    const newWidget: CreateWidgetForm = {
      title: `New ${widgetType}`,
      type: widgetType as any,
      config: {},
      layout_config: {
        x: 0,
        y: 0,
        w: 4,
        h: 3,
        minW: 2,
        minH: 2
      }
    };

    try {
      await createWidget(newWidget);
      setShowWidgetPanel(false);
    } catch (err) {
      console.error('Failed to create widget:', err);
    }
  };

  const widgetTypes = [
    { type: 'metric', label: 'Metric', description: 'Display a single key metric' },
    { type: 'chart', label: 'Chart', description: 'Visualize data with charts' },
    { type: 'table', label: 'Table', description: 'Display data in tabular format' },
    { type: 'text', label: 'Text', description: 'Add text content or markdown' },
    { type: 'image', label: 'Image', description: 'Display images or media' },
    { type: 'gauge', label: 'Gauge', description: 'Show progress or percentage' },
    { type: 'alert', label: 'Alert', description: 'Display alerts or notifications' }
  ];

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Not Found</h2>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/dashboard/${dashboard.id}`}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Edit: {dashboard.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Drag and drop widgets to customize your dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Undo/Redo */}
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Undo"
              >
                <Undo className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Redo"
              >
                <Redo className="h-5 w-5 text-gray-600" />
              </button>

              {/* Grid Toggle */}
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Toggle Grid"
              >
                <Grid className="h-5 w-5 text-gray-600" />
              </button>

              {/* Add Widget */}
              <button
                onClick={() => setShowWidgetPanel(!showWidgetPanel)}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Dashboard Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>

              {/* Preview */}
              <Link
                to={`/dashboard/${dashboard.id}`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <DashboardGrid
            dashboardId={dashboard.id}
            isEditing={true}
            onLayoutChange={() => setHasUnsavedChanges(true)}
          />
        </div>

        {/* Widget Panel */}
        {showWidgetPanel && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Widget</h3>
              <button
                onClick={() => setShowWidgetPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {widgetTypes.map((widget) => (
                <button
                  key={widget.type}
                  onClick={() => handleAddWidget(widget.type)}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <Layers className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900">{widget.label}</span>
                  </div>
                  <p className="text-sm text-gray-600">{widget.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettingsPanel && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Dashboard Settings</h3>
              <button
                onClick={() => setShowSettingsPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dashboard Title
                </label>
                <input
                  type="text"
                  value={dashboard.title}
                  onChange={(e) => {
                    setDashboard({ ...dashboard, title: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={dashboard.description || ''}
                  onChange={(e) => {
                    setDashboard({ ...dashboard, description: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Layout Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Layout</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={dashboard.settings.show_grid}
                      onChange={(e) => {
                        setDashboard({
                          ...dashboard,
                          settings: { ...dashboard.settings, show_grid: e.target.checked }
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show grid</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={dashboard.settings.snap_to_grid}
                      onChange={(e) => {
                        setDashboard({
                          ...dashboard,
                          settings: { ...dashboard.settings, snap_to_grid: e.target.checked }
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Snap to grid</span>
                  </label>
                </div>
              </div>

              {/* Refresh Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Auto Refresh</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={dashboard.settings.auto_refresh}
                      onChange={(e) => {
                        setDashboard({
                          ...dashboard,
                          settings: { ...dashboard.settings, auto_refresh: e.target.checked }
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable auto refresh</span>
                  </label>
                  
                  {dashboard.settings.auto_refresh && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Refresh Interval (seconds)
                      </label>
                      <input
                        type="number"
                        min="10"
                        value={dashboard.settings.refresh_interval || 300}
                        onChange={(e) => {
                          setDashboard({
                            ...dashboard,
                            settings: { 
                              ...dashboard.settings, 
                              refresh_interval: parseInt(e.target.value) 
                            }
                          });
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Visibility Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Visibility</h4>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dashboard.is_public}
                    onChange={(e) => {
                      setDashboard({ ...dashboard, is_public: e.target.checked });
                      setHasUnsavedChanges(true);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Make public</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center">
            <div className="text-sm text-yellow-800">
              You have unsaved changes
            </div>
            <button
              onClick={handleSave}
              className="ml-3 px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition-colors"
            >
              Save Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEditPage;