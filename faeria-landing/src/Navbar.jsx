import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser } from 'react-icons/fa';
import { supabase } from './supabaseClient';

export default function Navbar() {
  const { i18n } = useTranslation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('name')
          .eq('email', session.user.email)
          .single();

        if (!error) setUserName(data?.name);
      }
    };
    fetchUser();
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } bg-black bg-opacity-70 backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 h-20 flex justify-between items-center text-sm text-yellow-300 font-semibold">
        
        {/* LOGO */}
        <div className="text-lg font-bold tracking-wide">'N'MC</div>

        {/* DESTRA - Lingua + Login */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-300">
            <button
              onClick={() => i18n.changeLanguage('it')}
              className={`mr-1 hover:text-yellow-400 ${i18n.language === 'it' ? 'font-bold text-yellow-400' : ''}`}
            >
              ITA
            </button>
            {' · '}
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`ml-1 hover:text-yellow-400 ${i18n.language === 'en' ? 'font-bold text-yellow-400' : ''}`}
            >
              ENG
            </button>
          </div>

          {userName ? (
            <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
              <FaUser className="text-yellow-400" />
              {userName}
            </div>
          ) : (
            <RouterLink
              to="/login"
              className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition"
            >
              <FaUser className="text-yellow-400" />
              Log In
            </RouterLink>
          )}
        </div>
      </div>
    </nav>
  );
}