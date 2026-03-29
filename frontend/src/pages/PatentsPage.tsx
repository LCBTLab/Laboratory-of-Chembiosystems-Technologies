import React, { useState } from 'react';
import { FileText, Calendar, Users, Award, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface Patent {
  id: number;
  title: string;
  inventors: string[];
  applicationNumber: string;
  patentNumber?: string;
  status: 'Filed' | 'Granted';
  date: string;
  description: string;
  technology?: string;
  graphicalAbstract?: string;
}

const PatentsPage: React.FC = () => {
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);

  const patents: Patent[] = [
    {
      id: 1,
      title: "Method and composition for ionic liquid based regeneration of cellulose fibers from agro-waste",
      inventors: ["Dhar P", "SK Sharma"],
      applicationNumber: "202511068810",
      status: "Filed",
      date: "2025",
      description: "A novel method utilizing ionic liquids for the sustainable regeneration of cellulose fibers from agricultural waste materials. This innovative approach provides an environmentally friendly alternative to traditional cellulose extraction methods.",
      graphicalAbstract: "https://images.pexels.com/photos/3993913/pexels-photo-3993913.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "A method of fabricating a 3D-printed nanofertilizer and a product thereof",
      inventors: ["Dhar P", "Rai R"],
      applicationNumber: "202511060750",
      status: "Filed",
      date: "2025",
      description: "An innovative 3D printing technique for creating nanofertilizers with controlled release properties. This technology enables precision agriculture by delivering nutrients more efficiently to crops.",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/Patent%20drwaing_page-0001.jpg"
    },
    {
      id: 3,
      title: "A process for preparation of a rice-based absorbent pad and products thereof",
      inventors: ["Dhar P", "S B Bhatt", "Ranjan R"],
      applicationNumber: "202511003465",
      status: "Filed",
      date: "2025",
      description: "A sustainable process for creating absorbent pads from rice biomass. This eco-friendly alternative to synthetic absorbents has applications in medical, hygiene, and industrial sectors.",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/patent%20Pad_page-0001.jpg"
    },
    {
      id: 4,
      title: "A process for fabrication a biodegradable packaging material from wheat biomass",
      inventors: ["Dhar P", "Ranjan R"],
      applicationNumber: "202511001586",
      status: "Filed",
      date: "2025",
      description: "A method for transforming wheat biomass into biodegradable packaging materials. This innovation addresses the growing demand for sustainable packaging solutions in the food and consumer goods industries.",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/Patent%20Weat%20Biomass_page-0001.jpg"
    },
    {
      id: 5,
      title: "A process for fabricating a biodegradable packaging material using jute",
      inventors: ["Dhar P", "S B Bhatt", "Ranjan R"],
      applicationNumber: "202411046355",
      status: "Filed",
      date: "2024",
      description: "An environmentally friendly process utilizing jute fibers to create biodegradable packaging materials. This technology offers a sustainable alternative to plastic packaging while supporting traditional fiber industries.",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/Patent%20pakedging%20material_page-0001.jpg"
    },
    {
      id: 6,
      title: "A method of preparation of a biodegradable packaging material from sugarcane bagasse",
      inventors: ["Dhar P", "Ranjan R", "Rai R"],
      applicationNumber: "202411001028",
      status: "Filed",
      date: "2024",
      description: "A process for converting sugarcane bagasse, a by-product of sugar production, into biodegradable packaging materials. This innovation provides value addition to agricultural waste.",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/Patent%20Sugarcane_page-0001.jpg"
    },
    {
      id: 7,
      title: "A method of preparation of biodegradable packaging material from rice straws",
      inventors: ["Dhar P", "Ranjan R", "Rai R"],
      applicationNumber: "202311061691",
      status: "Filed",
      date: "2023",
      description: "A sustainable method for transforming rice straw into biodegradable packaging materials. This technology helps address the agricultural stubble burning problem while creating value-added products.",
      technology: "Technology Transferred",
      graphicalAbstract: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/Parent%20Rice%20straw_page-0001.jpg"
    },
    {
      id: 8,
      title: "Biodegradable bamboo-based drinking straws and a method of preparation thereof",
      inventors: ["Dhar P", "Rai R", "Ranjan R"],
      applicationNumber: "557472",
      patentNumber: "557472",
      status: "Granted",
      date: "Granted",
      description: "A granted patent for manufacturing biodegradable drinking straws from bamboo. This eco-friendly alternative to plastic straws has been successfully commercialized through technology transfer.",
      technology: "Technology Transferred",
      graphicalAbstract: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 9,
      title: "One Step Reactive Processing of Cellulose based Polymeric Nanocomposites Sheets",
      inventors: ["Dhar P", "Kumar A", "Katiyar V"],
      applicationNumber: "201631022079",
      status: "Filed",
      date: "2016",
      description: "A one-step reactive processing technique for producing cellulose-based polymeric nanocomposite sheets. This method simplifies the manufacturing process and enhances material properties.",
      graphicalAbstract: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 10,
      title: "Preparation method of high-strength transparent wood-based material by inorganic compounding",
      inventors: ["Dhar P", "H Kamitakahara"],
      applicationNumber: "PCT/JP2022/031738",
      status: "Filed",
      date: "2022",
      description: "A Japanese patent application for a novel method to create high-strength transparent wood materials through inorganic compounding. This innovation opens new possibilities for sustainable building materials and optical applications.",
      graphicalAbstract: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const grantedPatents = patents.filter(p => p.status === 'Granted').length;
  const filedPatents = patents.filter(p => p.status === 'Filed').length;
  const technologyTransferred = patents.filter(p => p.technology === 'Technology Transferred').length;

  const getStatusColor = (status: string) => {
    return status === 'Granted'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Granted'
      ? <CheckCircle className="h-4 w-4" />
      : <Clock className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Patents & Intellectual Property
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our laboratory's commitment to innovation is reflected in our extensive patent portfolio.
              We transform cutting-edge research into practical solutions that address real-world challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{patents.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Patents</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{grantedPatents}</div>
                <div className="text-sm text-gray-600 font-medium">Granted Patents</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{technologyTransferred}</div>
                <div className="text-sm text-gray-600 font-medium">Technology Transferred</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patents List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Patent Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our innovative technologies protecting sustainable solutions for industry and society
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {patents.map((patent) => (
              <div
                key={patent.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedPatent(patent)}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {patent.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{patent.inventors.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 ml-9">
                        {patent.description}
                      </p>

                      <div className="flex flex-wrap gap-3 ml-9 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="h-4 w-4 mr-1" />
                          <span className="font-medium">Application No.:</span>
                          <span className="ml-1">{patent.applicationNumber}</span>
                        </div>
                        {patent.patentNumber && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="h-4 w-4 mr-1" />
                            <span className="font-medium">Patent No.:</span>
                            <span className="ml-1">{patent.patentNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-9">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border w-fit ${getStatusColor(patent.status)}`}>
                          {getStatusIcon(patent.status)}
                          {patent.status}
                        </span>
                        {patent.technology && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200 w-fit">
                            <ExternalLink className="h-4 w-4" />
                            {patent.technology}
                          </span>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{patent.date}</span>
                        </div>
                      </div>
                    </div>

                    {patent.graphicalAbstract && (
                      <div className="lg:w-64 flex-shrink-0">
                        <img
                          src={patent.graphicalAbstract}
                          alt="Graphical Abstract"
                          className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our patents focus on sustainable technologies that address critical environmental challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Packaging</h3>
              <p className="text-gray-600">
                Multiple patents on biodegradable packaging materials from agricultural waste including rice straw,
                wheat biomass, sugarcane bagasse, and jute fibers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Biomaterial Innovation</h3>
              <p className="text-gray-600">
                Advanced technologies for transparent wood materials and cellulose-based nanocomposites
                with enhanced properties for various applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
              <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology Transfer</h3>
              <p className="text-gray-600">
                Successfully commercialized technologies including bamboo-based drinking straws and
                rice straw packaging materials through industry partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patent Detail Modal */}
      {selectedPatent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedPatent.status)}`}>
                      {getStatusIcon(selectedPatent.status)}
                      {selectedPatent.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPatent(null)}
                    className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedPatent.title}
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Users className="h-4 w-4 mr-2" />
                      Inventors
                    </div>
                    <div className="text-gray-600 ml-6">
                      {selectedPatent.inventors.join(', ')}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 mr-2" />
                      Application Number
                    </div>
                    <div className="text-gray-600 ml-6">
                      {selectedPatent.applicationNumber}
                    </div>
                  </div>

                  {selectedPatent.patentNumber && (
                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Award className="h-4 w-4 mr-2" />
                        Patent Number
                      </div>
                      <div className="text-gray-600 ml-6">
                        {selectedPatent.patentNumber}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date
                    </div>
                    <div className="text-gray-600 ml-6">
                      {selectedPatent.date}
                    </div>
                  </div>

                  {selectedPatent.technology && (
                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Status
                      </div>
                      <div className="ml-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                          {selectedPatent.technology}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPatent.description}
                  </p>
                </div>

                {selectedPatent.graphicalAbstract && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Graphical Abstract</h3>
                    <img
                      src={selectedPatent.graphicalAbstract}
                      alt="Graphical Abstract"
                      className="w-full max-h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatentsPage;
