import React, { useState, useEffect } from 'react';
import { MoreVertical, CreditCard as Edit3, Trash2, RefreshCw, Settings, TrendingUp, BarChart3, Table, Type, Image, AlertTriangle, Gauge } from 'lucide-react';
import { Widget, WidgetDataResponse } from '../../types/dashboard';
import { useWidgets } from '../../hooks/useWidgets';

interface WidgetComponentProps {
  widget: Widget;
  isEditing: boolean;
  onUpdate: (updates: Partial<Widget>) => void;
  onDelete: () => void;
}

export const WidgetComponent: React.FC<WidgetComponentProps> = ({
  widget,
  isEditing,
  onUpdate,
  onDelete
}) => {
  const [data, setData] = useState<WidgetDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { getWidgetData } = useWidgets();

  const fetchData = async () => {
    if (!widget.data_source_id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getWidgetData(widget.id);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [widget.id, widget.data_source_id]);

  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'chart': return <BarChart3 className="h-4 w-4" />;
      case 'table': return <Table className="h-4 w-4" />;
      case 'text': return <Type className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'metric': return <TrendingUp className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'gauge': return <Gauge className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const renderWidgetContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      );
    }

    switch (widget.type) {
      case 'metric':
        return <MetricWidget widget={widget} data={data} />;
      case 'chart':
        return <ChartWidget widget={widget} data={data} />;
      case 'table':
        return <TableWidget widget={widget} data={data} />;
      case 'text':
        return <TextWidget widget={widget} />;
      case 'image':
        return <ImageWidget widget={widget} />;
      case 'gauge':
        return <GaugeWidget widget={widget} data={data} />;
      case 'alert':
        return <AlertWidget widget={widget} data={data} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span>Unsupported widget type: {widget.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="widget-component h-full flex flex-col">
      {/* Widget Header */}
      <div className="widget-header flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          {getWidgetIcon()}
          <h3 className="font-medium text-gray-900 text-sm truncate">
            {widget.title}
          </h3>
        </div>
        
        {isEditing && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // Open edit modal
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                >
                  <Edit3 className="h-3 w-3 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    fetchData();
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete();
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className="widget-content flex-1 p-3">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

// Individual widget type components
const MetricWidget: React.FC<{ widget: Widget; data: WidgetDataResponse | null }> = ({ widget, data }) => {
  const value = data?.data?.[0]?.[widget.config.y_axis || 'value'] || 0;
  const unit = widget.config.unit || '';
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
      </div>
      {widget.config.target_value && (
        <div className="text-sm text-gray-500">
          Target: {widget.config.target_value.toLocaleString()}{unit}
        </div>
      )}
    </div>
  );
};

const ChartWidget: React.FC<{ widget: Widget; data: WidgetDataResponse | null }> = ({ widget, data }) => {
  // This would integrate with a charting library like Chart.js or Recharts
  return (
    <div className="flex items-center justify-center h-full text-gray-400">
      <div className="text-center">
        <BarChart3 className="h-12 w-12 mx-auto mb-2" />
        <div className="text-sm">Chart visualization</div>
        <div className="text-xs">({data?.data?.length || 0} data points)</div>
      </div>
    </div>
  );
};

const TableWidget: React.FC<{ widget: Widget; data: WidgetDataResponse | null }> = ({ widget, data }) => {
  const columns = widget.config.columns || [];
  const rows = data?.data?.slice(0, widget.config.page_size || 10) || [];

  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column, index) => (
              <th key={index} className="text-left py-2 px-1 font-medium text-gray-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-gray-100">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-1 text-gray-600">
                  {row[column] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TextWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="prose prose-sm max-w-none">
        {widget.config.markdown ? (
          // Would use a markdown parser here
          <div>{widget.config.content}</div>
        ) : (
          <div className="whitespace-pre-wrap">{widget.config.content}</div>
        )}
      </div>
    </div>
  );
};

const ImageWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  return (
    <div className="h-full flex items-center justify-center">
      {widget.config.src ? (
        <img
          src={widget.config.src}
          alt={widget.config.alt || widget.title}
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <div className="text-gray-400 text-center">
          <Image className="h-12 w-12 mx-auto mb-2" />
          <div className="text-sm">No image configured</div>
        </div>
      )}
    </div>
  );
};

const GaugeWidget: React.FC<{ widget: Widget; data: WidgetDataResponse | null }> = ({ widget, data }) => {
  const value = data?.data?.[0]?.[widget.config.y_axis || 'value'] || 0;
  const min = widget.config.min || 0;
  const max = widget.config.max || 100;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#3b82f6"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {value} / {max} {widget.config.unit || ''}
      </div>
    </div>
  );
};

const AlertWidget: React.FC<{ widget: Widget; data: WidgetDataResponse | null }> = ({ widget, data }) => {
  const severity = widget.config.severity || 'info';
  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200'
  };

  return (
    <div className={`h-full p-3 border rounded ${colors[severity]}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
        <div>
          <div className="font-medium text-sm">{widget.title}</div>
          <div className="text-sm mt-1">{widget.config.content}</div>
        </div>
      </div>
    </div>
  );
};