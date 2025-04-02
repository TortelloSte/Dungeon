import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Create your Dungeon Cralwer account</h1>
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded transition">
          Sign Up
        </button>
        <p className="text-sm text-gray-400 text-center">
          Already have an account? <Link to="/login" className="text-yellow-400 hover:underline">Log in</Link>
        </p>
      </form>
      <Link to="/" className="mt-6 text-sm text-yellow-400 hover:underline">← Back to home</Link>
    </div>
  );
}