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
    "id": 55,
    "title": "All-Biomass-Derived Cellulose Phosphate-Based Heat-Sealable Films and Thermally Stable Antifizzing Cups with Improved Recyclability",
    "authors": ["Ranjan, R.", "Mone, V. P.", "Rai, R.", "Kant, C.", "Dhar, P."],
    "journal": "ACS Sustainable Chemistry & Engineering",
    "year": 2025,
    "volume": "13",
    "issue": "17",
    "pages": "6074-6089",
    "doi": null,
    "impact_factor": 7.3,
    "category": "Sustainable Materials",
    "keywords": ["Cellulose Phosphate", "Heat-Sealable Films", "Recyclability", "Biomass-Derived"]
  },
  {
    "id": 54,
    "title": "Hydrogel‐Based Smart Materials for Wound Healing and Sensing",
    "authors": ["Thi Kim Ngan Duong", "Thi Thuy Truong", "Dhar, P.", "Byeongil Lee", "Junghwan Oh", "Sudip Mondal"],
    "journal": "Aggregate",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1002/agt2.70047",
    "impact_factor": 13.7,
    "category": "Smart Materials",
    "keywords": ["Hydrogel", "Wound Healing", "Sensing", "Smart Materials"]
  },
  {
    "id": 53,
    "title": "Biodegradable, water-resistant, smart cellulose-based drinking straws from agricultural biomass with detection of adulterants in beverages",
    "authors": ["Rai, R.", "Bharti, R.", "Dhar, P."],
    "journal": "Food Chemistry",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1016/j.foodchem.2025.143093",
    "impact_factor": 8.5,
    "category": "Food Packaging",
    "keywords": ["Biodegradable", "Cellulose", "Drinking Straws", "Adulterant Detection"]
  },
  {
    "id": 52,
    "title": "Photoactivated Antibacterial Activity of Fe (III) Complexes via Singlet Oxygen-Mediated Bacterial Membrane Lysis",
    "authors": ["Singh, I.", "Ishwar", "Rai, Rohit", "Kushwaha, Rajesh", "Dhar, P.", "Banerjee, S."],
    "journal": "Dalton Transactions",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": null,
    "impact_factor": null,
    "category": "Photodynamic Therapy",
    "keywords": ["Photoactivated", "Antibacterial", "Fe Complexes", "Singlet Oxygen"]
  },
  {
    "id": 51,
    "title": "Bioactive Hyaluronic acid–Protein based amyloidogenic hydrogel dressing for rapid diabetic wound healing via enhanced angiogenesis and anti-inflammation",
    "authors": ["Naik, K.", "Tripathi, S.", "Ranjan, R.", "Agrawal, S.", "Srivastava, S. K.", "Dhar, P.", "Parmar, A. S."],
    "journal": "Materials Today Communications",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": "113560",
    "doi": null,
    "impact_factor": null,
    "category": "Biomedical Materials",
    "keywords": ["Hyaluronic Acid", "Hydrogel", "Wound Healing", "Angiogenesis"]
  },
  {
    "id": 50,
    "title": "In-situ growth of MoS2 on 3D printed phosphorylated cellulose for simultaneous dye degradation and microbial inactivation",
    "authors": ["Ranjan, R.", "Rai, R.", "Naik, K.", "Parmar, A.S.", "Dhar, P."],
    "journal": "Cellulose",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1007/s10570-024-06361-2",
    "impact_factor": 5.3,
    "category": "Environmental Remediation",
    "keywords": ["MoS2", "3D Printing", "Cellulose", "Dye Degradation", "Microbial Inactivation"]
  },
  {
    "id": 49,
    "title": "Cellulose-based phosphorylated bamboo with slow urea release and lower carbon footprints improves rainfed rice crop productivity in field trials",
    "authors": ["Rai, R.", "Ranjan, R.", "Kumari, S.", "De, N.", "Dhar, P."],
    "journal": "International Journal of Biological Macromolecules",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": null,
    "impact_factor": 8.2,
    "category": "Agricultural Applications",
    "keywords": ["Cellulose", "Bamboo", "Urea Release", "Rice Productivity", "Carbon Footprint"]
  },
  {
    "id": 48,
    "title": "Conductive Hybrid Hydrogel of Carbon Nanotubes-Protein-Cellulose: In vivo Treatment of Diabetic Wound via Photothermal Therapy and Tracking Real-Time Wound Assessment via Photoacoustic Imaging",
    "authors": ["Naik, K.", "Tripathi, S.", "Ranjan, R.", "Agrawal, S.", "Singh, S.", "Dhar, P.", "Singh, K.", "Tiwari, V.", "Parmar, A."],
    "journal": "ACS Applied Bio Materials",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": null,
    "impact_factor": 4.7,
    "category": "Biomedical Materials",
    "keywords": ["Conductive Hydrogel", "Carbon Nanotubes", "Photothermal Therapy", "Photoacoustic Imaging"]
  },
  {
    "id": 47,
    "title": "Photodynamic Inactivation of Bacteria Using Nickel (II) Complexes with Catecholate and Phenanthroline Ligands",
    "authors": ["Prakashchandra, R. D.", "Rai, R.", "Mandal, A. A.", "Dhar, P.", "Banerjee, S.", "Sarkar, T.", "Babu, B. N."],
    "journal": "ChemBioChem",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1002/cbic.202400678",
    "impact_factor": 2.6,
    "category": "Photodynamic Therapy",
    "keywords": ["Photodynamic", "Nickel Complexes", "Bacterial Inactivation", "Catecholate"]
  },
  {
    "id": 46,
    "title": "Cellulose based aerogels derived from rice agro wastes with enhanced antifungal activity for topical management of vulvovaginal candidiasis",
    "authors": ["Ranjan, R.", "Bhatt, S. B.", "Rai, R.", "Kumari, S.", "Tilak, R.", "Dhar, P."],
    "journal": "Macromolecular Chemistry and Physics",
    "year": 2025,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1002/macp.202400355",
    "impact_factor": 2.5,
    "category": "Biomedical Materials",
    "keywords": ["Cellulose Aerogels", "Rice Waste", "Antifungal", "Vulvovaginal Candidiasis"]
  },
  {
    "id": 45,
    "title": "Functionalized jute with high-water absorption, low thermal conductivity and efficient radiative cooling for the preservation of perishable green vegetables with reduced cold storage energy requirements",
    "authors": ["Bhatt, S.B.", "Ranjan, R.", "Dahiya, S.", "Pal, B.N.", "Dhar, P."],
    "journal": "Journal of Materials Chemistry A",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1039/D4TA02507E",
    "impact_factor": 10.7,
    "category": "Food Preservation",
    "keywords": ["Functionalized Jute", "Radiative Cooling", "Food Preservation", "Energy Efficiency"]
  },
  {
    "id": 44,
    "title": "Biodegradable, eco-friendly, and hydrophobic drinking straws based on delignified phosphorylated bamboo-gelatin composites",
    "authors": ["Rai, R.", "Ranjan, R.", "Kant, C.", "Dhar, P."],
    "journal": "Chemical Engineering Journal",
    "year": 2023,
    "volume": null,
    "issue": null,
    "pages": "144047",
    "doi": "10.1016/j.cej.2023.144047",
    "impact_factor": 16.744,
    "category": "Sustainable Materials",
    "keywords": ["Biodegradable", "Drinking Straws", "Bamboo", "Gelatin Composites"]
  },
  {
    "id": 43,
    "title": "Interactive Evolutionary Multiobjective Optimization of Primer Design with Uncertain Objectives",
    "authors": ["Mazumdar, A.", "Jain, B.", "Mitra, M.", "Dhar, P."],
    "journal": "Proceedings of the Genetic and Evolutionary Computation",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1145/3638529.36541",
    "impact_factor": null,
    "category": "Computational Biology",
    "keywords": ["Evolutionary Optimization", "Primer Design", "Multiobjective", "Uncertain Objectives"]
  },
  {
    "id": 42,
    "title": "Rice husk valorisation by in situ grown MoS 2 nanoflowers: a dual-action catalyst for pollutant dye remediation and microbial decontamination",
    "authors": ["Ranjan, R.", "Bhatt, S.B.", "Rai, R.", "Sharma, S.K.", "Ranjan, R.", "Bharti, A.", "Dhar, P."],
    "journal": "RSC Advances",
    "year": 2024,
    "volume": "14",
    "issue": "17",
    "pages": "12192-203",
    "doi": null,
    "impact_factor": null,
    "category": "Environmental Remediation",
    "keywords": ["Rice Husk", "MoS2 Nanoflowers", "Dye Remediation", "Microbial Decontamination"]
  },
  {
    "id": 41,
    "title": "Microplastic and adhesive free, multifunctional, circular economy approach-based biomass-derived drinking straws",
    "authors": ["Rai, R.", "Ranjan, R.", "Kant, C.", "Dhar, P."],
    "journal": "iScience",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": null,
    "impact_factor": 5.8,
    "category": "Sustainable Materials",
    "keywords": ["Microplastic-free", "Circular Economy", "Biomass-derived", "Drinking Straws"]
  },
  {
    "id": 40,
    "title": "Scalable phosphorylated cellulose production with improved environmental sustainability, crosslinkability and processability using 3D bioprinting for dye remediation",
    "authors": ["Rahul, R.", "Rai, R.", "Naik, K.", "Singh, A. P.", "Dhar, P."],
    "journal": "International Journal of Biological Macromolecules",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": "130577",
    "doi": null,
    "impact_factor": 8.2,
    "category": "Environmental Remediation",
    "keywords": ["Phosphorylated Cellulose", "3D Bioprinting", "Environmental Sustainability", "Dye Remediation"]
  },
  {
    "id": 39,
    "title": "Valorization of sugarcane bagasse with in situ grown MoS2 for continuous pollutant remediation and microbial decontamination",
    "authors": ["Rahul, R.", "Bhatt, S. B.", "Rai, R.", "Sharma, S. K.", "Verma, M.", "Dhar, P."],
    "journal": "Environmental Science and Pollution Research",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": "1-17",
    "doi": null,
    "impact_factor": 5.8,
    "category": "Environmental Remediation",
    "keywords": ["Sugarcane Bagasse", "MoS2", "Pollutant Remediation", "Microbial Decontamination"]
  },
  {
    "id": 38,
    "title": "Vitamin B6 appended polypyridyl Co(III) complexes for photo-triggered antibacterial activity",
    "authors": ["Banerjee, S.", "Mandal, A.", "Rai, R.", "Dhar, P."],
    "journal": "Chemistry - An Asian Journal",
    "year": 2024,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1002/asia.202400943",
    "impact_factor": 3.5,
    "category": "Photodynamic Therapy",
    "keywords": ["Vitamin B6", "Polypyridyl Complexes", "Photo-triggered", "Antibacterial"]
  },
  {
    "id": 37,
    "title": "Polypyridyl-based Co (iii) complexes of vitamin B 6 Schiff base for photoactivated antibacterial therapy",
    "authors": ["Mandal, A.", "Rai, R.", "Saha, S.", "Kushwaha, R.", "Wei, L.", "Gogoi, H.", "Mandal, A.", "Yadav, A.", "Huang, H.", "Dutta, A.", "Dhar, P.", "Banerjee, S."],
    "journal": "Dalton Transactions",
    "year": 2023,
    "volume": "52",
    "issue": "46",
    "pages": "17562-17572",
    "doi": null,
    "impact_factor": 4.0,
    "category": "Photodynamic Therapy",
    "keywords": ["Polypyridyl", "Co Complexes", "Vitamin B6", "Photoactivated", "Antibacterial"]
  },
  {
    "id": 36,
    "title": "Antibacterial Photodynamic Therapy by Zn(II)-Curcumin Complex: Synthesis, Characterization, DFT Calculation, Antibacterial Activity, and Molecular Docking",
    "authors": ["Kushwaha, R.", "Rai, R.", "Gawande, V.", "Singh, V.", "Yadav, A.", "Koch, B.", "Dhar, P.", "Banerjee, S."],
    "journal": "ChemBioChem",
    "year": 2024,
    "volume": "25",
    "issue": "2",
    "pages": "e202300652",
    "doi": null,
    "impact_factor": 3.2,
    "category": "Photodynamic Therapy",
    "keywords": ["Photodynamic Therapy", "Zn-Curcumin Complex", "DFT Calculation", "Molecular Docking"]
  },
  {
    "id": 35,
    "title": "Environmentally Benign Partially Delignified and Microwave Processed Bamboo‐Based Drinking Straws",
    "authors": ["Rai, R.", "Ranjan, R.", "Kant, C.", "Ghosh, U.U.", "Dhar, P."],
    "journal": "Advanced Sustainable Systems",
    "year": 2023,
    "volume": null,
    "issue": null,
    "pages": "2300057",
    "doi": "10.1002/adsu.202300057",
    "impact_factor": 7.1,
    "category": "Sustainable Materials",
    "keywords": ["Bamboo", "Drinking Straws", "Microwave Processing", "Delignification"]
  },
  {
    "id": 34,
    "title": "Technological road map of Cellulase: A comprehensive outlook to structural, computational, and industrial applications",
    "authors": ["Ranjan, R.", "Rai, R.", "Bhatt, S. B.", "Dhar, P."],
    "journal": "Biochemical Engineering Journal",
    "year": 2023,
    "volume": null,
    "issue": null,
    "pages": "109020",
    "doi": "10.1016/j.bej.2023.109020",
    "impact_factor": 4.446,
    "category": "Enzyme Technology",
    "keywords": ["Cellulase", "Structural Analysis", "Computational", "Industrial Applications"]
  },
  {
    "id": 33,
    "title": "3D Printable, injectable Amyloid-based composite Hydrogel of Bovine Serum Albumin-Aloe Vera for Rapid Diabetic Wound Healing",
    "authors": ["Naik, K.", "Singh, P.", "Yadav, M.", "Srivastava, S.", "Tripathi, S.", "Ranjan, R.", "Dhar, P.", "Verma, A.", "Chaudhary, Sh.", "Parmar, A. S."],
    "journal": "Journal of Material Chemistry B",
    "year": 2023,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1039/D3TB01151H",
    "impact_factor": 7.571,
    "category": "Biomedical Materials",
    "keywords": ["3D Printable", "Amyloid", "Hydrogel", "Wound Healing", "Aloe Vera"]
  },
  {
    "id": 32,
    "title": "Polypyridyl CoII‐Curcumin Complexes as Photoactivated Anticancer and Antibacterial Agents",
    "authors": ["Yadav, A. K.", "Singh, V.", "Kushwaha, R.", "Dolui, D.", "Rai, R.", "Dhar, P.", "Dutta, A.", "Koch, B.", "Banerjee, S."],
    "journal": "ChemBioChem",
    "year": 2023,
    "volume": null,
    "issue": null,
    "pages": "e202300033",
    "doi": "10.1002/cbic.202300033",
    "impact_factor": 3.468,
    "category": "Photodynamic Therapy",
    "keywords": ["Polypyridyl", "Co-Curcumin", "Photoactivated", "Anticancer", "Antibacterial"]
  },
  {
    "id": 31,
    "title": "Life cycle assessment of transparent wood production using emerging technologies and strategic scale-up framework",
    "authors": ["Rai, R.", "Rahul, R.", "Dhar, P."],
    "journal": "Science of the Total Environment",
    "year": 2022,
    "volume": null,
    "issue": null,
    "pages": "157301",
    "doi": "10.1016/j.scitotenv.2022.157301",
    "impact_factor": 10.753,
    "category": "Environmental Assessment",
    "keywords": ["Life Cycle Assessment", "Transparent Wood", "Emerging Technologies", "Scale-up"]
  },
  {
    "id": 30,
    "title": "Biomedical engineering aspects of nanocellulose: A review",
    "authors": ["Rai, R.", "Dhar, P."],
    "journal": "Nanotechnology",
    "year": 2022,
    "volume": "33",
    "issue": null,
    "pages": "362001",
    "doi": "10.1088/1361-6528/ac6fef",
    "impact_factor": 3.953,
    "category": "Biomedical Materials",
    "keywords": ["Nanocellulose", "Biomedical Engineering", "Review"]
  },
  {
    "id": 29,
    "title": "Fabrication of wood-inspired high-performance composites through fermentation routes",
    "authors": ["Dhar, P.", "Sugimura, K.", "Yoshioka, M.", "Yoshinaga, A.", "Kamitakahara, H."],
    "journal": "Cellulose",
    "year": 2021,
    "volume": null,
    "issue": null,
    "pages": "1-21",
    "doi": null,
    "impact_factor": 6.123,
    "category": "Bio-composites",
    "keywords": ["Wood-inspired", "High-performance Composites", "Fermentation"]
  },
  {
    "id": 28,
    "title": "Genetically Engineered Proteins based Nacre-like Nanocomposites with Superior Mechanical and Electrochemical Performance",
    "authors": ["Dhar, P.", "Phiri, J.", "Szilvay, G. R.", "Maloney, T.", "Laaksonen, P."],
    "journal": "Journal of Material Chemistry A",
    "year": 2019,
    "volume": null,
    "issue": null,
    "pages": null,
    "doi": "10.1039/C9TA10881E",
    "impact_factor": 14.511,
    "category": "Nanocomposites",
    "keywords": ["Genetically Engineered Proteins", "Nacre-like", "Nanocomposites", "Mechanical Performance"]
  },
  {
    "id": 27,
    "title": "Magnetic Cellulose Nanocrystal Based Anisotropic Polylactic Acid Nanocomposite Films: Influence on Electrical, Magnetic, Thermal, and Mechanical Properties",
    "authors": ["Dhar, P.", "Kumar, A.", "Katiyar, V."],
    "journal": "ACS Applied Materials & Interfaces",
    "year": 2016,
    "volume": "8",
    "issue": "28",
    "pages": "18393-409",
    "doi": null,
    "impact_factor": 10.383,
    "category": "Nanocomposites",
    "keywords": ["Magnetic Cellulose", "Nanocrystal", "Polylactic Acid", "Anisotropic"]
  },
  {
    "id": 26,
    "title": "Valorization of sugarcane straw to produce highly conductive bacterial cellulose/graphene nanocomposite films through in situ fermentation: Kinetic analysis and property evaluation",
    "authors": ["Dhar, P.", "Bruna, P.", "Antonio, G.", "Sandip, B."],
    "journal": "Journal of Cleaner Production",
    "year": 2019,
    "volume": "238",
    "issue": null,
    "pages": "117859",
    "doi": null,
    "impact_factor": 11.072,
    "category": "Nanocomposites",
    "keywords": ["Sugarcane Straw", "Bacterial Cellulose", "Graphene", "Conductive Films"]
  },
  {
    "id": 25,
    "title": "Synthesis-property-performance relationships of multifunctional bacterial cellulose composites fermented in situ alkali lignin medium",
    "authors": ["Dhar, P.", "Sugimura, K.", "Yoshioka, M.", "Yoshinaga, A.", "Kamitakahara, H."],
    "journal": "Carbohydrate Polymers",
    "year": 2021,
    "volume": "252",
    "issue": null,
    "pages": "117114",
    "doi": null,
    "impact_factor": 10.723,
    "category": "Bio-composites",
    "keywords": ["Bacterial Cellulose", "Alkali Lignin", "Multifunctional", "In-situ Fermentation"]
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
