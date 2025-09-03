import { useEffect, useMemo } from 'react';
// Import images with type assertions
import andersonIda1 from '../assets/images/anderson-ida1.png';
import deni2 from '../assets/images/deni-2.png';
import juIda1 from '../assets/images/ju-ida-1.png';
import juIda2 from '../assets/images/ju-ida-2.png';
import thais1 from '../assets/images/thais-1.png';
import thais2 from '../assets/images/thais-2.png';
import juIda from '../assets/images/ju-ida.png';

// Define type for avatar
interface Avatar {
    src: string;
    alt: string;
}

// Type assertion for image imports
const avatars: Avatar[] = [
    { src: andersonIda1 as string, alt: 'Anderson' },
    { src: deni2 as string, alt: 'Deni' },
    { src: juIda1 as string, alt: 'Ju 1' },
    { src: juIda2 as string, alt: 'Ju 2' },
    { src: thais1 as string, alt: 'Thais' },
    { src: thais2 as string, alt: 'Thais 2' },
    { src: juIda as string, alt: 'Ju Ida' },
];

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

    const randomAvatar = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex] || { src: '', alt: 'Avatar' }; // Fallback to prevent undefined
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/50 animate-fade-in overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-4 my-4 sm:my-8 shadow-2xl transform transition-all animate-modal-in border-2 border-gray-200 dark:border-gray-600"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Fechar"
                >
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-center pt-2">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                                <img
                                    src={randomAvatar.src}
                                    alt={randomAvatar.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">🎉 Parabéns! 🎉</h2>
                    <p className="text-lg sm:text-xl mb-4 text-gray-700 dark:text-gray-300">Você ganhou:</p>
                    {prizeName && (
                        <div className={`${prizeColor} text-white font-bold text-lg sm:text-xl py-3 px-4 sm:px-6 rounded-lg inline-block min-w-[140px] sm:min-w-[180px] shadow-md mb-4 sm:mb-6 whitespace-normal break-words`}>
                            {prizeName}
                        </div>
                    )}
                    <div className="mt-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
