import React, { useState } from 'react';
import { Calendar, User, Tag, Search, Filter, ExternalLink, Award, BookOpen, Users } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  featured: boolean;
}

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Lab Receives Major Research Grant from DST-SERB",
      category: "Awards",
      date: "2023-11-20",
      author: "Dr. Prodyut Dhar",
      excerpt: "Our laboratory has been awarded a significant research grant of ₹50 lakhs from the Department of Science and Technology - Science and Engineering Research Board (DST-SERB) for our project on sustainable biomaterials.",
      content: "We are thrilled to announce that our laboratory has received a major research grant of ₹50 lakhs from the Department of Science and Technology - Science and Engineering Research Board (DST-SERB). This three-year grant will support our groundbreaking research on developing sustainable biomaterials for medical applications. The project, titled 'Engineering Smart Biomaterials for Targeted Therapeutic Applications,' will focus on creating next-generation materials that can respond to biological stimuli and deliver drugs with unprecedented precision. This funding will enable us to expand our research capabilities, acquire new equipment, and support additional research personnel. We are grateful for this recognition and look forward to making significant contributions to the field of biomaterials science.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Research Grant", "DST-SERB", "Biomaterials", "Funding"],
      featured: true
    },
    {
      id: 2,
      title: "Research Paper Published in Nature Biotechnology",
      category: "Publications",
      date: "2023-11-15",
      author: "Research Team",
      excerpt: "Our latest research on engineering biomolecular systems for sustainable chemical production has been published in the prestigious journal Nature Biotechnology.",
      content: "We are proud to announce the publication of our research paper titled 'Engineering Biomolecular Systems for Sustainable Chemical Production' in Nature Biotechnology, one of the most prestigious journals in the field. This work represents a significant breakthrough in our understanding of how to design and optimize biological systems for industrial applications. The research demonstrates novel approaches to protein engineering and metabolic pathway optimization that could revolutionize sustainable chemical manufacturing. The paper is the result of three years of intensive research and collaboration with international partners. This publication not only validates our research approach but also opens new avenues for future investigations in the field of synthetic biology and sustainable biotechnology.",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Publication", "Nature Biotechnology", "Protein Engineering", "Sustainability"],
      featured: true
    },
    {
      id: 3,
      title: "New PhD Students Join the Lab",
      category: "Team",
      date: "2023-11-10",
      author: "Lab Administration",
      excerpt: "We welcome three new PhD students to our research team, bringing fresh perspectives and expertise to our ongoing projects.",
      content: "We are excited to welcome three talented new PhD students to our laboratory family. Arjun Sharma joins us from IIT Delhi with expertise in computational biology, Priya Patel brings her background in materials science from IIT Bombay, and Rohit Kumar comes with extensive experience in biochemical engineering from IIT Kharagpur. Each of these students brings unique skills and perspectives that will greatly enhance our research capabilities. They will be working on various projects including protein design, biomaterial synthesis, and sustainable process development. We look forward to their contributions and are committed to providing them with the best possible research environment and mentorship. Their addition to our team strengthens our capacity to tackle complex interdisciplinary challenges in chembiosystems research.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["New Members", "PhD Students", "Team Growth"],
      featured: false
    },
    {
      id: 4,
      title: "International Conference Presentation at Biotechnology Summit",
      category: "Events",
      date: "2023-11-05",
      author: "Dr. Prodyut Dhar",
      excerpt: "Dr. Dhar presented our latest research findings at the International Biotechnology Summit in Singapore, receiving excellent feedback from the global research community.",
      content: "Dr. Prodyut Dhar recently presented our laboratory's cutting-edge research at the International Biotechnology Summit held in Singapore. The presentation, titled 'Advances in Molecular Systems Engineering for Sustainable Applications,' showcased our latest findings in protein engineering and biomaterial development. The talk was well-received by the international audience, leading to several productive discussions and potential collaboration opportunities. Dr. Dhar also participated in panel discussions on the future of biotechnology and sustainable manufacturing. The conference provided an excellent platform to share our research with leading scientists from around the world and to learn about the latest developments in the field. Several international researchers expressed interest in collaborative projects, which could lead to exciting new research directions for our laboratory.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Conference", "International", "Presentation", "Collaboration"],
      featured: false
    },
    {
      id: 5,
      title: "Lab Equipment Upgrade: New Spectroscopy Facility",
      category: "Infrastructure",
      date: "2023-10-28",
      author: "Lab Management",
      excerpt: "Our laboratory has acquired state-of-the-art spectroscopy equipment, significantly enhancing our analytical capabilities for advanced materials characterization.",
      content: "We are pleased to announce a major upgrade to our laboratory infrastructure with the acquisition of advanced spectroscopy equipment worth ₹25 lakhs. The new facility includes high-resolution NMR spectrometer, FTIR spectroscopy system, and UV-Vis spectrophotometer with enhanced sensitivity and precision. This equipment upgrade significantly enhances our analytical capabilities, allowing us to perform detailed characterization of synthesized materials and biological samples. The new instruments will support multiple research projects, including protein structure analysis, biomaterial characterization, and chemical synthesis verification. The installation and commissioning of the equipment has been completed, and training sessions for all lab members have been conducted. This investment in infrastructure demonstrates our commitment to maintaining cutting-edge research capabilities and ensuring that our students and researchers have access to the best possible tools for their investigations.",
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Equipment", "Spectroscopy", "Infrastructure", "Upgrade"],
      featured: false
    },
    {
      id: 6,
      title: "Collaboration Agreement with Industry Partner",
      category: "Partnerships",
      date: "2023-10-20",
      author: "Dr. Prodyut Dhar",
      excerpt: "We have signed a strategic collaboration agreement with a leading biotechnology company to translate our research into commercial applications.",
      content: "Our laboratory has entered into a strategic collaboration agreement with BioTech Innovations Pvt. Ltd., a leading biotechnology company specializing in sustainable chemical processes. This partnership will facilitate the translation of our research findings into commercial applications, bridging the gap between academic research and industrial implementation. The collaboration includes joint research projects, technology transfer opportunities, and internship programs for our students. The company will provide funding for specific research projects and access to their pilot-scale facilities for testing and validation of our developed technologies. This partnership represents a significant step towards commercializing our research and demonstrates the practical relevance of our work. We anticipate that this collaboration will lead to the development of several innovative products and processes that can make a real impact in the biotechnology industry.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Collaboration", "Industry", "Partnership", "Technology Transfer"],
      featured: false
    },
    {
      id: 7,
      title: "Student Achievement: Best Paper Award",
      category: "Awards",
      date: "2023-10-15",
      author: "Rajesh Kumar Singh",
      excerpt: "PhD student Rajesh Kumar Singh wins the Best Paper Award at the National Conference on Chemical Engineering for his work on enzyme engineering.",
      content: "We are proud to announce that our PhD student, Rajesh Kumar Singh, has been awarded the Best Paper Award at the National Conference on Chemical Engineering held at IIT Madras. His paper, titled 'Novel Approaches to Enzyme Engineering for Enhanced Industrial Applications,' was selected from over 200 submissions for this prestigious recognition. Rajesh's research focuses on developing thermostable enzymes through directed evolution techniques, work that has significant implications for industrial biotechnology. The award comes with a cash prize of ₹50,000 and recognition from the Indian Institute of Chemical Engineers. This achievement reflects not only Rajesh's dedication and hard work but also the quality of research being conducted in our laboratory. We congratulate Rajesh on this well-deserved recognition and look forward to his continued contributions to the field of enzyme engineering.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Student Achievement", "Best Paper", "Conference", "Enzyme Engineering"],
      featured: false
    },
    {
      id: 8,
      title: "Workshop on Green Chemistry Principles",
      category: "Events",
      date: "2023-10-10",
      author: "Event Organizers",
      excerpt: "Our laboratory organized a successful workshop on green chemistry principles, attracting participants from across the country.",
      content: "Our laboratory successfully organized a two-day workshop on 'Green Chemistry Principles and Applications' that attracted over 100 participants from universities and research institutions across India. The workshop featured lectures by renowned experts in the field, hands-on laboratory sessions, and interactive discussions on sustainable chemical processes. Participants learned about the twelve principles of green chemistry, sustainable synthesis methods, and waste minimization strategies. The workshop also included case studies of successful green chemistry implementations in industry and research. Feedback from participants was overwhelmingly positive, with many expressing interest in implementing green chemistry principles in their own research. The event was supported by the Department of Science and Technology and the Indian Chemical Society. This workshop reinforced our laboratory's commitment to promoting sustainable practices in chemical research and education.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Workshop", "Green Chemistry", "Education", "Sustainability"],
      featured: false
    }
  ];

  const categories = ['all', 'Awards', 'Publications', 'Team', 'Events', 'Infrastructure', 'Partnerships'];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.filter(item => item.featured);
  const recentNews = newsItems.slice(0, 6);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Awards': return <Award className="h-5 w-5" />;
      case 'Publications': return <BookOpen className="h-5 w-5" />;
      case 'Team': return <Users className="h-5 w-5" />;
      case 'Events': return <Calendar className="h-5 w-5" />;
      default: return <Tag className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Awards': 'bg-yellow-100 text-yellow-800',
      'Publications': 'bg-blue-100 text-blue-800',
      'Team': 'bg-purple-100 text-purple-800',
      'Events': 'bg-green-100 text-green-800',
      'Infrastructure': 'bg-gray-100 text-gray-800',
      'Partnerships': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              News & Updates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with the latest news, achievements, and developments from our laboratory. 
              Discover our recent publications, awards, events, and team updates.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{newsItems.length}</div>
                <div className="text-sm text-gray-600">Total News</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {newsItems.filter(item => item.category === 'Awards').length}
                </div>
                <div className="text-sm text-gray-600">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {newsItems.filter(item => item.category === 'Publications').length}
                </div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {newsItems.filter(item => item.category === 'Events').length}
                </div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="relative">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{item.category}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-8 bg-white sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
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

      {/* News List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article 
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                      <span className="ml-1">{item.category}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.author}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No news found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
              <div className="relative">
                <img 
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedNews.category)}`}>
                    {getCategoryIcon(selectedNews.category)}
                    <span className="ml-1">{selectedNews.category}</span>
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(selectedNews.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{selectedNews.author}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedNews.title}
                </h1>
                
                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNews.content}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
                  {selectedNews.tags.map((tag, index) => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;