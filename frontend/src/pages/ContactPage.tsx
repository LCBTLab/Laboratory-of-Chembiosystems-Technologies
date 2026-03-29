import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        subject: '',
        message: '',
        type: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Address",
      details: [
        "Laboratory of Chembiosystems Research",
        "School of Biochemical Engineering",
        "IIT (BHU), Varanasi",
        "Uttar Pradesh, India - 221005"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email",
      details: [
        "prodyut.dhar@iitbhu.ac.in",
        "lab.chembiosystems@iitbhu.ac.in"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-purple-600" />,
      title: "Phone",
      details: [
        "+91 (542) 2307-XXX",
        "+91 (542) 2368-XXX (Lab)"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Research Collaboration",
      description: "Interested in collaborative research projects",
      email: "prodyut.dhar@iitbhu.ac.in",
      subject: "Research Collaboration Inquiry"
    },
    {
      title: "Student Opportunities",
      description: "PhD, M.Tech, B.Tech project inquiries",
      email: "prodyut.dhar@iitbhu.ac.in",
      subject: "Student Opportunity Inquiry"
    },
    {
      title: "Industry Partnerships",
      description: "Technology transfer and industry collaboration",
      email: "prodyut.dhar@iitbhu.ac.in",
      subject: "Industry Partnership Inquiry"
    },
    {
      title: "Media & Press",
      description: "Media inquiries and press releases",
      email: "lab.chembiosystems@iitbhu.ac.in",
      subject: "Media Inquiry"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get in touch with our research team for collaborations, student opportunities, 
              or any inquiries about our work. We're always excited to connect with fellow 
              researchers and potential partners.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {info.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quick Contact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the most relevant contact option for your inquiry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {link.description}
                </p>
                <a 
                  href={`mailto:${link.email}?subject=${encodeURIComponent(link.subject)}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {link.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-green-700">
                Thank you for contacting us. We'll get back to you within 24-48 hours.
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Research Collaboration</option>
                    <option value="student">Student Opportunities</option>
                    <option value="industry">Industry Partnership</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Laboratory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of IIT (BHU) campus in Varanasi, our laboratory 
              is easily accessible and welcomes visitors by appointment.
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Interactive map would be embedded here</p>
              <a 
                href="https://maps.google.com/maps?q=IIT+BHU+Varanasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Let's Collaborate
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                We're always interested in new collaborations, partnerships, and 
                opportunities to advance scientific knowledge. Whether you're a 
                researcher, student, or industry professional, we'd love to hear from you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-300 mr-3" />
                  <span>Research collaborations welcome</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-300 mr-3" />
                  <span>Industry partnerships available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-300 mr-3" />
                  <span>Student opportunities year-round</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-300 mr-3" />
                  <span>Technology transfer support</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Quick Response</h3>
              <p className="text-blue-100 mb-6">
                We typically respond to inquiries within 24-48 hours. For urgent matters, 
                please call our office directly.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-300 mr-3" />
                  <span className="text-sm">Email responses: 24-48 hours</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-300 mr-3" />
                  <span className="text-sm">Phone calls: Same day</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-300 mr-3" />
                  <span className="text-sm">Office visits: By appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;