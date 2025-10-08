import React, { useState } from 'react';
import { Calendar, User, Tag, Search, Filter, ExternalLink, Award, BookOpen, Users, Youtube } from 'lucide-react';

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
  externalLinks?: { title: string; url: string }[];
  videoLinks?: { title: string; url: string }[];
}

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Transparent Wood: A Sustainable Alternative to Plastic Featured in Global Media",
      category: "Publications",
      date: "2022-10-22",
      author: "Dr. Prodyut Dhar",
      excerpt: "Our groundbreaking research on transparent wood as a sustainable alternative to plastic has been featured in major international media outlets and scientific publications worldwide.",
      content: "Our laboratory's innovative research on transparent wood has garnered significant international attention, being featured in numerous prestigious media outlets and scientific publications. The research demonstrates that transparent wood could be one of the most promising replacements for petroleum-based plastics, offering millions of times more sustainability. Major publications including Phys.org, Deccan Herald, Live Mint, Yahoo Finance, Futurism, Inverse, and Knowable Magazine have highlighted our findings. The study shows how optimal production techniques can make transparent wood a viable alternative to both plastic and glass in various applications, from smartphone displays to smart windows. This recognition underscores the global significance of our work in developing sustainable materials for the future.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Transparent Wood", "Sustainability", "Media Coverage", "Innovation"],
      featured: true,
      externalLinks: [
        { title: "Resource.co: Transparent wood offers a sustainable alternative to plastic", url: "https://resource.co/article/transparent-wood-offers-sustainable-alternative-plastic-study-shows" },
        { title: "Deccan Herald: How 'transparent wood' is a good alternative to plastic", url: "https://www.deccanherald.com/science/how-transparent-wood-is-a-good-alternative-to-plastic-1156817.html" },
        { title: "Live Mint: Transparent wood - Eco-friendly alternative", url: "https://www.livemint.com/news/world/transparent-wood-eco-friendly-alternative-one-of-most-promising-replacements-for-plastic-11666420261905.html" },
        { title: "Phys.org: Transparent wood could soon replace plastics", url: "https://phys.org/news/2022-10-transparent-wood-plastics.html" },
        { title: "Yahoo Finance: Transparent wood can replace plastic, study claims", url: "https://finance.yahoo.com/news/transparent-wood-replace-plastic-study-135742737.html" },
        { title: "Futurism: Scientists say new transparent wood could replace plastic", url: "https://futurism.com/the-byte/transparent-wood-replace-plastic" },
        { title: "One Green Planet: Transparent Wood Alternative to Plastic", url: "https://www.onegreenplanet.org/environment/transparent-wood-could-be-a-great-alternative-to-plastic-new-study-finds/" },
        { title: "Inverse: Forget plastic - This see-through wood material", url: "https://www.inverse.com/innovation/see-through-wood-sustainable" },
        { title: "Knowable Magazine: Why scientists are making transparent wood", url: "https://knowablemagazine.org/content/article/technology/2023/why-scientists-are-making-transparent-wood" },
        { title: "Packaging Insights: Can transparent wood replace plastic and glass?", url: "https://www.packaginginsights.com/news/transparent-wood-could-replace-plastics-through-optimal-production-techniques-find-indian-researchers.html" },
        { title: "SciDev: Transparent wood could soon replace plastics", url: "https://www.scidev.net/asia-pacific/news/transparent-wood-could-soon-replace-plastics/" },
        { title: "Industry Trap: Transparent Wood Could End Reliance on Plastics", url: "https://www.industrytap.com/transparent-wood-could-soon-end-our-reliance-on-petroleum-based-plastics/64400" },
        { title: "Wood Central: See-Through Wood Takes World by Storm", url: "https://woodcentral.com.au/iphones-to-smart-windows-see-through-wood-to-take-world-by-storm/" }
      ]
    },
    {
      id: 2,
      title: "IIT BHU Faculty Among Top Five for Innovation in Bamboo Sector",
      category: "Awards",
      date: "2022-11-15",
      author: "Dr. Prodyut Dhar",
      excerpt: "Dr. Prodyut Dhar recognized among India's top five innovators in the bamboo sector for developing sustainable bamboo-based products and technologies.",
      content: "Dr. Prodyut Dhar has been recognized as one of the top five innovators in India's bamboo sector for his groundbreaking work on bamboo-based products. This recognition by Times of India highlights the laboratory's commitment to developing sustainable alternatives using renewable resources. Our bamboo-based drinking straws technology, which has been patented and successfully transferred to industry, represents a significant achievement in creating eco-friendly alternatives to plastic products. The innovation addresses the growing environmental concerns about single-use plastics while supporting sustainable bamboo cultivation and processing industries.",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Bamboo Products", "Innovation", "Sustainability", "Recognition"],
      featured: true,
      externalLinks: [
        { title: "Times of India: IIT-BHU faculty among top five for innovation in bamboo sector", url: "https://timesofindia.indiatimes.com/city/varanasi/iit-bhu-faculty-among-top-fivefor-innovation-in-bamboo-sector/articleshow/95482147.cms" }
      ]
    },
    {
      id: 3,
      title: "IIT-BHU Students Create Sustainable Products from Rice Stubble",
      category: "Research",
      date: "2024-01-06",
      author: "Research Team",
      excerpt: "Our research students have successfully developed cups, glasses, and kulhads from rice stubble, providing a sustainable solution to agricultural waste and benefiting farmers.",
      content: "In a groundbreaking initiative, our laboratory's research students have developed innovative products from rice stubble, transforming agricultural waste into valuable eco-friendly items. The team has successfully created biodegradable cups, glasses, and kulhads (traditional clay cups) from rice biomass, addressing the dual challenges of stubble burning and plastic pollution. This innovation not only provides farmers with an additional revenue stream by creating value from crop residue but also offers sustainable alternatives to plastic and ceramic products. The technology has significant potential for commercialization and could help reduce the environmental impact of stubble burning, a major contributor to air pollution in northern India.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Rice Biomass", "Agricultural Waste", "Sustainable Products", "Innovation"],
      featured: true,
      externalLinks: [
        { title: "Amarujala: IIT-BHU research students made cup, glasses and kulhads from stubble", url: "https://www.amarujala.com/uttar-pradesh/varanasi/iit-bhu-research-students-made-cup-glasses-and-kulhads-from-stubble-farmers-will-benefit-greatly-2024-01-06" }
      ]
    },
    {
      id: 4,
      title: "Lab's Research Highlighted at IInvenTiv-2024 Mega R&D Fair",
      category: "Events",
      date: "2024-03-15",
      author: "Research Team",
      excerpt: "Our laboratory's cutting-edge research was showcased at IInvenTiv-2024, India's largest R&D exhibition featuring top institutions including IITs, NITs, IISERs, and IIITs.",
      content: "Our laboratory had the honor of showcasing our innovative research at IInvenTiv-2024, India's premier R&D fair where all IITs, NITs, IISERs, IIITs, and other top 50 NIRF-ranked institutions come together to display their research and development achievements. The event provided an excellent platform to demonstrate our technologies in sustainable materials, transparent wood, and biodegradable products to industry partners, fellow researchers, and potential collaborators. The overwhelming response to our exhibits reinforced the commercial viability and societal impact of our research. The fair facilitated numerous discussions with industry leaders interested in technology transfer and collaborative research opportunities.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["IInvenTiv", "R&D Fair", "Technology Showcase", "Collaboration"],
      featured: true,
      videoLinks: [
        { title: "IInvenTiv 2024 - Lab Showcase YouTube Video", url: "https://youtu.be/rU5f-paRJFY" }
      ],
      externalLinks: [
        { title: "IInvenTiv Twitter Post", url: "https://twitter.com/iinventivIIT/status/1768517114145784031" },
        { title: "IInvenTiv Facebook Post", url: "https://www.facebook.com/IInvenTiv/posts/pfbid0GSXgfLNNzwS1cXWUmaZnEnLJKkNcX2RGwCDfcvyNYGjVMpenevbxHYoFi8Yhkw7zl" }
      ]
    },
    {
      id: 5,
      title: "Lab Receives Major Research Grant from DST-SERB",
      category: "Awards",
      date: "2023-11-20",
      author: "Dr. Prodyut Dhar",
      excerpt: "Our laboratory has been awarded a significant research grant of ₹50 lakhs from the Department of Science and Technology - Science and Engineering Research Board (DST-SERB) for our project on sustainable biomaterials.",
      content: "We are thrilled to announce that our laboratory has received a major research grant of ₹50 lakhs from the Department of Science and Technology - Science and Engineering Research Board (DST-SERB). This three-year grant will support our groundbreaking research on developing sustainable biomaterials for medical applications. The project, titled 'Engineering Smart Biomaterials for Targeted Therapeutic Applications,' will focus on creating next-generation materials that can respond to biological stimuli and deliver drugs with unprecedented precision. This funding will enable us to expand our research capabilities, acquire new equipment, and support additional research personnel. We are grateful for this recognition and look forward to making significant contributions to the field of biomaterials science.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Research Grant", "DST-SERB", "Biomaterials", "Funding"],
      featured: false
    },
    {
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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

  const categories = ['all', 'Awards', 'Publications', 'Research', 'Team', 'Events', 'Infrastructure', 'Partnerships'];

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

      {/* IInvenTiv-2024 Video Showcase */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
              <Youtube className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Highlight of Lab's Research Work in IInvenTiv-2024
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch our laboratory's innovative research showcase at India's premier R&D exhibition featuring all IITs, NITs, IISERs, IIITs and top 50 NIRF-ranked institutions
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/rU5f-paRJFY"
                  title="IInvenTiv 2024 - Lab Research Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Laboratory of Chembiosystem & Technologies - IInvenTiv 2024
                </h3>
                <p className="text-gray-600">
                  Our research exhibition at IInvenTiv-2024, showcasing sustainable materials, transparent wood technology, and biodegradable products to industry partners and collaborators.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              View on Social Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://twitter.com/iinventivIIT/status/1768517114145784031"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
              >
                <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Twitter / X</div>
                  <div className="text-sm text-gray-600">Watch on X (Twitter)</div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 ml-auto" />
              </a>

              <a
                href="https://www.facebook.com/IInvenTiv/posts/pfbid0GSXgfLNNzwS1cXWUmaZnEnLJKkNcX2RGwCDfcvyNYGjVMpenevbxHYoFi8Yhkw7zl?paipv=0&eav=AfYFNXvuckZ5ad9hqXkqvp_rsuAGLs1VpVywmKFvIv5PSSBsSOYgzr8_d1Bvv9vXwvE&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-300"
              >
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Facebook</div>
                  <div className="text-sm text-gray-600">Watch on Facebook</div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 ml-auto" />
              </a>
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

                {selectedNews.videoLinks && selectedNews.videoLinks.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Youtube className="h-5 w-5 mr-2 text-red-600" />
                      Video Links
                    </h3>
                    <div className="space-y-2">
                      {selectedNews.videoLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNews.externalLinks && selectedNews.externalLinks.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Media Coverage & External Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedNews.externalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start text-blue-600 hover:text-blue-800 transition-colors text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

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