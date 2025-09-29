import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Beaker, User, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Principal Investigator', href: '/pi' },
    { name: 'Team', href: '/team' },
    { name: 'Research', href: '/research' },
    { name: 'Publications', href: '/publications' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
      
<Link to="/" className="flex items-center space-x-5 min-w-0">
  <img 
    src="Kroofy01/LCBT/blob/main/src/logo.png" 
    alt="Laboratory of Chembiosystem & Technologies Logo" 
    className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 object-contain"
  />
  <div className="sm:flex flex-col leading-tight min-w-0">
    <h1 className="text-base sm:text-lg font-semibold text-gray-700 whitespace-normal max-w-xs sm:max-w-md truncate">
      Laboratory of Chembiosystem & Technologies
    </h1>
    <p className="text-xs text-gray-600 truncate">IIT (BHU) Varanasi</p>
  </div>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 ml-6 flex-1 justify-end">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Member Login
              </Link>
            )}
          </div>

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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 break-words ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Member Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
