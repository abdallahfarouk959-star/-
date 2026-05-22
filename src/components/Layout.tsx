/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { DAILY_GOLD_PRICES } from '../constants';

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
    { name: 'سبائك BTC', path: '/btc-bullion' },
    { name: 'عن المحل', path: '/about' },
  ];

  // دالة لتوليد عناصر الشريط بالعربية
  const renderTickerContent = () => (
    <>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span>الذهب عيار ٢٤: {DAILY_GOLD_PRICES.gold24.toLocaleString()} ج.م</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span>الذهب عيار ٢١: {DAILY_GOLD_PRICES.gold21.toLocaleString()} ج.م</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span>الذهب عيار ١٨: {DAILY_GOLD_PRICES.gold18.toLocaleString()} ج.م</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span>الفضة النقية ٩٢٥: {DAILY_GOLD_PRICES.silver925.toLocaleString()} ج.م</span>
      </div>
    </>
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-black bg-white'
      )}
    >
      {/* القسم العلوي: اللوجو والروابط */}
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* اللوجو الأسود الفخم */}
        <Link to="/" className="flex flex-col items-center group">
          <div className="mb-1 text-black">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
          </div>
          <span className="text-xl font-serif font-bold tracking-widest leading-none text-black uppercase mt-1">
            Abd El Kader
          </span>
          <div className="flex items-center justify-center gap-2 mt-1 w-full max-w-[120px]">
            <div className="flex-1 h-[1.5px] bg-black"></div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A155] font-bold font-mono">Jewelry</span>
            <div className="flex-1 h-[1.5px] bg-black"></div>
          </div>
          <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#C8A155] font-bold mt-1">
            • 1938 •
          </span>
        </Link>

        {/* روابط الـ Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs uppercase tracking-tighter transition-all hover:text-[#C8A155] font-bold",
                location.pathname === link.path ? "text-[#C8A155]" : "text-black/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-black font-bold whitespace-nowrap">مؤشر الأسعار المباشر</span>
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          </div>
        </div>

        {/* زرار الموبايل */}
        <button
          className="md:hidden text-black outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* شريط الأسعار الحيّة باللغة العربية مع حركة انسيابية دائرية مستمرة بدون أي فراغات زمنية */}
      <div className="w-full bg-[#111111] border-t border-black py-2.5 overflow-hidden select-none shadow-sm flex" dir="rtl">
        <motion.div 
          initial={{ x: '0%' }}
          animate={{ x: '50%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear'
          }}
          className="flex items-center gap-16 text-white/90 text-xs font-bold whitespace-nowrap pl-16 min-w-full"
        >
          {/* التكرار المتتالي 4 مرات يملأ الشاشة تماماً ويمنع حدوث أي تأخير أو فراغ عند نهاية الدورة */}
          {renderTickerContent()}
          {renderTickerContent()}
          {renderTickerContent()}
          {renderTickerContent()}
        </motion.div>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t-2 border-black flex flex-col p-6 gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-bold py-2 border-b border-black/5 text-right",
                  location.pathname === link.path ? "text-[#C8A155]" : "text-black/80"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+20123456789"
              className="mt-4 flex items-center justify-center gap-2 bg-black text-white py-4 text-lg font-bold border border-black hover:bg-black/90 transition-all"
            >
              <Phone size={20} className="text-[#C8A155]" />
              اتصل بنا للحجز والاستفسار بأسوان
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black py-12 px-12 mt-auto text-right">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black mb-2">
            <path d="M6 3h12l4 6-10 13L2 9Z" />
            <path d="M11 3 8 9l4 13 4-13-3-6" />
            <path d="M2 9h20" />
          </svg>
          <span className="text-sm font-serif font-bold tracking-widest text-black uppercase">
            Abd El Kader
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A155] font-bold font-mono mt-1">
            Jewelry • 1938
          </span>
        </div>

        <div className="flex gap-8 md:gap-12 text-[11px] text-black/70 font-bold uppercase tracking-tight">
          <Link to="/" className="hover:text-[#C8A155] transition-colors">الرئيسية</Link>
          <Link to="/gold" className="hover:text-[#C8A155] transition-colors">الذهب</Link>
          <Link to="/silver" className="hover:text-[#C8A155] transition-colors">الفضة</Link>
          <Link to="/btc-bullion" className="hover:text-[#C8A155] transition-colors">سبائك BTC</Link>
          <Link to="/about" className="hover:text-[#C8A155] transition-colors">عن المحل</Link>
        </div>

        <div className="flex gap-8 text-[11px] text-black/50 font-bold tracking-wider">
          <a href="#" className="hover:text-[#C8A155]">Instagram</a>
          <a href="#" className="hover:text-[#C8A155]">Facebook</a>
          <a href="#" className="hover:text-[#C8A155]">WhatsApp</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-black/10 text-center text-black/40 text-[9px] uppercase tracking-[0.3em] font-mono">
        © {new Date().getFullYear()} AL ABDUL QADIR JEWELRY • ASWAN, EGYPT
      </div>
    </footer>
  );
}