
import React, { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  BookOpen,
  ArrowUpRight,
  FlaskConical,
  X
} from 'lucide-react';

interface Project {
  sno: number;
  title: string;
  agency: string;
  year: string;
  pi: string;
  duration: string;
}

const projects: Project[] = [
  {
    sno: 23,
    title: 'Development of all natural silk protein-anthocyanin based restorative hair dye formulation',
    agency: 'CGMFP',
    year: '2023-24',
    pi: 'Dr. Sumit Kumar Singh',
    duration: '01 yr'
  },
  {
    sno: 24,
    title: 'High solids anerobic digesion for effective garbage disposal with forward linkage to power generation',
    agency: 'MoE',
    year: '2023-24',
    pi: 'Dr. Abhishek Suresh Dhoble',
    duration: '03 year'
  },
  {
    sno: 25,
    title: 'Transcriptome analysis of Cancer cell line treated with Gedunin and 2INC000O45971961 as novel Brutons tyrosine kinase (BTK) inhibitor',
    agency: 'DRDO',
    year: '2023-24',
    pi: 'Dr. (Mrs.) Abha Mishra',
    duration: '03 years'
  },
  {
    sno: 26,
    title: "Understanding the molecular mechanism of anti-thyroid drug (propylthiouracil)-induced redox imbalance and epigenetic alteration",
    agency: 'CST-Odisha',
    year: '2023-24',
    pi: 'Dr. Aditya Kumar Padhi',
    duration: '03 years'
  },
  {
    sno: 27,
    title: 'Scale-up studies of isoprene production from genetically engineered cyanobacteria for biofuel application',
    agency: 'CST-UP',
    year: '2023-24',
    pi: 'Dr. Sanjay Kumar',
    duration: '02 years'
  },
  {
    sno: 28,
    title: 'Reverse Engineering and high-throughput redesigning of double-y B-barrel core folded proteins: Comprehending their functional diversity for augmenting therapeutics',
    agency: 'SERB',
    year: '2023-24',
    pi: 'Dr. Aditya Kumar Padhi',
    duration: '02 years'
  },
  {
    sno: 19,
    title: 'A Novel, Rapid, High-Throughput Characterization of Microbiome Dynamics through Cytomics and Machine Learning',
    agency: 'SERB',
    year: '2022-23',
    pi: 'Dr. Abhishek Suresh Dhoble',
    duration: '02 years'
  },
  {
    sno: 20,
    title: 'Complete utilization of banana from farm till its disposal: A step towards the agricultural circular economy for the growth of agriculture and farmers in UP',
    agency: 'CST-UP',
    year: '2022-23',
    pi: 'Dr. Vishal Mishra',
    duration: '03 years'
  },
  {
    sno: 21,
    title: 'Metabolic engineering of rapid growing cyanobacteria for farnesene production and its scaleup studies',
    agency: 'SERB',
    year: '2022-23',
    pi: 'Dr. Sanjay Kumar',
    duration: '03 yrs'
  },
  {
    sno: 22,
    title: 'Development of paper-based analytical devices for molecular sensing',
    agency: 'I-DAPT, IIT(BHU)',
    year: '2022-23',
    pi: 'Dr. Pranjal Chandra',
    duration: '06 months'
  },
  {
    sno: 14,
    title: "Characterization of indigenous cow's dung and urine for scientific advancement and development of utility items",
    agency: 'DST',
    year: '2021-22',
    pi: 'Dr. Abhishek Suresh Dhoble',
    duration: '3 years'
  },
  {
    sno: 15,
    title: 'Integrated computational and experimental studies to potential therapy of kala-azar targeting Dephosphocoenzyme A Kinase (LdDPCK) of the pathogen as a target',
    agency: 'I-DAPT, IIT(BHU)',
    year: '2021-22',
    pi: 'Dr. Vikash Kumar Dubey',
    duration: '2 Years'
  },
  {
    sno: 16,
    title: 'Bioengineering of living materials to fabricate functionalized bacterial nanocellulose for high performance applications',
    agency: 'DBT',
    year: '2021-22',
    pi: 'Dr. Prodyut Dhar',
    duration: '5 Years'
  },
  {
    sno: 17,
    title: 'Human IL-2 fused leishmanial trypanothione synthesis (TS) as protein vaccine candidates',
    agency: 'ICMR',
    year: '2021-22',
    pi: 'Dr. Vikash Kumar Dubey',
    duration: '3 years'
  },
  {
    sno: 18,
    title: 'Design and Validation of field deployable miniaturized Nano-Bio-Sensing System for Detection of the Parasitic liver fluke fasciola gigantica',
    agency: 'ICMR',
    year: '2021-22',
    pi: 'Dr. Pranjal Chandra',
    duration: '3 years'
  },
  {
    sno: 11,
    title: 'Re-purposing of approved drugs from Drug Bank database for possible treatment for COVID-19 by targeting SARS-CoV-2 main protease',
    agency: 'SERB',
    year: '2020-21',
    pi: 'Dr. Vikash Kumar Dubey',
    duration: '1.5 years'
  },
  {
    sno: 12,
    title: 'Development of bi-functional electrochemical nanobiosensors for bacterial exotoxin detection: Implication towards screening of toxin producing bacterial isolates',
    agency: 'SERB',
    year: '2020-21',
    pi: 'Dr. Pranjal Chandra',
    duration: '5 Years'
  },
  {
    sno: 13,
    title: 'Validation of Glutathione synthetase from Leishmania donovani as new drug target or discovery of new drug candidate',
    agency: 'ICMR',
    year: '2020-21',
    pi: 'Dr. Vikash Kumar Dubey',
    duration: '3.5 years'
  },
  {
    sno: 9,
    title: 'Strategies towards generation of functional tissue engineered construct for orthopedic application',
    agency: 'MHRD',
    year: '2019-20',
    pi: 'Dr. Pradeep Srivastava',
    duration: '02 Yrs'
  },
  {
    sno: 10,
    title: 'How Beclin 1 mediates cross-talk between apoptosis and autophagy via its C-Terminal Fragment?',
    agency: 'CSIR',
    year: '2019-20',
    pi: 'Dr. Vikash Kumar Dubey',
    duration: '3.5 years'
  },
  {
    sno: 6,
    title: 'Flow and segregation of granular materials out of hoppers and two and three dimensional devices',
    agency: 'CST-UP',
    year: '2018-19',
    pi: 'Dr. Vishal Mishra',
    duration: '3 Years'
  },
  {
    sno: 8,
    title: 'Targeted drug delivery of methotrexate/gallic acid-folate conjugated Poly L-Lysine nanoparticles',
    agency: 'DBT',
    year: '2018-19',
    pi: 'Dr. (Mrs.) Abha Mishra',
    duration: '3 years'
  },
  {
    sno: 3,
    title: 'Enhancement of Lipid Content in Microalgae Scenedesmus Obliquus Using Genetic Engineering Tool: a step towards biodiesel',
    agency: 'CST-UP',
    year: '2017-18',
    pi: 'Dr. Ashish Kumar Singh',
    duration: '3 Years'
  },
  {
    sno: 4,
    title: 'Screening of Novel Psychrophilic alkaline Protease from the metagenome of Antarctic soil',
    agency: 'SERB',
    year: '2017-18',
    pi: 'Dr. Ashish Kumar Singh',
    duration: '3 Years'
  },
  {
    sno: 5,
    title: 'Identification of Gene Responsible for Degradation of Poly (ethylene terephthalate) in Ideonella sakaiensis',
    agency: 'DBT',
    year: '2017-18',
    pi: 'Dr. Ashish Kumar Singh',
    duration: '3 yrs'
  },
  {
    sno: 7,
    title: 'Screening of novel antibiotics from the metagenome of Himalayan glacial soil',
    agency: 'DRDO',
    year: '2017-18',
    pi: 'Dr. Ashish Kumar Singh',
    duration: '3 Years'
  },
  {
    sno: 2,
    title: 'Construction of Cold Inducible Expression System',
    agency: 'DBT',
    year: '2016-17',
    pi: 'Dr. Ashish Kumar Singh',
    duration: '3 Years'
  },
  {
    sno: 1,
    title: 'Development and evaluation of an innovative poly herbal Bi layer wound dressing material',
    agency: 'DRDO',
    year: '2014-15',
    pi: 'Dr. Pradeep Srivastava',
    duration: '3 Years'
  }
];

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const years = useMemo(
    () => [...new Set(projects.map(p => p.year))],
    []
  );

  const filteredProjects = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.agency.toLowerCase().includes(query) ||
        project.pi.toLowerCase().includes(query) ||
        project.year.includes(query);

      const matchesYear =
        selectedYear === 'all' || project.year === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  const agencies = new Set(projects.map(p => p.agency)).size;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300/20 bg-white/10 text-blue-200 text-sm mb-7">
              <FlaskConical size={16} />
              School of Biochemical Engineering
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Sponsored Research
              <span className="block text-blue-300">Projects</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Explore research initiatives, scientific collaborations
              and sponsored projects at the School of Biochemical
              Engineering, IIT (BHU), Varanasi.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold transition"
              >
                Explore Projects
                <ArrowUpRight size={18} />
              </a>

              <a
                href="https://www.iitbhu.ac.in/dept/bce/projects"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 hover:bg-white/10 px-6 py-3 font-semibold transition"
              >
                Official IIT(BHU) Page
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: projects.length, label: 'Sponsored Projects', icon: BookOpen },
            { value: years.length, label: 'Financial Years', icon: Calendar },
            { value: agencies, label: 'Funding Agencies', icon: Building2 }
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-900">{value}</div>
                  <div className="text-sm text-slate-500 mt-1">{label}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={23} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT LIST */}
      <section id="projects" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Research and Development
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Sponsored Projects
            </h2>
            <p className="text-slate-500 mt-3">
              Browse the sponsored project records by title, funding
              agency, principal investigator or financial year.
            </p>
          </div>

          {/* SEARCH AND FILTER */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search project, PI or funding agency..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="relative md:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Financial Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm text-slate-500">
              <span>
                Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of {projects.length} projects
              </span>
              {(searchTerm || selectedYear !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedYear('all');
                  }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* RESPONSIVE TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider w-20">S.No.</th>
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">Project Title</th>
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">Funding Agency</th>
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">F.Y.</th>
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">Principal Investigator</th>
                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map(project => (
                    <tr key={project.sno} className="hover:bg-blue-50/60 transition-colors">
                      <td className="px-5 py-5 text-sm font-semibold text-slate-500">
                        {project.sno}
                      </td>

                      <td className="px-5 py-5 max-w-md">
                        <div className="text-sm font-semibold text-slate-800 leading-relaxed whitespace-normal">
                          {project.title}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                          {project.agency}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm font-medium text-slate-600 whitespace-nowrap">
                        {project.year}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap">
                          <User size={15} className="text-slate-400 shrink-0" />
                          {project.pi}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600 whitespace-nowrap">
                        {project.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <Search size={35} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800">
                  No projects found
                </h3>
                <p className="text-slate-500 mt-2">
                  Try another search term or financial year.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedYear('all');
                  }}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-5">
            Source: Official IIT (BHU) School of Biochemical Engineering
            project listing. Project details are reproduced from the
            published institutional records.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gradient-to-r from-blue-950 to-indigo-950 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FlaskConical className="mx-auto text-blue-300 mb-5" size={38} />

          <h2 className="text-3xl md:text-4xl font-bold">
            Advancing Research Through Innovation
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto mt-4 leading-relaxed">
            Explore our research activities and discover opportunities
            for scientific collaboration and interdisciplinary research.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-white text-blue-950 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Collaborate With Us
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

    </main>
  );
};

export default ResearchPage;
