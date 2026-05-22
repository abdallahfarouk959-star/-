/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { About } from './components/About';
import { BtcBullion } from './components/BtcBullion'; // 1. استيراد صفحة السبائك الجديدة هنا
import { Category } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gold" element={<Catalog category={Category.Gold} />} />
            <Route path="/silver" element={<Catalog category={Category.Silver} />} />
            <Route path="/about" element={<About />} />
            {/* 2. إضافة مسار صفحة السبائك والجنيهات الذهب هنا */}
            <Route path="/btc-bullion" element={<BtcBullion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}