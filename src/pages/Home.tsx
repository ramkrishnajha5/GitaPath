import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRandomVerse, getChapters } from '../api/gitaApi';
import type { Verse, Chapter } from '../api/gitaApi';
import ChapterCard from '../components/ChapterCard';
import JourneyStats from '../components/JourneyStats';

const Home = () => {
  const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check localStorage for cached daily verse
        const cachedData = localStorage.getItem('gitapath-daily-verse');
        let verse = null;
        let shouldFetchNewVerse = true;

        if (cachedData) {
          try {
            const { verse: cachedVerse, timestamp } = JSON.parse(cachedData);
            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            // Check if cached verse is still valid (less than 24 hours old) AND has required data
            if (now - timestamp < twentyFourHours && cachedVerse?.text && cachedVerse?.translations) {
              verse = cachedVerse;
              shouldFetchNewVerse = false;
              console.log('Using cached verse:', cachedVerse.chapter_number + '.' + cachedVerse.verse_number);
            } else {
              console.log('Cached verse is invalid or expired, fetching new one');
            }
          } catch (error) {
            console.error('Error parsing cached verse:', error);
            // Clear the invalid cache
            localStorage.removeItem('gitapath-daily-verse');
            // If parsing fails, we'll fetch a new verse
          }
        }

        // Fetch new verse if needed
        if (shouldFetchNewVerse) {
          try {
            console.log('Fetching new random verse...');
            verse = await getRandomVerse();
            console.log('Random verse fetched successfully:', verse.chapter_number + '.' + verse.verse_number);
            // Save to localStorage with current timestamp
            localStorage.setItem('gitapath-daily-verse', JSON.stringify({
              verse,
              timestamp: Date.now()
            }));
          } catch (verseError) {
            console.error('Error fetching random verse:', verseError);
            // Don't throw, we'll handle it gracefully
          }
        }

        // Fetch chapters
        const chaptersData = await getChapters();

        setDailyVerse(verse);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Even if chapters fail, try to show *something* for the verse
        if (!dailyVerse) {
          console.log('Attempting fallback verse...');
          try {
            const fallbackVerse = await getRandomVerse();
            setDailyVerse(fallbackVerse);
          } catch (fallbackError) {
            console.error('Fallback verse also failed:', fallbackError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center">
          {/* Om Symbol */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🕉️
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-saffron-700 via-orange-600 to-saffron-700 bg-clip-text text-transparent"
          >
            Shreemad Bhagavad Gita
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-philosopher text-2xl md:text-3xl text-gray-700 mb-6"
          >
            The Song of the Divine
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8"
          >
            Embark on a spiritual journey through the timeless wisdom of the Bhagavad Gita.
            Explore 18 chapters and 700 sacred verses that illuminate the path to self-realization,
            duty, and devotion. Read, reflect, and discover the eternal truths that guide millions
            towards enlightenment.
          </motion.p>

        </div>
      </motion.section>

      {/* Journey Through Sacred Wisdom */}
      <JourneyStats />

      {/* Daily Verse Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-saffron-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl p-8 border-2 border-saffron-200 dark:border-amber-900"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-saffron-600 dark:text-amber-400 mr-2" size={24} />
            <h2 className="font-playfair text-3xl font-bold text-saffron-800 dark:text-amber-400">
              Verse of the Day
            </h2>
            <Sparkles className="text-saffron-600 dark:text-amber-400 ml-2" size={24} />
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block w-12 h-12 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading verse...</p>
            </div>
          ) : dailyVerse ? (
            <div className="space-y-4">
              {/* Sanskrit Text */}
              <div className="bg-gradient-to-r from-saffron-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
                <p className="sanskrit-text text-center">{dailyVerse.text}</p>
              </div>

              {/* Translation */}
              {dailyVerse.translations && dailyVerse.translations[0] && (
                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
                    "{dailyVerse.translations[0].description}"
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    — {dailyVerse.translations[0].author_name}
                  </p>
                </div>
              )}

              {/* Verse Reference */}
              <div className="text-center pt-4">
                <Link
                  to={`/chapter/${dailyVerse.chapter_number}/verse/${dailyVerse.verse_number}`}
                  className="inline-flex items-center space-x-2 text-saffron-600 dark:text-amber-400 hover:text-saffron-700 dark:hover:text-amber-300 font-semibold transition-colors group"
                >
                  <span>Read Full Verse {dailyVerse.chapter_number}.{dailyVerse.verse_number}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">Unable to load verse. Please try again later.</p>
          )}
        </motion.div>
      </section>

      {/* All Chapters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-amber-400">
          All Chapters
        </h2>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading chapters...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {chapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Home;
