import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Chapter } from '../api/gitaApi';

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

const ChapterCard = ({ chapter, index }: ChapterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="devotional-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-saffron-500 to-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            {chapter.chapter_number}
          </div>
          <div>
            <h3 className="font-playfair text-xl font-bold text-gray-800 dark:text-gray-100">
              {chapter.name_transliterated}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{chapter.name_translated}</p>
          </div>
        </div>
        <BookOpen className="text-saffron-500 dark:text-amber-400" size={24} />
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {chapter.chapter_summary}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-saffron-100 dark:border-gray-600">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {chapter.verses_count} Verses
        </span>
        <Link
          to={`/chapter/${chapter.chapter_number}`}
          className="inline-flex items-center space-x-1 text-saffron-600 dark:text-amber-400 hover:text-saffron-700 dark:hover:text-amber-300 font-semibold transition-colors group"
        >
          <span>Read Chapter</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ChapterCard;
