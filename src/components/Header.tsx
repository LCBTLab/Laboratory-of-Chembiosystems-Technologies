import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Principal Investigator', href: '/pi' },
    { name: 'Team', href: '/team' },
    { name: 'Research', href: '/research' },
    { name: 'Publications', href: '/publications' },
    { name: 'Patents', href: '/patents' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => currentPath === path;

  const handleNavigation = (href: string) => {
    setCurrentPath(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
              className="flex items-center space-x-2 flex-shrink-0 mr-4"
            >
              <img
                src="https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/logo.png"
                alt="Laboratory of Chembiosystem & Technologies Logo"
                className="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <h1 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight whitespace-nowrap">
                  Lab of Chembiosystems & Technologies
                </h1>
                <p className="text-xs text-gray-600">IIT (BHU)</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 flex-1 justify-end items-center">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className={`px-3 py-2.5 rounded-md text-sm font-bold transition-colors duration-200 whitespace-nowrap ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
              <nav className="flex flex-col space-y-1 px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    className={`block px-3 py-2.5 rounded-md text-base font-bold transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Current Page: <span className="text-blue-600">{currentPath}</span>
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Click on navigation items to navigate between pages.
          </p>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Available Pages:</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
              {navigation.map((item) => (
                <li key={item.name} className="flex items-center">
                  <span className="text-blue-500 mr-2">•</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
