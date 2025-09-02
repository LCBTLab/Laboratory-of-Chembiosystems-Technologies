import React, { useState } from 'react';
import { Users, GraduationCap, Award, ExternalLink, Mail, Linkedin, MapPin, Calendar } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  education: string;
  image: string;
  email?: string;
  linkedin?: string;
  specialization: string;
  joinYear: number;
  achievements?: string[];
  isAlumni?: boolean;
  currentPosition?: string;
  graduationYear?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Prodyut Dhar",
    role: "Principal Investigator",
    education: "Ph.D. in Chemical Engineering",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "prodyut.dhar@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/prodyut-dhar-16634a17/",
    specialization: "Bioengineering, Nanocellulose, Biomaterials",
    joinYear: 2018,
    achievements: ["50+ Publications", "8 Major Research Projects", "DBT Young Scientist Award"]
  },
  {
    id: 2,
    name: "Rahul Ranjan",
    role: "Ph.D. Scholar",
    education: "M.Tech in Chemical Engineering",
    image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Cellulose Nanocrystals, Sustainable Materials",
    joinYear: 2020,
    achievements: ["15+ Publications", "Best Paper Award 2023"]
  },
  {
    id: 3,
    name: "Ravi Rai",
    role: "Ph.D. Scholar",
    education: "M.Tech in Biotechnology",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Bacterial Cellulose, Biocomposites",
    joinYear: 2021,
    achievements: ["12+ Publications", "Young Researcher Award"]
  },
  {
    id: 4,
    name: "Kiran Naik",
    role: "Ph.D. Scholar",
    education: "M.Tech in Materials Science",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "3D Bioprinting, Hydrogels",
    joinYear: 2022,
    achievements: ["8+ Publications", "Innovation Award 2024"]
  }
];

const alumniMembers: TeamMember[] = [
  {
    id: 5,
    name: "Dr. Shubham Bhatt",
    role: "Former Ph.D. Scholar",
    education: "Ph.D. in Chemical Engineering",
    image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Functional Materials, Thermal Management",
    joinYear: 2019,
    graduationYear: 2023,
    currentPosition: "Senior Research Scientist at CSIR-NEERI",
    isAlumni: true,
    achievements: ["10+ Publications", "Best Thesis Award", "Industry Collaboration"]
  },
  {
    id: 6,
    name: "Dr. Saurabh Gaur",
    role: "Former Ph.D. Scholar",
    education: "Ph.D. in Chemical Engineering",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Fuel Cells, Membrane Technology",
    joinYear: 2018,
    graduationYear: 2022,
    currentPosition: "Assistant Professor at NIT Rourkela",
    isAlumni: true,
    achievements: ["8+ Publications", "Patent Filed", "Academic Excellence Award"]
  },
  {
    id: 7,
    name: "Dr. Rohit Kushwaha",
    role: "Former Ph.D. Scholar",
    education: "Ph.D. in Chemical Engineering",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Photodynamic Therapy, Metal Complexes",
    joinYear: 2020,
    graduationYear: 2024,
    currentPosition: "Postdoctoral Researcher at University of Toronto",
    isAlumni: true,
    achievements: ["6+ Publications", "International Collaboration", "Research Excellence Award"]
  }
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<'current' | 'alumni'>('current');
  const [searchTerm, setSearchTerm] = useState('');

  const currentMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlumni = alumniMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayMembers = activeTab === 'current' ? currentMembers : filteredAlumni;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-in">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-in-left">
              Our Research Team
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto animate-slide-in-right">
              Meet the brilliant minds driving innovation in bioengineering and sustainable materials
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Team Members", value: "4+", icon: Users, color: "emerald" },
            { label: "Alumni", value: "3+", icon: GraduationCap, color: "teal" },
            { label: "Publications", value: "50+", icon: Award, color: "cyan" },
            { label: "Years Active", value: "6+", icon: Calendar, color: "violet" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-full mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'current'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Current Team
            </button>
            <button
              onClick={() => setActiveTab('alumni')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'alumni'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              Alumni
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-3 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeTab === 'alumni' && (
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Distinguished Alumni</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating our former team members who continue to make significant contributions to science and industry
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up ${
                member.isAlumni ? 'ring-2 ring-rose-200' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  member.isAlumni 
                    ? 'from-rose-900/80 via-pink-900/40 to-transparent' 
                    : 'from-emerald-900/80 via-teal-900/40 to-transparent'
                } opacity-60`}></div>
                
                {/* Role Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  member.isAlumni
                    ? 'bg-rose-500/90 text-white'
                    : member.role === 'Principal Investigator'
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-teal-500/90 text-white'
                }`}>
                  {member.isAlumni ? 'Alumni' : member.role}
                </div>

                {/* Alumni Graduation Year */}
                {member.isAlumni && member.graduationYear && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    Class of {member.graduationYear}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {member.name}
                </h3>
                
                <p className={`text-sm font-medium mb-3 ${
                  member.isAlumni ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {member.role}
                </p>

                {/* Current Position for Alumni */}
                {member.isAlumni && member.currentPosition && (
                  <div className="mb-3 p-3 bg-rose-50 rounded-lg border border-rose-200">
                    <div className="flex items-center text-sm text-rose-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Current Position:</span>
                    </div>
                    <p className="text-sm text-rose-600 mt-1">{member.currentPosition}</p>
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-3">{member.education}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialization</h4>
                  <p className="text-sm text-gray-600">{member.specialization}</p>
                </div>

                {/* Achievements */}
                {member.achievements && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Achievements
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 text-xs rounded-full ${
                            member.isAlumni
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        member.isAlumni
                          ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                          : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        member.isAlumni
                          ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                          : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayMembers.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No team members found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Join Us Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Research Team</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate researchers to join our mission of advancing sustainable materials science
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/opportunities"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View Opportunities
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105"
              >
                Contact Us
                <Mail className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}