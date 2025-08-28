import React, { useState } from 'react';
import { Mail, Linkedin, Filter, Users, GraduationCap, Award, ExternalLink } from 'lucide-react';

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

interface AlumniMember {
  id: number;
  name: string;
  position: string;
  currentPosition: string;
  company: string;
  graduationYear: string;
  image: string;
  linkedin?: string;
  achievements?: string;
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
      image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/2211.jpg",
      email: "rohitrai.rs.bce20@itbhu.ac.in",
      linkedin: "https://github.com/Kroofy01/LCBT/blob/main/2211.jpg?raw=true",
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
      image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/1669221312881.jpeg",
      email: "himanshumodi.rs.bce24@itbhu.ac.in",
      linkedin: "https://www.linkedin.com/in/himanshu-modi-90b247242/",
      research: "Sustainable chemical processes using biocatalysis",
      joinedYear: "2024"
    },
    {
      id: 5,
      name: "Saurav Kumar",
      position: "PhD Scholar",
      category: "phd",
      image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/WhatsApp%20Image%202025-06-19%20at%2014.47.03_2bc2f854.jpg",
      email: "sauravkumar.rs.bce24@iitbhu.ac.in",
      research: "Development of biocompatible hydrogels for drug delivery",
      joinedYear: "2024"
    },
    {
      id: 6,
      name: "Meghali Saha",
      position: "PhD Scholar",
      category: "phd",
      image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/1710943724382.jpeg",
      email: "meghalisaha.rs.bce25@itbhu.ac.in",
      linkedin: "https://www.linkedin.com/in/meghali-saha-017b64237/",
      research: "",
      joinedYear: "2025"
    },
  ];

  const alumniMembers: AlumniMember[] = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar Singh",
      position: "Former PhD Scholar",
      currentPosition: "Senior Research Scientist",
      company: "Biotech Innovations Pvt. Ltd.",
      graduationYear: "2023",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      linkedin: "https://linkedin.com/in/rajesh-kumar-singh",
      achievements: "Best Paper Award at National Conference on Chemical Engineering"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Former M.Tech Student",
      currentPosition: "Process Engineer",
      company: "Green Chemistry Solutions",
      graduationYear: "2022",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      linkedin: "https://linkedin.com/in/priya-sharma",
      achievements: "Excellence in Research Award"
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Former B.Tech Student",
      currentPosition: "Research Associate",
      company: "IIT Delhi",
      graduationYear: "2021",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      linkedin: "https://linkedin.com/in/amit-patel",
      achievements: "Outstanding Final Year Project"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      position: "Former PhD Scholar",
      currentPosition: "Assistant Professor",
      company: "NIT Rourkela",
      graduationYear: "2020",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      linkedin: "https://linkedin.com/in/sneha-gupta",
      achievements: "Published 8 research papers in high-impact journals"
    }
  ];

  const filters = [
    { key: 'all', label: 'All Members', count: teamMembers.length },
    { key: 'faculty', label: 'Faculty', count: teamMembers.filter(m => m.category === 'faculty').length },
    { key: 'phd', label: 'PhD Scholars', count: teamMembers.filter(m => m.category === 'phd').length },
    { key: 'mtech', label: 'M.Tech Students', count: teamMembers.filter(m => m.category === 'mtech').length },
    { key: 'btech', label: 'B.Tech Students', count: teamMembers.filter(m => m.category === 'btech').length },
    { key: 'staff', label: 'Staff', count: teamMembers.filter(m => m.category === 'staff').length },
    { key: 'alumni', label: 'Alumni', count: alumniMembers.length }
  ];

  const filteredMembers = selectedFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedFilter);

  const getPositionColor = (category: string) => {
    switch (category) {
      case 'faculty': return 'bg-emerald-100 text-emerald-800';
      case 'phd': return 'bg-violet-100 text-violet-800';
      case 'mtech': return 'bg-teal-100 text-teal-800';
      case 'btech': return 'bg-amber-100 text-amber-800';
      case 'staff': return 'bg-gray-100 text-gray-800';
      case 'alumni': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-emerald-600 mr-4" />
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
                <div className="text-3xl font-bold text-emerald-600">1</div>
                <div className="text-sm text-gray-600">Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600">5</div>
                <div className="text-sm text-gray-600">PhD Scholars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">0</div>
                <div className="text-sm text-gray-600">M.Tech Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600">{alumniMembers.length}</div>
                <div className="text-sm text-gray-600">Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Role:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-300'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      {selectedFilter !== 'alumni' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
                >
                  <div className="relative">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getPositionColor(member.category)}`}>
                        {member.position}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <GraduationCap className="h-4 w-4 mr-1 text-emerald-600" />
                      <span className="text-sm">Joined {member.joinedYear}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {member.research}
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors duration-200"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
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
        </div>
      )}

      {/* Alumni Section */}
      {(selectedFilter === 'all' || selectedFilter === 'alumni') && (
        <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Award className="h-10 w-10 text-rose-600 mr-3" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our Distinguished Alumni
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Celebrating the achievements of our former team members who continue to make 
                significant contributions in their respective fields.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {alumniMembers.map((alumni) => (
                <div 
                  key={alumni.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
                >
                  <div className="relative">
                    <img 
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 backdrop-blur-sm">
                        Class of {alumni.graduationYear}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {alumni.name}
                      </h3>
                      <p className="text-rose-100 text-sm">
                        {alumni.position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {alumni.currentPosition}
                      </h4>
                      <p className="text-emerald-600 font-medium text-sm">
                        {alumni.company}
                      </p>
                    </div>
                    
                    {alumni.achievements && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Award className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-sm font-medium text-gray-700">Achievement</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {alumni.achievements}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Graduated {alumni.graduationYear}
                      </span>
                      {alumni.linkedin && (
                        <a 
                          href={alumni.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Legacy Team Members Grid (for non-alumni filters) */}
      {selectedFilter !== 'alumni' && selectedFilter !== 'all' && (
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
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getPositionColor(member.category)}`}>
                      {member.position}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <GraduationCap className="h-4 w-4 mr-1 text-emerald-600" />
                    <span className="text-sm">Joined {member.joinedYear}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {member.research}
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors duration-200"
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
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Join Our Research Team
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented and motivated individuals to join our research endeavors. 
            Explore opportunities for PhD, M.Tech, and B.Tech projects.
          </p>
          <a 
            href="/opportunities"
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
