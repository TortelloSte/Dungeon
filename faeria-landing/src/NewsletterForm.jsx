import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';

const commonDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'protonmail.com', 'libero.it', 'virgilio.it', 'fastwebnet.it',
  'live.com', 'tiscali.it', 'zoho.com', 'gmx.com', 'mail.com',
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [isLiveInvalid, setIsLiveInvalid] = useState(false);
  const { t } = useTranslation();

  // ✅ Validazione email con dominio riconosciuto
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split('@')[1];
    return emailRegex.test(email) && domain && commonDomains.includes(domain.toLowerCase());
  };

  // 🔁 Validazione in tempo reale
  useEffect(() => {
    if (email.length > 5) {
      setIsLiveInvalid(!isValidEmail(email));
    } else {
      setIsLiveInvalid(false);
    }
  }, [email]);

  // 🚀 Invio form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    if (!isValidEmail(email)) {
      setStatus('invalid');
      return;
    }

    const { error } = await supabase.from('newsletter').insert([{ email }]);

    if (error) {
      console.error('Errore Supabase:', error);
      if (
        error.message.includes('duplicate') ||
        error.message.includes('already exists') ||
        error.code === '23505'
      ) {
        setStatus('exists');
      } else {
        setStatus('error');
      }
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
        autoComplete="off"
      >
        <input
          type="email"
          required
          placeholder={t('newsletter.placeholder')}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus('idle');
          }}
          className={`px-4 py-3 rounded-lg w-full bg-white text-black border ${
            isLiveInvalid ? 'border-red-500' : 'border-transparent'
          } transition`}
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition w-full sm:w-auto"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? t('newsletter.loading') : t('newsletter.submit')}
        </button>
      </form>

      {/* Messaggi feedback */}
      <div className="mt-3 min-h-[20px] text-sm text-center">
        {status === 'success' && (
          <p className="text-green-400">{t('newsletter.success')}</p>
        )}
        {status === 'error' && (
          <p className="text-red-400">{t('newsletter.error')}</p>
        )}
        {status === 'exists' && (
          <p className="text-yellow-400">
            {t('newsletter.exists') || 'Questa email è già iscritta.'}
          </p>
        )}
        {(status === 'invalid' || isLiveInvalid) && (
          <p className="text-red-400">
            {t('newsletter.invalid') || 'Inserisci una email valida con un dominio conosciuto.'}
          </p>
        )}
      </div>
    </div>
  );
}
