import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';


const commonDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'protonmail.com', 'libero.it', 'virgilio.it', 'fastwebnet.it',
  'live.com', 'tiscali.it', 'zoho.com', 'gmx.com', 'mail.com',
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState('idle');
  const [isLiveInvalid, setIsLiveInvalid] = useState(false);
  const { t } = useTranslation();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split('@')[1];
    return emailRegex.test(email) && domain && commonDomains.includes(domain.toLowerCase());
  };

  useEffect(() => {
    if (email.length > 5) {
      setIsLiveInvalid(!isValidEmail(email));
    } else {
      setIsLiveInvalid(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      setStatus('noPrivacy');
      return;
    }

    if (!isValidEmail(email)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');

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
      setAcceptedPrivacy(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative text-left">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-start gap-4"
        autoComplete="off"
      >
        {/* Email + Pulsante */}
        <div className="flex w-full gap-3">
          <input
            type="email"
            required
            placeholder={t('newsletter.placeholder') || 'La tua email'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus('idle');
            }}
            className={`flex-grow px-4 py-3 rounded-lg bg-white text-black border ${
              isLiveInvalid ? 'border-red-500' : 'border-transparent'
            } transition`}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? t('newsletter.loading') : t('newsletter.submit')}
          </button>
        </div>

        {/* Checkbox privacy */}
        <div className="flex items-start gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            id="newsletter-consent"
            checked={acceptedPrivacy}
            onChange={(e) => {
              setAcceptedPrivacy(e.target.checked);
              setStatus('idle');
            }}
            className="mt-1 form-checkbox h-4 w-4 text-yellow-500 rounded"
          />
          <label htmlFor="newsletter-consent" className="leading-snug">
            <Trans
              i18nKey="newsletter.privacyText"
              components={[
                <button
                  key="privacy-link"
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-privacy-modal'))}
                  className="underline text-yellow-400 hover:text-yellow-300"
                />
              ]}
            />
          </label>
        </div>
        {/* Feedback */}
        <div className="mt-2 min-h-[20px] text-sm text-left w-full break-words">
          {status === 'success' && <p className="text-green-400">{t('newsletter.success')}</p>}
          {status === 'error' && <p className="text-red-400">{t('newsletter.error')}</p>}
          {status === 'exists' && <p className="text-yellow-400">{t('newsletter.exists')}</p>}
          {(status === 'invalid' || isLiveInvalid) && (
            <p className="text-red-400">
              {t('newsletter.invalid') || 'Inserisci una email valida con un dominio conosciuto.'}
            </p>
          )}
          {status === 'noPrivacy' && (
            <p className="text-red-400">
              {t('newsletter.noPrivacy') || 'Devi accettare la privacy policy per proseguire.'}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}