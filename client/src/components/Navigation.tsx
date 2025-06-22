import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const authenticatedNavItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Credentials', href: '/credentials' },
    { title: 'Verify', href: '/verify' },
    { title: 'Share', href: '/share' },
  ];

  const publicNavItems = [
    { title: 'Features', action: () => scrollToSection('features') },
    { title: 'How It Works', action: () => scrollToSection('how-it-works') },
    { title: 'Security', action: () => scrollToSection('security') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {authenticatedNavItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/settings">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 hover:text-purple-300 transition-all duration-300 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-white hover:bg-white/10 hover:text-red-300 transition-all duration-300 font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 hover:text-purple-300 transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium px-6">
                    Create Your Digital ID
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              {isAuthenticated ? (
                <>
                  {authenticatedNavItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white/80 hover:text-white transition-colors duration-200 px-4 py-2 hover:bg-white/5 rounded"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 px-4">
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="text-white hover:bg-white/10 justify-start w-full">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleLogout}
                      variant="ghost" 
                      className="text-white hover:bg-white/10 hover:text-red-300 justify-start w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {publicNavItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={item.action}
                      className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 px-4 py-2 hover:bg-white/5 rounded"
                    >
                      {item.title}
                    </button>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 px-4">
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="text-white hover:bg-white/10 justify-start w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 justify-start w-full">
                        Create Your Digital ID
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
