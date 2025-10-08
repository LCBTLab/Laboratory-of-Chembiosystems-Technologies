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
    { name: 'Patents', href: '/patents' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16 py-2">


{/* Logo */}
<Link to="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  <img
    src="https://raw.githubusercontent.com/Kroofy01/image/refs/heads/main/logo.png"
    alt="Laboratory of Chembiosystem & Technologies Logo"
    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0 object-contain"
  />
  <div className="flex flex-col leading-tight">
    <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 leading-tight">
      Laboratory of Chembiosystems & Technologies
    </h1>
    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">IIT (BHU) Varanasi</p>
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
             
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
