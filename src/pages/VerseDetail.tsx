import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookmarkPlus, Share2, Copy } from 'lucide-react';
import { getVerse } from '../api/gitaApi';
import type { Verse } from '../api/gitaApi';

const VerseDetail = () => {
  const { ch, v } = useParams<{ ch: string; v: string }>();
  const navigate = useNavigate();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const chapterNumber = parseInt(ch || '1', 10);
  const verseNumber = parseInt(v || '1', 10);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setLoading(true);
        const data = await getVerse(chapterNumber, verseNumber);
        setVerse(data);
        setError(null);

        // Check if bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
        setBookmarked(bookmarks.includes(`${chapterNumber}.${verseNumber}`));
      } catch (err) {
        setError('Failed to load verse. Please try again later.');
        console.error('Error fetching verse:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
    window.scrollTo(0, 0);
  }, [chapterNumber, verseNumber]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
    const verseId = `${chapterNumber}.${verseNumber}`;

    if (bookmarked) {
      const filtered = bookmarks.filter((id: string) => id !== verseId);
      localStorage.setItem('gitaBookmarks', JSON.stringify(filtered));
      setBookmarked(false);
    } else {
      bookmarks.push(verseId);
      localStorage.setItem('gitaBookmarks', JSON.stringify(bookmarks));
      setBookmarked(true);
    }
  };

  const handleShare = async () => {
    if (!verse) return;

    const shareText = `${verse.text}\n\n- Bhagavad Gita ${chapterNumber}.${verseNumber}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bhagavad Gita ${chapterNumber}.${verseNumber}`,
          text: shareText,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Verse copied to clipboard!');
    }
  };

  const handleCopy = () => {
    if (!verse) return;

    const copyText = `${verse.text}\n\nTransliteration: ${verse.transliteration}\n\n${
      verse.translations?.[0]?.description || ''
    }\n\n- Bhagavad Gita ${chapterNumber}.${verseNumber}`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading verse...</p>
        </div>
      </div>
    );
  }

  if (error || !verse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">{error || 'Verse not found'}</p>
          <button
            onClick={() => navigate(`/chapter/${chapterNumber}`)}
            className="mt-4 px-4 py-2 bg-saffron-600 text-white rounded-lg hover:bg-saffron-700 transition-colors"
          >
            Back to Chapter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to={`/chapter/${chapterNumber}`}
            className="inline-flex items-center space-x-2 text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Chapter {chapterNumber}</span>
          </Link>
        </motion.div>

        {/* Verse Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-saffron-50 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-saffron-200"
        >
          {/* Header with Actions */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-saffron-200">
            <h1 className="font-playfair text-3xl font-bold text-saffron-700">
              Verse {chapterNumber}.{verseNumber}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-lg transition-all ${
                  bookmarked
                    ? 'bg-saffron-600 text-white shadow-lg'
                    : 'bg-white border-2 border-saffron-300 text-saffron-600 hover:bg-saffron-50'
                }`}
                title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
              >
                <BookmarkPlus size={20} />
              </button>
              <button
                onClick={handleCopy}
                className="p-3 rounded-lg bg-white border-2 border-saffron-300 text-saffron-600 hover:bg-saffron-50 transition-all"
                title="Copy Verse"
              >
                {copied ? <span className="text-sm font-medium">Copied!</span> : <Copy size={20} />}
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg bg-white border-2 border-saffron-300 text-saffron-600 hover:bg-saffron-50 transition-all"
                title="Share Verse"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Sanskrit Text */}
          <div className="mb-8 p-6 bg-gradient-to-r from-saffron-100 to-orange-100 rounded-xl">
            <p className="sanskrit-text text-center leading-loose">{verse.text}</p>
          </div>

          {/* Transliteration */}
          {verse.transliteration && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Transliteration</h3>
              <p className="text-gray-600 italic text-lg leading-relaxed bg-white p-4 rounded-lg">
                {verse.transliteration}
              </p>
            </div>
          )}

          {/* Word Meanings */}
          {verse.word_meanings && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Word Meanings</h3>
              <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
                {verse.word_meanings}
              </p>
            </div>
          )}

          {/* Translations */}
          {verse.translations && verse.translations.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Translations</h3>
              <div className="space-y-4">
                {verse.translations.map((translation, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-saffron-500">
                    <p className="text-gray-700 leading-relaxed mb-2">"{translation.description}"</p>
                    <p className="text-sm text-gray-500">— {translation.author_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commentaries */}
          {verse.commentaries && verse.commentaries.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Commentaries</h3>
              <div className="space-y-4">
                {verse.commentaries.map((commentary, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-saffron-50 to-white p-5 rounded-lg border-l-4 border-orange-500 shadow-sm"
                  >
                    <p className="text-gray-700 leading-relaxed mb-2">{commentary.description}</p>
                    <p className="text-sm text-gray-500">— {commentary.author_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-8"
        >
          <button
            onClick={() => {
              if (verseNumber > 1) {
                navigate(`/chapter/${chapterNumber}/verse/${verseNumber - 1}`);
              }
            }}
            disabled={verseNumber === 1}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              verseNumber === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-saffron-500 text-saffron-700 hover:bg-saffron-50 shadow-md hover:shadow-lg'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Previous Verse</span>
          </button>

          <button
            onClick={() => navigate(`/chapter/${chapterNumber}/verse/${verseNumber + 1}`)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-white border-2 border-saffron-500 text-saffron-700 hover:bg-saffron-50 shadow-md hover:shadow-lg transition-all"
          >
            <span>Next Verse</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VerseDetail;
