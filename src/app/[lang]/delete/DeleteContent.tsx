'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Button3D from '@/components/ui/Button3D';

export default function DeleteContent() {
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
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 flex justify-center items-center pt-32">
      <div className="max-w-lg mx-auto w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#11181C]">
              Account Deletion Request
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Enter your email address to request the deletion of your account and data.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {result === 'success' ? (
              <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6">
                <p className="text-green-700 font-semibold text-lg">
                  Your request has been sent. We will process your request within 30 days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white"
                />
                <input type="hidden" name="subject" value="Fidjoo Account Deletion Request" />
                <Button3D
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={result === 'loading'}
                >
                  {result === 'loading' ? 'Sending...' : 'Submit Request'}
                </Button3D>
              </form>
            )}

            {result === 'error' && (
              <p className="mt-4 text-red-600 font-medium">
                An error occurred. Please try again later.
              </p>
            )}

            <p className="mt-6 text-sm text-gray-500">
              In accordance with GDPR, your request will be processed within 30 days.
              For any questions, contact{' '}
              <a href="mailto:dpo@fidjoo.com" className="text-[#49AAFF] hover:underline">
                dpo@fidjoo.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
