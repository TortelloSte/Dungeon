import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { i18n } = useTranslation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      showNavbar ? 'translate-y-0' : '-translate-y-full'
    } bg-black bg-opacity-70 backdrop-blur-md shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-sm text-yellow-300 font-semibold">
        
        {/* Titolo/logo opzionale */}
        <div className="hidden sm:block text-lg font-bold tracking-wide">'N'MC</div>
  
        {/* Voci centrali */}
        <div className="flex space-x-6 items-center justify-center">
          <a href="#features" className="hover:text-yellow-400 transition">About</a>
          <a href="#newsletter" className="hover:text-yellow-400 transition">Newsletter</a>
          {/* <RouterLink to="/login" className="hover:text-yellow-400 transition">Login</RouterLink> */}
        </div>
  
        {/* Selettore lingua a destra */}
        <div className="text-xs text-gray-300">
          <button
            onClick={() => i18n.changeLanguage('it')}
            className={`mr-1 hover:text-yellow-400 ${i18n.language === 'it' ? 'font-bold text-yellow-400' : ''}`}
          >
            IT
          </button>
          {' | '}
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`ml-1 hover:text-yellow-400 ${i18n.language === 'en' ? 'font-bold text-yellow-400' : ''}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
  
}