import React from 'react';
import { Trophy, Award, Medal, Star } from 'lucide-react';

interface AwardCardProps {
  year: string;
  title: string;
  organization: string;
  description: string;
  highlight?: boolean;
  link?: string;
}

const AwardCard: React.FC<AwardCardProps> = ({ 
  year, 
  title, 
  organization, 
  description, 
  highlight = false,
  link 
}) => {
  return (
    <div className={`rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 ${
      highlight 
        ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200' 
        : 'bg-white border border-gray-200'
    }`}>
      <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
        highlight ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
      }`}>
        {year}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h3>
      <p className={`font-semibold mb-3 text-lg ${
        highlight ? 'text-amber-700' : 'text-blue-600'
      }`}>
        {organization}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View Details
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
};

const StudentAwardCard: React.FC<AwardCardProps> = ({ 
  year, 
  title, 
  organization, 
  description 
}) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
      <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 bg-green-500 text-white">
        {year}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h3>
      <p className="font-semibold mb-3 text-lg text-green-600">
        {organization}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const AwardsHonours: React.FC = () => {
  const fellowships = [
    {
      year: "2024",
      title: "Har Govind Khorana - Innovative Young Biotechnologist Fellowship (IYBF)",
      organization: "Department of Biotechnology (DBT), Government of India",
      description: "Selected and awarded with research fellowship and research grant for outstanding contributions to biotechnology innovation.",
      highlight: true
    },
    {
      year: "2021-26",
      title: "Ramalingaswami Re-entry Fellowship",
      organization: "Department of Biotechnology (DBT), Government of India",
      description: "Awarded prestigious fellowship with research grant support, enabling cutting-edge research in biosystems technology.",
      highlight: true
    },
    {
      year: "2018",
      title: "JSPS Postdoctoral Fellowship",
      organization: "Japan Society for the Promotion of Science (JSPS)",
      description: "Fellowship awarded to conduct research at Kyoto University on 'End Functionalization of CNCs for Biomedical Applications' with research grant of 24 million Yen.",
      highlight: true
    }
  ];

  const recentRecognition = [
    {
      year: "2025",
      title: "RSC Journal of Materials Chemistry B Emerging Investigators",
      organization: "Royal Society of Chemistry (RSC)",
      description: "Selected for the prestigious Emerging Investigators series, recognizing outstanding contributions to materials chemistry and biomaterials research.",
      highlight: true
    },
    {
      year: "2025",
      title: "ChemComm Emerging Investigators",
      organization: "Royal Society of Chemistry (RSC)",
      description: "Selected for the ChemComm Emerging Investigators series, highlighting significant early-career achievements in chemical sciences.",
      highlight: true
    }
  ];

  const internationalAwards = [
    {
      year: "2023",
      title: "BRICS Young Scientist and Young Innovator Prize",
      organization: "8th BRICS Young Scientist Forum & 6th Young Innovator Prize",
      description: "Awarded in the category of Sustainable Development and Circular Economy at the forum held in South Africa (July 31 - August 4, 2023)."
    },
    {
      year: "2023",
      title: "Indo-France Scientific High Level Visiting Fellowship (SSHN)",
      organization: "Indo-French Cooperation",
      description: "Selected for Short Research Trip to France (SRTF) 2023 to conduct research and collaboration activities at Grenoble Institute of Technology, France."
    },
    {
      year: "2020",
      title: "Marie Sklodowska-Curie Actions Seal of Excellence Award",
      organization: "European Commission",
      description: "Received the prestigious Seal of Excellence, recognizing high-quality research proposals in European research programs."
    },
    {
      year: "2019",
      title: "ACS Graduate Award for Best PhD Thesis",
      organization: "Division of Cellulose and Renewable Materials, American Chemical Society",
      description: "Awarded for outstanding doctoral research on Cellulose Nanocrystals.",
      link: "https://acscell.org/awards/graduate-student-awards/"
    },
    {
      year: "2019",
      title: "ACS Travel Grant",
      organization: "American Chemical Society",
      description: "Travel grant awarded for presentation of doctoral research at 252nd ACS National Meeting in Orlando, Florida, USA (March 31 - April 4, 2019)."
    },
    {
      year: "2016",
      title: "DST Travel Grant Fellowship (Young Scientist)",
      organization: "Department of Science & Technology, Government of India",
      description: "Fellowship to attend 252nd ACS National Meeting and Exposition in Philadelphia, USA (August 21-25, 2016)."
    },
    {
      year: "2015",
      title: "Best Paper Award",
      organization: "7th International Conference on Chemical, Biological and Environmental Engineering",
      description: "Best paper award for outstanding presentation at ICBEE 2015, Milan, Italy (September 14-15, 2015)."
    }
  ];

  const nationalAwards = [
    {
      year: "2022",
      title: "National Bamboo Innovation Challenge - Top 5 Winner",
      organization: "Government of India",
      description: "Awarded as one of the top five winners under the 'Prototype Development Stage' category for innovative bamboo-based solutions."
    },
    {
      year: "2016",
      title: "6th National Awards for Technology Innovation in Petrochemical & Plastic Processing Industry",
      organization: "Department of Chemicals & Petrochemicals, Government of India",
      description: "Winner for research on 'Value Added Cellulose Nanocrystals Production from Waste Resources and Its High-End Applications'."
    }
  ];

  const studentAchievements = [
    {
      year: "2024",
      title: "MSME Idea Hackathon 3.0 - Shortlisted Project",
      organization: "Smruti B Bhat",
      description: "Research project shortlisted under the MSME Idea Hackathon 3.0 (Women category), recognizing innovative entrepreneurial solutions."
    },
    {
      year: "2024",
      title: "ITS Travel Support Grant - ACS Spring Meeting",
      organization: "Rahul Ranjan",
      description: "Awarded ITS travel support grant from SERB to attend the American Chemical Society (ACS) Spring 2024 conference in New Orleans, USA (March 17-21, 2024)."
    },
    {
      year: "2022",
      title: "Best Poster Award - ABC-HEE 2022",
      organization: "Rahul Ranjan",
      description: "Best poster award at 'Advances in Biopolymers and Composites: Health, Environment, and Energy (ABC-HEE, 2022)' organized by MNNIT Allahabad."
    },
    {
      year: "2022",
      title: "Best Poster Award - ABC-HEE 2022",
      organization: "Rohit Rai",
      description: "Best poster award at 'Advances in Biopolymers and Composites: Health, Environment, and Energy (ABC-HEE, 2022)' organized by MNNIT Allahabad."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Trophy className="h-12 w-12" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Awards & Honours
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Recognizing Excellence in Research and Innovation
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-blue-600 mb-2">13+</div>
              <div className="text-gray-600 font-medium text-lg">Total Awards</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-gray-600 font-medium text-lg">International</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600 font-medium text-lg">National</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Recognition 2025 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-10">
            <Star className="h-8 w-8 text-amber-500 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Recent Recognition (2025)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentRecognition.map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* Prestigious Fellowships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-10">
            <Medal className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Prestigious Fellowships</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fellowships.map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* International Recognition */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-10">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">International Recognition</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalAwards.map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* National Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-10">
            <Trophy className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">National Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nationalAwards.map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-10">
            <Award className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Student Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentAchievements.map((award, index) => (
              <StudentAwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsHonours;
