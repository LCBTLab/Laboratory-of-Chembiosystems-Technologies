import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { Widget } from '../../types/dashboard';
import { WidgetComponent } from './WidgetComponent';
import { useWidgets } from '../../hooks/useWidgets';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  dashboardId: string;
  isEditing: boolean;
  onLayoutChange?: (layout: Layout[]) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  dashboardId,
  isEditing,
  onLayoutChange
}) => {
  const { widgets, updateWidget } = useWidgets(dashboardId);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});

  const handleLayoutChange = useCallback((layout: Layout[], layouts: { [key: string]: Layout[] }) => {
    setLayouts(layouts);
    onLayoutChange?.(layout);

    // Update widget positions in database
    layout.forEach(item => {
      const widget = widgets.find(w => w.id === item.i);
      if (widget) {
        const newLayoutConfig = {
          ...widget.layout_config,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h
        };

        updateWidget(widget.id, { layout_config: newLayoutConfig });
      }
    });
  }, [widgets, updateWidget, onLayoutChange]);

  const generateLayout = useCallback((): Layout[] => {
    return widgets.map(widget => ({
      i: widget.id,
      x: widget.layout_config.x,
      y: widget.layout_config.y,
      w: widget.layout_config.w,
      h: widget.layout_config.h,
      minW: widget.layout_config.minW || 1,
      minH: widget.layout_config.minH || 1,
      maxW: widget.layout_config.maxW,
      maxH: widget.layout_config.maxH,
      static: !isEditing || widget.layout_config.static,
      resizeHandles: isEditing ? ['se'] : []
    }));
  }, [widgets, isEditing]);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div className="dashboard-grid">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={60}
        isDraggable={isEditing}
        isResizable={isEditing}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
      >
        {widgets.map(widget => (
          <div key={widget.id} className="widget-container">
            <WidgetComponent
              widget={widget}
              isEditing={isEditing}
              onUpdate={(updates) => updateWidget(widget.id, updates)}
              onDelete={() => {
                // Handle widget deletion
                // This would typically show a confirmation dialog
              }}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <style jsx>{`
        .dashboard-grid {
          width: 100%;
          min-height: 400px;
        }

        .widget-container {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.2s ease;
        }

        .widget-container:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        :global(.react-grid-item.react-grid-placeholder) {
          background: #3b82f6 !important;
          opacity: 0.2 !important;
          border-radius: 8px !important;
        }

        :global(.react-grid-item > .react-resizable-handle) {
          background: #3b82f6 !important;
          border-radius: 0 0 8px 0 !important;
        }

        :global(.react-grid-item.cssTransforms) {
          transition-property: transform, width, height;
          transition-duration: 0.2s;
          transition-timing-function: ease;
        }
      `}</style>
    </div>
  );
};