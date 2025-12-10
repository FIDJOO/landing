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

function ContactPage() {
  const [result, setResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('loading');

    const data = new FormData(event.currentTarget);
    data.append('access_key', '8fe49e7c-5c32-418b-a106-a17036c034a0');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        setResult('success');
        setFormData({ name: '', email: '', message: '' });
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
              Contactez-nous
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Une question ? Une suggestion ? N&apos;hésitez pas à nous écrire.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {result === 'success' ? (
              <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6">
                <p className="text-green-700 font-semibold text-lg">
                  Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  required
                  className="w-full px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre demande..."
                  required
                  rows={5}
                  className="w-full px-6 py-3 text-base rounded-2xl border-2 border-foreground/20 focus:border-primary focus:outline-none transition-colors bg-white resize-none"
                />
                <input type="hidden" name="subject" value="Nouveau message de contact Fidjoo" />
                <Button3D
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={result === 'loading'}
                >
                  {result === 'loading' ? 'Envoi...' : 'Envoyer'}
                </Button3D>
              </form>
            )}

            {result === 'error' && (
              <p className="mt-4 text-red-600 font-medium">
                Une erreur est survenue. Veuillez réessayer plus tard.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContactPage;
