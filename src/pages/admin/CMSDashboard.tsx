import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Users, FlaskConical, Award, Camera,
  Briefcase, Newspaper, UserCircle, Settings
} from 'lucide-react';

const cards = [
  { name: 'Publications', href: '/admin/publications', icon: FileText, desc: 'Manage published research papers' },
  { name: 'Patents', href: '/admin/patents', icon: FileText, desc: 'Manage patent filings and grants' },
  { name: 'Team Members', href: '/admin/team', icon: Users, desc: 'Manage current students and alumni' },
  { name: 'Research Projects', href: '/admin/research', icon: FlaskConical, desc: 'Manage sponsored research projects' },
  { name: 'Awards', href: '/admin/awards', icon: Award, desc: 'Manage awards and honours' },
  { name: 'Gallery', href: '/admin/gallery', icon: Camera, desc: 'Manage lab facility images' },
  { name: 'Opportunities', href: '/admin/opportunities', icon: Briefcase, desc: 'Manage open positions' },
  { name: 'News', href: '/admin/news', icon: Newspaper, desc: 'Manage news and announcements' },
  { name: 'PI Info', href: '/admin/pi-info', icon: UserCircle, desc: 'Edit principal investigator page' },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings, desc: 'Edit homepage and contact info' },
];

const CMSDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Management System</h1>
        <p className="text-gray-600">Manage all website content from here without touching code.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              to={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{card.name}</h3>
                  <p className="text-xs text-gray-500">{card.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CMSDashboard;
