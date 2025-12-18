'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteDetails } from '@/data/siteDetails';

interface StoreChoiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const StoreChoiceDialog: React.FC<StoreChoiceDialogProps> = ({ isOpen, onClose }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleStoreClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <motion.div
                        ref={dialogRef}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4">
                                <Image
                                    src={siteDetails.siteLogo}
                                    alt="Fidjoo"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Quel appareil utilisez-vous ?
                            </h2>
                            <p className="text-sm text-gray-500">
                                Choisissez votre store pour continuer
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleStoreClick(siteDetails.appStoreUrl)}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-500">Télécharger sur</p>
                                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">App Store</p>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => handleStoreClick(siteDetails.googlePlayUrl)}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a2.371 2.371 0 0 1-.609-1.605V3.42c0-.614.229-1.172.609-1.606z" />
                                        <path fill="#FBBC04" d="M17.556 8.237L14.88 10.91 3.609 1.814A2.409 2.409 0 0 1 5.42 1.5L17.556 8.237z" />
                                        <path fill="#4285F4" d="M3.609 22.186l11.27-9.095 2.677 2.673L5.42 22.5a2.409 2.409 0 0 1-1.811-.314z" />
                                        <path fill="#34A853" d="M21.169 12c0 .718-.396 1.427-1.186 1.867L17.556 15.764 14.88 13.09l-1.087-1.09 1.087-1.09 2.676-2.673 2.427 1.356c.79.44 1.186 1.149 1.186 1.867z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-500">Disponible sur</p>
                                    <p className="font-bold text-gray-900 group-hover:text-secondary transition-colors">Google Play</p>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-4 py-3 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                        >
                            Annuler
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StoreChoiceDialog;
