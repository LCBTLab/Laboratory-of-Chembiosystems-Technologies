import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Leaf, Users, BookOpen, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const highlights = [
    {
      icon: <Microscope className="h-8 w-8 text-blue-600" />,
      title: "Cutting-Edge Research",
      description: "Advanced molecular systems engineering and biomaterials research"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainable Solutions",
      description: "Developing eco-friendly chemical and biological processes"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Collaborative Team",
      description: "Diverse group of researchers working together on innovative projects"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "Quality Publications",
      description: "High-impact research published in leading scientific journals"
    }
  ];

  const researchThemes = [
    {
      title: "Molecular Systems Engineering",
      description: "Design and optimization of molecular systems for various applications",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Biomaterials & Biointerfaces",
      description: "Development of novel biomaterials and study of biointerface interactions",
      image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Sustainable Chemistry",
      description: "Green chemistry approaches for environmental sustainability",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Bioinspired Systems",
      description: "Learning from nature to create innovative technological solutions",
      image: "https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://images.pexels.com/photos/207589/pexels-photo-207589.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="IIT BHU Logo" 
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Laboratory of<br />
                    <span className="text-blue-600">Chembiosystems</span><br />
                    Technologies
                  </h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Exploring the Interface of Chemistry and Biology for Sustainable Solutions
              </p>
              <p className="text-lg text-gray-700 mb-8">
                At IIT (BHU), we pioneer innovative research at the intersection of chemistry and biology, 
                developing sustainable solutions for tomorrow's challenges through cutting-edge molecular 
                systems engineering and biomaterials research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/research" 
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Explore Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Laboratory Research"
                className="rounded-2xl shadow-2xl object-cover w-full h-96 lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Lab
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine excellence in research with collaborative innovation to address global challenges
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Themes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Research Themes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exploring diverse areas of chemistry and biology to create innovative solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchThemes.map((theme, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {theme.title}
                  </h3>
                  <p className="text-gray-600">
                    {theme.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/research" 
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Research Projects</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Publications</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">12</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
