
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
  X,
  Factory
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  agency: string;
  role: string;
  year: string;
  status: string;
}

const sponsoredProjects: Project[] = [
  {
    id: 1,
    title: 'Bioengineering of Living Materials to fabricate Functionalized Bacterial Nanocellulose for High-Performance Applications',
    agency: 'Department of Biotechnology (DBT), Govt. of India',
    role: 'P.I.',
    year: '2021-26',
    status: 'Ongoing'
  },
  {
    id: 2,
    title: 'Education Guidelines - Enabling of Academic Institutes in Technical Textiles',
    agency: 'Ministry of Textiles, Govt. of India',
    role: 'P.I.',
    year: '2025-28',
    status: 'Approved'
  },
  {
    id: 3,
    title: 'Biopolymer based degradable and wireless implantable biosensors for monitoring of post-surgical clotting disorders and peripheral nerve injuries',
    agency: 'Department of Biotechnology (DBT), Govt. of India',
    role: 'P.I.',
    year: '2024-27',
    status: 'Approved'
  },
  {
    id: 4,
    title: 'Sustainable and Green Campus initiative: Integrated circular economy based approach for valorization of campus leaf waste and agrobiomass into valueadded products: A pilot plant study with economic sustainability and industrial relevance',
    agency: 'IIT (BHU)',
    role: 'P.I.',
    year: '2025-27',
    status: 'Approved'
  },
  {
    id: 5,
    title: 'Te-MobiX: Safe and Degradation-controlled Batteries with Efficient Charging for Tropical e-Mobility Excellence',
    agency: 'Anusandhan National Research Foundation (ANRF)',
    role: 'Co-P.I.',
    year: '2025-28',
    status: 'Ongoing'
  },
  {
    id: 6,
    title: 'Agro-Pads: An integrated strategy to convert agro-waste to affordable sanitary and medicinal pads for health and socio-economic upliftment of rural girls & women',
    agency: 'Department of Biotechnology (DBT), Govt. of India',
    role: 'P.I.',
    year: '2025-27',
    status: 'Approved'
  },
  {
    id: 7,
    title: 'Safety and efficacy studies of value-added forest produce',
    agency: 'CGMFP, Govt. of Chhattisgarh',
    role: 'P.I.',
    year: '2024-25',
    status: 'Approved'
  },
  {
    id: 8,
    title: 'Lignocellulose based scalable luminous photonic biopolymers for sustainable films and coatings',
    agency: 'Department of Biotechnology (DBT), Govt. of India',
    role: 'P.I.',
    year: '2024-27',
    status: 'Ongoing'
  },
  {
    id: 9,
    title: 'End functionalized cellulose nanocrystals using integrated microfluidics for production of high-performance optically active coatings and fibers',
    agency: 'Department of Science & Technology (DST), Govt. of India (Indo-Japan project)',
    role: 'P.I.',
    year: '2024-26',
    status: 'Approved'
  },
  {
    id: 10,
    title: 'Development of electrostatically charged Martian soil simulants through strategic surface engineering',
    agency: 'Indian Space Research Organization (ISRO)',
    role: 'P.I.',
    year: '2026-28',
    status: 'Approved'
  },
  {
    id: 11,
    title: 'Scale-up studies of isoprene production from genetically engineered cyanobacteria for biofuel application',
    agency: 'CST, Govt. of Uttar Pradesh',
    role: 'Co-P.I.',
    year: '2024-26',
    status: 'Ongoing'
  },
  {
    id: 12,
    title: 'Novel Bioprocessing routes for development of value-added products',
    agency: 'IIT (BHU)',
    role: 'P.I.',
    year: '2020-21',
    status: 'Complete'
  }
];

const industrialProjects: Project[] = [
  {
    id: 1,
    title: 'Manufacturing process for functionalized cellulose phosphate fibre from cellulose fibre or pulp & explore its application in value-added products',
    agency: 'Aditya Birla',
    role: 'P.I.',
    year: '2024-27',
    status: 'Ongoing'
  },
  {
    id: 2,
    title: 'Functionalized cellulose fiber production from Coconut waste and explore its applications into textiles',
    agency: 'SSS Mills Pvt Ltd',
    role: 'P.I.',
    year: '2025-27',
    status: 'Ongoing'
  },
  {
    id: 3,
    title: 'Industrial compost development for biodegradation of coconut coir based products.',
    agency: 'AACC Pvt Ltd',
    role: 'P.I.',
    year: '2026-29',
    status: 'Ongoing'
  },
  {
    id: 4,
    title: "Strengthening Women's in Menstrual Hygiene in campus through Sustainable Sanitary Infrastructure",
    agency: 'URB Engineering Pvt Ltd',
    role: 'P.I.',
    year: '2026-28',
    status: 'Ongoing'
  }
];

type Tab = 'sponsored' | 'industrial';

