import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 2000); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
            You are the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              chosen one!
            </span>
          </h1>
        </div>

        {/* Rocket animation */}
        <div className="relative h-32 overflow-hidden">
          <div className="absolute left-1/2 transform -translate-x-1/2 animate-rocket-launch">
            <Rocket className="w-12 h-12 text-blue-400 transform rotate-45" />
            {/* Rocket trail */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent rounded-full opacity-80" />
          </div>
        </div>

        <div className="text-gray-400 text-lg animate-fade-in-delayed">
          Preparing your journey to the perfect resume...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
