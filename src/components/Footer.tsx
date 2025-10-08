import React from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lab Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Laboratory of Chembiosystems Research</h3>
            <p className="text-gray-300 mb-4">
              Exploring the Interface of Chemistry and Biology for Sustainable Solutions
            </p>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300">
                  School of Biochemical Engineering<br />
                  IIT (BHU), Varanasi<br />
                  Uttar Pradesh, India - 221005
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:prodyut.dhar@iitbhu.ac.in" className="text-gray-300 hover:text-white transition-colors">
                  prodyut.dhar@iitbhu.ac.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+91 (542) 2307-XXX</span>
              </div>
            </div>
          </div>

          {/* Institutional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Institutional Links</h3>
            <div className="space-y-2">
              <a 
                href="https://www.iitbhu.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>IIT (BHU) Varanasi</span>
              </a>
              <a 
                href="https://www.iitbhu.ac.in/dept/bce" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>School of Biochemical Engineering</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-White-400">
                Design & Developed By Anoop kuamr Singh
              </p>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Laboratory of Chembiosystems Research, IIT (BHU). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
