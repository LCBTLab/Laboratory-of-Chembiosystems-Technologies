import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, User, Tag, ChevronRight } from 'lucide-react';

interface ResearchProject {
  id: number;
  title: string;
  category: string;
  status: 'ongoing' | 'completed' | 'planned';
  duration: string;
  funding: string;
  collaborators: string[];
  description: string;
  objectives: string[];
  methods: string[];
  outcomes: string[];
  image: string;
  tags: string[];
  publications: string[];
}

const ResearchPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);

  const projects: ResearchProject[] = [
    {
      id: 1,
      title: "Engineering Robust Enzymes for Industrial Biotechnology",
      category: "Molecular Systems Engineering",
      status: "ongoing",
      duration: "2022-2025",
      funding: "DST-SERB (₹25 Lakhs)",
      collaborators: ["IISc Bangalore", "CSIR-NCL Pune"],
      description: "Development of thermostable and pH-resistant enzymes for industrial applications through protein engineering approaches.",
      objectives: [
        "Design and synthesize novel enzyme variants with enhanced stability",
        "Optimize enzyme performance for industrial conditions",
        "Scale-up production of engineered enzymes",
        "Validate industrial applications"
      ],
      methods: [
        "Directed evolution techniques",
        "Rational protein design",
        "Molecular dynamics simulations",
        "High-throughput screening",
        "Biochemical characterization"
      ],
      outcomes: [
        "5 enzyme variants with 10x improved thermostability",
        "2 patents filed for novel enzyme designs",
        "Industrial collaboration established",
        "3 high-impact publications"
      ],
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Protein Engineering", "Biocatalysis", "Industrial Biotechnology"],
      publications: ["Nature Biotechnology (2023)", "ACS Catalysis (2022)"]
    },
    {
      id: 2,
      title: "Smart Biomaterials for Targeted Drug Delivery",
      category: "Biomaterials & Biointerfaces",
      status: "ongoing",
      duration: "2021-2024",
      funding: "DBT (₹35 Lakhs)",
      collaborators: ["AIIMS Delhi", "PGIMER Chandigarh"],
      description: "Development of stimuli-responsive biomaterials for controlled and targeted drug delivery applications.",
      objectives: [
        "Synthesize pH and temperature-responsive polymers",
        "Develop targeted drug delivery systems",
        "Evaluate biocompatibility and safety",
        "Conduct in-vivo studies"
      ],
      methods: [
        "Polymer synthesis and characterization",
        "Drug encapsulation techniques",
        "Cell culture studies",
        "Animal model studies",
        "Analytical characterization"
      ],
      outcomes: [
        "Novel pH-responsive hydrogel developed",
        "90% drug release efficiency achieved",
        "Successful animal studies completed",
        "2 patents under review"
      ],
      image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Drug Delivery", "Hydrogels", "Biocompatibility"],
      publications: ["Advanced Materials (2022)", "Biomaterials (2021)"]
    },
    {
      id: 3,
      title: "Green Synthesis of High-Value Chemicals",
      category: "Sustainable Chemistry",
      status: "completed",
      duration: "2020-2023",
      funding: "CSIR (₹20 Lakhs)",
      collaborators: ["NCL Pune", "ICT Mumbai"],
      description: "Development of environmentally friendly processes for synthesis of pharmaceutical intermediates and fine chemicals.",
      objectives: [
        "Develop green synthetic routes",
        "Optimize reaction conditions",
        "Scale-up processes",
        "Perform economic analysis"
      ],
      methods: [
        "Biocatalytic synthesis",
        "Green chemistry principles",
        "Process optimization",
        "Life cycle assessment",
        "Techno-economic analysis"
      ],
      outcomes: [
        "3 green synthetic routes established",
        "50% reduction in waste generation",
        "2 processes scaled up to pilot scale",
        "Technology transferred to industry"
      ],
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Green Chemistry", "Sustainability", "Process Development"],
      publications: ["Green Chemistry (2023)", "ChemSusChem (2022)"]
    },
    {
      id: 4,
      title: "Bio-inspired Adhesive Materials",
      category: "Bioinspired Systems",
      status: "ongoing",
      duration: "2023-2026",
      funding: "SERB-ECRA (₹50 Lakhs)",
      collaborators: ["IIT Bombay", "University of Cambridge"],
      description: "Development of bio-inspired adhesive materials based on gecko feet and mussel proteins for medical and industrial applications.",
      objectives: [
        "Understand natural adhesion mechanisms",
        "Design synthetic adhesive systems",
        "Optimize adhesive properties",
        "Develop commercial applications"
      ],
      methods: [
        "Biomimetic design principles",
        "Surface modification techniques",
        "Adhesion testing protocols",
        "Computational modeling",
        "Material characterization"
      ],
      outcomes: [
        "Novel bio-inspired adhesive formulation",
        "10x improved wet adhesion",
        "Medical device prototype developed",
        "International collaboration established"
      ],
      image: "https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Biomimetics", "Adhesives", "Surface Engineering"],
      publications: ["Nature Materials (under review)"]
    },
    {
      id: 5,
      title: "Microbial Electrochemical Systems for Wastewater Treatment",
      category: "Sustainable Chemistry",
      status: "planned",
      duration: "2024-2027",
      funding: "MoEFCC (₹40 Lakhs)",
      collaborators: ["IIT Kharagpur", "TERI New Delhi"],
      description: "Development of microbial fuel cells for simultaneous wastewater treatment and energy generation.",
      objectives: [
        "Optimize microbial communities",
        "Design efficient electrode materials",
        "Scale-up system design",
        "Demonstrate field applications"
      ],
      methods: [
        "Microbial community analysis",
        "Electrochemical characterization",
        "Reactor design and optimization",
        "Pilot-scale testing",
        "Economic feasibility study"
      ],
      outcomes: [
        "High-performance electrode materials",
        "Optimized microbial consortia",
        "Pilot-scale demonstration",
        "Commercial partnership"
      ],
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Microbial Fuel Cells", "Wastewater Treatment", "Renewable Energy"],
      publications: []
    },
    {
      id: 6,
      title: "Computational Design of Membrane Proteins",
      category: "Molecular Systems Engineering",
      status: "ongoing",
      duration: "2023-2025",
      funding: "Intel-DST (₹15 Lakhs)",
      collaborators: ["IIT Delhi", "JNCASR Bangalore"],
      description: "Using computational methods to design and optimize membrane proteins for biotechnological applications.",
      objectives: [
        "Develop computational design tools",
        "Design novel membrane proteins",
        "Validate designs experimentally",
        "Create protein design database"
      ],
      methods: [
        "Molecular dynamics simulations",
        "Machine learning algorithms",
        "Protein structure prediction",
        "Experimental validation",
        "Database development"
      ],
      outcomes: [
        "New computational pipeline developed",
        "5 membrane protein designs validated",
        "Open-source software released",
        "International recognition"
      ],
      image: "https://images.pexels.com/photos/2733659/pexels-photo-2733659.jpeg?auto=compress&cs=tinysrgb&w=500",
      tags: ["Computational Biology", "Protein Design", "Machine Learning"],
      publications: ["PNAS (2023)", "Bioinformatics (2023)"]
    }
  ];

  const categories = ['all', 'Molecular Systems Engineering', 'Biomaterials & Biointerfaces', 'Sustainable Chemistry', 'Bioinspired Systems'];
  const statuses = ['all', 'ongoing', 'completed', 'planned'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedFilter === 'all' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Research Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of research projects spanning molecular systems engineering, 
              biomaterials, sustainable chemistry, and bioinspired systems.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{project.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {project.funding}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
              <div className="relative">
                <img 
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg text-blue-600 font-medium">
                      {selectedProject.category}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {getStatusText(selectedProject.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Duration: {selectedProject.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Funding: {selectedProject.funding}</span>
                      </div>
                      <div className="flex items-start">
                        <User className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                        <div>
                          <span className="text-gray-600">Collaborators:</span>
                          <ul className="ml-2 mt-1">
                            {selectedProject.collaborators.map((collaborator, index) => (
                              <li key={index} className="text-gray-600">• {collaborator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Objectives</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedProject.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Methods</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedProject.methods.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Outcomes</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedProject.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedProject.publications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Publications</h3>
                      <ul className="space-y-2">
                        {selectedProject.publications.map((publication, index) => (
                          <li key={index} className="flex items-center text-blue-600 hover:text-blue-800">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            <span>{publication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPage;