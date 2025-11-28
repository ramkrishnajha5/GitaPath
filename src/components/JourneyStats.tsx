import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  label: string;
  targetValue: number;
  duration: number;
  showInfinity?: boolean;
}

const StatItem = ({ label, targetValue, duration, showInfinity = false, isInView }: StatItemProps & { isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when out of view
    if (!isInView) {
      setCount(0);
      setIsComplete(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Start animation when in view
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Ease-out cubic function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * targetValue);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
        setIsComplete(true);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, isInView]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 md:h-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showInfinity && isComplete ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-saffron-600 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-yellow-500 dark:to-orange-400 bg-clip-text text-transparent">
            {count.toLocaleString()}
          </span>
        </motion.div>

        {showInfinity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isComplete ? 1 : 0,
              scale: isComplete ? 1 : 0.5
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-saffron-600 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-yellow-500 dark:to-orange-400 bg-clip-text text-transparent">
              ∞
            </span>
          </motion.div>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mt-1 md:mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide">
        {label}
      </p>
    </div>
  );
};

const JourneyStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // Allow repeated animations
    margin: "-100px" // Trigger when section is 100px into viewport
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="w-full py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-saffron-50 via-orange-50 to-amber-50 dark:from-gray-800 dark:via-gray-700 dark:to-amber-900/30 rounded-2xl shadow-xl p-8 md:p-12 border-2 border-saffron-200/50 dark:border-amber-700/50 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-saffron-200/20 dark:via-amber-500/10 to-transparent animate-pulse pointer-events-none" />

          <div className="relative z-10">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-saffron-800 via-orange-700 to-amber-800 dark:from-amber-300 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent"
            >
              Journey Through Sacred Wisdom
            </motion.h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StatItem label="Chapters" targetValue={18} duration={5000} isInView={isInView} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <StatItem label="Verses" targetValue={700} duration={5000} isInView={isInView} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <StatItem label="Wisdom" targetValue={1000001} duration={5000} showInfinity isInView={isInView} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default JourneyStats;
