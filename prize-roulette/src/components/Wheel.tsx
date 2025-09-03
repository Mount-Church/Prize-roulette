import { useEffect, useRef, useCallback } from 'react';

interface WheelProps {
  spinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (prize: { id: number; name: string; color: string }) => void;
  prizes: Array<{ id: number; name: string; color: string }>;
}

export const Wheel: React.FC<WheelProps> = ({
  spinning,
  onSpinStart,
  onSpinEnd,
  prizes,
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const spinTimeRef = useRef<number>(3000 + Math.random() * 2000);
  const startRotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / spinTimeRef.current, 1);
    
    // Easing function for smooth deceleration
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOut(progress);
    
    const rotation = startRotationRef.current + (targetRotationRef.current - startRotationRef.current) * easedProgress;
    
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Animation complete - select random prize and call onSpinEnd with it
      const randomIndex = Math.floor(Math.random() * prizes.length);
      const randomPrize = prizes[randomIndex];
      if (randomPrize) {
        onSpinEnd(randomPrize);
      }
    }
  }, [onSpinEnd, prizes]);

  const startSpin = useCallback(() => {
    if (spinning || !wheelRef.current) return;
    
    // Call onSpinStart callback
    onSpinStart();
    
    // Reset animation state
    startTimeRef.current = 0;
    spinTimeRef.current = 3000 + Math.random() * 2000;
    
    // Get current rotation
    const currentRotation = parseInt(wheelRef.current.style.transform?.replace(/[^0-9.-]/g, '') || '0');
    startRotationRef.current = currentRotation % 360;
    
    // Calculate target rotation (5 full rotations + random position)
    const fullRotations = 5 * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    targetRotationRef.current = currentRotation + fullRotations + randomAngle;
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  }, [spinning, animate, onSpinStart]);

  useEffect(() => {
    // Clean up animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (spinning) {
      startSpin();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [spinning, startSpin]);

  // Calculate prize segments
  const segmentAngle = 360 / prizes.length;

  return (
    <div className="relative w-full h-0 pb-[100%] max-w-[32rem] mx-auto">
      <div 
        ref={wheelRef}
        className="absolute inset-0 rounded-full border-4 border-gray-200 shadow-xl overflow-hidden transition-transform duration-300 ease-out will-change-transform hover:shadow-2xl hover:border-purple-300 transform-gpu"
        style={{
          transform: 'rotate(0deg)', // Initial transform to prevent layout shift
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {prizes.map((prize, index) => {
          const rotation = index * segmentAngle;
          const skew = segmentAngle + 0.5; // Slight skew for better visual
          
          return (
            <div
              key={prize.id}
              className={`absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-right ${prize.color}`}
              style={{
                transform: `rotate(${rotation + segmentAngle / 2}deg) skewY(${90 - skew}deg)`,
              }}
            >
              <div 
                className="absolute w-full text-center text-white font-bold text-sm transform -skew-y-0"
                style={{
                  transform: 'skewY(90deg) rotate(45deg)',
                  width: '100%',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  bottom: '20px',
                  left: '0',
                }}
              >
                {prize.name}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-12 border-r-12 border-b-24 border-l-transparent border-r-transparent border-b-red-600 z-30" />
      
      {/* Center button */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 z-20"
        onClick={(e) => {
          e.stopPropagation();
          if (!spinning) {
            startSpin();
          }
        }}
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer group">
          <div 
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 glow-on-hover ${
              spinning ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer group-hover:shadow-lg'
            }`}
          >
            {spinning ? (
              <svg className="animate-spin h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="animate-pulse">GIRAR</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
