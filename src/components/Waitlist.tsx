'use client';

import React, { useState } from 'react';
import Container from './Container';
import SectionTitle from './SectionTitle';
import Button3D from './ui/Button3D';

const Waitlist: React.FC = () => {
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

    return (
        <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-secondary/20">
            <Container>
                <div className="text-center max-w-2xl mx-auto">
                    <SectionTitle>
                        <h2 className="text-center mb-4">Join the Waitlist</h2>
                    </SectionTitle>
                    <p className="mb-8 text-foreground/80">
                        Be among the first to discover Fidjoo and get exclusive access at launch.
                    </p>

                    {result === 'success' ? (
                        <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6">
                            <p className="text-green-700 font-semibold text-lg">
                                Thank you! You're on the waitlist.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full sm:w-80 px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white"
                            />
                            <input type="hidden" name="subject" value="New Fidjoo waitlist signup" />
                            <Button3D
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={result === 'loading'}
                            >
                                {result === 'loading' ? 'Sending...' : 'Sign me up'}
                            </Button3D>
                        </form>
                    )}

                    {result === 'error' && (
                        <p className="mt-4 text-red-600 font-medium">
                            Something went wrong. Please try again later.
                        </p>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default Waitlist;
