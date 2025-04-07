import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    privacyAccepted: false,
  });

  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{8,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailRegex.test(formData.email)) {
      return setError('Email non valida');
    }

    if (!phoneRegex.test(formData.phone)) {
      return setError('Numero di telefono non valido');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Le password non coincidono');
    }

    if (!formData.privacyAccepted) {
      return setError('Devi accettare la Privacy Policy');
    }

    setStatus('loading');

    const { error: insertError } = await supabase.from('users').insert([
      {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        privacy_accepted: true,
      },
    ]);

    if (insertError) {
      setStatus('idle');
      return setError('Errore durante la registrazione. Riprova.');
    }

    setStatus('success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Registrazione</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-lg shadow-xl w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Cognome"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="tel"
          placeholder="Telefono"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Ripeti password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />

        <label className="flex items-center space-x-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            required
          />
          <span>Autorizzo il trattamento dei dati personali (Privacy Policy)</span>
        </label>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {status === 'success' && (
          <p className="text-green-400 text-sm">Registrazione completata!</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
        >
          {status === 'loading' ? 'Caricamento...' : 'Registrati'}
        </button>
      </form>
    </div>
  );
}
