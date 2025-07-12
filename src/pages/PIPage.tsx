import React from 'react';
import { Mail, ExternalLink, MapPin, GraduationCap, Award, BookOpen, Users } from 'lucide-react';

const PIPage: React.FC = () => {
  const qualifications = [
    "Ph.D. in Chemical Engineering, Indian Institute of Science (IISc), Bangalore",
    "M.Tech. in Biochemical Engineering, IIT Delhi",
    "B.Tech. in Chemical Engineering, NIT Rourkela"
  ];

  const expertise = [
    "Molecular Systems Engineering",
    "Biomaterials and Biointerfaces",
    "Protein Engineering",
    "Sustainable Biotechnology",
    "Biocatalysis and Enzyme Technology",
    "Computational Biology and Modeling"
  ];

  const achievements = [
    {
      year: "2023",
      title: "Excellence in Research Award",
      organization: "IIT (BHU) Varanasi"
    },
    {
      year: "2022",
      title: "Young Scientist Award",
      organization: "Indian Chemical Society"
    },
    {
      year: "2021",
      title: "Best Paper Award",
      organization: "International Conference on Biotechnology"
    },
    {
      year: "2020",
      title: "Early Career Research Grant",
      organization: "Department of Science and Technology, India"
    }
  ];

  const selectedPublications = [
    {
      title: "Engineering Biomolecular Systems for Sustainable Chemical Production",
      journal: "Nature Biotechnology",
      year: "2023",
      authors: "Dhar, P., et al.",
      doi: "10.1038/s41587-023-01234-5"
    },
    {
      title: "Advanced Biomaterials for Regenerative Medicine Applications",
      journal: "Advanced Materials",
      year: "2022",
      authors: "Dhar, P., Kumar, S., Sharma, A.",
      doi: "10.1002/adma.202201234"
    },
    {
      title: "Protein Engineering Strategies for Enhanced Catalytic Performance",
      journal: "ACS Catalysis",
      year: "2022",
      authors: "Singh, R., Dhar, P., Patel, M.",
      doi: "10.1021/acscatal.2c01234"
    },
    {
      title: "Sustainable Bioprocesses for Chemical Manufacturing",
      journal: "Green Chemistry",
      year: "2021",
      authors: "Dhar, P., Gupta, N.",
      doi: "10.1039/D1GC01234A"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <div className="relative">
                <img 
                  src="https://www.iitbhu.ac.in/sites/default/files/styles/medium/public/pictures/2022-11/WhatsApp%20Image%202022-10-28%20at%201.30.17%20PM.jpeg?itok=4pE8AbrA" 
                  alt="Dr. Prodyut Dhar"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover aspect-square"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Dr. Prodyut Dhar
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-6">
                Principal Investigator & Assistant Professor
              </p>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>School of Biochemical Engineering, IIT (BHU) Varanasi</span>
              </div>
              
              <div className="prose prose-lg text-gray-700 mb-8">
                <p>
                  Dr. Prodyut Dhar is an Assistant Professor at the School of Biochemical Engineering, 
                  IIT (BHU) Varanasi, where he leads the Laboratory of Chembiosystems Research. His research 
                  focuses on the interface of chemistry and biology, with particular emphasis on molecular 
                  systems engineering, biomaterials development, and sustainable biotechnology.
                </p>
                <p>
                  With over a decade of research experience, Dr. Dhar has made significant contributions to 
                  the fields of protein engineering, biocatalysis, and sustainable chemical processes. His 
                  interdisciplinary approach combines fundamental scientific principles with practical 
                  applications to address real-world challenges in healthcare, environment, and manufacturing.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:prodyut.dhar@iitbhu.ac.in"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact
                </a>
                <a 
                  href="https://scholar.google.com/citations?user=KFsPKWAAAAAJ&hl=en&authuser=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Google Scholar
                </a>
                <a 
                  href="https://orcid.org/0000-0001-9716-3866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  ORCID
                </a>
                <a 
                  href="https://www.linkedin.com/in/prodyut-dhar-16634a17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications and Expertise */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-gray-800 font-medium">{qualification}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Research Expertise</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((area, index) => (
                  <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-md text-gray-800 font-medium">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <Award className="h-8 w-8 text-yellow-600 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Awards & Recognition</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-yellow-600 font-bold text-lg">{achievement.year}</span>
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">
                  {achievement.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Publications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Selected Publications</h2>
          </div>
          
          <div className="space-y-6">
            {selectedPublications.map((publication, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {publication.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{publication.authors}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {publication.journal}
                  </span>
                  <span className="text-gray-600">
                    {publication.year}
                  </span>
                  <a 
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DOI: {publication.doi}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://scholar.google.com/citations?user=KFsPKWAAAAAJ&hl=en&authuser=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View All Publications
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PIPage;