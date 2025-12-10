'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button3D from './ui/Button3D';

interface WaitlistContextType {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export const useWaitlistDialog = () => {
    const context = useContext(WaitlistContext);
    if (!context) {
        throw new Error('useWaitlistDialog must be used within a WaitlistDialogProvider');
    }
    return context;
};

export const WaitlistDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = useCallback(() => setIsOpen(true), []);
    const closeDialog = useCallback(() => setIsOpen(false), []);

    return (
        <WaitlistContext.Provider value={{ isOpen, openDialog, closeDialog }}>
            {children}
            <WaitlistDialog />
        </WaitlistContext.Provider>
    );
};

const WaitlistDialog: React.FC = () => {
    const { isOpen, closeDialog } = useWaitlistDialog();
    const [result, setResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult('loading');

        const formData = new FormData(event.currentTarget);
        formData.append('access_key', 'f854f518-1d0c-4b97-92c2-0a2c8d4879c7');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setResult('success');
                setEmail('');
            } else {
                setResult('error');
            }
        } catch {
            setResult('error');
        }
    };

    const handleClose = () => {
        closeDialog();
        // Reset state after animation
        setTimeout(() => {
            setResult('idle');
            setEmail('');
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100 relative w-full max-w-md">
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Coming Soon!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Join the waitlist to be among the first to discover Fidjoo.
                                </p>

                                {result === 'success' ? (
                                    <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6">
                                        <p className="text-green-700 font-semibold text-lg">
                                            Thank you! You&apos;re on the waitlist.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={onSubmit} className="space-y-4">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white"
                                        />
                                        <input type="hidden" name="subject" value="New Fidjoo waitlist signup" />
                                        <Button3D
                                            type="submit"
                                            variant="primary"
                                            size="md"
                                            disabled={result === 'loading'}
                                            className="w-full"
                                        >
                                            {result === 'loading' ? 'Sending...' : 'Join the waitlist'}
                                        </Button3D>
                                    </form>
                                )}

                                {result === 'error' && (
                                    <p className="mt-4 text-red-600 font-medium">
                                        An error occurred. Please try again.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WaitlistDialog;
