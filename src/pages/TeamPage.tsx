 import React, { useState } from 'react';
import { Users, GraduationCap, Award, ExternalLink, Mail, Linkedin, MapPin, Calendar } from 'lucide-react';

interface Student {
  id: number;
  sno: string;
  name: string;
  fellowship: string;
  degree: string;
  year: string;
  image: string;
  email?: string;
  linkedin?: string;
  specialization?: string;
  isAlumni?: boolean;
  placed_in?: string;
}

const currentStudents: Student[] = [
  {
    id: 1,
    sno: "1",
    name: "Rohit Rai",
    fellowship: "DBT-JRF",
    degree: "PhD",
    year: "Dec 2020",
    image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/2211.jpg",
    email: "rohitrai.rs.bce20@itbhu.ac",
    linkedin: "https://www.linkedin.com/in/rohit-rai-82b367195/",
    specialization: "Cellulose Nanocrystals, Sustainable Materials"
  },
  {
    id: 2,
    sno: "2",
    name: "Sanju Kumari Sharma",
    fellowship: "CSIR-NET",
    degree: "PhD",
    year: "July 2022",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/Sanju.jpg",
    specialization: "Biomaterials, Bioengineering"
  },
  {
    id: 3,
    sno: "3",
    name: "Himanshu Modi",
    fellowship: "MHRD",
    degree: "PhD",
    year: "July 2024",
    image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/1669221312881.jpeg",
    email: "himashumodi.rs.bce24@itbhu.ac",
    linkedin: "https://www.linkedin.com/in/himanshu-modi-90b247242",
    specialization: "Chemical Engineering, Biotechnology"
  },
  {
    id: 4,
    sno: "4",
    name: "Saurav Kumar",
    fellowship: "MHRD",
    degree: "PhD",
    year: "July 2024",
    image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/WhatsApp%20Image%202025-06-19%20at%2014.47.03_2bc2f854.jpg",
    email: "sauravkumar.rs.bce24@itbhu.ac",
    linkedin: "",
    specialization: "Sustainable Chemistry, Materials Science"
  },
  {
    id: 5,
    sno: "5",
    name: "Meghali Saha",
    fellowship: "MHRD",
    degree: "PhD",
    year: "July 2025",
    image: "https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/1710943724382.jpeg",
    email: "meghalisaha.rs.bce25@itbhu.ac",
    linkedin: "https://www.linkedin.com/in/meghali-saha-017b64237/",
    specialization: "Sustainable Chemistry, Materials Science"
  },
  {
    id: 6,
    sno: "6",
    name: "Praveen Kumar",
    fellowship: "MHRD",
    degree: "IDD",
    year: "July 2021",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Integrated Dual Degree Program"
  },
  {
    id: 7,
    sno: "7",
    name: "Aakansha Korgaonkr",
    fellowship: "MHRD",
    degree: "M.Tech.",
    year: "July 2024",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/aKANSHA.jpg",
    specialization: "3D Printing, Geo-polymer"
  },
  {
    id: 8,
    sno: "8",
    name: "Anoop Kumar Singh",
    fellowship: "Project-JRF",
    degree: "B.Sc. Ag.",
    year: "July 2025",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/aNOOP.jpg",
    email: "anoopsiingh.69@gmail.com",
    linkedin: "https://www.linkedin.com/in/anoop-kumar-singh5114",
    specialization: "Web Development, Leaser Engraving, Sustainable Materials"
  },
  {
    id: 9,
    sno: "9",
    name: "Suraj Gaur",
    fellowship: "Project-JRF",
    degree: "M.Sc. Biotech.",
    year: "December 2024",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/suraj%20gaur.jpg",
    email: "sg8607408@gmail.com",
    linkedin: "https://www.linkedin.com/in/suraj-gaur-b71908186/",
    specialization: "Agriculture Biomass, cellulose extraction,cellulose phosphorylation,Optically colured film, Lignin extraction "
  },
  {
    id: 10,
    sno: "10",
    name: "Aniruddha Nayak",
    fellowship: "Project-JRF",
    degree: "M.Sc. Botony.",
    year: "January 2025",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/anirudh.jpg",
    email: "nayakaniruddha1999@gmail.com",
    linkedin: "https://www.linkedin.com/in/aniruddha-nayak-0295ab280/",
    specialization: "Agricultural biomass based biomaterial, and application compatibility in different sector, In vivo toxicity study "
  }
];

