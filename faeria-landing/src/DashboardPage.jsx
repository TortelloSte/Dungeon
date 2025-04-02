import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [character, setCharacter] = useState(null);

  const premium = false; // CAMBIA QUI per testare modalità free/premium

  // Stati per il modale
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [stats, setStats] = useState({ Forza: 0, Intelligenza: 0, Destrezza: 0 });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    } else {
      // Default character
      setCharacter(
        premium
          ? {
              name: 'Elandor',
              class: 'Mago delle Ombre',
              race: 'Elfo Oscuro',
              stats: { Forza: 4, Intelligenza: 9, Destrezza: 7 },
              inventory: ['Bastone runico', 'Mantello invisibile'],
            }
          : {
              name: 'Personaggio Random',
              class: '???',
              race: '???',
              stats: { Forza: '?', Intelligenza: '?', Destrezza: '?' },
              inventory: [],
            }
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleStatChange = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  const totalPoints = stats.Forza + stats.Intelligenza + stats.Destrezza;
  const remainingPoints = 10 - totalPoints;

  const handleSaveCharacter = () => {
    const newCharacter = {
      name: selectedClass && selectedRace ? `${selectedClass} ${selectedRace}` : 'Eroe senza nome',
      class: selectedClass,
      race: selectedRace,
      stats: { ...stats },
      inventory: [],
    };
    setCharacter(newCharacter);
    localStorage.setItem('character', JSON.stringify(newCharacter));
    setShowEditModal(false);
  };

  const menuItems = [
    { label: 'Profilo', id: 'profile' },
    { label: 'Personaggi', id: 'characters' },
    { label: 'Inventario', id: 'inventory' },
    { label: 'Statistiche', id: 'stats' },
    { label: 'Premium', id: 'premium' },
    { label: 'Dungeon', id: 'dungeon' },
  ];

  return (
    <div className="min-h-screen flex text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Dungeon Crawler</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id} className="hover:text-yellow-400 cursor-pointer">
              {item.label}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-12 text-red-400 hover:underline text-sm"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">Benvenuto nella tua Tana</h1>

        {/* Profilo */}
        {user && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl">
            <div className="flex items-center space-x-6">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=Hero123`}
                alt="avatar"
                className="w-24 h-24 rounded-full border-4 border-yellow-500"
              />
              <div>
                <p className="text-2xl font-bold mb-1">{user.email}</p>
                <p className="text-yellow-400">"Apprendista del Caos"</p>
                <div className="bg-gray-700 h-3 rounded-full mt-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-2/5"></div>
                </div>
                <p className="text-sm mt-1 text-gray-400">Livello 3 • 40% XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Personaggi */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6 shadow-lg max-w-4xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6">I tuoi Personaggi</h2>

          {character && (
            <div className="bg-gray-900 p-6 rounded-lg space-y-4">
              <p><span className="font-bold text-yellow-400">Nome:</span> {character.name}</p>
              <p><span className="font-bold text-yellow-400">Classe:</span> {character.class}</p>
              <p><span className="font-bold text-yellow-400">Razza:</span> {character.race}</p>

              <div>
                <p className="font-bold text-yellow-400 mb-1">Caratteristiche:</p>
                <ul className="grid grid-cols-3 gap-2 text-sm">
                  {Object.entries(character.stats).map(([key, value]) => (
                    <li key={key} className="bg-gray-800 p-2 rounded text-center">
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-yellow-400 mb-1 mt-4">Inventario:</p>
                {character.inventory.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {character.inventory.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Nessun oggetto. Trova oggetti durante le partite!</p>
                )}
              </div>

              {premium && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition"
                >
                  Modifica Personaggio
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modale modifica personaggio */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full text-white space-y-4 shadow-2xl">
              <h2 className="text-xl font-bold text-yellow-400">Modifica Personaggio</h2>

              <div>
                <label className="block text-sm mb-1">Classe</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Seleziona</option>
                  <option>Mago</option>
                  <option>Guerriero</option>
                  <option>Ladro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Razza</label>
                <select
                  value={selectedRace}
                  onChange={(e) => setSelectedRace(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Seleziona</option>
                  <option>Umano</option>
                  <option>Elfo</option>
                  <option>Orco</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Distribuisci punti (max 10)</label>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {['Forza', 'Intelligenza', 'Destrezza'].map((stat) => (
                    <input
                      key={stat}
                      type="number"
                      min="0"
                      max="10"
                      placeholder={stat}
                      value={stats[stat]}
                      onChange={(e) => handleStatChange(stat, e.target.value)}
                      className="bg-gray-800 p-2 rounded text-center"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">Punti rimanenti: {remainingPoints}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-sm text-gray-400 hover:underline"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSaveCharacter}
                  disabled={remainingPoints < 0}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition disabled:opacity-50"
                >
                  Salva
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}