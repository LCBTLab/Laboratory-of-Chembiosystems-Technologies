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
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "prodyut.dhar@iitbhu.ac.in",
      research: "Molecular systems engineering, biomaterials, and sustainable biotechnology",
      linkedin: "https://linkedin.com",
      joinedYear: "2018"
    },
    {
      id: 2,
      name: "Rajesh Kumar Singh",
      position: "PhD Scholar",
      category: "phd",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "rajesh.singh@iitbhu.ac.in",
      research: "Protein engineering for enhanced catalytic activity and stability",
      joinedYear: "2020"
    },
    {
      id: 3,
      name: "Priya Sharma",
      position: "PhD Scholar",
      category: "phd",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "priya.sharma@iitbhu.ac.in",
      research: "Biomaterials for tissue engineering and regenerative medicine",
      joinedYear: "2021"
    },
    {
      id: 4,
      name: "Amit Patel",
      position: "PhD Scholar",
      category: "phd",
      image: "https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "amit.patel@iitbhu.ac.in",
      research: "Sustainable chemical processes using biocatalysis",
      joinedYear: "2019"
    },
    {
      id: 5,
      name: "Neha Gupta",
      position: "M.Tech Student",
      category: "mtech",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "neha.gupta@iitbhu.ac.in",
      research: "Development of biocompatible hydrogels for drug delivery",
      joinedYear: "2023"
    },
    {
      id: 6,
      name: "Vikram Yadav",
      position: "M.Tech Student",
      category: "mtech",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "vikram.yadav@iitbhu.ac.in",
      research: "Computational modeling of enzyme-substrate interactions",
      joinedYear: "2023"
    },
    {
      id: 7,
      name: "Sunita Devi",
      position: "Project Assistant",
      category: "staff",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "sunita.devi@iitbhu.ac.in",
      research: "Laboratory management and experimental support",
      joinedYear: "2022"
    },
    {
      id: 8,
      name: "Arjun Mehra",
      position: "B.Tech Project Student",
      category: "btech",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "arjun.mehra@iitbhu.ac.in",
      research: "Green synthesis of nanoparticles for catalytic applications",
      joinedYear: "2024"
    },
    {
      id: 9,
      name: "Kavya Reddy",
      position: "B.Tech Project Student",
      category: "btech",
      image: "https://images.pexels.com/photos/1181689/pexels-photo-1181689.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "kavya.reddy@iitbhu.ac.in",
      research: "Characterization of biomaterial surfaces and interfaces",
      joinedYear: "2024"
    },
    {
      id: 10,
      name: "Rohit Kumar",
      position: "B.Tech Project Student",
      category: "btech",
      image: "https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "rohit.kumar@iitbhu.ac.in",
      research: "Microbial fuel cells for sustainable energy generation",
      joinedYear: "2024"
    }
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