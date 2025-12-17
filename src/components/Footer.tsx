import { Heart, ExternalLink, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-saffron-900 to-orange-900 dark:from-amber-950 dark:to-orange-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-3 flex items-center justify-center md:justify-start">
              <span className="mr-2">🕉️</span> GitaPath
            </h3>
            <p className="text-saffron-100 text-sm leading-relaxed">
              Your digital companion for reading and understanding the eternal wisdom of Shreemad Bhagavad Gita.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-saffron-100 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/chapters" className="hover:text-white transition-colors">All Chapters</Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">Saved Verses</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Attribution</h3>
            <p className="text-saffron-100 text-sm mb-2">
              Powered by Bhagavad Gita API
            </p>
            <a
              href="https://vedicscriptures.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-200 hover:text-white transition-colors text-sm inline-flex items-center"
            >
              Vedic Scriptures API <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-saffron-700 mt-8 pt-6 text-center">
          <p className="text-saffron-100 text-sm flex items-center justify-center flex-wrap gap-1">
            Made with <Heart size={16} className="mx-1 text-red-400 fill-red-400" /> by
            <span className="font-semibold text-white ml-1">RAM KRISHNA</span>
            <a
              href="https://www.instagram.com/ramkrishnajha5"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-1.5 rounded-full bg-saffron-700/50 hover:bg-saffron-600 transition-colors"
              title="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://github.com/ramkrishnajha5"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1.5 rounded-full bg-saffron-700/50 hover:bg-saffron-600 transition-colors"
              title="GitHub"
            >
              <Github size={16} />
            </a>
          </p>
          <p className="text-saffron-200 text-xs mt-2">
            © {new Date().getFullYear()} GitaPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

