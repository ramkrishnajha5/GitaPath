import { motion } from 'framer-motion';
import { BookOpen, Heart, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="chapter-title mb-4">About GitaPath</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Your digital companion for exploring the eternal wisdom of the Bhagavad Gita
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-saffron-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-saffron-200 dark:border-amber-900"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="font-playfair text-3xl font-bold text-saffron-800 dark:text-amber-400 mb-4">
              What is the Bhagavad Gita?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>Bhagavad Gita</strong>, often called the Gita, is a 700-verse Hindu scripture
              that forms part of the ancient Indian epic Mahabharata. It is a sacred conversation between
              Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Faced with the moral dilemma of fighting against his own relatives, Arjuna turns to Krishna
              for guidance. What follows is a profound philosophical discourse on duty (dharma), righteousness,
              the nature of reality, paths to liberation, and the relationship between the individual soul
              and the Supreme.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Gita synthesizes various strands of Indian philosophy and presents a comprehensive spiritual
              vision that has inspired millions across the world for over two millennia. Its teachings on
              selfless action, devotion, and knowledge continue to offer timeless guidance for navigating
              life's challenges.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="devotional-card">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-saffron-500 to-orange-600 p-3 rounded-lg mr-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 dark:text-amber-400">18 Chapters</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The Gita is organized into 18 chapters, each focusing on different aspects of spiritual
              philosophy, from yoga and meditation to devotion and knowledge.
            </p>
          </div>

          <div className="devotional-card">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-saffron-500 to-orange-600 p-3 rounded-lg mr-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 dark:text-amber-400">700 Verses</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Each verse (shloka) in Sanskrit is accompanied by transliterations, translations, and
              commentaries to help deepen your understanding.
            </p>
          </div>

          <div className="devotional-card">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-saffron-500 to-orange-600 p-3 rounded-lg mr-4">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 dark:text-amber-400">Universal Wisdom</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The teachings of the Gita transcend religious boundaries and speak to universal human
              concerns about purpose, meaning, and ethical living.
            </p>
          </div>

          <div className="devotional-card">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-saffron-500 to-orange-600 p-3 rounded-lg mr-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 dark:text-amber-400">Path to Peace</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Through the Gita's teachings, discover paths to inner peace, self-realization, and
              spiritual fulfillment in daily life.
            </p>
          </div>
        </motion.div>

        {/* About GitaPath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-saffron-100 dark:border-amber-900"
        >
          <h2 className="font-playfair text-3xl font-bold text-saffron-800 dark:text-amber-400 mb-4 text-center">
            About This Platform
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>GitaPath</strong> is designed to make the wisdom of the Bhagavad Gita accessible to
            everyone, anywhere. Our platform provides:
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Complete Sanskrit text with accurate transliterations</span>
            </li>
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Multiple English translations from renowned scholars</span>
            </li>
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Detailed commentaries to help understand deeper meanings</span>
            </li>
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Powerful search functionality to find relevant verses</span>
            </li>
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Beautiful, distraction-free reading experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-saffron-600 dark:text-amber-400 mr-2">✓</span>
              <span>Bookmark and share your favorite verses</span>
            </li>
          </ul>
        </motion.div>

        {/* Key Themes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-saffron-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 mb-8"
        >
          <h2 className="font-playfair text-3xl font-bold text-gray-800 dark:text-amber-400 mb-6 text-center">
            Key Themes in the Gita
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">Karma Yoga</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">The path of selfless action without attachment to results</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">Bhakti Yoga</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">The path of devotion and loving surrender to the Divine</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">Jnana Yoga</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">The path of knowledge and discriminative wisdom</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">Dharma</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Understanding one's duty and righteous path in life</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">The Eternal Self</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Realizing the immortal nature of the soul beyond the body</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-saffron-700 dark:text-amber-400 mb-2">Equanimity</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Maintaining balance and peace in all circumstances</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="font-playfair text-2xl font-bold text-gray-800 dark:text-amber-400 mb-4">
            Begin Your Spiritual Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start reading the Bhagavad Gita today and discover timeless wisdom for modern life.
          </p>
          <Link
            to="/chapters"
            className="devotional-button inline-flex items-center space-x-2"
          >
            <BookOpen size={20} />
            <span>Explore All Chapters</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
