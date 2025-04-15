import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useUser } from '../hooks/useUser';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const userName = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNavbar(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } bg-black bg-opacity-70 backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 h-20 flex justify-between items-center text-yellow-300 font-semibold">

        {/* LOGO */}
        <div className="text-lg font-bold tracking-wide">'N'MC</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <LanguageSwitcher />
          {/* LOGIN/UTENTE RIMOSSO PER ORA */}
          {/*
          {userName ? (
            <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
              <FaUser className="text-yellow-400" />
              {userName}
            </div>
          ) : (
            <RouterLink
              to="/login"
              className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition"
              aria-label="Vai al login"
            >
              <FaUser className="text-yellow-400" />
              Log In
            </RouterLink>
          )}
          */}
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Apri menu mobile"
            className="text-yellow-300"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-md px-4 pb-6 pt-2">
          <div className="flex flex-col gap-4 text-sm text-yellow-200">
            <LanguageSwitcher />
            {/* LOGIN/UTENTE MOBILE RIMOSSO PER ORA */}
            {/*
            {userName ? (
              <div className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-full text-xs">
                <FaUser className="text-yellow-400" />
                {userName}
              </div>
            ) : (
              <RouterLink
                to="/login"
                className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-full text-xs hover:bg-gray-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="text-yellow-400" />
                Log In
              </RouterLink>
            )}
            */}
          </div>
        </div>
      )}
    </nav>
  );
}
