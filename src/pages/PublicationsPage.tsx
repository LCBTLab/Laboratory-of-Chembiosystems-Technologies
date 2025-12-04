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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/55.jpeg"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/54.jpg"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/53.jpg"
    },
    {
      id: 52,
      title: "Photoactivated Antibacterial Activity of Fe (III) Complexes via Singlet Oxygen-Mediated Bacterial Membrane Lysis",
      authors: ["Singh, I.", "Rai, R.", "Kushwaha, R.", "Dhar, P.", "Banerjee, S."],
      journal: "Dalton Transactions",
      year: 2025,
      category: "Photodynamic Therapy",
      keywords: ["Photoactivated", "Antibacterial", "Fe Complexes", "Singlet Oxygen"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/52.gif"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/51.jpg"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/50.webp"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/49.jpg"
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
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/48.jpeg"
    },
    {
      id: 47,
      title: "Photodynamic Inactivation of Bacteria Using Nickel (II) Complexes with Catecholate and Phenanthroline Ligands",
      authors: ["Prakashchandra, R.D.", "Rai, R.", "Mandal, A.A.", "Dhar, P.", "Banerjee, S.", "Sarkar, T.", "Babu, B.N."],
      journal: "ChemBioChem",
      year: 2024,
      doi: "10.1002/cbic.202400678",
      impactFactor: 2.6,
      category: "Photodynamic Therapy",
      keywords: ["Photodynamic", "Nickel Complexes", "Bacterial Inactivation"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/47.webp"
    },
    {
      id: 46,
      title: "Cellulose based aerogels derived from rice agro wastes with enhanced antifungal activity for topical management of vulvovaginal candidiasis",
      authors: ["Ranjan, R.", "Bhatt, S.B.", "Rai, R.", "Kumari, S.", "Tilak, R.", "Dhar, P."],
      journal: "Macromolecular Chemistry and Physics",
      year: 2025,
      doi: "10.1002/macp.202400355",
      impactFactor: 2.5,
      category: "Biomedical Materials",
      keywords: ["Cellulose Aerogels", "Rice Waste", "Antifungal"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/46.webp"
    },
    {
      id: 45,
      title: "Functionalized jute with high-water absorption, low thermal conductivity and efficient radiative cooling for the preservation of perishable green vegetables with reduced cold storage energy requirements",
      authors: ["Bhatt, S.B.", "Ranjan, R.", "Dahiya, S.", "Pal, B.N.", "Dhar, P."],
      journal: "Journal of Materials Chemistry A",
      year: 2024,
      doi: "10.1039/D4TA02507E",
      impactFactor: 10.7,
      category: "Food Preservation",
      keywords: ["Functionalized Jute", "Radiative Cooling", "Food Preservation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop"
    },
    {
      id: 44,
      title: "Biodegradable, eco-friendly, and hydrophobic drinking straws based on delignified phosphorylated bamboo-gelatin composites",
      authors: ["Rai, R.", "Ranjan, R.", "Kant, C.", "Dhar, P."],
      journal: "Chemical Engineering Journal",
      year: 2023,
      pages: "144047",
      doi: "10.1016/j.cej.2023.144047",
      impactFactor: 16.744,
      category: "Sustainable Materials",
      keywords: ["Biodegradable", "Drinking Straws", "Bamboo"],
      graphicalAbstract: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=300&fit=crop"
    },
    {
      id: 43,
      title: "Interactive Evolutionary Multiobjective Optimization of Primer Design with Uncertain Objectives",
      authors: ["Mazumdar, A.", "Jain, B.", "Mitra, M.", "Dhar, P."],
      journal: "Proceedings of the Genetic and Evolutionary Computation",
      year: 2024,
      doi: "10.1145/3638529.36541",
      category: "Computational Biology",
      keywords: ["Evolutionary Optimization", "Primer Design", "Multiobjective"],
      graphicalAbstract: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=300&fit=crop"
    },
    {
      id: 42,
      title: "Rice husk valorisation by in situ grown MoS2 nanoflowers: a dual-action catalyst for pollutant dye remediation and microbial decontamination",
      authors: ["Ranjan, R.", "Bhatt, S.B.", "Rai, R.", "Sharma, S.K.", "Bharti, A.", "Dhar, P."],
      journal: "RSC Advances",
      year: 2024,
      volume: "14(17)",
      pages: "12192-203",
      category: "Environmental Remediation",
      keywords: ["Rice Husk", "MoS2 Nanoflowers", "Dye Remediation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=300&fit=crop"
    },
    {
      id: 41,
      title: "Microplastic and adhesive free, multifunctional, circular economy approach-based biomass-derived drinking straws",
      authors: ["Rai, R.", "Ranjan, R.", "Kant, C.", "Dhar, P."],
      journal: "iScience",
      year: 2024,
      impactFactor: 5.8,
      category: "Sustainable Materials",
      keywords: ["Microplastic-free", "Circular Economy", "Biomass-derived"],
      graphicalAbstract: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=300&fit=crop"
    },
    {
      id: 40,
      title: "Scalable phosphorylated cellulose production with improved environmental sustainability, crosslinkability and processability using 3D bioprinting for dye remediation",
      authors: ["Rahul, R.", "Rai, R.", "Naik, K.", "Singh, A.P.", "Dhar, P."],
      journal: "International Journal of Biological Macromolecules",
      year: 2024,
      pages: "130577",
      impactFactor: 8.2,
      category: "Environmental Remediation",
      keywords: ["Phosphorylated Cellulose", "3D Bioprinting", "Dye Remediation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop"
    },
    {
      id: 39,
      title: "Valorization of sugarcane bagasse with in situ grown MoS2 for continuous pollutant remediation and microbial decontamination",
      authors: ["Rahul, R.", "Bhatt, S.B.", "Rai, R.", "Sharma, S.K.", "Verma, M.", "Dhar, P."],
      journal: "Environmental Science and Pollution Research",
      year: 2024,
      pages: "1-17",
      impactFactor: 5.8,
      category: "Environmental Remediation",
      keywords: ["Sugarcane Bagasse", "MoS2", "Pollutant Remediation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
    },
    {
      id: 38,
      title: "Vitamin B6 appended polypyridyl Co(III) complexes for photo-triggered antibacterial activity",
      authors: ["Banerjee, S.", "Mandal, A.", "Rai, R.", "Dhar, P."],
      journal: "Chemistry - An Asian Journal",
      year: 2024,
      doi: "10.1002/asia.202400943",
      impactFactor: 3.5,
      category: "Photodynamic Therapy",
      keywords: ["Vitamin B6", "Polypyridyl Complexes", "Antibacterial"],
      graphicalAbstract: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop"
    },
    {
      id: 37,
      title: "Polypyridyl-based Co(III) complexes of vitamin B6 Schiff base for photoactivated antibacterial therapy",
      authors: ["Mandal, A.", "Rai, R.", "Saha, S.", "Kushwaha, R.", "Wei, L.", "Gogoi, H.", "Yadav, A.", "Huang, H.", "Dutta, A.", "Dhar, P.", "Banerjee, S."],
      journal: "Dalton Transactions",
      year: 2023,
      volume: "52(46)",
      pages: "17562-17572",
      impactFactor: 4.0,
      category: "Photodynamic Therapy",
      keywords: ["Polypyridyl", "Co Complexes", "Photoactivated"],
      graphicalAbstract: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop"
    },
    {
      id: 36,
      title: "Antibacterial Photodynamic Therapy by Zn(II)-Curcumin Complex: Synthesis, Characterization, DFT Calculation, Antibacterial Activity, and Molecular Docking",
      authors: ["Kushwaha, R.", "Rai, R.", "Gawande, V.", "Singh, V.", "Yadav, A.", "Koch, B.", "Dhar, P.", "Banerjee, S."],
      journal: "ChemBioChem",
      year: 2024,
      volume: "25(2)",
      pages: "e202300652",
      impactFactor: 3.2,
      category: "Photodynamic Therapy",
      keywords: ["Photodynamic Therapy", "Zn-Curcumin", "DFT Calculation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=300&fit=crop"
    },
    {
      id: 35,
      title: "Environmentally Benign Partially Delignified and Microwave Processed Bamboo-Based Drinking Straws",
      authors: ["Rai, R.", "Ranjan, R.", "Kant, C.", "Ghosh, U.U.", "Dhar, P."],
      journal: "Advanced Sustainable Systems",
      year: 2023,
      pages: "2300057",
      doi: "10.1002/adsu.202300057",
      impactFactor: 7.1,
      category: "Sustainable Materials",
      keywords: ["Bamboo", "Drinking Straws", "Microwave Processing"],
      graphicalAbstract: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop"
    },
    {
      id: 34,
      title: "Technological road map of Cellulase: A comprehensive outlook to structural, computational, and industrial applications",
      authors: ["Ranjan, R.", "Rai, R.", "Bhatt, S.B.", "Dhar, P."],
      journal: "Biochemical Engineering Journal",
      year: 2023,
      pages: "109020",
      doi: "10.1016/j.bej.2023.109020",
      impactFactor: 4.446,
      category: "Enzyme Technology",
      keywords: ["Cellulase", "Structural Analysis", "Industrial Applications"],
      graphicalAbstract: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop"
    },
    {
      id: 33,
      title: "3D Printable, injectable Amyloid-based composite Hydrogel of Bovine Serum Albumin-Aloe Vera for Rapid Diabetic Wound Healing",
      authors: ["Naik, K.", "Singh, P.", "Yadav, M.", "Srivastava, S.", "Tripathi, S.", "Ranjan, R.", "Dhar, P.", "Verma, A.", "Chaudhary, Sh.", "Parmar, A.S."],
      journal: "Journal of Material Chemistry B",
      year: 2023,
      doi: "10.1039/D3TB01151H",
      impactFactor: 7.571,
      category: "Biomedical Materials",
      keywords: ["3D Printable", "Amyloid", "Hydrogel", "Wound Healing"],
      graphicalAbstract: "https://images.unsplash.com/photo-1583912267550-8e8f8cf0a42f?w=400&h=300&fit=crop"
    },
    {
      id: 32,
      title: "Polypyridyl CoII-Curcumin Complexes as Photoactivated Anticancer and Antibacterial Agents",
      authors: ["Yadav, A.K.", "Singh, V.", "Kushwaha, R.", "Dolui, D.", "Rai, R.", "Dhar, P.", "Dutta, A.", "Koch, B.", "Banerjee, S."],
      journal: "ChemBioChem",
      year: 2023,
      pages: "e202300033",
      doi: "10.1002/cbic.202300033",
      impactFactor: 3.468,
      category: "Photodynamic Therapy",
      keywords: ["Polypyridyl", "Co-Curcumin", "Photoactivated", "Anticancer"],
      graphicalAbstract: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop"
    },
    {
      id: 31,
      title: "Life cycle assessment of transparent wood production using emerging technologies and strategic scale-up framework",
      authors: ["Rai, R.", "Rahul, R.", "Dhar, P."],
      journal: "Science of the Total Environment",
      year: 2022,
      pages: "157301",
      doi: "10.1016/j.scitotenv.2022.157301",
      impactFactor: 10.753,
      category: "Environmental Assessment",
      keywords: ["Life Cycle Assessment", "Transparent Wood", "Scale-up"],
      graphicalAbstract: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop"
    },
    {
      id: 30,
      title: "Biomedical engineering aspects of nanocellulose: A review",
      authors: ["Rai, R.", "Dhar, P."],
      journal: "Nanotechnology",
      year: 2022,
      volume: "33",
      pages: "362001",
      doi: "10.1088/1361-6528/ac6fef",
      impactFactor: 3.953,
      category: "Biomedical Materials",
      keywords: ["Nanocellulose", "Biomedical Engineering", "Review"],
      graphicalAbstract: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 29,
      title: "Fabrication of wood-inspired high-performance composites through fermentation routes",
      authors: ["Dhar, P.", "Sugimura, K.", "Yoshioka, M.", "Yoshinaga, A.", "Kamitakahara, H."],
      journal: "Cellulose",
      year: 2021,
      pages: "1-21",
      impactFactor: 6.123,
      category: "Bio-composites",
      keywords: ["Wood-inspired", "High-performance Composites", "Fermentation"],
      graphicalAbstract: "https://images.unsplash.com/photo-1510074468346-1eb7a79d7e6d?w=400&h=300&fit=crop"
    },
    {
      id: 28,
      title: "Genetically Engineered Proteins based Nacre-like Nanocomposites with Superior Mechanical and Electrochemical Performance",
      authors: ["Dhar, P.", "Phiri, J.", "Szilvay, G.R.", "Maloney, T.", "Laaksonen, P."],
      journal: "Journal of Material Chemistry A",
      year: 2019,
      doi: "10.1039/C9TA10881E",
      impactFactor: 14.511,
      category: "Nanocomposites",
      keywords: ["Genetically Engineered Proteins", "Nacre-like", "Nanocomposites"],
      graphicalAbstract: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=400&h=300&fit=crop"
    },
    {
      id: 27,
      title: "Magnetic Cellulose Nanocrystal Based Anisotropic Polylactic Acid Nanocomposite Films: Influence on Electrical, Magnetic, Thermal, and Mechanical Properties",
      authors: ["Dhar, P.", "Kumar, A.", "Katiyar, V."],
      journal: "ACS Applied Materials & Interfaces",
      year: 2016,
      volume: "8(28)",
      pages: "18393-409",
      impactFactor: 10.383,
      category: "Nanocomposites",
      keywords: ["Magnetic Cellulose", "Nanocrystal", "Polylactic Acid"],
      graphicalAbstract: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
    },
    {
      id: 26,
      title: "Valorization of sugarcane straw to produce highly conductive bacterial cellulose/graphene nanocomposite films through in situ fermentation: Kinetic analysis and property evaluation",
      authors: ["Dhar, P.", "Bruna, P.", "Antonio, G.", "Sandip, B."],
      journal: "Journal of Cleaner Production",
      year: 2019,
      volume: "238",
      pages: "117859",
      impactFactor: 11.072,
      category: "Nanocomposites",
      keywords: ["Sugarcane Straw", "Bacterial Cellulose", "Graphene"],
      graphicalAbstract: "https://images.unsplash.com/photo-1606242403780-8c4c3a1b5aba?w=400&h=300&fit=crop"
    },
    {
      id: 25,
      title: "Synthesis-property-performance relationships of multifunctional bacterial cellulose composites fermented in situ alkali lignin medium",
      authors: ["Dhar, P.", "Sugimura, K.", "Yoshioka, M.", "Yoshinaga, A.", "Kamitakahara, H."],
      journal: "Carbohydrate Polymers",
      year: 2021,
      volume: "252",
      pages: "117114",
      impactFactor: 10.723,
      category: "Bio-composites",
      keywords: ["Bacterial Cellulose", "Alkali Lignin", "Multifunctional"],
      graphicalAbstract: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=300&fit=crop"
    },
    {
      id: 24,
      title: "Thermo-mechanically Stable Sustainable Polymer Based Solid Electrolyte Membranes for Direct Methanol Fuel Cell Applications",
      authors: ["Gaur, S.S.", "Dhar, P.", "Sonowal, A.", "Sharma, A.", "Kumar, A.", "Katiyar, V."],
      journal: "Journal of Membrane Science",
      year: 2017,
      volume: "526",
      pages: "348-354",
      impactFactor: 10.53,
      category: "Energy Materials",
      keywords: ["Polymer Electrolyte", "Fuel Cell", "Membrane"],
      graphicalAbstract: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop"
    },
    {
      id: 23,
      title: "Cellulose Nanocrystal Templated Graphene Nanoscrolls for High Performance Supercapacitors and Hydrogen Storage: An Experimental and Molecular Simulation Study",
      authors: ["Dhar, P.", "Gaur, S.S.", "Kumar, A.", "Katiyar, V."],
      journal: "Scientific Reports (Nature)",
      year: 2018,
      volume: "8",
      pages: "3886",
      impactFactor: 5.228,
      category: "Energy Storage",
      keywords: ["Cellulose Nanocrystal", "Graphene Nanoscrolls", "Supercapacitors"],
      graphicalAbstract: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
    },
    {
      id: 22,
      title: "Fabrication of cellulose nanocrystal supported stable Fe(0) nanoparticles: a sustainable catalyst for dye reduction, organic conversion and chemo-magnetic propulsion",
      authors: ["Dhar, P.", "Kumar, A.", "Katiyar, V."],
      journal: "Cellulose",
      year: 2015,
      volume: "22(6)",
      pages: "3755-71",
      impactFactor: 6.123,
      category: "Catalysis",
      keywords: ["Cellulose Nanocrystal", "Fe Nanoparticles", "Catalyst"],
      graphicalAbstract: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop"
    },
    {
      id: 21,
      title: "Cellulose Nanocrystal/Clay based Macroion Nanogel as Support for Stable Pt Catalyst for Electrochemical Oxidation of Methanol in Alkaline Medium",
      authors: ["Gaur, S.S.", "Dhar, P.", "Kumar, A.", "Katiyar, V."],
      journal: "Applied Clay Science",
      year: 2019,
      volume: "182",
      pages: "105277",
      impactFactor: 5.907,
      category: "Catalysis",
      keywords: ["Cellulose Nanocrystal", "Clay", "Pt Catalyst"],
      graphicalAbstract: "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=400&h=300&fit=crop"
    },
    {
      id: 20,
      title: "Effect of cellulose nanocrystal polymorphs on mechanical, barrier and thermal properties of poly(lactic acid) based bionanocomposites",
      authors: ["Dhar, P.", "Tarafder, D.", "Kumar, A.", "Katiyar, V."],
      journal: "RSC Advances",
      year: 2015,
      volume: "5(74)",
      pages: "60426-40",
      impactFactor: 4.036,
      category: "Bionanocomposites",
      keywords: ["Cellulose Nanocrystal", "Polylactic Acid", "Bionanocomposites"],
      graphicalAbstract: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop"
    },
    {
      id: 19,
      title: "Acid functionalized cellulose nanocrystals and its effect on mechanical, thermal, crystallization and surfaces properties of poly(lactic acid) bionanocomposites films: A comprehensive study",
      authors: ["Dhar, P.", "Bhasney, S.M.", "Kumar, A.", "Katiyar, V."],
      journal: "Polymer",
      year: 2016,
      volume: "101",
      pages: "75-92",
      impactFactor: 4.432,
      category: "Bionanocomposites",
      keywords: ["Acid Functionalized", "Cellulose Nanocrystals", "PLA"],
      graphicalAbstract: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
    },
    {
      id: 18,
      title: "Thermally recyclable polylactic acid/cellulose nanocrystal films through reactive extrusion process",
      authors: ["Dhar, P.", "Tarafder, D.", "Kumar, A.", "Katiyar, V."],
      journal: "Polymer",
      year: 2016,
      volume: "87",
      pages: "268-82",
      impactFactor: 4.432,
      category: "Bionanocomposites",
      keywords: ["Thermally Recyclable", "PLA", "Reactive Extrusion"],
      graphicalAbstract: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=400&h=300&fit=crop"
    },
    {
      id: 17,
      title: "Thermal Degradation Kinetics of Polylactic Acid/Acid Fabricated Cellulose Nanocrystal based Bionanocomposites",
      authors: ["Monika, S.", "Dhar, P.", "Katiyar, V."],
      journal: "International Journal of Biological Macromolecules",
      year: 2017,
      volume: "104",
      pages: "827-836",
      impactFactor: 8.025,
      category: "Bionanocomposites",
      keywords: ["Thermal Degradation", "Polylactic Acid", "Cellulose Nanocrystal"],
      graphicalAbstract: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
    },
    {
      id: 16,
      title: "Biodegradable Poly(lactic acid)/Cellulose Nanocrystals (CNCs) Composite Microcellular Foam: Effect of Nanofillers on Foam Cellular Morphology, Thermal and Wettability Behavior",
      authors: ["Borkotoky, S.S.", "Dhar, P.", "Katiyar, V."],
      journal: "International Journal of Biological Macromolecules",
      year: 2018,
      volume: "106",
      pages: "433-446",
      impactFactor: 8.0125,
      category: "Bionanocomposites",
      keywords: ["Biodegradable", "PLA", "Microcellular Foam"],
      graphicalAbstract: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop"
    },
    {
      id: 15,
      title: "Reactive Extrusion of Polylactic Acid/Cellulose Nanocrystal Films for Food Packaging Applications: Influence of Filler type on Thermo-mechanical, Rheological and Barrier Properties",
      authors: ["Dhar, P.", "Gaur, S.S.", "Soundararajan, N.", "Gupta, A.", "Bhasney, S.M.", "Kumar, A.", "Katiyar, V."],
      journal: "Industrial & Engineering Chemistry Research",
      year: 2017,
      volume: "56(16)",
      pages: "4718-4735",
      impactFactor: 4.326,
      category: "Food Packaging",
      keywords: ["Reactive Extrusion", "PLA", "Food Packaging"],
      graphicalAbstract: "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?w=400&h=300&fit=crop"
    },
    {
      id: 14,
      title: "A Sustainable Approach for Mechanical Recycling of Poly(lactic acid)/Cellulose Nanocrystal Films: Investigations on Structure-Property Relationship and Underlying Mechanism",
      authors: ["Dhar, P.", "Murugan, R.", "Bhasney, S.", "Bhagabati, P.", "Kumar, A.", "Katiyar, V."],
      journal: "Industrial & Engineering Chemistry Research",
      year: 2018,
      volume: "57(43)",
      pages: "14493-14508",
      impactFactor: 4.326,
      category: "Sustainable Materials",
      keywords: ["Mechanical Recycling", "PLA", "Cellulose Nanocrystal"],
      graphicalAbstract: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    },
    {
      id: 13,
      title: "Nanosilk Grafted Poly(Lactic Acid) Films: Influence of Cross-Linking on Rheology and Thermal Study",
      authors: ["Tesfaye, M.", "Patwa, R.", "Dhar, P.", "Katiyar, V."],
      journal: "ACS Omega",
      year: 2017,
      volume: "10",
      pages: "7071-7084",
      impactFactor: 4.132,
      category: "Bionanocomposites",
      keywords: ["Nanosilk", "PLA Films", "Cross-Linking"],
      graphicalAbstract: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop"
    },
    {
      id: 12,
      title: "Investigations on rheological and mechanical behavior of poly(3-Hydroxybutyrate)/cellulose nanocrystal based nanobiocomposites",
      authors: ["Dhar, P.", "Bhardwaj, U.", "Kumar, A.", "Katiyar, V."],
      journal: "Polymer Composites",
      year: 2017,
      volume: "38",
      pages: "E392-401",
      impactFactor: 3.531,
      category: "Bionanocomposites",
      keywords: ["Polyhydroxybutyrate", "Cellulose Nanocrystal", "Rheological"],
      graphicalAbstract: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop"
    },
    {
      id: 11,
      title: "Poly(3-hydroxybutyrate)/cellulose nanocrystal films for food packaging applications: Barrier and migration studies",
      authors: ["Dhar, P.", "Bhardwaj, U.", "Kumar, A.", "Katiyar, V."],
      journal: "Polymer Engineering & Science",
      year: 2015,
      volume: "55(10)",
      pages: "2388-95",
      impactFactor: 2.573,
      category: "Food Packaging",
      keywords: ["Polyhydroxybutyrate", "Food Packaging", "Barrier Properties"],
      graphicalAbstract: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop"
    },
    {
      id: 10,
      title: "Prospects of poly(vinyl alcohol)/Chitosan/poly(styrene sulfonic acid) and montmorillonite Cloisite 30B clay composite membrane for direct methanol fuel cells",
      authors: ["Gaur, S.S.", "Dhar, P.", "Kumar, A.", "Katiyar, V."],
      journal: "Journal of Renewable and Sustainable Energy",
      year: 2014,
      volume: "6(5)",
      pages: "053135",
      impactFactor: 2.847,
      category: "Energy Materials",
      keywords: ["PVA", "Chitosan", "Fuel Cell", "Membrane"],
      graphicalAbstract: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      title: "Thermal Degradation Kinetics of Poly(3-hydroxybutyrate)/Cellulose Nanocrystals based Nanobiocomposite",
      authors: ["Dhar, P.", "Sai Phani, K.V.", "Tiwari, P.", "Kumar, A.", "Katiyar, V."],
      journal: "Journal of Thermodynamics & Catalysis",
      year: 2014,
      volume: "5",
      pages: "134",
      impactFactor: 1.0,
      category: "Bionanocomposites",
      keywords: ["Thermal Degradation", "PHB", "Cellulose Nanocrystals"],
      graphicalAbstract: "https://images.unsplash.com/photo-1635241161466-541f065683ba?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Fabrication of Cellulose Nanocrystals from Agricultural Compost",
      authors: ["Devi, R.R.", "Dhar, P.", "Kalamdhad, A.", "Katiyar, V."],
      journal: "Compost Science & Utilization",
      year: 2015,
      volume: "23(2)",
      pages: "104-16",
      impactFactor: 1.54,
      category: "Sustainable Materials",
      keywords: ["Cellulose Nanocrystals", "Agricultural Compost", "Fabrication"],
      graphicalAbstract: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Improved structural properties of polyhydroxybutyrate composites",
      authors: ["Dhar, P.", "Kumar, A.", "Katiyar, V."],
      journal: "SPE Plastics Research Online",
      year: 2016,
      category: "Bionanocomposites",
      keywords: ["Polyhydroxybutyrate", "Structural Properties", "Composites"],
      graphicalAbstract: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Cellulose nanocrystals: Potential nanofiller for food packaging and catalytic applications",
      authors: ["Katiyar, V.", "Dhar, P.", "Kumar, A."],
      journal: "Journal of Material Science & Engineering",
      year: 2015,
      volume: "4(4)",
      category: "Sustainable Materials",
      keywords: ["Cellulose Nanocrystals", "Food Packaging", "Catalytic Applications"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/6.webp"
    },
    {
      id: 5,
      title: "In situ Bioprocessing of Bacterial Cellulose with Graphene: Percolation Network formation, Kinetic Analysis with Physico-Chemical and Structural Properties",
      authors: ["Dhar, P.", "Etula, J.", "Bankar, S.B."],
      journal: "ACS Applied Bio Materials",
      year: 2019,
      volume: "2(9)",
      pages: "4052-4066",
      category: "Nanocomposites",
      keywords: ["Bacterial Cellulose", "Graphene", "In-situ Bioprocessing"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/5.webp"
    },
    {
      id: 4,
      title: "Applicability of Fe-CNC/GR/PLA composite as potential sensor for biomolecules",
      authors: ["Chakraborty, G.", "Dhar, P.", "Katiyar, V.", "Pugazhenthi, G."],
      journal: "Journal of Materials Science: Materials in Electronics",
      year: 2020,
      pages: "1-16",
      impactFactor: 2.779,
      category: "Biosensors",
      keywords: ["Fe-CNC", "Graphene", "PLA", "Biosensor"],
      graphicalAbstract: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Self-propelled cellulose nanocrystal based catalytic nanomotors for targeted hyperthermia and pollutant remediation applications",
      authors: ["Dhar, P.", "Narendren, S.", "Gaur, S.S.", "Sharma, S.", "Kumar, A.", "Katiyar, V."],
      journal: "International Journal of Biological Macromolecules",
      year: 2020,
      volume: "158",
      pages: "1020-1036",
      impactFactor: 8.0125,
      category: "Nanomaterials",
      keywords: ["Cellulose Nanocrystal", "Nanomotors", "Hyperthermia", "Pollutant Remediation"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/3.jpg"
    },
    {
      id: 2,
      title: "Fabrication and characterization of clay nanoscrolls and stable zerovalent iron using montmorillonite",
      authors: ["Gaur, S.S.", "Dhar, P.", "Narendren, S.", "Sakurai, S.", "Kumar, A.", "Katiyar, V."],
      journal: "Applied Clay Science",
      year: 2020,
      volume: "193",
      impactFactor: 5.907,
      category: "Nanomaterials",
      keywords: ["Clay Nanoscrolls", "Zerovalent Iron", "Montmorillonite"],
      graphicalAbstract: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop"
    },
    {
      id: 1,
      title: "Ion transfer channel network formed by flower and rod shape crystals of hair hydrolysate in poly(vinyl alcohol) matrix and its application as anion exchange membrane in fuel cells",
      authors: ["Gaur, S.S.", "Dhar, P.", "Wani, K.M.", "Srivastava, M.", "Sakurai, S.", "Kumar, A.", "Katiyar, V."],
      journal: "Journal of Colloid and Interface Science",
      year: 2021,
      volume: "587",
      pages: "214-228",
      impactFactor: 9.965,
      category: "Energy Materials",
      keywords: ["Ion Transfer", "Anion Exchange Membrane", "Fuel Cells", "PVA"],
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/1.jpg"
    }
  ];

  const categories = ['all', 'Sustainable Materials', 'Biomedical Materials', 'Food Packaging', 'Photodynamic Therapy', 
    'Environmental Remediation', 'Agricultural Applications', 'Computational Biology', 'Enzyme Technology', 
    'Bio-composites', 'Nanocomposites', 'Energy Materials', 'Energy Storage', 'Catalysis', 'Bionanocomposites',
    'Food Preservation', 'Environmental Assessment', 'Nanomaterials', 'Biosensors'];
    
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
