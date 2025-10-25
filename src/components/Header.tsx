import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [clickedMenu, setClickedMenu] = useState<number | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState('/');

  const navigation = [
    { 
      name: 'Home', 
      href: '/',
      hasDropdown: false
    },
    { 
      name: 'About', 
      href: '/about',
      hasDropdown: false
    },
    { 
      name: 'Principal Investigator', 
      href: '/pi',
      hasDropdown: false
    },
    { 
      name: 'Team', 
      href: '/team',
      hasDropdown: false
    },
    { 
      name: 'Research', 
      href: '/research',
      hasDropdown: false
    },
    { 
      name: 'Publications', 
      href: '/publications',
      hasDropdown: false
    },
    { 
      name: 'Patents', 
      href: '/patents',
      hasDropdown: false
    },
    { 
      name: 'Gallery', 
      href: '/gallery',
      hasDropdown: false
    },
    { 
      name: 'Opportunities', 
      href: '/opportunities',
      hasDropdown: false
    },
    { 
      name: 'News', 
      href: '/news',
      hasDropdown: false
    },
    { 
      name: 'Contact', 
      href: '/contact',
      hasDropdown: false
    },
  ];

  const isActive = (path: string) => currentPath === path;

  const handleMenuClick = (index: number, hasDropdown: boolean) => {
    if (hasDropdown) {
      setClickedMenu(clickedMenu === index ? null : index);
    }
  };

  const handleNavigation = (href: string) => {
    setCurrentPath(href);
    setIsMenuOpen(false);
    setClickedMenu(null);
    setHoveredMenu(null);
  };

  const isSubmenuOpen = (index: number) => {
    return clickedMenu === index;
  };

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
        
        .group:hover > div {
          pointer-events: auto;
        }
      `}</style>

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

            {/* Desktop Navigation - Evenly distributed with bigger tabs */}
            <nav className="hidden lg:flex space-x-1 flex-1 justify-end items-center">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group"
                >
                  <a
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
                    <a
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
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Current Page: {currentPath}
          </h2>
          <p className="text-gray-600">
            Click on navigation items to see the routing work. 
            Try hovering over menu items with dropdowns or clicking the arrow icons!
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
