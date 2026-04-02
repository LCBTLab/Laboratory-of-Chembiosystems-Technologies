import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [clickedMenu, setClickedMenu] = useState<number | null>(null);
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
        { name: 'Awards & Honours', href: '/about/awards-honours' },
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
      hasDropdown: false,
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
      hasDropdown: false,
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
      hasDropdown: false,
    },
    { 
      name: 'Patents', 
      href: '/patents',
      hasDropdown: false
    },
    {
      name: 'Facilities',
      href: '/gallery',
      hasDropdown: false,
    },
    { 
      name: 'Opportunities', 
      href: '/opportunities',
      hasDropdown: false
    },
    { 
      name: 'News', 
      href: '/news',
      hasDropdown: false,
    },
    { 
      name: 'Contact', 
      href: '/contact',
      hasDropdown: false
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMenuClick = (index: number, hasDropdown: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDropdown) {
      setClickedMenu(clickedMenu === index ? null : index);
    }
  };

  const isSubmenuOpen = (index: number) => {
    return hoveredMenu === index || clickedMenu === index;
  };

  const handleSubmenuClick = () => {
    setClickedMenu(null);
    setHoveredMenu(null);
    setIsMenuOpen(false);
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
      `}</style>

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 flex-1 justify-end items-center">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="relative dropdown-container"
                  onMouseEnter={() => item.hasDropdown && setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className={`px-3 py-2.5 rounded-md text-sm font-bold transition-colors duration-200 whitespace-nowrap ${
                        isActive(item.href)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={(e) => handleMenuClick(index, item.hasDropdown, e)}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-blue-700 hover:bg-blue-100'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isSubmenuOpen(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Desktop Dropdown Menu */}
                  {item.hasDropdown && item.submenu && isSubmenuOpen(index) && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in z-[100]"
                      onMouseEnter={() => setHoveredMenu(index)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={handleSubmenuClick}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Login/Dashboard Button */}
              <Link
                to={user ? '/dashboard' : '/login'}
                className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {user ? 'Dashboard' : 'Login'}
              </Link>
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
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                        className={`flex-1 block px-3 py-2.5 rounded-md text-base font-bold transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <button
                          onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index)}
                          className="p-2"
                        >
                          <ChevronDown
                            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                              mobileSubmenuOpen === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
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
                            className="block px-3 py-2.5 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Login/Dashboard Button */}
                <Link
                  to={user ? '/dashboard' : '/login'}
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 block px-4 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {user ? 'Dashboard' : 'Login'}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
