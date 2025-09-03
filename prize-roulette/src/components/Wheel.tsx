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
        className="absolute inset-0 rounded-full border-8 border-amber-800 shadow-xl overflow-visible transition-transform duration-300 ease-out will-change-transform hover:shadow-2xl transform-gpu"
        style={{
          transform: 'rotate(0deg)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'radial-gradient(circle, #fde68a 0%, #d97706 100%)',
          boxShadow: 'inset 0 0 30px rgba(120, 53, 15, 0.5)'
        }}
      >
        {/* Pizza crust */}
        <div className="absolute inset-0 rounded-full border-8 border-amber-900 bg-amber-800">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 30% 30%, #fde68a 0%, #d97706 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}></div>
        </div>
        
        {prizes.map((prize, index) => {
          const rotation = index * segmentAngle;
          const middleAngle = rotation + (segmentAngle / 2);
          
          return (
            <div key={prize.id}>
              {/* Pizza slice */}
              <div
                className="absolute top-0 left-0 w-full h-full origin-center"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0, ${50 + Math.sin(segmentAngle * Math.PI / 180) * 100}% ${50 - Math.cos(segmentAngle * Math.PI / 180) * 100}%)`,
                }}
              >
                <div 
                  className={`absolute top-0 left-0 w-full h-full ${prize.color} opacity-90`}
                  style={{
                    clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)',
                    borderRight: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Pizza topping texture */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                    opacity: '0.6'
                  }}></div>
                  
                  {/* Cheese texture */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}></div>
                </div>
              </div>
              
              {/* Prize name */}
              <div 
                className="absolute text-center font-bold text-white"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${middleAngle > 90 && middleAngle < 270 ? middleAngle + 180 : middleAngle}deg)`,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), -1px -1px 3px rgba(0,0,0,0.4)',
                  width: 'max-content',
                  maxWidth: '35%',
                  color: '#fff',
                  fontWeight: 800,
                  textTransform: 'uppercase' as const,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap' as const,
                  overflow: 'hidden' as const,
                  textOverflow: 'ellipsis' as const
                }}
              >
                {prize.name}
              </div>
            </div>
          );
        })}
        
        {/* Center pepperoni */}
        <div className="absolute top-1/2 left-1/2 w-1/5 h-1/5 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-red-800 z-10">
          <div className="absolute inset-0.5 rounded-full bg-red-500"></div>
        </div>
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
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer group p-1.5">
          <div 
            className={`w-full h-full bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 ${
              spinning ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer group-hover:shadow-lg group-hover:from-red-700 group-hover:to-red-600'
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
