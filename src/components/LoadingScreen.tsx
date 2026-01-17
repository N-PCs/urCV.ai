import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 2000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 z-50 flex items-center justify-center ${
        !isVisible ? 'pointer-events-none' : ''
      }`}
    >
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient" />
      </div>

      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.5, 1],
              scale: [0, 1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.02,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      
      <div className="text-center z-10 px-4">
      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            You are the{' '}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "linear" 
              }}
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
            >
              chosen one!
            </motion.span>
          </h1>
          
          
          <div className="relative inline-block">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute"
                style={{
                  left: `${Math.cos((i * 60 * Math.PI) / 180) * 100 + 50}%`,
                  top: `${Math.sin((i * 60 * Math.PI) / 180) * 100 + 50}%`,
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        <div className="relative h-40 mb-8 overflow-visible">
          <motion.div
            initial={{ y: 150, opacity: 0, rotate: 45 }}
            animate={{ 
              y: [-150, -300],
              opacity: [0, 1, 1, 0],
              rotate: 45,
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <Rocket className="w-16 h-16 text-blue-400" />
            
            
            <motion.div
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.8, 0.6, 0.8],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3 h-24 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm"
            />
            
            
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, 40 + Math.random() * 20],
                  x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute top-16 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
              />
            ))}
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-300 text-lg mb-8"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1.5, ease: "steps(40)" }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            Preparing your journey to the perfect resume...
          </motion.span>
        </motion.div>

        
        <div className="max-w-md mx-auto">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
              style={{ backgroundSize: "200% 100%" }}
            />
            
            
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
          
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-3 text-sm text-gray-400 font-mono"
          >
            {progress}%
          </motion.div>
        </div>

        
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>

      
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
    </motion.div>
  );
};

export default LoadingScreen;
