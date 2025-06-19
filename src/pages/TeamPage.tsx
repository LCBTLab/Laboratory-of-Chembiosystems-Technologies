import React, { useState } from 'react';
import { Mail, Linkedin, Filter, Users, GraduationCap } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  category: string;
  image: string;
  email: string;
  research: string;
  linkedin?: string;
  joinedYear: string;
}

const TeamPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Prodyut Dhar",
      position: "Principal Investigator",
      category: "faculty",
      image: "https://www.iitbhu.ac.in/sites/default/files/styles/medium/public/pictures/2022-11/WhatsApp%20Image%202022-10-28%20at%201.30.17%20PM.jpeg?itok=4pE8AbrA",
      email: "prodyut.dhar@iitbhu.ac.in",
      research: "Molecular systems engineering, biomaterials, and sustainable biotechnology",
      linkedin: "https://www.linkedin.com/in/prodyut-dhar-16634a17/",
      joinedYear: "2020"
    },
    {
      id: 2,
      name: "Rohit Rai",
      position: "PhD Scholar",
      category: "phd",
      image: "https://drive.google.com/file/d/1ZY7uj3kdTkjvZkna6rGNgQQdlD8121-r/view?usp=sharing",
      email: "rohitrai.rs.bce20@itbhu.ac.in",
      linkdin: "https://www.linkedin.com/in/rohit-rai-82b367195/",
      research: "Life cycle analysis, Cellulose chemistry, Drinking straws, Sustainable agriculture, Biobased foams, 3D printing",
      joinedYear: "2020"
    },
    {
      id: 3,
      name: "Sanju Kumari Sharma",
      position: "PhD Scholar",
      category: "phd",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "sanjukumarishrma.rs.bce22@iitbhu.ac.in",
      research: "Biomaterials, Biocomposit material, Sustaiable material",
      joinedYear: "2022"
    },
    {
      id: 4,
      name: "Himanshu Modi",
      position: "PhD Scholar",
      category: "phd",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGP0pemKgpGvg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1669221312881?e=1755734400&v=beta&t=CHy2fEkVitGwn0O3yyAIznv0h6IbVLCkHayl8zcRkH4",
      email: "amit.patel@iitbhu.ac.in",
      research: "Sustainable chemical processes using biocatalysis",
      joinedYear: "2024"
    },
    {
      id: 5,
      name: "Saurav Kumar",
      position: "PhD Scholar",
      category: "phd",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGP0pemKgpGvg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1669221312881?e=1755734400&v=beta&t=lPZEpLJCg_mhLJ3T_S2-xwKNAxxf_x4ClNq7l1a-GG0",
      email: "neha.gupta@iitbhu.ac.in",
      research: "Development of biocompatible hydrogels for drug delivery",
      joinedYear: "2024"
    },
  ];

  const filters = [
    { key: 'all', label: 'All Members', count: teamMembers.length },
    { key: 'faculty', label: 'Faculty', count: teamMembers.filter(m => m.category === 'faculty').length },
    { key: 'phd', label: 'PhD Scholars', count: teamMembers.filter(m => m.category === 'phd').length },
    { key: 'mtech', label: 'M.Tech Students', count: teamMembers.filter(m => m.category === 'mtech').length },
    { key: 'btech', label: 'B.Tech Students', count: teamMembers.filter(m => m.category === 'btech').length },
    { key: 'staff', label: 'Staff', count: teamMembers.filter(m => m.category === 'staff').length }
  ];

  const filteredMembers = selectedFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedFilter);

  const getPositionColor = (category: string) => {
    switch (category) {
      case 'faculty': return 'bg-blue-100 text-blue-800';
      case 'phd': return 'bg-purple-100 text-purple-800';
      case 'mtech': return 'bg-green-100 text-green-800';
      case 'btech': return 'bg-orange-100 text-orange-800';
      case 'staff': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Our Team
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Meet the dedicated researchers, students, and staff who drive innovation and 
              excellence in our laboratory. Together, we're pushing the boundaries of 
              chembiosystems research.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">PhD Scholars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">M.Tech Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">B.Tech Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Role:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(member.category)}`}>
                      {member.position}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    <span className="text-sm">Joined {member.joinedYear}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {member.research}
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200"
                      title="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No team members found
              </h3>
              <p className="text-gray-500">
                Try selecting a different filter to see team members.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Join Our Research Team
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented and motivated individuals to join our research endeavors. 
            Explore opportunities for PhD, M.Tech, and B.Tech projects.
          </p>
          <a 
            href="/opportunities"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Users className="h-5 w-5 mr-2" />
            View Opportunities
          </a>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
