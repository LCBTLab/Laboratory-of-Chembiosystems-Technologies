import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, User, BookOpen } from 'lucide-react';

interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  doi: string;
  category: string;
  abstract: string;
  keywords: string[];
}

const PublicationsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const publications: Publication[] = [
    {
      id: 1,
      title: "Engineering Biomolecular Systems for Sustainable Chemical Production",
      authors: ["Dhar, P.", "Kumar, S.", "Sharma, A.", "Patel, M."],
      journal: "Nature Biotechnology",
      year: 2023,
      volume: "41",
      pages: "123-135",
      doi: "10.1038/s41587-023-01234-5",
      category: "Molecular Systems",
      abstract: "This study presents novel approaches to engineering biomolecular systems for sustainable chemical production, focusing on protein design and metabolic pathway optimization.",
      keywords: ["Protein Engineering", "Sustainable Chemistry", "Biotechnology"]
    },
    {
      id: 2,
      title: "Advanced Biomaterials for Regenerative Medicine Applications",
      authors: ["Dhar, P.", "Kumar, S.", "Sharma, A."],
      journal: "Advanced Materials",
      year: 2022,
      volume: "34",
      pages: "2201234",
      doi: "10.1002/adma.202201234",
      category: "Biomaterials",
      abstract: "Development of next-generation biomaterials with enhanced biocompatibility and functionality for tissue engineering and regenerative medicine applications.",
      keywords: ["Biomaterials", "Tissue Engineering", "Regenerative Medicine"]
    },
    {
      id: 3,
      title: "Protein Engineering Strategies for Enhanced Catalytic Performance",
      authors: ["Singh, R.", "Dhar, P.", "Patel, M."],
      journal: "ACS Catalysis",
      year: 2022,
      volume: "12",
      pages: "8765-8778",
      doi: "10.1021/acscatal.2c01234",
      category: "Catalysis",
      abstract: "Comprehensive review of protein engineering strategies for improving enzyme catalytic performance in industrial applications.",
      keywords: ["Enzyme Engineering", "Catalysis", "Industrial Applications"]
    },
    {
      id: 4,
      title: "Sustainable Bioprocesses for Chemical Manufacturing",
      authors: ["Dhar, P.", "Gupta, N."],
      journal: "Green Chemistry",
      year: 2021,
      volume: "23",
      pages: "4567-4580",
      doi: "10.1039/D1GC01234A",
      category: "Green Chemistry",
      abstract: "Novel bioprocesses for sustainable chemical manufacturing with reduced environmental impact and improved efficiency.",
      keywords: ["Green Chemistry", "Bioprocesses", "Sustainability"]
    },
    {
      id: 5,
      title: "Bioinspired Materials for Environmental Applications",
      authors: ["Sharma, A.", "Dhar, P.", "Kumar, R."],
      journal: "Environmental Science & Technology",
      year: 2021,
      volume: "55",
      pages: "12345-12356",
      doi: "10.1021/acs.est.1c01234",
      category: "Environmental",
      abstract: "Development of bioinspired materials for environmental remediation and pollution control applications.",
      keywords: ["Bioinspired Materials", "Environmental Remediation", "Pollution Control"]
    },
    {
      id: 6,
      title: "Computational Design of Enzyme Active Sites",
      authors: ["Patel, M.", "Dhar, P.", "Singh, R."],
      journal: "PNAS",
      year: 2023,
      volume: "120",
      pages: "e2301234120",
      doi: "10.1073/pnas.2301234120",
      category: "Computational Biology",
      abstract: "Novel computational approaches for designing enzyme active sites with enhanced specificity and activity.",
      keywords: ["Computational Design", "Enzyme Engineering", "Active Sites"]
    },
    {
      id: 7,
      title: "Hydrogel-Based Drug Delivery Systems",
      authors: ["Gupta, N.", "Dhar, P.", "Yadav, V."],
      journal: "Biomaterials",
      year: 2020,
      volume: "245",
      pages: "119876",
      doi: "10.1016/j.biomaterials.2020.119876",
      category: "Drug Delivery",
      abstract: "Development of smart hydrogel systems for controlled drug delivery with improved therapeutic efficacy.",
      keywords: ["Hydrogels", "Drug Delivery", "Controlled Release"]
    },
    {
      id: 8,
      title: "Microbial Electrochemical Systems for Wastewater Treatment",
      authors: ["Kumar, R.", "Dhar, P.", "Mehra, A."],
      journal: "Water Research",
      year: 2020,
      volume: "178",
      pages: "115823",
      doi: "10.1016/j.watres.2020.115823",
      category: "Environmental",
      abstract: "Innovative microbial electrochemical systems for efficient wastewater treatment and energy recovery.",
      keywords: ["Microbial Fuel Cells", "Wastewater Treatment", "Energy Recovery"]
    }
  ];

  const categories = ['all', 'Molecular Systems', 'Biomaterials', 'Catalysis', 'Green Chemistry', 'Environmental', 'Computational Biology', 'Drug Delivery'];
  const years = ['all', ...Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a)];

  const filteredPublications = publications.filter(publication => {
    const matchesCategory = selectedFilter === 'all' || publication.category === selectedFilter;
    const matchesYear = selectedYear === 'all' || publication.year.toString() === selectedYear;
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         publication.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesYear && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Molecular Systems': 'bg-blue-100 text-blue-800',
      'Biomaterials': 'bg-green-100 text-green-800',
      'Catalysis': 'bg-purple-100 text-purple-800',
      'Green Chemistry': 'bg-emerald-100 text-emerald-800',
      'Environmental': 'bg-teal-100 text-teal-800',
      'Computational Biology': 'bg-indigo-100 text-indigo-800',
      'Drug Delivery': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Publications
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our research contributions published in leading scientific journals. 
              Our work spans molecular systems engineering, biomaterials, sustainable chemistry, 
              and bioinspired systems.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{publications.length}</div>
                <div className="text-sm text-gray-600">Total Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {publications.filter(p => p.year >= 2022).length}
                </div>
                <div className="text-sm text-gray-600">Recent (2022+)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {new Set(publications.map(p => p.journal)).size}
                </div>
                <div className="text-sm text-gray-600">Journals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-600">Research Areas</div>
              </div>
            </div>
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
                placeholder="Search publications..."
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
              
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredPublications.map((publication) => (
              <div 
                key={publication.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {publication.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(publication.category)} ml-4 flex-shrink-0`}>
                        {publication.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {publication.authors.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        {publication.journal}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">
                        {publication.year}
                      </span>
                      {publication.volume && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-sm">
                            Vol. {publication.volume}
                          </span>
                        </>
                      )}
                      {publication.pages && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-sm">
                            pp. {publication.pages}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {publication.abstract}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {publication.keywords.map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a 
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    DOI: {publication.doi}
                  </a>
                  
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-blue-600 transition-colors">
                      <span className="text-sm">Cite</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 transition-colors">
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPublications.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No publications found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay Updated with Our Research
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Follow our latest publications and research developments. Connect with us for 
            collaboration opportunities and research partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Google Scholar
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact for Collaboration
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicationsPage;