import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('newsletter').insert([{ email }]);

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center flex-col sm:flex-row items-center gap-4 max-w-md mx-auto w-full">
      <input
        type="email"
        required
        placeholder={t('newsletter.placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-3 rounded-lg w-full sm:w-2/3 bg-white text-black"
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition w-full sm:w-auto"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('newsletter.loading') : t('newsletter.submit')}
      </button>

      {status === 'success' && (
        <p className="text-green-400 text-sm mt-4 sm:mt-0 sm:ml-4 animate-pulse">{t('newsletter.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-4 sm:mt-0 sm:ml-4">{t('newsletter.error')}</p>
      )}
    </form>
  );
}
