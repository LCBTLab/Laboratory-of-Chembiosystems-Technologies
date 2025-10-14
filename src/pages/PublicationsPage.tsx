import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, User, BookOpen, Image as ImageIcon } from 'lucide-react';

const PublicationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const publications = [
    {
      id: 55,
      title: "All-Biomass-Derived Cellulose Phosphate-Based Heat-Sealable Films and Thermally Stable Antifizzing Cups with Improved Recyclability",
      authors: ["Ranjan, R.", "Mone, V. P.", "Rai, R.", "Kant, C.", "Dhar, P."],
      journal: "ACS Sustainable Chemistry & Engineering",
      year: 2025,
      volume: "13(17)",
      pages: "6074-6089",
      impactFactor: 7.3,
      category: "Sustainable Materials",
      keywords: ["Cellulose Phosphate", "Heat-Sealable Films", "Recyclability", "Biomass-Derived"],
      graphicalAbstract: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 54,
      title: "Hydrogel-Based Smart Materials for Wound Healing and Sensing",
      authors: ["Duong, T.K.N.", "Truong, T.T.", "Dhar, P.", "Lee, B.", "Oh, J.", "Mondal, S."],
      journal: "Aggregate",
      year: 2025,
      doi: "10.1002/agt2.70047",
      impactFactor: 13.7,
      category: "Biomedical Materials",
      keywords: ["Hydrogel", "Wound Healing", "Sensing", "Smart Materials"],
      graphicalAbstract: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 53,
      title: "Biodegradable, water-resistant, smart cellulose-based drinking straws from agricultural biomass with detection of adulterants in beverages",
      authors: ["Rai, R.", "Bharti, R.", "Dhar, P."],
      journal: "Food Chemistry",
      year: 2025,
      doi: "10.1016/j.foodchem.2025.143093",
      impactFactor: 8.5,
      category: "Food Packaging",
      keywords: ["Biodegradable", "Cellulose", "Drinking Straws", "Adulterant Detection"],
      graphicalAbstract: "https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 52,
      title: "Photoactivated Antibacterial Activity of Fe (III) Complexes via Singlet Oxygen-Mediated Bacterial Membrane Lysis",
      authors: ["Singh, I.", "Rai, R.", "Kushwaha, R.", "Dhar, P.", "Banerjee, S."],
      journal: "Dalton Transactions",
      year: 2025,
      category: "Photodynamic Therapy",
      keywords: ["Photoactivated", "Antibacterial", "Fe Complexes", "Singlet Oxygen"],
      graphicalAbstract: "https://images.pexels.com/photos/3825546/pexels-photo-3825546.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 51,
      title: "Bioactive Hyaluronic acid-Protein based amyloidogenic hydrogel dressing for rapid diabetic wound healing via enhanced angiogenesis and anti-inflammation",
      authors: ["Naik, K.", "Tripathi, S.", "Ranjan, R.", "Agrawal, S.", "Srivastava, S.K.", "Dhar, P.", "Parmar, A.S."],
      journal: "Materials Today Communications",
      year: 2025,
      pages: "113560",
      category: "Biomedical Materials",
      keywords: ["Hyaluronic Acid", "Hydrogel", "Wound Healing", "Angiogenesis"],
      graphicalAbstract: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 50,
      title: "In-situ growth of MoS2 on 3D printed phosphorylated cellulose for simultaneous dye degradation and microbial inactivation",
      authors: ["Ranjan, R.", "Rai, R.", "Naik, K.", "Parmar, A.S.", "Dhar, P."],
      journal: "Cellulose",
      year: 2025,
      doi: "10.1007/s10570-024-06361-2",
      impactFactor: 5.3,
      category: "Environmental Remediation",
      keywords: ["MoS2", "3D Printing", "Cellulose", "Dye Degradation"],
      graphicalAbstract: "https://images.pexels.com/photos/3825455/pexels-photo-3825455.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 49,
      title: "Cellulose-based phosphorylated bamboo with slow urea release and lower carbon footprints improves rainfed rice crop productivity in field trials",
      authors: ["Rai, R.", "Ranjan, R.", "Kumari, S.", "De, N.", "Dhar, P."],
      journal: "International Journal of Biological Macromolecules",
      year: 2025,
      impactFactor: 8.2,
      category: "Agricultural Applications",
      keywords: ["Cellulose", "Bamboo", "Urea Release", "Rice Productivity"],
      graphicalAbstract: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 48,
      title: "Conductive Hybrid Hydrogel of Carbon Nanotubes-Protein-Cellulose: In vivo Treatment of Diabetic Wound via Photothermal Therapy and Tracking Real-Time Wound Assessment via Photoacoustic Imaging",
      authors: ["Naik, K.", "Tripathi, S.", "Ranjan, R.", "Agrawal, S.", "Singh, S.", "Dhar, P.", "Singh, K.", "Tiwari, V.", "Parmar, A."],
      journal: "ACS Applied Bio Materials",
      year: 2025,
      impactFactor: 4.7,
      category: "Biomedical Materials",
      keywords: ["Conductive Hydrogel", "Carbon Nanotubes", "Photothermal Therapy"],
      graphicalAbstract: "https://images.pexels.com/photos/3825569/pexels-photo-3825569.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  // Add default graphical abstract to all publications that don't have one
  const publicationsWithImages = publications.map(pub => ({
    ...pub,
    graphicalAbstract: pub.graphicalAbstract || "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400"
  }));

  const categories = ['all', 'Sustainable Materials', 'Biomedical Materials', 'Food Packaging', 'Photodynamic Therapy', 
    'Environmental Remediation', 'Agricultural Applications', 'Computational Biology', 'Enzyme Technology', 
    'Bio-composites', 'Nanocomposites', 'Energy Materials', 'Energy Storage', 'Catalysis', 'Bionanocomposites',
    'Food Preservation', 'Environmental Assessment', 'Nanomaterials', 'Biosensors'];
    
  const years = ['all', ...Array.from(new Set(publicationsWithImages.map(p => p.year))).sort((a, b) => b - a)];

  const filteredPublications = publicationsWithImages.filter(publication => {
    const matchesCategory = selectedFilter === 'all' || publication.category === selectedFilter;
    const matchesYear = selectedYear === 'all' || publication.year.toString() === selectedYear;
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         publication.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesYear && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Sustainable Materials': 'bg-green-100 text-green-800',
      'Biomedical Materials': 'bg-blue-100 text-blue-800',
      'Food Packaging': 'bg-orange-100 text-orange-800',
      'Photodynamic Therapy': 'bg-purple-100 text-purple-800',
      'Environmental Remediation': 'bg-teal-100 text-teal-800',
      'Agricultural Applications': 'bg-lime-100 text-lime-800',
      'Computational Biology': 'bg-indigo-100 text-indigo-800',
      'Enzyme Technology': 'bg-cyan-100 text-cyan-800',
      'Bio-composites': 'bg-emerald-100 text-emerald-800',
      'Nanocomposites': 'bg-violet-100 text-violet-800',
      'Energy Materials': 'bg-amber-100 text-amber-800',
      'Energy Storage': 'bg-yellow-100 text-yellow-800',
      'Catalysis': 'bg-rose-100 text-rose-800',
      'Bionanocomposites': 'bg-fuchsia-100 text-fuchsia-800',
      'Food Preservation': 'bg-sky-100 text-sky-800',
      'Environmental Assessment': 'bg-teal-100 text-teal-800',
      'Nanomaterials': 'bg-purple-100 text-purple-800',
      'Biosensors': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
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
                <div className="text-3xl font-bold text-blue-600">{publicationsWithImages.length}</div>
                <div className="text-sm text-gray-600">Total Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {publicationsWithImages.filter(p => p.year >= 2022).length}
                </div>
                <div className="text-sm text-gray-600">Recent (2022+)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {new Set(publicationsWithImages.map(p => p.journal)).size}
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

      <section className="py-8 bg-gray-50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredPublications.map((publication) => (
              <div 
                key={publication.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Graphical Abstract Image */}
                  <div className="lg:w-64 lg:flex-shrink-0">
                    <div className="relative h-48 lg:h-full">
                      <img 
                        src={publication.graphicalAbstract}
                        alt={`Graphical abstract for ${publication.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <ImageIcon className="h-3 w-3 text-gray-600 mr-1" />
                        <span className="text-xs font-medium text-gray-600">Graphical Abstract</span>
                      </div>
                    </div>
                  </div>

                  {/* Publication Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors flex-1">
                        {publication.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(publication.category)} ml-4 flex-shrink-0`}>
                        {publication.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <User className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {publication.authors.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4 flex-wrap">
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
                      {publication.impactFactor && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-sm font-semibold text-green-600">
                            I.F. {publication.impactFactor}
                          </span>
                        </>
                      )}
                    </div>
                    
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

                    {publication.doi && (
                      <div className="flex items-center pt-4 border-t border-gray-100">
                        <a 
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          DOI: {publication.doi}
                        </a>
                      </div>
                    )}
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
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Google Scholar
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
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
