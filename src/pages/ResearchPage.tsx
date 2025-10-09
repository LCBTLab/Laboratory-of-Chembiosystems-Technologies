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

interface Publication {
  id: number;
  sno: string;
  citation: string;
  impactFactor: string;
  year: number;
  journal: string;
  doi?: string;
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
  const publications: Publication[] = [
    {
      id: 55,
      sno: "55",
      citation: "Ranjan, R., Mone, V. P., Rai, R., Kant, C., & Dhar, P*. (2025). All-Biomass-Derived Cellulose Phosphate-Based Heat-Sealable Films and Thermally Stable Antifizzing Cups with Improved Recyclability. ACS Sustainable Chemistry & Engineering, 13(17), 6074-6089.",
      impactFactor: "7.3",
      year: 2025,
      journal: "ACS Sustainable Chemistry & Engineering"
    },
    {
      id: 54,
      sno: "54",
      citation: "Thi Kim Ngan Duong, Thi Thuy Truong, … Dhar P, Byeongil Lee, Junghwan Oh, Sudip Mondal, Hydrogel‐Based Smart Materials for Wound Healing and Sensing, Aggregate.",
      impactFactor: "13.7",
      year: 2025,
      journal: "Aggregate",
      doi: "10.1002/agt2.70047"
    },
    {
      id: 53,
      sno: "53",
      citation: "R Rai, R Bharti, Dhar P*, Biodegradable, water-resistant, smart cellulose-based drinking straws from agricultural biomass with detection of adulterants in beverages. Food Chemistry. 2025 Jan",
      impactFactor: "8.5",
      year: 2025,
      journal: "Food Chemistry",
      doi: "10.1016/j.foodchem.2025.143093"
    },
    {
      id: 52,
      sno: "52",
      citation: "I Singh, Ishwar, Rohit Rai, Rajesh Kushwaha, Dhar P* and S Banerjee*. Photoactivated Antibacterial Activity of Fe (III) Complexes via Singlet Oxygen-Mediated Bacterial Membrane Lysis. Dalton Transactions (2025).",
      impactFactor: "N/A",
      year: 2025,
      journal: "Dalton Transactions"
    },
    {
      id: 51,
      sno: "51",
      citation: "Naik, K., Tripathi, S., Ranjan, R., Agrawal, S., Srivastava, S. K., Dhar, P., ... & Parmar, A. S. (2025). Bioactive Hyaluronic acid–Protein based amyloidogenic hydrogel dressing for rapid diabetic wound healing via enhanced angiogenesis and anti-inflammation. Materials Today Communications, (2025) 113560.",
      impactFactor: "N/A",
      year: 2025,
      journal: "Materials Today Communications"
    },
    {
      id: 50,
      sno: "50",
      citation: "R Ranjan, R Rai, K Naik, AS Parmar, Dhar P*, In-situ growth of MoS2 on 3D printed phosphorylated cellulose for simultaneous dye degradation and microbial inactivation. Cellulose. 2025 Jan",
      impactFactor: "5.3",
      year: 2025,
      journal: "Cellulose",
      doi: "10.1007/s10570-024-06361-2"
    },
    {
      id: 49,
      sno: "49",
      citation: "R Rai, R Ranjan, S Kumari, N De and Dhar P*, Cellulose-based phosphorylated bamboo with slow urea release and lower carbon footprints improves rainfed rice crop productivity in field trials. International Journal of Biological Macromolecules. 2025 Feb",
      impactFactor: "8.2",
      year: 2025,
      journal: "International Journal of Biological Macromolecules"
    },
    {
      id: 48,
      sno: "48",
      citation: "Naik, K; Tripathi, S; Ranjan, R; Agrawal, S, Singh, S; Dhar, P; Singh, K; Tiwari, V; Parmar, A, Conductive Hybrid Hydrogel of Carbon Nanotubes-Protein-Cellulose: In vivo Treatment of Diabetic Wound via Photothermal Therapy and Tracking Real-Time Wound Assessment via Photoacoustic Imaging. ACS Applied Bio Materials Feb 2025",
      impactFactor: "4.7",
      year: 2025,
      journal: "ACS Applied Bio Materials"
    },
    {
      id: 47,
      sno: "47",
      citation: "R D Prakashchandra, R Rai, A A Mandal, P Dhar, S Banerjee, T Sarkar, B N Babu, Photodynamic Inactivation of Bacteria Using Nickel (II) Complexes with Catecholate and Phenanthroline Ligands. ChemBioChem 2024 Nov",
      impactFactor: "2.6",
      year: 2024,
      journal: "ChemBioChem",
      doi: "10.1002/cbic.202400678"
    },
    {
      id: 46,
      sno: "46",
      citation: "R Ranjan; S B Bhatt; R Rai; S Kumari; R Tilak; Dhar P*, Cellulose based aerogels derived from rice agro wastes with enhanced antifungal activity for topical management of vulvovaginal candidiasis. 2025 Jan Macromolecular Chemistry and Physics.",
      impactFactor: "2.5",
      year: 2025,
      journal: "Macromolecular Chemistry and Physics",
      doi: "10.1002/macp.202400355"
    },
    {
      id: 45,
      sno: "45",
      citation: "SB Bhatt, R Ranjan, S Dahiya, BN Pal, Dhar P*. Functionalized jute with high-water absorption, low thermal conductivity and efficient radiative cooling for the preservation of perishable green vegetables with reduced cold storage energy requirements. Journal of Materials Chemistry A. 2024 Jun.",
      impactFactor: "10.7",
      year: 2024,
      journal: "Journal of Materials Chemistry A",
      doi: "10.1039/D4TA02507E"
    },
    {
      id: 44,
      sno: "44",
      citation: "Rai R, Ranjan R, Kant C, Dhar P*. Biodegradable, eco-friendly, and hydrophobic drinking straws based on delignified phosphorylated bamboo-gelatin composites. Chemical Engineering Journal. 2023 Jun 22:144047.",
      impactFactor: "16.744",
      year: 2023,
      journal: "Chemical Engineering Journal",
      doi: "10.1016/j.cej.2023.144047"
    },
    {
      id: 43,
      sno: "43",
      citation: "A Mazumdar, B Jain, M Mitra, Dhar P*. Interactive Evolutionary Multiobjective Optimization of Primer Design with Uncertain Objectives. Proceedings of the Genetic and Evolutionary Computation. 2024. July.",
      impactFactor: "N/A",
      year: 2024,
      journal: "Proceedings of the Genetic and Evolutionary Computation",
      doi: "10.1145/3638529.36541"
    },
    {
      id: 42,
      sno: "42",
      citation: "Ranjan R, Bhatt SB, Rai R, Sharma SK, Ranjan R, Bharti A, Dhar P*. Rice husk valorisation by in situ grown MoS 2 nanoflowers: a dual-action catalyst for pollutant dye remediation and microbial decontamination. RSC Advances. 2024;14(17):12192-203.",
      impactFactor: "N/A",
      year: 2024,
      journal: "RSC Advances"
    },
    {
      id: 41,
      sno: "41",
      citation: "Rai, R., Ranjan, R., Kant, C., & Dhar P*. Microplastic and adhesive free, multifunctional, circular economy approach-based biomass-derived drinking straws. iScience. 2024 Mar 28.",
      impactFactor: "5.8",
      year: 2024,
      journal: "iScience"
    },
    {
      id: 40,
      sno: "40",
      citation: "R Rahul, R Rai, K Naik, A P Singh, and Dhar P*. Scalable phosphorylated cellulose production with improved environmental sustainability, crosslinkability and processability using 3D bioprinting for dye remediation. International Journal of Biological Macromolecules (2024): 130577.",
      impactFactor: "8.2",
      year: 2024,
      journal: "International Journal of Biological Macromolecules"
    },
    {
      id: 39,
      sno: "39",
      citation: "R Rahul, S B. Bhatt, R Rai, S K Sharma, M Verma, and Dhar P* Valorization of sugarcane bagasse with in situ grown MoS2 for continuous pollutant remediation and microbial decontamination. Environmental Science and Pollution Research (2024): 1-17.",
      impactFactor: "5.8",
      year: 2024,
      journal: "Environmental Science and Pollution Research"
    },
    {
      id: 38,
      sno: "38",
      citation: "S Banerjee, A Mandal, R Rai, Dhar P Vitamin B6 appended polypyridyl Co(III) complexes for photo-triggered antibacterial activity. Chemistry - An Asian Journal.",
      impactFactor: "3.5",
      year: 2024,
      journal: "Chemistry - An Asian Journal",
      doi: "10.1002/asia.202400943"
    },
    {
      id: 37,
      sno: "37",
      citation: "A Mandal, R Rai, S Saha, R Kushwaha, L Wei, H Gogoi, A Mandal, A Yadav, H Huang, A Dutta, P Dhar*, S Banerjee* Polypyridyl-based Co (iii) complexes of vitamin B 6 Schiff base for photoactivated antibacterial therapy. Dalton Transactions 52, no. 46 (2023): 17562-17572.",
      impactFactor: "4.0",
      year: 2023,
      journal: "Dalton Transactions"
    },
    {
      id: 36,
      sno: "36",
      citation: "R Kushwaha, R Rai, V Gawande, V Singh, A Yadav, B Koch, P Dhar*, S Banerjee* Antibacterial Photodynamic Therapy by Zn(II)-Curcumin Complex: Synthesis, Characterization, DFT Calculation, Antibacterial Activity, and Molecular Docking. ChemBioChem 25, no. 2 (2024): e202300652.",
      impactFactor: "3.2",
      year: 2024,
      journal: "ChemBioChem"
    },
    {
      id: 35,
      sno: "35",
      citation: "Rai R, Ranjan R, Kant C, Ghosh UU, Dhar P*. Environmentally Benign Partially Delignified and Microwave Processed Bamboo‐Based Drinking Straws. Advanced Sustainable Systems. 2300057.",
      impactFactor: "7.1",
      year: 2023,
      journal: "Advanced Sustainable Systems",
      doi: "10.1002/adsu.202300057"
    },
    {
      id: 34,
      sno: "34",
      citation: "R Ranjan, R Rai, S B Bhatt, Dhar P*. Technological road map of Cellulase: A comprehensive outlook to structural, computational, and industrial applications, Biochemical Engineering Journal, 2023, 109020.",
      impactFactor: "4.446",
      year: 2023,
      journal: "Biochemical Engineering Journal",
      doi: "10.1016/j.bej.2023.109020"
    },
    {
      id: 33,
      sno: "33",
      citation: "K Naik, P Singh, M Yadav, S Srivastava, S Tripathi, R Ranjan, P Dhar, A Verma, Sh Chaudhary and A S Parmar 3D Printable, injectable Amyloid-based composite Hydrogel of Bovine Serum Albumin-Aloe Vera for Rapid Diabetic Wound Healing, Journal of Material Chemistry B, 2023",
      impactFactor: "7.571",
      year: 2023,
      journal: "Journal of Material Chemistry B",
      doi: "10.1039/D3TB01151H"
    },
    {
      id: 32,
      sno: "32",
      citation: "Yadav, A K, V Singh, R Kushwaha, D Dolui, R Rai, P Dhar, A Dutta, B Koch, and S Banerjee. Polypyridyl CoII‐Curcumin Complexes as Photoactivated Anticancer and Antibacterial Agents. ChemBioChem (2023): e202300033.",
      impactFactor: "3.468",
      year: 2023,
      journal: "ChemBioChem",
      doi: "10.1002/cbic.202300033"
    },
    {
      id: 31,
      sno: "31",
      citation: "Rai, R, Rahul R, and Dhar P*. Life cycle assessment of transparent wood production using emerging technologies and strategic scale-up framework. Science of the Total Environment, 2022, 157301.",
      impactFactor: "10.753",
      year: 2022,
      journal: "Science of the Total Environment",
      doi: "10.1016/j.scitotenv.2022.157301"
    },
    {
      id: 30,
      sno: "30",
      citation: "Rai R, Dhar P*. Biomedical engineering aspects of nanocellulose: A review. Nanotechnology, 2022, 33, 362001.",
      impactFactor: "3.953",
      year: 2022,
      journal: "Nanotechnology",
      doi: "10.1088/1361-6528/ac6fef"
    },
    {
      id: 29,
      sno: "29",
      citation: "Dhar P*, K Sugimura, M Yoshioka, A Yoshinaga, H Kamitakahara, Fabrication of wood-inspired high-performance composites through fermentation routes, Cellulose, 1-21, 2021.",
      impactFactor: "6.123",
      year: 2021,
      journal: "Cellulose"
    },
    {
      id: 28,
      sno: "28",
      citation: "Dhar P*, J Phiri, G R. Szilvay, T Maloney and P Laaksonen, Genetically Engineered Proteins based Nacre-like Nanocomposites with Superior Mechanical and Electrochemical Performance, Journal of Material Chemistry A, Nov, 2019.",
      impactFactor: "14.511",
      year: 2019,
      journal: "Journal of Material Chemistry A",
      doi: "10.1039/C9TA10881E"
    },
    {
      id: 27,
      sno: "27",
      citation: "Dhar P, Kumar A, Katiyar V. Magnetic Cellulose Nanocrystal Based Anisotropic Polylactic Acid Nanocomposite Films: Influence on Electrical, Magnetic, Thermal, and Mechanical Properties. ACS Applied Materials & Interfaces. 6;8(28):18393-409, Jul 2016.",
      impactFactor: "10.383",
      year: 2016,
      journal: "ACS Applied Materials & Interfaces"
    },
    {
      id: 26,
      sno: "26",
      citation: "Dhar P*, Bruna P, Antonio G, Sandip B, Valorization of sugarcane straw to produce highly conductive bacterial cellulose/graphene nanocomposite films through in situ fermentation: Kinetic analysis and property evaluation. Journal of Cleaner Production. 238, 20, 2019, 117859.",
      impactFactor: "11.072",
      year: 2019,
      journal: "Journal of Cleaner Production"
    },
    {
      id: 25,
      sno: "25",
      citation: "Dhar P*, K Sugimura, M Yoshioka, A Yoshinaga, H Kamitakahara, Synthesis-property-performance relationships of multifunctional bacterial cellulose composites fermented in situ alkali lignin medium. Carbohydrate Polymers. 252, 2021, 117114.",
      impactFactor: "10.723",
      year: 2021,
      journal: "Carbohydrate Polymers"
    },
    {
      id: 24,
      sno: "24",
      citation: "Gaur, S S, Dhar P, A Sonowal, A Sharma, A Kumar, and V Katiyar. Thermo-mechanically Stable Sustainable Polymer Based Solid Electrolyte Membranes for Direct Methanol Fuel Cell Applications, Journal of Membrane Science. 2017, March: 526, 348–354.",
      impactFactor: "10.53",
      year: 2017,
      journal: "Journal of Membrane Science"
    },
    {
      id: 23,
      sno: "23",
      citation: "Dhar P, Gaur, S. S., Kumar, A., & Katiyar, V. Cellulose Nanocrystal Templated Graphene Nanoscrolls for High Performance Supercapacitors and Hydrogen Storage: An Experimental and Molecular Simulation Study, Scientific Reports (Nature) 8, 3886, March 2018.",
      impactFactor: "5.228",
      year: 2018,
      journal: "Scientific Reports"
    },
    {
      id: 22,
      sno: "22",
      citation: "Dhar P, Kumar A, Katiyar V. Fabrication of cellulose nanocrystal supported stable Fe (0) nanoparticles: a sustainable catalyst for dye reduction, organic conversion and chemo-magnetic propulsion. Cellulose. 2015 Dec 1; 22(6):3755-71.",
      impactFactor: "6.123",
      year: 2015,
      journal: "Cellulose"
    },
    {
      id: 21,
      sno: "21",
      citation: "Gaur, S S, Dhar P, Kumar A, and Katiyar V. Cellulose Nanocrystal/Clay based Macroion Nanogel as Support for Stable Pt Catalyst for Electrochemical Oxidation of Methanol in Alkaline Medium. Applied Clay Science, 2019, 182, Dec 1, 105277.",
      impactFactor: "5.907",
      year: 2019,
      journal: "Applied Clay Science"
    },
    {
      id: 20,
      sno: "20",
      citation: "Dhar P, Tarafder D, Kumar A, Katiyar V. Effect of cellulose nanocrystal polymorphs on mechanical, barrier and thermal properties of poly (lactic acid) based bionanocomposites. RSC Advances. 2015 July; 5(74):60426-40.",
      impactFactor: "4.036",
      year: 2015,
      journal: "RSC Advances"
    },
    {
      id: 19,
      sno: "19",
      citation: "Dhar P, Bhasney SM, Kumar A, Katiyar V. Acid functionalized cellulose nanocrystals and its effect on mechanical, thermal, crystallization and surfaces properties of poly (lactic acid) bionanocomposites films: A comprehensive study. Polymer. 101, 75–92 2016 Aug.",
      impactFactor: "4.432",
      year: 2016,
      journal: "Polymer"
    },
    {
      id: 18,
      sno: "18",
      citation: "Dhar P, Tarafder D, Kumar A, Katiyar V. Thermally recyclable polylactic acid/cellulose nanocrystal films through reactive extrusion process. Polymer. 2016 Mar 22; 87:268-82.",
      impactFactor: "4.432",
      year: 2016,
      journal: "Polymer"
    },
    {
      id: 17,
      sno: "17",
      citation: "Monika S, Dhar P and Katiyar V, Thermal Degradation Kinetics of Polylactic Acid/ Acid Fabricated Cellulose Nanocrystal based Bionanocomposites. International Journal of Biological Macromolecules, 104, Part A, Nov 2017, 827-836.",
      impactFactor: "8.025",
      year: 2017,
      journal: "International Journal of Biological Macromolecules"
    },
    {
      id: 16,
      sno: "16",
      citation: "S S Borkotoky, Dhar P and Katiyar V, Biodegradable Poly (lactic acid)/Cellulose Nanocrystals (CNCs) Composite Microcellular Foam: Effect of Nanofillers on Foam Cellular Morphology, Thermal and Wettability Behavior, International Journal of Biological Macromolecules, 106, 2018, 433-446.",
      impactFactor: "8.0125",
      year: 2018,
      journal: "International Journal of Biological Macromolecules"
    },
    {
      id: 15,
      sno: "15",
      citation: "Dhar P, Gaur, S. S., Soundararajan, N., Gupta, A., Bhasney, S. M., Kumar, A., & Katiyar, V. (2017). Reactive Extrusion of Polylactic Acid/Cellulose Nanocrystal Films for Food Packaging Applications: Influence of Filler type on Thermo-mechanical, Rheological and Barrier Properties. Industrial & Engineering Chemistry Research 2017, 56 (16), 4718-4735",
      impactFactor: "4.326",
      year: 2017,
      journal: "Industrial & Engineering Chemistry Research"
    },
    {
      id: 14,
      sno: "14",
      citation: "Dhar P, R Murugan, S Bhasney, P Bhagabati, A Kumar, and V Katiyar, A Sustainable Approach for Mechanical Recycling of Poly (lactic acid)/Cellulose Nanocrystal Films: Investigations on Structure-Property Relationship and Underlying Mechanism, Industrial & Engineering Chemistry Research 2018, 57 (43), 14493-14508.",
      impactFactor: "4.326",
      year: 2018,
      journal: "Industrial & Engineering Chemistry Research"
    },
    {
      id: 13,
      sno: "13",
      citation: "M Tesfaye, R Patwa, Dhar P and V Katiyar, Nanosilk Grafted Poly (Lactic Acid) Films: Influence of Cross-Linking on Rheology and Thermal Study, ACS Omega 2017 (10), 7071-7084.",
      impactFactor: "4.132",
      year: 2017,
      journal: "ACS Omega"
    },
    {
      id: 12,
      sno: "12",
      citation: "Dhar P, Bhardwaj U, Kumar A, Katiyar V. Investigations on rheological and mechanical behavior of poly (3‐Hydroxybutyrate)/ cellulose nanocrystal based nanobiocomposites. Polymer Composites. 2017 Sep;38:E392-401.",
      impactFactor: "3.531",
      year: 2017,
      journal: "Polymer Composites"
    },
    {
      id: 11,
      sno: "11",
      citation: "Dhar P, Bhardwaj U, Kumar A, Katiyar V. Poly (3‐hydroxybutyrate)/cellulose nanocrystal films for food packaging applications: Barrier and migration studies. Polymer Engineering & Science. 2015 Oct 1; 55(10):2388-95.",
      impactFactor: "2.573",
      year: 2015,
      journal: "Polymer Engineering & Science"
    },
    {
      id: 10,
      sno: "10",
      citation: "Gaur, S S, Dhar P, Kumar A, and Katiyar V. Prospects of poly (vinyl alcohol)/Chitosan/poly (styrene sulfonic acid) and montmorillonite Cloisite® 30B clay composite membrane for direct methanol fuel cells. Journal of Renewable and Sustainable Energy 6, no. 5, 2014 Oct: 053135.",
      impactFactor: "2.847",
      year: 2014,
      journal: "Journal of Renewable and Sustainable Energy"
    },
    {
      id: 9,
      sno: "9",
      citation: "Dhar P, Sai Phani KV, Tiwari P, Kumar A and Katiyar V, Thermal Degradation Kinetics of Poly (3-hydroxybutyrate)/Cellulose Nanocrystals based Nanobiocomposite, Journal of Thermodynamics & Catalysis 2014 Sept, 5:134 (doi: 10.4172/2157-7544.1000134).",
      impactFactor: "1.00",
      year: 2014,
      journal: "Journal of Thermodynamics & Catalysis"
    },
    {
      id: 8,
      sno: "8",
      citation: "Devi RR, Dhar P, Kalamdhad A, Katiyar V. Fabrication of Cellulose Nanocrystals from Agricultural Compost. Compost Science & Utilization. 2015 Apr 3;23(2):104-16.",
      impactFactor: "1.54",
      year: 2015,
      journal: "Compost Science & Utilization"
    },
    {
      id: 7,
      sno: "7",
      citation: "Dhar P, Kumar A and Katiyar V, Improved structural properties of polyhydroxybutyrate composites, SPE Plastics Research Online. (Invited feature article in category of Plastics Nanotechnology) 2016 Feb. (doi: 10.2417/spepro.006379).",
      impactFactor: "N/A",
      year: 2016,
      journal: "SPE Plastics Research Online"
    },
    {
      id: 6,
      sno: "6",
      citation: "Katiyar V, Dhar P and Kumar A, Cellulose nanocrystals: Potential nanofiller for food packaging and catalytic applications, J Material Sci Eng 2015, 4:4 (doi: 10.4172/2169-0022.S1.023).",
      impactFactor: "N/A",
      year: 2015,
      journal: "J Material Sci Eng"
    },
    {
      id: 5,
      sno: "5",
      citation: "Dhar P, J Etula and Bankar, S.B. In situ Bioprocessing of Bacterial Cellulose with Graphene: Percolation Network formation, Kinetic Analysis with Physico-Chemical and Structural Properties. ACS Applied Bio Materials. 2019, 2, 9, 4052-4066.",
      impactFactor: "N/A",
      year: 2019,
      journal: "ACS Applied Bio Materials"
    },
    {
      id: 4,
      sno: "4",
      citation: "G Chakraborty, Dhar P, V Katiyar, G Pugazhenthi, Applicability of Fe-CNC/GR/PLA composite as potential sensor for biomolecules. Journal of Mat. Science: Materials in Electronics, 2020, 1-16.",
      impactFactor: "2.779",
      year: 2020,
      journal: "Journal of Materials Science: Materials in Electronics"
    },
    {
      id: 3,
      sno: "3",
      citation: "Dhar P, S Narendren, SS Gaur, S Sharma, A Kumar, V Katiyar, Self-propelled cellulose nanocrystal based catalytic nanomotors for targeted hyperthermia and pollutant remediation applications. International Journal of Biological Macromolecules 2020, 158, 1020-1036.",
      impactFactor: "8.0125",
      year: 2020,
      journal: "International Journal of Biological Macromolecules"
    },
    {
      id: 2,
      sno: "2",
      citation: "S S Gaur, P Dhar, S Narendren, S Sakurai, A Kumar, V Katiyar, Fabrication and characterization of clay nanoscrolls and stable zerovalent iron using montmorillonite. Applied Clay Science 2020, 193.",
      impactFactor: "5.907",
      year: 2020,
      journal: "Applied Clay Science"
    },
    {
      id: 1,
      sno: "1",
      citation: "SS Gaur, P Dhar, KM Wani, M Srivastava, S Sakurai, A Kumar, V Katiyar, Ion transfer channel network formed by flower and rod shape crystals of hair hydrolysate in poly (vinyl alcohol) matrix and its application as anion exchange membrane in fuel cells. Journal of Colloid and Interface Science 2021, 587, 214-228.",
      impactFactor: "9.965",
      year: 2021,
      journal: "Journal of Colloid and Interface Science"
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

  const filteredPublications = publications.filter(publication => {
    return publication.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
           publication.journal.toLowerCase().includes(searchTerm.toLowerCase());
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
              Research & Publications
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
          {activeTab === 'projects' ? (
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
            /* Publications List */
            <div className="space-y-6">
              {filteredPublications.map((publication, index) => (
                <div 
                  key={publication.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          #{publication.sno}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {publication.year}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border animate-pulse ${getImpactFactorColor(publication.impactFactor)}`}>
                          I.F. {publication.impactFactor}
                        </span>
                      </div>
                      
                      <p className="text-gray-800 leading-relaxed mb-3">
                        {publication.citation}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">
                          {publication.journal}
                        </span>
                        {publication.doi && (
                          <a 
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            DOI
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {((activeTab === 'projects' && filteredProjects.length === 0) || 
            (activeTab === 'publications' && filteredPublications.length === 0)) && (
            <div className="text-center py-16 animate-fade-in">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {activeTab} found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
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