import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prizeName?: string;
  prizeColor?: string;
}

export const Modal = ({ isOpen, onClose, prizeName = '', prizeColor = 'bg-blue-500' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all animate-modal-in border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Parabéns!</h2>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">Você ganhou:</p>
          {prizeName && (
            <div className={`${prizeColor} text-white font-bold text-2xl py-4 px-6 rounded-lg inline-block min-w-[200px] shadow-md mb-8`}>
              {prizeName}
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Clique fora do modal para fechar</p>
        </div>
      </div>
    </div>
  );
};
