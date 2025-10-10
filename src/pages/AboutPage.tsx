import React from 'react';
import { Target, Eye, Award, Users, Lightbulb, Globe, Trophy, Star, Medal } from 'lucide-react';

const AboutPage: React.FC = () => {
  const coreValues = [
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
      title: "Innovation",
      description: "Pushing the boundaries of scientific knowledge through creative research approaches"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Collaboration",
      description: "Foster interdisciplinary partnerships to solve complex global challenges"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description: "Developing environmentally responsible solutions for a better future"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Excellence",
      description: "Maintaining the highest standards in research, education, and scientific integrity"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Lab Establishment",
      description: "Laboratory of Chembiosystems Technologies founded at IIT (BHU)"
    },
    {
      year: "2019",
      title: "First Major Grant",
      description: "Secured significant funding for biomaterials research project"
    },
    {
      year: "2020",
      title: "International Collaboration",
      description: "Established partnerships with leading international research institutions"
    },
    {
      year: "2021",
      title: "Breakthrough Publication",
      description: "Published groundbreaking research in Nature Biotechnology"
    },
    {
      year: "2022",
      title: "Excellence Award",
      description: "Received IIT (BHU) Excellence in Research Award"
    },
    {
      year: "2023",
      title: "Expansion",
      description: "Expanded lab facilities and welcomed new team members"
    }
  ];

  const awards = [
    {
      year: "2025",
      title: "RSC Journal of Materials Chemistry B & ChemComm Emerging Investigators",
      description: "Selected for 2025 RSC Journal of Materials Chemistry B Emerging Investigators and ChemComm Emerging Investigators series.",
      category: "Recognition",
      icon: <Star className="h-6 w-6" />
    },
    {
      year: "2024",
      title: "Har Govind Khorana Innovative Young Biotechnologist Fellowship (IYBF)",
      description: "Selected and awarded with support of research fellowship and research grant by Department of Biotechnology (DBT), Govt. of India.",
      category: "Fellowship",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      year: "2023",
      title: "BRICS Young Scientist and Young Innovator Prize",
      description: "Selected and awarded in the category of Sustainable Development and Circular Economy in the 8th BRICS Young Scientist Forum (YSF) and the 6th Young Innovator Prize (YIP) from 31 July - 04 August 2023, South Africa.",
      category: "International Award",
      icon: <Medal className="h-6 w-6" />
    },
    {
      year: "2023",
      title: "Indo-France Scientific High Level Visiting Fellowships (SSHN)",
      description: "Selected for the Short Research Trip to France (SRTF) 2023 to carry out research and collaboration activities at Grenoble Institute of Technology, France.",
      category: "Fellowship",
      icon: <Award className="h-6 w-6" />
    },
    {
      year: "2022",
      title: "National Bamboo Innovation Challenge - Top Five Winner",
      description: "Awarded as top five winners under the 'Prototype development stage' category in National Bamboo Innovation Challenge 2022.",
      category: "National Award",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      year: "2021-26",
      title: "Ramalingaswami Fellowship",
      description: "Awarded Ramalingaswami Fellowship by Department of Biotechnology (DBT), Govt. of India with the support of research grant.",
      category: "Fellowship",
      icon: <Award className="h-6 w-6" />
    },
    {
      year: "2020",
      title: "Marie Sklodowska-Curie Actions Seal of Excellence Award",
      description: "Prestigious recognition by European Commission for research excellence.",
      category: "International Award",
      icon: <Star className="h-6 w-6" />
    },
    {
      year: "2019",
      title: "ACS Graduate Award for Best PhD Thesis",
      description: "Award for the best PhD thesis on research work carried out on Cellulose Nanocrystals by Division of Cellulose and Renewable Materials, American Chemical Society (ACS), USA.",
      category: "Academic Award",
      icon: <Trophy className="h-6 w-6" />,
      link: "https://acscell.org/awards/graduate-student-awards/"
    },
    {
      year: "2019",
      title: "ACS Travel Grant",
      description: "For the presentation of the Doctoral research work at 252nd ACS National Meeting, (Spring 2019) at Orlando, Florida, USA, from March 31 - April 4, 2019.",
      category: "Travel Grant",
      icon: <Award className="h-6 w-6" />
    },
    {
      year: "2018",
      title: "JSPS Postdoctoral Fellowship",
      description: "Fellowship to carry out research work at Kyoto University on the project 'End Functionalization of CNCs for biomedical applications' (Research fellowship and a research grant of 24 million Yen).",
      category: "Fellowship",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      year: "2018",
      title: "6th National Awards for Technology Innovation",
      description: "Winner for '6th National Awards for Technology Innovation in Petrochemical and Plastic Processing Industry' by Department of Chemicals & Petrochemicals, Govt. of India for the research on 'Value Added Cellulose Nanocrystals Production from Waste Resources and Its High-End Applications'.",
      category: "National Award",
      icon: <Medal className="h-6 w-6" />
    },
    {
      year: "2016",
      title: "DST Travel Grant Fellowship (Young Scientist)",
      description: "Awarded to attend the 252nd ACS National Meeting and Exposition, 21-25th August 2016, Philadelphia, U.S.A.",
      category: "Travel Grant",
      icon: <Award className="h-6 w-6" />
    },
    {
      year: "2015",
      title: "Best Paper Award - ICBEE 2015",
      description: "Best Paper Award for the presentation at 7th International Conference on Chemical, Biological and Environmental Engineering (ICBEE 2015), Milan, Italy, 14-15 Sep 2015.",
      category: "Academic Award",
      icon: <Star className="h-6 w-6" />
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Fellowship': 'bg-blue-100 text-blue-800 border-blue-200',
      'International Award': 'bg-amber-100 text-amber-800 border-amber-200',
      'National Award': 'bg-green-100 text-green-800 border-green-200',
      'Academic Award': 'bg-purple-100 text-purple-800 border-purple-200',
      'Recognition': 'bg-red-100 text-red-800 border-red-200',
      'Travel Grant': 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
       {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in the growth and development of our laboratory
            </p>
          </div>
          
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Our Laboratory
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The Laboratory of Chembiosystems Technologies at IIT (BHU) is dedicated to advancing the frontiers 
              of science through innovative research at the intersection of chemistry and biology.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a globally recognized center of excellence in chembiosystems TEchnologies, pioneering 
                sustainable solutions that address critical challenges in health, environment, and technology 
                through innovative integration of chemical and biological sciences.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Target className="h-10 w-10 text-green-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To conduct cutting-edge research in molecular systems engineering, biomaterials, and 
                sustainable chemistry while training the next generation of scientists and engineers 
                to tackle complex interdisciplinary challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Themes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Research Themes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our research spans multiple interconnected areas of scientific inquiry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Molecular Systems Engineering
              </h3>
              <p className="text-gray-700 mb-4">
                Design and optimization of molecular systems for targeted applications in drug delivery, 
                catalysis, and sensing. We focus on understanding molecular interactions and engineering 
                systems with precise control over function and behavior.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Protein engineering and design</li>
                <li>Molecular recognition systems</li>
                <li>Bioconjugation strategies</li>
                <li>Computational molecular design</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Biomaterials & Biointerfaces
              </h3>
              <p className="text-gray-700 mb-4">
                Development of advanced biomaterials and study of biointerface phenomena for medical 
                and biotechnological applications. Our work bridges materials science with biological systems.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Biocompatible material design</li>
                <li>Surface modification techniques</li>
                <li>Cell-material interactions</li>
                <li>Tissue engineering scaffolds</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Sustainable Chemistry
              </h3>
              <p className="text-gray-700 mb-4">
                Green chemistry approaches for environmental sustainability, focusing on renewable resources, 
                waste reduction, and energy-efficient processes. We develop eco-friendly alternatives to 
                conventional chemical processes.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Biocatalysis and enzyme engineering</li>
                <li>Green synthesis methods</li>
                <li>Waste valorization</li>
                <li>Renewable feedstock utilization</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Bioinspired Systems
              </h3>
              <p className="text-gray-700 mb-4">
                Learning from nature to create innovative technological solutions. We study biological 
                systems to understand their mechanisms and translate these insights into practical applications.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Biomimetic material design</li>
                <li>Bio-inspired catalysis</li>
                <li>Self-assembly systems</li>
                <li>Adaptive and responsive materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our research and shape our laboratory culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards and Honours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Awards & Honours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition of excellence in research, innovation, and scientific contributions
            </p>
          </div>

          <div className="space-y-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${getCategoryColor(award.category).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                        {award.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-gray-900">{award.year}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(award.category)}`}>
                          {award.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {award.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {award.description}
                    </p>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
                      >
                        Learn More
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {awards.filter(a => a.category === 'Fellowship').length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Fellowships</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {awards.filter(a => a.category === 'International Award').length}
              </div>
              <div className="text-sm text-gray-600 font-medium">International Awards</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {awards.filter(a => a.category === 'National Award').length}
              </div>
              <div className="text-sm text-gray-600 font-medium">National Awards</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {awards.filter(a => a.category === 'Academic Award').length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Academic Awards</div>
            </div>
          </div>
        </div>
      </section>

     

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full z-10">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
