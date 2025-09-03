import { useEffect, useMemo } from 'react';
// Import images with type assertions
import andersonIda1 from '../assets/images/anderson-ida1.png';
import deni2 from '../assets/images/deni-2.png';
import juIda1 from '../assets/images/ju-ida-1.png';
import juIda2 from '../assets/images/ju-ida-2.png';
import thais1 from '../assets/images/thais-1.png';
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 max-w-2xl w-full mx-4 shadow-2xl transform transition-all animate-modal-in border-2 border-gray-200 dark:border-gray-600"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                                <img
                                    src={randomAvatar.src}
                                    alt={randomAvatar.alt}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">🎉 Parabéns! 🎉</h2>
                    <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">Você ganhou:</p>
                    {prizeName && (
                        <div className={`${prizeColor} text-white font-bold text-2xl py-4 px-6 rounded-lg inline-block min-w-[200px] shadow-md mb-8`}>
                            {prizeName}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
