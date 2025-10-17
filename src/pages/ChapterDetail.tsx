import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { getChapter, getChapterVerses } from '../api/gitaApi';
import type { Chapter, Verse } from '../api/gitaApi';
import VerseCard from '../components/VerseCard';

const ChapterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chapterNumber = parseInt(id || '1', 10);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const [chapterData, versesData] = await Promise.all([
          getChapter(chapterNumber),
          getChapterVerses(chapterNumber),
        ]);
        setChapter(chapterData);
        setVerses(versesData);
        setError(null);
      } catch (err) {
        setError('Failed to load chapter. Please try again later.');
        console.error('Error fetching chapter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
    window.scrollTo(0, 0);
  }, [chapterNumber]);

  const handlePrevious = () => {
    if (chapterNumber > 1) {
      navigate(`/chapter/${chapterNumber - 1}`);
    }
  };

  const handleNext = () => {
    if (chapterNumber < 18) {
      navigate(`/chapter/${chapterNumber + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">{error || 'Chapter not found'}</p>
          <button
            onClick={() => navigate('/chapters')}
            className="mt-4 px-4 py-2 bg-saffron-600 text-white rounded-lg hover:bg-saffron-700 transition-colors"
          >
            Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/chapters"
            className="inline-flex items-center space-x-2 text-saffron-600 dark:text-amber-400 hover:text-saffron-700 dark:hover:text-amber-300 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Chapters</span>
          </Link>
        </motion.div>

        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-saffron-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border-2 border-saffron-200 dark:border-amber-900"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-saffron-500 to-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg mr-4">
              {chapter.chapter_number}
            </div>
            <div className="text-center">
              <h1 className="chapter-title mb-2">{chapter.name_transliterated}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{chapter.name_translated}</p>
            </div>
          </div>

          {chapter.chapter_summary && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <BookOpen className="mr-2 text-saffron-600 dark:text-amber-400" size={20} />
                Chapter Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{chapter.chapter_summary}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-saffron-700 dark:text-amber-400">{chapter.verses_count}</span> Verses
            </p>
          </div>
        </motion.div>

        {/* Verses List */}
        <div className="space-y-6">
          <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-amber-400 mb-4">Verses</h2>
          {verses.map((verse) => (
            <VerseCard key={verse.id} verse={verse} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-12 pt-8 border-t border-saffron-200"
        >
          <button
            onClick={handlePrevious}
            disabled={chapterNumber === 1}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              chapterNumber === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border-2 border-saffron-500 dark:border-amber-600 text-saffron-700 dark:text-amber-400 hover:bg-saffron-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Previous Chapter</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Chapter</p>
            <p className="text-2xl font-bold text-saffron-700 dark:text-amber-400">{chapterNumber} / 18</p>
          </div>

          <button
            onClick={handleNext}
            disabled={chapterNumber === 18}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              chapterNumber === 18
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border-2 border-saffron-500 dark:border-amber-600 text-saffron-700 dark:text-amber-400 hover:bg-saffron-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <span>Next Chapter</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChapterDetail;
