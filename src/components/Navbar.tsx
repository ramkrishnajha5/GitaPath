import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Bookmark, Info, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-saffron-600 dark:text-amber-400 border-b-2 border-saffron-600 dark:border-amber-400'
      : 'text-gray-700 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-amber-400';
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b-2 border-saffron-100 dark:border-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center h-full py-2 group">
              <img 
                src="/logo.png" 
                alt="GitaPath Logo" 
                className="h-full w-auto object-contain group-hover:scale-105 transition-transform" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 transition-all ${isActive('/')}`}
              >
                <Home size={18} />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/chapters"
                className={`flex items-center space-x-1 px-3 py-2 transition-all ${isActive('/chapters')}`}
              >
                <BookOpen size={18} />
                <span className="font-medium">Chapters</span>
              </Link>

              <Link
                to="/saved"
                className={`flex items-center space-x-1 px-3 py-2 transition-all ${isActive('/saved')}`}
              >
                <Bookmark size={18} />
                <span className="font-medium">Saved Verses</span>
              </Link>

              <Link
                to="/about"
                className={`flex items-center space-x-1 px-3 py-2 transition-all ${isActive('/about')}`}
              >
                <Info size={18} />
                <span className="font-medium">About Us</span>
              </Link>
            </div>

            {/* Right Side: Dark Mode Toggle + Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-saffron-100 dark:bg-gray-700 text-saffron-700 dark:text-amber-400 hover:bg-saffron-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Menu Links */}
                <nav className="flex-1 px-4 space-y-2">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Home size={20} />
                    <span className="font-medium">Home</span>
                  </Link>

                  <Link
                    to="/chapters"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <BookOpen size={20} />
                    <span className="font-medium">Chapters</span>
                  </Link>

                  <Link
                    to="/saved"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Bookmark size={20} />
                    <span className="font-medium">Saved Verses</span>
                  </Link>

                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-saffron-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Info size={20} />
                    <span className="font-medium">About Us</span>
                  </Link>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
