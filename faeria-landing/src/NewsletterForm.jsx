import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }]);
      console.log("DATA:", data);
      console.log("ERROR:", error);


    if (error) {
      console.error(error);
      setStatus('Errore. Riprova.');
    } else {
      setStatus('Email registrata con successo!');
      setEmail('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center flex-col sm:flex-row items-center gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        name="email"
        placeholder="La tua email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-3 rounded-lg w-full sm:w-2/3 bg-white text-black"
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition w-full sm:w-auto"
      >
        Iscriviti
      </button>
      {status && <p className="text-sm text-gray-300 mt-4">{status}</p>}
    </form>
  );
}