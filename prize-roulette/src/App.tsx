import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playWinSound, playSpinSound } from './utils/audioUtils';
import { Wheel } from './components/Wheel';
import { Modal } from './components/Modal';
// Ícones substituídos por emojis para evitar dependência externa
import './App.css';

type Prize = {
  id: number;
  name: string;
  color: string;
};

type PrizeHistory = Prize & {
  timestamp: number;
};

// Cores para cada seção da roleta (temas de pizza)
const prizes = [
  { id: 1, name: 'Presente surpresa', color: 'bg-red-600' },
  { id: 2, name: 'Chocolate', color: 'bg-amber-900' },
  { id: 3, name: 'Oração do Lider', color: 'bg-yellow-300' },
  { id: 4, name: 'Oração da sua escolha', color: 'bg-pink-400' },
  { id: 5, name: 'Biscoitos', color: 'bg-amber-400' },
  { id: 6, name: 'Bombom', color: 'bg-green-600' },
  { id: 7, name: 'Bala', color: 'bg-orange-400' },
  { id: 8, name: 'Pirulito', color: 'bg-purple-500' },
];

function App() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('Clique em "Girar Roleta" para começar!');
  const [prizeHistory, setPrizeHistory] = useState<PrizeHistory[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<{name: string, color: string} | null>(null);

  // Initialize theme on component mount
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If no saved preference, use system preference
    const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        updateTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update theme when darkMode changes
  useEffect(() => {
    if (typeof darkMode === 'boolean') {
      updateTheme(darkMode);
    }
  }, [darkMode]);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Efeito de confete
  const triggerConfetti = useCallback(() => {
    // Primeira explosão de confete (centro)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      gravity: 1,
      decay: 0.94,
      scalar: 1.2,
    });

    // Segunda explosão de confete (esquerda)
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.3, y: 0.7 },
        gravity: 1,
        decay: 0.94,
        scalar: 1.5,
      });
    }, 200);

    // Terceira explosão de confete (direita)
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.7, y: 0.7 },
        gravity: 1,
        decay: 0.94,
        scalar: 1.5,
      });
    }, 400);
  }, []);

  const handleSpinStart = useCallback(() => {
    setSpinning(true);
    setResult('Girando...');
    playSpinSound();
  }, []);

  const handleSpinEnd = useCallback((prize: Prize) => {
    setResult(`Parabéns! Você ganhou: ${prize.name}`);
    setCurrentPrize(prize);
    setShowResultModal(true);
    
    // Adiciona o prêmio ao histórico
    setPrizeHistory(prev => [
      ...prev,
      { ...prize, timestamp: Date.now() }
    ]);
    
    // Efeitos de vitória
    playWinSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 }
    });
    
    setSpinning(false);
  }, []);

  // Formatar a data para exibição
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="App">
      {/* Theme Toggle Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        onClick={toggleTheme}
        aria-label={darkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
      >
        {darkMode ? (
          <span className="text-yellow-400 text-2xl">☀️</span>
        ) : (
          <span className="text-gray-700 dark:text-gray-200 text-2xl">🌙</span>
        )}
      </button>

      <header className="header">
        <h1 className="title">Roleta de Prêmios</h1>
        <p className="subtitle">Gire a roleta e descubra qual prêmio você ganhou!</p>
      </header>

      <main>
        <div className="wheel-container">
          <Wheel
            spinning={spinning}
            onSpinStart={handleSpinStart}
            onSpinEnd={handleSpinEnd}
            prizes={prizes}
          />
        </div>

        {/* Mensagem de status */}
        <div className="text-center mt-4 min-h-[40px]">
          <p className="text-gray-600 dark:text-gray-300">
            {result}
          </p>
        </div>

        {/* Modal de resultado */}
        <Modal 
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          prizeName={currentPrize?.name}
          prizeColor={currentPrize?.color}
        />

      </main>

      {prizeHistory.length > 0 && (
        <div className="w-full max-w-2xl mx-auto mt-8 px-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Histórico de Prêmios</h2>
          <ul className="history-list space-y-2">
            {prizeHistory.slice(0, 6).map((item, index) => (
              <li
                key={index}
                className="history-item bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md border border-gray-100 dark:border-gray-700"
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
                  opacity: 0,
                  transform: 'translateX(-10px)'
                }}
              >
                <span className="history-prize font-medium text-gray-800 dark:text-gray-100">
                  {item.name}
                </span>
                <span className="history-time text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <span className="inline-block mr-1">🕒</span>
                  {formatTime(item.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
