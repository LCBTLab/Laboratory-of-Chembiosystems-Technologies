import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, User, Tag, ChevronRight, Award, BookOpen } from 'lucide-react';

interface ResearchProject {
  id: number;
  sno: string;
  project: string;
  awardingAgency: string;
  role: string;
  year: string;
  status: 'Ongoing' | 'Approved' | 'Complete';
  description: string;
  image: string;
  tags: string[];
}

interface IndustrialProjects {
  id: number;
  sno: string;
  project: string;
  awardingAgency: string;
  role: string;
  year: string;
  status: 'Ongoing' | 'Approved' | 'Complete';
  description: string;
  image: string;
  tags: string[];
}

const ResearchPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const projects: ResearchProject[] = [
    {
      id: 1,
      sno: "1",
      project: "Bioengineering of Living Materials to fabricate Functionalized Bacterial Nanocellulose for High-Performance Applications",
      awardingAgency: "Department of Biotechnology (DBT), Govt. of India",
      role: "P.I.",
      year: "2021-26",
      status: "Ongoing",
      description: "Advanced bioengineering project focusing on bacterial nanocellulose for high-performance applications",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Bioengineering", "Nanocellulose", "Biotechnology"]
    },
    {
      id: 2,
      sno: "2",
      project: "Education Guidelines - Enabling of Academic Institutes in Technical Textiles",
      awardingAgency: "Ministry of Textiles, Govt. of India",
      role: "P.I.",
      year: "2025-28",
      status: "Approved",
      description: "Educational framework development for technical textiles in academic institutions",
      image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Education", "Technical Textiles", "Guidelines"]
    },
    {
      id: 3,
      sno: "3",
      project: "Biopolymer based degradable and wireless implantable biosensors for monitoring of post-surgical clotting disorders and peripheral nerve injuries",
      awardingAgency: "Department of Biotechnology (DBT), Govt. of India",
      role: "P.I.",
      year: "2024-27",
      status: "Approved",
      description: "Development of biodegradable wireless biosensors for medical monitoring applications",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Biopolymer", "Biosensors", "Medical Technology"]
    },
    {
      id: 4,
      sno: "4",
      project: "Sustainable and Green Campus initiative: Integrated circular economy based approach for valorization of campus leaf waste and agrobiomass into valueadded products: A pilot plant study with economic sustainability and industrial relevance",
      awardingAgency: "IIT (BHU)",
      role: "P.I.",
      year: "2025-27",
      status: "Approved",
      description: "Circular economy approach for campus waste valorization into value-added products",
      image: "https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Sustainability", "Circular Economy", "Waste Valorization"]
    },
    {
      id: 5,
      sno: "5",
      project: "Te-MobiX: Safe and Degradation-controlled Batteries with Efficient Charging for Tropical e-Mobility Excellence",
      awardingAgency: "Anusandhan National Research Foundation (ANRF)",
      role: "Co-P.I.",
      year: "2025-28",
      status: "Ongoing",
      description: "Development of safe and efficient battery technology for tropical e-mobility applications",
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Battery Technology", "E-Mobility", "Tropical Applications"]
    },
    {
      id: 6,
      sno: "6",
      project: "Agro-Pads: An integrated strategy to convert agro-waste to affordable sanitary and medicinal pads for health and socio-economic upliftment of rural girls & women",
      awardingAgency: "Department of Biotechnology (DBT), Govt. of India",
      role: "P.I.",
      year: "2025-27",
      status: "Approved",
      description: "Converting agricultural waste into affordable sanitary products for rural women's health",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Agro-waste", "Healthcare", "Social Impact"]
    },
    {
      id: 7,
      sno: "7",
      project: "Safety and efficacy studies of value-added forest produce",
      awardingAgency: "CGMFP, Govt. of C.G.",
      role: "P.I.",
      year: "2024-25",
      status: "Approved",
      description: "Comprehensive safety and efficacy evaluation of forest-based value-added products",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Forest Products", "Safety Studies", "Value Addition"]
    },
    {
      id: 8,
      sno: "8",
      project: "Lignocellulose based scalable luminous photonic biopolymers for sustainable films and coatings",
      awardingAgency: "Department of Biotechnology (DBT), Govt. of India",
      role: "P.I.",
      year: "2024-27",
      status: "Ongoing",
      description: "Development of luminous photonic biopolymers from lignocellulose for sustainable applications",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Lignocellulose", "Photonic Materials", "Sustainable Films"]
    },
    {
      id: 9,
      sno: "9",
      project: "End functionalized cellulose nanocrsytals using integrated microfluidics for product ion of high-performance optically active coatings and fibers",
      awardingAgency: "Department of Science & Technology (DST), Govt. of India (Indo-Japan project)",
      role: "P.I.",
      year: "2024-26",
      status: "Approved",
      description: "Microfluidics-based functionalization of cellulose nanocrystals for optical applications",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Cellulose Nanocrystals", "Microfluidics", "Optical Materials"]
    },
    {
      id: 10,
      sno: "10",
      project: "Scale-up studies of isoprene production from genetically engineered cyanobacteria for biofuel application",
      awardingAgency: "CST, Govt. of U.P.",
      role: "Co-P.I.",
      year: "2024-26",
      status: "Ongoing",
      description: "Scaling up isoprene production using genetically modified cyanobacteria for biofuel applications",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Biofuel", "Cyanobacteria", "Genetic Engineering"]
    },
    {
      id: 11,
      sno: "11",
      project: "Novel Bioprocessing routes for development of value-added products",
      awardingAgency: "IIT (BHU)",
      role: "P.I.",
      year: "2020-21",
      status: "Complete",
      description: "Development of innovative bioprocessing methods for creating value-added products",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Bioprocessing", "Value Addition", "Innovation"]
    }
  ];
  const Industrial: IndustrialProject[] = [
     {
      id: 1,
      sno: "1",
      project: "Manufacturing process for functionalized cellulose phosphate fibre from cellulose fibre or pulp & explore its application in value-added products",
      awardingAgency: " Aditya Birla",
      role: "P.I.",
      year: "2024-27",
      status: "Ongoing",
      description: "",
      image: "",
      tags: [""]
    },
    {
      id: 2,
      sno: "2",
      project: "Functionalized cellulose fiber production from Coconut waste and explore its applications into textiles",
      role: "P.I.",
      year: "2025-27",
      status: "Approved",
      description: "",
      image: "",
      tags: ["Education", "Technical Textiles", "Guidelines"]
    }
  ];

  const statuses = ['all', 'Ongoing', 'Approved', 'Complete'];

  const filteredProjects = projects.filter(project => {
    const matchesStatus = selectedFilter === 'all' || project.status === selectedFilter;
    const matchesSearch = project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.awardingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const filteredIndustrial = industrial.filter(industrial => {
    const matchesStatus = selectedFilter === 'all' || industrial.status === selectedFilter;
    const matchesSearch = industrial.Industrial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        industrial.awardingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        industrial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const getImpactFactorColor = (impactFactor: string) => {
    const factor = parseFloat(impactFactor);
    if (factor >= 10) return 'bg-red-100 text-red-800 border-red-200';
    if (factor >= 5) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (factor >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slide-in-left">
              Sponsored Research Project
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-right">
              Explore our comprehensive research projects and publications spanning biotechnology,
              materials science, and sustainable engineering solutions.
            </p>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: "11", label: "Research Projects", delay: "0s" },
              { value: publications.length, label: "Publications", delay: "0.2s" },
              { value: "6+", label: "Years Active", delay: "0.4s" },
              { value: "50+", label: "Collaborations", delay: "0.6s" }
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
      <section className="py-8 bg-white sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-1 animate-slide-in-up">
              {[
                { id: 'projects', label: 'Research Projects', icon: Award },
                { id: 'publications', label: 'Publications', icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between animate-fade-in">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            {activeTab === 'projects' && (
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-gray-600" />
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
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'Industrial' ? (
            /* Projects Table */
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
                    {filteredProject.map((industrial, index) => (
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
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full animate-pulse"
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border animate-pulse ${getStatusColor(project.status)}`}>
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
            /* Industrial Table */
             <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'indrustrial' ? (
            /* Projects Table */
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
                    {filteredIndustrial.map((industrial, index) => (
                      <tr 
                        key={industrial.id}
                        className="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {industrial.sno}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                          <div className="font-medium hover:text-blue-600 transition-colors duration-200">
                            {industrial.project}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {industrial.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full animate-pulse"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          {industrial.awardingAgency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {Industrial.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {industrial.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border animate-pulse ${getStatusColor(Industrial.status)}`}>
                            {industrial.Industrial}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Collaboration
            </a>
            <a 
              href="/publications"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              View All Publications
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
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