const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sponsored');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const currentProjects =
    activeTab === 'sponsored'
      ? sponsoredProjects
      : industrialProjects;

  const years = useMemo(
    () => [...new Set(currentProjects.map(p => p.year))].sort(),
    [currentProjects]
  );

  const filteredProjects = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return currentProjects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.agency.toLowerCase().includes(query) ||
        project.role.toLowerCase().includes(query) ||
        project.year.toLowerCase().includes(query);

      const matchesYear =
        selectedYear === 'all' || project.year === selectedYear;

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [currentProjects, searchTerm, selectedYear, selectedStatus]);

  const ongoingCount = [
    ...sponsoredProjects,
    ...industrialProjects
  ].filter(p => p.status === 'Ongoing').length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Approved':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Complete':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedYear('all');
    setSelectedStatus('all');
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">

        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm text-blue-200 mb-7">
            <FlaskConical size={17} />
            Laboratory of Chembiosystems & Technologies
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Research & Industrial
            <span className="block text-blue-300">Projects</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed">
            Driving scientific innovation through sponsored research,
            industrial collaborations, sustainable materials,
            biopolymers and agricultural waste valorization.
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
              href="https://www.iitbhu.ac.in/dept/bce/people/prodyutbce"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 hover:bg-white/10 px-6 py-3 font-semibold transition"
            >
              Official Faculty Profile
              <ArrowUpRight size={18} />
            </a>

          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {[
            {
              value: sponsoredProjects.length,
              label: 'Sponsored Projects',
              icon: BookOpen
            },
            {
              value: industrialProjects.length,
              label: 'Industrial Projects',
              icon: Factory
            },
            {
              value: ongoingCount,
              label: 'Ongoing Projects',
              icon: FlaskConical
            }
          ].map(({ value, label, icon: Icon }) => (

            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-center justify-between">

                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {label}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={23} />
                </div>

              </div>
            </div>

          ))}

        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 lg:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-9">

            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Our Research Portfolio
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Research Projects
            </h2>

            <p className="text-slate-500 mt-3">
              Explore sponsored research initiatives and industry partnerships.
            </p>

          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-3 mb-7">

            <button
              onClick={() => {
                setActiveTab('sponsored');
                resetFilters();
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === 'sponsored'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50'
              }`}
            >
              <BookOpen size={18} />
              Sponsored Projects
              <span className="text-xs rounded-full px-2 py-1 bg-white/20">
                {sponsoredProjects.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('industrial');
                resetFilters();
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === 'industrial'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50'
              }`}
            >
              <Factory size={18} />
              Industrial Projects
              <span className="text-xs rounded-full px-2 py-1 bg-white/20">
                {industrialProjects.length}
              </span>
            </button>

          </div>

          {/* FILTERS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">

            <div className="flex flex-col lg:flex-row gap-4">

              <div className="relative flex-1">

                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={19}
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search projects, agencies or role..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="relative lg:w-56">

                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

              </div>

              <div className="relative lg:w-48">

                <Filter
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Approved">Approved</option>
                  <option value="Complete">Complete</option>
                </select>

              </div>

            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-slate-500">

              <span>
                Showing <strong className="text-slate-900">
                  {filteredProjects.length}
                </strong> of {currentProjects.length} projects
              </span>

              {(searchTerm || selectedYear !== 'all' || selectedStatus !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Reset filters
                </button>
              )}

            </div>

          </div>

          {/* PROJECT TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px] border-collapse">

                <thead>
                  <tr className={`text-white ${
                    activeTab === 'sponsored'
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-700'
                      : 'bg-gradient-to-r from-indigo-700 to-purple-700'
                  }`}>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider w-20">
                      S.No.
                    </th>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">
                      Project Title
                    </th>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">
                      {activeTab === 'sponsored' ? 'Awarding Agency' : 'Industry'}
                    </th>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">
                      Role
                    </th>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">
                      Year
                    </th>

                    <th className="px-5 py-5 text-left text-xs uppercase tracking-wider">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredProjects.map(project => (

                    <tr
                      key={`${activeTab}-${project.id}`}
                      className="hover:bg-blue-50/60 transition-colors"
                    >

                      <td className="px-5 py-5 text-sm font-semibold text-slate-500">
                        {project.id}
                      </td>

                      <td className="px-5 py-5 max-w-lg">

                        <div className="text-sm font-semibold text-slate-800 leading-relaxed whitespace-normal">
                          {project.title}
                        </div>

                      </td>

                      <td className="px-5 py-5 max-w-xs">

                        <div className="flex items-start gap-2 text-sm text-slate-700">
                          <Building2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                          <span className="whitespace-normal">
                            {project.agency}
                          </span>
                        </div>

                      </td>

                      <td className="px-5 py-5">

                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 whitespace-nowrap">
                          <User size={14} />
                          {project.role}
                        </span>

                      </td>

                      <td className="px-5 py-5 text-sm font-medium text-slate-600 whitespace-nowrap">
                        {project.year}
                      </td>

                      <td className="px-5 py-5 whitespace-nowrap">

                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(project.status)}`}>
                          {project.status}
                        </span>

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
                  Try another search term or filter.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Reset filters
                </button>

              </div>

            )}

          </div>

          <p className="text-xs text-slate-500 mt-5">
            Project information sourced from the official IIT (BHU)
            faculty profile of Dr. Prodyut Dhar.
          </p>

        </div>

      </section>

      {/* COLLABORATION SECTION */}
      <section className="bg-gradient-to-r from-blue-950 to-indigo-950 py-16 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <FlaskConical className="mx-auto text-blue-300 mb-5" size={38} />

          <h2 className="text-3xl md:text-4xl font-bold">
            Collaborate With Our Research Team
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto mt-4 leading-relaxed">
            We welcome academic partnerships, industrial collaborations
            and research opportunities focused on sustainable materials,
            biopolymers and innovative engineering solutions.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-white text-blue-950 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Start a Collaboration
            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>

    </main>
  );
};

export default ResearchPage;
