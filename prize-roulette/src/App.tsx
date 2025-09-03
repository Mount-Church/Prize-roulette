import { useState, useRef, useEffect } from 'react';
import './App.css';

// Cores para cada seção da roleta
const prizes = [
  { id: 1, name: 'Presente surpresa', color: 'bg-red-500' },
  { id: 2, name: 'Chocolate', color: 'bg-blue-500' },
  { id: 3, name: 'Bombom', color: 'bg-green-500' },
  { id: 4, name: 'Pirulito', color: 'bg-yellow-500' },
  { id: 5, name: 'Oração do líder', color: 'bg-purple-500' },
  { id: 6, name: 'Oração por alguém', color: 'bg-pink-500' },
];

function App() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult('Girando...');
    
    // Tempo aleatório para a roleta girar (entre 3 e 5 segundos)
    const spinTime = 3000 + Math.random() * 2000;
    
    // Gira a roleta
    if (wheelRef.current) {
      const currentRotation = parseInt(wheelRef.current.style.transform?.replace(/[^0-9]/g, '') || '0');
      const newRotation = currentRotation + 360 * 5 + Math.floor(Math.random() * 360); // 5 voltas completas + posição aleatória
      
      wheelRef.current.style.transition = `transform ${spinTime}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }
    
    // Define o resultado após o término da rotação
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(`Você ganhou: ${randomPrize.name}`);
      setSpinning(false);
    }, spinTime);
  };

  // Efeito para resetar a transição após a rotação
  useEffect(() => {
    if (wheelRef.current && !spinning) {
      // Remove a transição suave para resetar a posição
      wheelRef.current.style.transition = 'none';
      // Mantém a posição final, mas remove as voltas completas
      const currentRotation = parseInt(wheelRef.current.style.transform?.replace(/[^0-9]/g, '') || '0');
      const finalRotation = currentRotation % 360;
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
      
      // Força um reflow para aplicar a mudança
      void wheelRef.current.offsetWidth;
    }
  }, [spinning]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">Roleta de Prêmios</h1>
      
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        <div 
          className="relative w-full h-full rounded-full overflow-hidden border-8 border-gray-200 shadow-2xl"
          ref={wheelRef}
          style={{
            transition: 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
            transform: `rotate(${spinning ? '1080' : '0'}deg)`,
          }}
        >
          {prizes.map((prize, index) => {
            const rotation = (360 / 6) * index;
            const skew = 90 - (360 / 6);
            
            return (
              <div
                key={prize.id}
                className={`absolute w-1/2 h-1/2 ${prize.color} origin-bottom-right`}
                style={{
                  transform: `rotate(${rotation}deg) skewY(${skew}deg)`,
                }}
              >
                <div 
                  className="absolute text-white font-bold text-lg sm:text-xl md:text-2xl"
                  style={{
                    transform: `rotate(${90 + (360 / 6 / 2)}deg)`,
                    transformOrigin: '0 0',
                    left: '50%',
                    top: '50%',
                    marginLeft: '110px',
                    marginTop: '40px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    width: '140px',
                    lineHeight: '1.3',
                    textAlign: 'center',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    fontFamily: '"Arial Black", Arial, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {prize.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Botão central */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 z-20"
          onClick={(e) => {
            e.stopPropagation();
            spinWheel();
          }}
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl hover:bg-red-700 transition-colors">
              GIRAR
            </div>
          </div>
        </div>
        
        {/* Indicador de posição */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-12 border-r-12 border-b-24 border-l-transparent border-r-transparent border-b-red-600 z-30" />
      </div>
      
      {/* Resultado */}
      <div className="text-3xl font-bold text-gray-800 text-center min-h-16 mt-8 p-4 bg-white rounded-lg shadow-md">
        {result}
      </div>
      
      {/* Instruções */}
      <p className="mt-8 text-gray-600 text-center">
        Clique na roleta ou no botão "Girar" para tentar a sorte!
      </p>
    </div>
  );
}

export default App;