const alumniStudents: Student[] = [
  {
    id: 7,
    sno: "1",
    name: "Amey Mistry",
    fellowship: "MHRD",
    degree: "M.Tech",
    year: "2023-2025",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Chemical Engineering",
    placed_in: "",
    isAlumni: true
  },
  {
    id: 8,
    sno: "2",
    name: "Farhaan Iqbal",
    fellowship: "MHRD",
    degree: "IDD",
    year: "2020-2025",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Integrated Dual Degree Program",
    placed_in: "Imperial College London",
    isAlumni: true
  },
  {
    id: 9,
    sno: "3",
    name: "Jyotirmoy Gupta",
    fellowship: "MHRD",
    degree: "IDD",
    year: "2020-2025",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Integrated Dual Degree Program",
    placed_in: "Mastercard",
    isAlumni: true
  },
  {
    id: 10,
    sno: "4",
    name: "Rahul Ranjan",
    fellowship: "MHRD",
    degree: "PhD",
    year: "2019-24",
    image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Cellulose Nanocrystals, Sustainable Materials",
    placed_in: "Post Doc. IIT Roorkee",
    isAlumni: true
  },
  {
    id: 11,
    sno: "5",
    name: "Vedang Prakash Mone",
    fellowship: "MHRD",
    degree: "M.Tech",
    year: "2021-23",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Materials Science, Chemical Engineering",
    isAlumni: true
  },
  {
    id: 12,
    sno: "6",
    name: "Ankit Bharti",
    fellowship: "MHRD",
    degree: "IDD",
    year: "2018-23",
    image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Integrated Dual Degree Program",
    placed_in: "Rimba",
    isAlumni: true
  },
  {
    id: 13,
    sno: "7",
    name: "Smruti B Bhatt",
    fellowship: "MHRD",
    degree: "M.Tech",
    year: "2022-24",
    image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/Smruti%20Picture.jpg",
    specialization: "Functional Materials, Thermal Management",
    placed_in: "PhD (IIT Madras)",
    isAlumni: true
  },
  {
    id: 14,
    sno: "8",
    name: "Bhavya Jain",
    fellowship: "MHRD",
    degree: "IDD",
    year: "2019-24",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialization: "Integrated Dual Degree Program",
    placed_in: "Deloitte",
    isAlumni: true
  }
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<'current' | 'alumni'>('current');
  const [searchTerm, setSearchTerm] = useState('');

  const currentMembers = currentStudents.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.specialization && member.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredAlumni = alumniStudents.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.specialization && member.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
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
              Meet the brilliant minds driving innovation in chembiosystems research and sustainable materials
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Current Students", value: currentStudents.length.toString(), icon: Users, color: "emerald" },
            { label: "Alumni", value: alumniStudents.length.toString(), icon: GraduationCap, color: "teal" },
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
              Current Students
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-3 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Principal Investigator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Principal Investigator</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading our research endeavors with expertise and vision
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up ring-2 ring-violet-200">
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src="https://www.iitbhu.ac.in/sites/default/files/styles/medium/public/pictures/2022-11/WhatsApp%20Image%202022-10-28%20at%201.30.17%20PM.jpeg?itok=4pE8AbrA"
                alt="Dr. Prodyut Dhar"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-purple-900/40 to-transparent opacity-60"></div>
              
              {/* Role Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-violet-500/90 text-white">
                Principal Investigator
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-violet-600 transition-colors duration-300">
                Dr. Prodyut Dhar
              </h3>
              
              <p className="text-violet-600 text-sm font-medium mb-3">
                Assistant Professor
              </p>

              <p className="text-gray-600 text-sm mb-3">Ph.D. in Chemical Engineering</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialization</h4>
                <p className="text-sm text-gray-600">Bioengineering, Nanocellulose, Biomaterials, Sustainable Chemistry</p>
              </div>

              {/* Academic Profiles */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Academic Profiles
                </h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://orcid.org/0000-0001-9716-3866"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 transition-colors"
                  >
                    ORCID
                  </a>
                  <a
                    href="https://scholar.google.com/citations?user=KFsPKWAAAAAJ&hl=en&authuser=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    Google Scholar
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Prodyut-Dhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium hover:bg-cyan-200 transition-colors"
                  >
                    ResearchGate
                  </a>
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <a
                  href="mailto:prodyut.dhar@iitbhu.ac.in"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-violet-100 text-violet-600 hover:bg-violet-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/prodyut-dhar-16634a17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-violet-100 text-violet-600 hover:bg-violet-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeTab === 'alumni' && (
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Alumni</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating our former students who have successfully completed their programs and continue their journey in research and industry
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up ${
                member.isAlumni ? 'ring-2 ring-rose-200' : 'ring-2 ring-emerald-200'
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
                
                {/* Degree Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  member.isAlumni
                    ? 'bg-rose-500/90 text-white'
                    : 'bg-emerald-500/90 text-white'
                }`}>
                  {member.degree}
                </div>

                {/* Fellowship Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  member.isAlumni
                    ? 'bg-pink-500/90 text-white'
                    : 'bg-teal-500/90 text-white'
                }`}>
                  {member.fellowship}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {member.name}
                </h3>
                
                <p className={`text-sm font-medium mb-3 ${
                  member.isAlumni ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {member.degree} • {member.fellowship}
                </p>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">Joined:</span>
                    <span className="ml-1">{member.year}</span>
                  </div>
                </div>

                {member.placed_in && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Placed in:</span>
                      <span className="ml-1">{member.placed_in}</span>
                    </div>
                  </div>
                )}

                {member.specialization && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialization</h4>
                    <p className="text-sm text-gray-600">{member.specialization}</p>
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
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No students found</h3>
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
              We're always looking for passionate students and researchers to join our mission of advancing chembiosystems research
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
