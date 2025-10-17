import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Loader } from 'lucide-react';
import { searchVerses } from '../api/gitaApi';
import type { Verse } from '../api/gitaApi';
import VerseCard from '../components/VerseCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchVerses(query);
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError('Failed to search verses. Please try again.');
      console.error('Error searching verses:', err);
    } finally {
      setLoading(false);
    }
  };

  const suggestedSearches = [
    'peace',
    'duty',
    'karma',
    'dharma',
    'yoga',
    'devotion',
    'knowledge',
    'action',
    'soul',
    'wisdom',
  ];

  const handleSuggestedSearch = async (keyword: string) => {
    setQuery(keyword);
    try {
      setLoading(true);
      setError(null);
      const data = await searchVerses(keyword);
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError('Failed to search verses. Please try again.');
      console.error('Error searching verses:', err);
    } finally {
      setLoading(false);
    }
  };

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
            <SearchIcon className="text-saffron-600 mr-3" size={40} />
            <h1 className="chapter-title">Search Verses</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Search for verses by keywords to discover the wisdom of the Bhagavad Gita on any topic.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for peace, dharma, karma, devotion..."
                className="w-full px-6 py-4 pr-14 text-lg rounded-xl border-2 border-saffron-300 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-200 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-saffron-500 to-orange-600 text-white p-3 rounded-lg hover:from-saffron-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <SearchIcon size={20} />}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Suggested Searches */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-center font-semibold text-gray-700 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestedSearches.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleSuggestedSearch(keyword)}
                  className="px-4 py-2 bg-white border-2 border-saffron-300 text-saffron-700 rounded-lg hover:bg-saffron-50 hover:border-saffron-500 transition-all font-medium"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-lg">Searching verses...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && searched && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {results.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 text-center">
                    Found <span className="font-semibold text-saffron-700">{results.length}</span> verse
                    {results.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                </div>
                <div className="space-y-6">
                  {results.map((verse) => (
                    <VerseCard key={verse.id} verse={verse} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-8 max-w-md mx-auto">
                  <p className="text-saffron-800 font-medium mb-2">No verses found</p>
                  <p className="text-gray-600 text-sm">
                    Try searching with different keywords like "peace", "karma", or "devotion"
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Info Box */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white to-saffron-50 rounded-xl shadow-lg p-8 border border-saffron-200"
          >
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4 text-center">
              Discover Timeless Wisdom
            </h3>
            <p className="text-gray-700 leading-relaxed text-center mb-4">
              The Bhagavad Gita offers profound insights on every aspect of life. Use the search to find
              verses related to your spiritual questions and life challenges.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-saffron-700 mb-2">🧘 Spiritual Topics</p>
                <p className="text-sm text-gray-600">yoga, meditation, devotion, knowledge</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-saffron-700 mb-2">⚖️ Life Guidance</p>
                <p className="text-sm text-gray-600">duty, dharma, action, decision</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-saffron-700 mb-2">🕉️ Philosophy</p>
                <p className="text-sm text-gray-600">soul, self, reality, truth</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-saffron-700 mb-2">💫 Emotions</p>
                <p className="text-sm text-gray-600">peace, happiness, anger, fear</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
