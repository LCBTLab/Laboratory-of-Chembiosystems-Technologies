import React, { useState } from 'react';
import { GraduationCap, Users, Calendar, Mail, FileText, Send, CheckCircle } from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  type: string;
  duration: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
  isActive: boolean;
}

const OpportunitiesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    university: '',
    gpa: '',
    experience: '',
    interests: '',
    resume: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: "PhD Position in Molecular Systems Engineering",
      type: "PhD",
      duration: "4-5 years",
      description: "We are seeking a highly motivated PhD candidate to work on engineering biomolecular systems for sustainable chemical production. The project involves protein design, metabolic pathway optimization, and bioprocess development.",
      requirements: [
        "M.Tech/M.Sc. in Chemical Engineering, Biotechnology, or related field",
        "Strong background in biochemistry and molecular biology",
        "Experience with protein engineering techniques",
        "Programming skills in Python/MATLAB preferred",
        "GATE/NET qualification required"
      ],
      benefits: [
        "Monthly fellowship as per IIT norms",
        "Access to state-of-the-art research facilities",
        "Opportunity to publish in high-impact journals",
        "International conference participation",
        "Collaborative research opportunities"
      ],
      deadline: "2024-03-15",
      isActive: true
    },
    {
      id: 2,
      title: "M.Tech Project: Biomaterials for Drug Delivery",
      type: "M.Tech",
      duration: "6-12 months",
      description: "Project focused on developing smart biomaterials for targeted drug delivery applications. Students will work on hydrogel synthesis, characterization, and in-vitro testing.",
      requirements: [
        "Currently enrolled in M.Tech program",
        "Background in Materials Science or Bioengineering",
        "Basic knowledge of polymer chemistry",
        "Laboratory experience preferred"
      ],
      benefits: [
        "Hands-on research experience",
        "Mentorship from experienced researchers",
        "Potential for publication",
        "Certificate of completion",
        "Networking opportunities"
      ],
      deadline: "2024-02-28",
      isActive: true
    },
    {
      id: 3,
      title: "B.Tech Final Year Project: Green Chemistry",
      type: "B.Tech",
      duration: "8-10 months",
      description: "Undergraduate project on developing environmentally friendly chemical processes using biocatalysis. Students will learn green chemistry principles and sustainable process design.",
      requirements: [
        "Final year B.Tech student in Chemical/Biochemical Engineering",
        "Good academic record (CGPA > 7.5)",
        "Interest in sustainable chemistry",
        "Basic understanding of chemical processes"
      ],
      benefits: [
        "Research experience in cutting-edge field",
        "Industry-relevant skills development",
        "Potential internship opportunities",
        "Letter of recommendation",
        "Project completion certificate"
      ],
      deadline: "2024-04-30",
      isActive: true
    },
    {
      id: 4,
      title: "Summer Research Internship",
      type: "Internship",
      duration: "2-3 months",
      description: "Summer internship program for undergraduate students interested in chembiosystems research. Interns will work on ongoing research projects and gain hands-on laboratory experience.",
      requirements: [
        "Currently enrolled in B.Tech/B.Sc. program",
        "Completed at least 4 semesters",
        "Strong academic performance",
        "Genuine interest in research"
      ],
      benefits: [
        "Stipend provided",
        "Research experience certificate",
        "Exposure to advanced research techniques",
        "Mentorship from PhD students and faculty",
        "Potential for future collaboration"
      ],
      deadline: "2024-03-31",
      isActive: true
    },
    {
      id: 5,
      title: "Postdoctoral Research Fellow",
      type: "Postdoc",
      duration: "2-3 years",
      description: "Postdoctoral position in computational biology and protein design. The fellow will work on developing machine learning approaches for protein engineering and collaborate with experimental teams.",
      requirements: [
        "Ph.D. in Computational Biology, Bioinformatics, or related field",
        "Strong programming skills (Python, R, C++)",
        "Experience with machine learning and molecular modeling",
        "Publication record in peer-reviewed journals",
        "Excellent communication skills"
      ],
      benefits: [
        "Competitive salary and benefits",
        "Independent research opportunities",
        "Access to high-performance computing facilities",
        "International collaboration opportunities",
        "Career development support"
      ],
      deadline: "2024-05-15",
      isActive: false
    }
  ];

  const types = ['all', 'PhD', 'M.Tech', 'B.Tech', 'Internship', 'Postdoc'];

  const filteredOpportunities = selectedType === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.type === selectedType);

  const activeOpportunities = filteredOpportunities.filter(opp => opp.isActive);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        university: '',
        gpa: '',
        experience: '',
        interests: '',
        resume: null
      });
    }, 3000);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'PhD': 'bg-blue-100 text-blue-800',
      'M.Tech': 'bg-green-100 text-green-800',
      'B.Tech': 'bg-orange-100 text-orange-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Postdoc': 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Research Opportunities
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our dynamic research team and contribute to cutting-edge discoveries in 
              chembiosystems research. We offer opportunities for students and researchers 
              at all levels to engage in innovative projects.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {activeOpportunities.length}
                </div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {activeOpportunities.filter(opp => opp.type === 'PhD').length}
                </div>
                <div className="text-sm text-gray-600">PhD Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {activeOpportunities.filter(opp => opp.type === 'Internship').length}
                </div>
                <div className="text-sm text-gray-600">Internships</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {activeOpportunities.filter(opp => opp.type.includes('Tech')).length}
                </div>
                <div className="text-sm text-gray-600">Student Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Type:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {type === 'all' ? 'All Opportunities' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeOpportunities.map((opportunity) => (
              <div 
                key={opportunity.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {opportunity.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                        {opportunity.type}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{opportunity.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Deadline</div>
                    <div className="text-sm font-medium text-red-600">
                      {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {opportunity.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {opportunity.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                      {opportunity.requirements.length > 3 && (
                        <li className="text-blue-600 text-xs">
                          +{opportunity.requirements.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {opportunity.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {opportunity.benefits.length > 3 && (
                        <li className="text-green-600 text-xs">
                          +{opportunity.benefits.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Apply before {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                  <a 
                    href="#application-form"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {activeOpportunities.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No active opportunities found
              </h3>
              <p className="text-gray-500">
                Check back later or contact us for future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apply for Research Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to express your interest in joining our research team.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-green-700">
                Thank you for your interest. We will review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Program *
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Program</option>
                    <option value="PhD">PhD</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    University/Institution *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-2">
                    GPA/CGPA
                  </label>
                  <input
                    type="text"
                    id="gpa"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    placeholder="e.g., 8.5/10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your relevant research experience, projects, internships, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                  Research Interests *
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your research interests and why you want to join our lab"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> your resume
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 5MB)</p>
                    </div>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                {formData.resume && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Feel free to reach out to us for more information about research opportunities, 
            application procedures, or any other queries.
          </p>
          <a 
            href="mailto:prodyut.dhar@iitbhu.ac.in"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesPage;