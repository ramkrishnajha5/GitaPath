import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getVerse } from '../api/gitaApi';
import type { Verse } from '../api/gitaApi';

const SavedVerses = () => {
  const [savedVerses, setSavedVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedVerses = async () => {
      try {
        const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
        const versesData: Verse[] = [];

        for (const bookmark of bookmarks) {
          const [ch, v] = bookmark.split('.');
          try {
            const verse = await getVerse(parseInt(ch), parseInt(v));
            versesData.push(verse);
          } catch (error) {
            console.error(`Error fetching verse ${bookmark}:`, error);
          }
        }

        setSavedVerses(versesData);
      } catch (error) {
        console.error('Error loading saved verses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVerses();
  }, []);

  const handleRemoveVerse = (chapterNumber: number, verseNumber: number) => {
    const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
    const verseId = `${chapterNumber}.${verseNumber}`;
    const filtered = bookmarks.filter((id: string) => id !== verseId);
    localStorage.setItem('gitaBookmarks', JSON.stringify(filtered));
    setSavedVerses(savedVerses.filter(v => !(v.chapter_number === chapterNumber && v.verse_number === verseNumber)));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading saved verses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Bookmark className="text-saffron-600 dark:text-amber-400 mr-3" size={40} />
            <h1 className="chapter-title">Saved Verses</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Your personal collection of wisdom from the Bhagavad Gita
          </p>
        </motion.div>

        {/* Empty State */}
        {savedVerses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-gradient-to-br from-white to-saffron-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-12 max-w-md mx-auto border border-saffron-200 dark:border-amber-900">
              <BookOpen className="mx-auto text-saffron-400 dark:text-amber-500 mb-4" size={64} />
              <h3 className="font-playfair text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                No Saved Verses Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start saving your favorite verses to build your personal collection of wisdom
              </p>
              <Link
                to="/chapters"
                className="devotional-button inline-flex items-center space-x-2"
              >
                <BookOpen size={20} />
                <span>Browse Chapters</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Count */}
            <div className="mb-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                You have <span className="font-semibold text-saffron-700 dark:text-amber-400">{savedVerses.length}</span> saved verse{savedVerses.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Saved Verses Grid */}
            <div className="space-y-6">
              {savedVerses.map((verse, index) => (
                <motion.div
                  key={`${verse.chapter_number}.${verse.verse_number}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="verse-card"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      to={`/chapter/${verse.chapter_number}/verse/${verse.verse_number}`}
                      className="font-semibold text-saffron-700 dark:text-amber-400 hover:text-saffron-800 dark:hover:text-amber-300 flex items-center space-x-1"
                    >
                      <span>Verse {verse.chapter_number}.{verse.verse_number}</span>
                    </Link>
                    <button
                      onClick={() => handleRemoveVerse(verse.chapter_number, verse.verse_number)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Sanskrit Text */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-saffron-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <p className="sanskrit-text text-center">{verse.text}</p>
                  </div>

                  {/* English Translation */}
                  {verse.translations && verse.translations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">English Translation</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{verse.translations[0].description}"
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        — {verse.translations[0].author_name}
                      </p>
                    </div>
                  )}

                  {/* Hindi Translation */}
                  {verse.translations && verse.translations.find(t => t.language === 'hindi') && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">हिंदी अनुवाद</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-bold">
                        "{verse.translations.find(t => t.language === 'hindi')?.description}"
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedVerses;
