import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Calendar, User, Tag, ChevronRight, Award, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type ResearchProjectRow = Database['public']['Tables']['cms_research_projects']['Row'];

interface ResearchProject {
  id: string;
  sno: string;
  project: string;
  awardingAgency: string;
  role: string;
  year: string;
  status: string;
  description: string;
  image: string;
  tags: string[];
}

interface IndustrialProject {
  id: string;
  sno: string;
  project: string;
  awardingAgency: string;
  role: string;
  year: string;
  status: string;
  description: string;
  image: string;
  tags: string[];
}

const ResearchPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [industrial, setIndustrial] = useState<IndustrialProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('cms_research_projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) {
        setLoading(false);
        return;
      }

      const rows = (data ?? []) as ResearchProjectRow[];

      const mappedProjects: ResearchProject[] = rows
        .filter((row) => row.project_type === 'research')
        .map((row, index) => ({
          id: row.id,
          sno: String(index + 1),
          project: row.title,
          awardingAgency: row.awarding_agency,
          role: row.role,
          year: row.year,
          status: row.status,
          description: row.description,
          image: row.image ?? '',
          tags: row.tags,
        }));

      const mappedIndustrial: IndustrialProject[] = rows
        .filter((row) => row.project_type === 'industrial')
        .map((row, index) => ({
          id: row.id,
          sno: String(index + 1),
          project: row.title,
          awardingAgency: row.awarding_agency,
          role: row.role,
          year: row.year,
          status: row.status,
          description: row.description,
          image: row.image ?? '',
          tags: row.tags,
        }));

      setProjects(mappedProjects);
      setIndustrial(mappedIndustrial);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statuses = ['all', 'Ongoing', 'Approved', 'Complete'];

  const filteredProjects = projects.filter(project => {
    const matchesStatus = selectedFilter === 'all' || project.status === selectedFilter;
    const matchesSearch = project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.awardingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const filteredIndustrial = industrial.filter(item => {
    const matchesStatus = selectedFilter === 'all' || item.status === selectedFilter;
    const matchesSearch = item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.awardingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'Approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Complete': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slide-in-left">
              Sponsored Research Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-right">
              Explore our comprehensive research projects spanning biotechnology,
              materials science, and sustainable engineering solutions.
            </p>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: "11", label: "Research Projects", delay: "0s" },
              { value: "2", label: "Industrial Projects", delay: "0.2s" },
              { value: "6+", label: "Years Active", delay: "0.4s" },
            
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-bounce-in"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-3xl font-bold text-blue-600 animate-count-up">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation with Animation */}
      <section className="py-8 bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-1 animate-slide-in-up">
              {[
                { id: 'projects', label: 'Research Projects' },
                { id: 'industrial', label: 'Industrial Projects' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between animate-fade-in">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : activeTab === 'projects' ? (
            /* Research Projects Table */
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">S.No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Awarding Agency</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProjects.map((project, index) => (
                      <tr 
                        key={project.id}
                        className="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.sno}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                          <div className="font-medium hover:text-blue-600 transition-colors duration-200">
                            {project.project}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          {project.awardingAgency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {project.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {project.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Industrial Projects Table */
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">S.No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Awarding Agency</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredIndustrial.map((item, index) => (
                      <tr 
                        key={item.id}
                        className="hover:bg-purple-50 transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.sno}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                          <div className="font-medium hover:text-purple-600 transition-colors duration-200">
                            {item.project}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          {item.awardingAgency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                          {item.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {item.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action with Animation */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-slide-in-left">
            Collaborate with Us
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-in-right">
            Interested in our research? We welcome collaborations, partnerships, 
            and opportunities to advance scientific knowledge together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Collaboration
            </a>
            <a 
              href="/research"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes count-up {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-count-up {
          animation: count-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResearchPage;
