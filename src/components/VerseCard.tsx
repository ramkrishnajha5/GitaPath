import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Share2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import type { Verse } from '../api/gitaApi';

interface VerseCardProps {
  verse: Verse;
}

const VerseCard = ({ verse }: VerseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
    const verseId = `${verse.chapter_number}.${verse.verse_number}`;
    setBookmarked(bookmarks.includes(verseId));
  }, [verse.chapter_number, verse.verse_number]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('gitaBookmarks') || '[]');
    const verseId = `${verse.chapter_number}.${verse.verse_number}`;

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
    if (!verseRef.current) return;

    setIsSharing(true);
    try {
      const canvas = await html2canvas(verseRef.current, {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fffbeb',
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], `gita-verse-${verse.chapter_number}-${verse.verse_number}.png`, { type: 'image/png' });

          if (navigator.share && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
              });
            } catch (error) {
              console.log('Share cancelled');
            }
          } else {
            // Fallback: download the image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `gita-verse-${verse.chapter_number}-${verse.verse_number}.png`;
            link.click();
            URL.revokeObjectURL(url);
          }
        }
        setIsSharing(false);
      });
    } catch (error) {
      console.error('Error sharing verse:', error);
      setIsSharing(false);
    }
  };

  // Get first Hindi and first English translation for main display
  const firstHindiTranslation = verse.translations?.find(t => t.language === 'hindi');
  const firstEnglishTranslation = verse.translations?.find(t => t.language === 'english');

  // Get remaining translations to show in "Other Translations"
  const firstHindiIdx = verse.translations?.findIndex(tr => tr.language === 'hindi') ?? -1;
  const firstEnglishIdx = verse.translations?.findIndex(tr => tr.language === 'english') ?? -1;
  const otherTranslations = verse.translations?.filter((_, idx) => {
    return idx !== firstHindiIdx && idx !== firstEnglishIdx;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="verse-card relative"
    >
      {/* Verse Content for Sharing */}
      <div ref={verseRef} className="verse-share-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/chapter/${verse.chapter_number}/verse/${verse.verse_number}`}
            className="font-semibold text-saffron-700 dark:text-amber-400 hover:text-saffron-800 dark:hover:text-amber-300 flex items-center space-x-1"
          >
            <span>Verse {verse.chapter_number}.{verse.verse_number}</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Sanskrit Text */}
        <div className="mb-3 p-3 bg-gradient-to-r from-saffron-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
          <p className="sanskrit-text text-center text-sm sm:text-base leading-snug">{verse.text}</p>
        </div>

        {/* Translations - Hindi First (Bold), then English */}
        {verse.translations && verse.translations.length > 0 && (
          <div className="mb-3 space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Translation</h4>

            {/* Hindi Translation (Bold) */}
            {firstHindiTranslation && (
              <div className="bg-gradient-to-r from-saffron-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-3 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 leading-snug font-bold text-sm sm:text-base">
                  {firstHindiTranslation.description}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5">
                  — {firstHindiTranslation.author_name}
                </p>
              </div>
            )}

            {/* English Translation */}
            {firstEnglishTranslation && (
              <div className="bg-gradient-to-r from-saffron-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-snug italic text-sm sm:text-base">
                  "{firstEnglishTranslation.description}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  — {firstEnglishTranslation.author_name}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-4 pt-2 border-t border-saffron-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all font-medium ${bookmarked
              ? 'bg-saffron-600 dark:bg-amber-600 text-white shadow-lg'
              : 'bg-saffron-100 dark:bg-gray-700 text-saffron-700 dark:text-amber-400 hover:bg-saffron-200 dark:hover:bg-gray-600'
              }`}
            title={bookmarked ? 'Remove bookmark' : 'Save verse'}
          >
            <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all font-medium disabled:opacity-50"
            title="Share as image"
          >
            <Share2 size={18} />
            <span>{isSharing ? 'Preparing...' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-center space-x-2 py-2 text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
      >
        <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
        {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Detailed Information */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-saffron-200 space-y-4">
              {/* Transliteration */}
              {verse.transliteration && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Transliteration</h4>
                  <p className="text-gray-600 dark:text-gray-400 italic">{verse.transliteration}</p>
                </div>
              )}

              {/* Word Meanings */}
              {verse.word_meanings && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Word Meanings</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{verse.word_meanings}</p>
                </div>
              )}

              {/* Additional Translations */}
              {otherTranslations && otherTranslations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Other Translations</h4>
                  <div className="space-y-3">
                    {otherTranslations.map((translation, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                          style={translation.language === 'hindi' ? { fontWeight: 'bold' } : {}}>
                          {translation.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          — {translation.author_name} ({translation.language})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commentaries */}
              {verse.commentaries && verse.commentaries.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Commentaries</h4>
                  <div className="space-y-3">
                    {verse.commentaries.map((commentary, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-saffron-50 to-white dark:from-gray-700 dark:to-gray-600 p-3 rounded-lg border-l-2 border-saffron-500 dark:border-amber-600">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{commentary.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">— {commentary.author_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VerseCard;
