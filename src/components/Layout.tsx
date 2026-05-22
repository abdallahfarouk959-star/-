/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'مشغولات الذهب', path: '/gold' },
    { name: 'مشغولات الفضة', path: '/silver' },
    { name: 'عن المحل', path: '/about' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b',
        scrolled ? 'bg-luxury-black/80 backdrop-blur-md py-3 border-gold/30' : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <div className="mb-1 text-gold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
          </div>
          <span className="text-xl font-serif font-bold tracking-widest leading-none text-gold uppercase mt-1">
            Abd El Kader
          </span>
          <div className="flex items-center justify-center gap-2 mt-1 w-full max-w-[120px]">
            <div className="flex-1 h-[1px] bg-gold/70"></div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold">Jewelry</span>
            <div className="flex-1 h-[1px] bg-gold/70"></div>
          </div>
          <span className="text-[7.5px] uppercase tracking-[0.3em] text-gold mt-1">
            • 1938 •
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs uppercase tracking-tighter transition-all hover:text-gold",
                location.pathname === link.path ? "text-gold font-bold" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gold font-mono whitespace-nowrap">EGP • مباشر</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-luxury-black border-t border-white/10 flex flex-col p-6 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-medium py-2 border-b border-white/5",
                  location.pathname === link.path ? "text-gold" : "text-white/80"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+20123456789"
              className="mt-4 flex items-center justify-center gap-2 bg-gold text-luxury-black py-4 rounded-xl text-lg font-bold"
            >
              <Phone size={20} />
              اتصل بنا للحجز والاستفسار
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-gold/20 py-12 px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mb-2">
            <path d="M6 3h12l4 6-10 13L2 9Z" />
            <path d="M11 3 8 9l4 13 4-13-3-6" />
            <path d="M2 9h20" />
          </svg>
          <span className="text-sm font-serif font-bold tracking-widest text-[#F7EFE6] uppercase">
            Abd El Kader
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-gold mt-1">
            Jewelry • 1938
          </span>
        </div>

        <div className="flex gap-12 text-[10px] text-white/40 uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
          <Link to="/gold" className="hover:text-gold transition-colors">الذهب</Link>
          <Link to="/silver" className="hover:text-gold transition-colors">الفضة</Link>
          <Link to="/about" className="hover:text-gold transition-colors">عن المحل</Link>
        </div>

        <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-widest">
          <a href="#" className="hover:text-gold">Instagram</a>
          <a href="#" className="hover:text-gold">Facebook</a>
          <a href="#" className="hover:text-gold">WhatsApp</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-white/20 text-[9px] uppercase tracking-[0.4em]">
        © {new Date().getFullYear()} AL ABDUL QADIR JEWELRY • CAIRO, EGYPT
      </div>
    </footer>
  );
}
