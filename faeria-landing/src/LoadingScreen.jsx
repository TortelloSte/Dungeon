import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
      <div className="text-center">
        <div className="animate-pulse text-4xl font-bold text-yellow-400 mb-4">Dungeon Crawler</div>
        <p className="text-sm text-gray-400">Caricamento in corso...</p>
      </div>
    </div>
  );
}