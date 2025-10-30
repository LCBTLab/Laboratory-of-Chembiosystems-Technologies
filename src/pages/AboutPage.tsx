import React from 'react';
import { Target, Eye, Award, Users, Lightbulb, Globe } from 'lucide-react';

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
      year: "2020",
      title: "Lab Establishment",
      description: "Laboratory of Chembiosystems Technologies founded at IIT (BHU)"
    },
    {
      year: "2022",
      title: "First Major Publication",
      description: "Aspect Of Nano-cellulose: A Review"
    },
    {
      year: "2023",
      tittle: "Award",
      description: "Winner under the "Prototype Development Stage" Category in national bamboo inovation challenge"
    },
    {
      year: "2023",
      title: "International Collaboration",
      description: "IndoFrance Scientific High Level Visiting Fellowship (SSHN)"
    },
    {
      year: "2023",
      title: "1st Granted Patent",
      description: "Biodegradable Bamboo based drinking straws & method of prepration there of. (Indian Patent, patent No.- 557472)"
    },
    {
      year: "2024",
      title: "Excellence Award",
      description: "Received prestigious research excellence awards"
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Expanded lab facilities and welcomed new team members"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
                To be a globally recognized center of excellence in chembiosystems technologies, pioneering 
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
    </div>
  );
};

export default AboutPage;
