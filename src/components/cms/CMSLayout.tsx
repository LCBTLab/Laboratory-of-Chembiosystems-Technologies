import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Users, FlaskConical, Award,
  Camera, Briefcase, Newspaper, UserCircle, Settings,
  Menu, X, LogOut, ExternalLink, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Publications', href: '/admin/publications', icon: FileText },
  { name: 'Patents', href: '/admin/patents', icon: FileText },
  { name: 'Team Members', href: '/admin/team', icon: Users },
  { name: 'Research Projects', href: '/admin/research', icon: FlaskConical },
  { name: 'Awards', href: '/admin/awards', icon: Award },
  { name: 'Gallery', href: '/admin/gallery', icon: Camera },
  { name: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'PI Info', href: '/admin/pi-info', icon: UserCircle },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

const CMSLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (href: string) =>
    href === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-gray-700">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard className="h-7 w-7 text-blue-400" />
            <div>
              <h1 className="text-sm font-bold">CMS Admin</h1>
              <p className="text-xs text-gray-400">Content Management</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-700 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm text-red-400 hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="flex items-center text-sm text-gray-500">
                <Link to="/admin" className="hover:text-gray-700">Admin</Link>
                {location.pathname !== '/admin' && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-900 font-medium">
                      {navItems.find(n => isActive(n.href) && n.href !== '/admin')?.name || 'Dashboard'}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {profile && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                  <p className="text-xs text-gray-500">{profile.email}</p>
                </div>
              )}
              {user?.email && !profile && (
                <span className="text-sm text-gray-700">{user.email}</span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
