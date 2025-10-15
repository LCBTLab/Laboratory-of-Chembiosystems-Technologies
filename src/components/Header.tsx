import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(null);
  const location = useLocation();
  const { user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navigation = [
    { 
      name: 'Home', 
      href: '/',
      hasDropdown: false
    },
    { 
      name: 'About', 
      href: '/about',
      hasDropdown: true,
      submenu: [
        { name: 'Overview', href: '/about/overview' },
        { name: 'Mission & Vision', href: '/about/mission' },
        { name: 'Lab History', href: '/about/history' },
        { name: 'Facilities', href: '/about/facilities' }
      ]
    },
    { 
      name: 'Principal Investigator', 
      href: '/pi',
      hasDropdown: false
    },
    { 
      name: 'Team', 
      href: '/team',
      hasDropdown: true,
      submenu: [
        { name: 'Current Students', href: '/team/current' },
        { name: 'Alumni', href: '/team/alumni' },
        { name: 'Visiting Researchers', href: '/team/visitors' },
        { name: 'Join Us', href: '/team/join' }
      ]
    },
    { 
      name: 'Research', 
      href: '/research',
      hasDropdown: true,
      submenu: [
        { name: 'Research Areas', href: '/research/areas' },
        { name: 'Current Projects', href: '/research/projects' },
        { name: 'Collaborations', href: '/research/collaborations' },
        { name: 'Equipment', href: '/research/equipment' }
      ]
    },
    { 
      name: 'Publications', 
      href: '/publications',
      hasDropdown: true,
      submenu: [
        { name: 'All Publications', href: '/publications' },
        { name: 'Recent Papers', href: '/publications/recent' },
        { name: 'Journal Articles', href: '/publications/journals' },
        { name: 'Conference Papers', href: '/publications/conferences' }
      ]
    },
    { 
      name: 'Patents', 
      href: '/patents',
      hasDropdown: false
    },
    { 
      name: 'Gallery', 
      href: '/gallery',
      hasDropdown: true,
      submenu: [
        { name: 'Photo Gallery', href: '/gallery/photos' },
        { name: 'Video Gallery', href: '/gallery/videos' },
        { name: 'Lab Tour', href: '/gallery/tour' }
      ]
    },
    { 
      name: 'Opportunities', 
      href: '/opportunities',
      hasDropdown: false
    },
    { 
      name: 'News', 
      href: '/news',
      hasDropdown: true,
      submenu: [
        { name: 'Latest News', href: '/news/latest' },
        { name: 'Events', href: '/news/events' },
        { name: 'Seminars', href: '/news/seminars' },
        { name: 'Workshops', href: '/news/workshops' }
      ]
    },
    { 
      name: 'Contact', 
      href: '/contact',
      hasDropdown: false
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
        
        /* Ensure dropdown is above other content */
        .group:hover > div {
          pointer-events: auto;
        }
      `}</style>

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo - More compact */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 mr-4">
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
            </Link>

            {/* Desktop Navigation - More compact */}
            <nav className="hidden lg:flex space-x-0.5 flex-1 justify-end">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-2 py-2 rounded-md text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`ml-0.5 h-3 w-3 transition-transform duration-200 ${
                          hoveredMenu === index ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown Menu - Fixed z-index */}
                  {item.hasDropdown && item.submenu && hoveredMenu === index && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in z-[100]"
                      onMouseEnter={() => setHoveredMenu(index)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setHoveredMenu(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-1 px-4">
                {navigation.map((item, index) => (
                  <div key={item.name}>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => {
                        if (item.hasDropdown) {
                          setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={(e) => {
                          if (item.hasDropdown) {
                            e.preventDefault();
                          } else {
                            setIsMenuOpen(false);
                          }
                        }}
                        className={`flex-1 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 mr-3 transition-transform duration-200 ${
                            mobileSubmenuOpen === index ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    {item.hasDropdown && item.submenu && mobileSubmenuOpen === index && (
                      <div className="pl-6 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
