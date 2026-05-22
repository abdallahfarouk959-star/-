/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search } from 'lucide-react';
import { Category, type Product, Karat } from '../types';
import { MOCK_PRODUCTS, DAILY_GOLD_PRICES } from '../constants';
import { ProductCard } from './ProductCard';
import { calculateProductPrice, cn } from '../lib/utils';

interface CatalogProps {
  category: Category;
}

export function Catalog({ category }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'weight' | 'karat'>('price_desc');
  const [filterKarat, setFilterKarat] = useState<Karat | 'all'>('all');

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(p => p.category === category);

    if (filterKarat !== 'all') {
      result = result.filter(p => p.karat === filterKarat);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.includes(searchQuery) || p.description.includes(searchQuery)
      );
    }

    result = [...result].sort((a, b) => {
      const getP = (p: Product) => {
        let gp = 0;
        if (p.category === Category.Gold) {
          if (p.karat === Karat.K24) gp = DAILY_GOLD_PRICES.gold24;
          else if (p.karat === Karat.K21) gp = DAILY_GOLD_PRICES.gold21;
          else if (p.karat === Karat.K18) gp = DAILY_GOLD_PRICES.gold18;
        } else gp = DAILY_GOLD_PRICES.silver925;
        return calculateProductPrice(p.weight, gp, p.makingFee);
      };

      if (sortBy === 'price_asc') return getP(a) - getP(b);
      if (sortBy === 'price_desc') return getP(b) - getP(a);
      if (sortBy === 'weight') return b.weight - a.weight;
      if (sortBy === 'karat') return b.karat - a.karat;
      return 0;
    });

    return result;
  }, [category, searchQuery, sortBy, filterKarat]);

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-luxury-black geometric-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs block mb-4 italic flex items-center gap-3">
            <span className="w-12 h-[1px] bg-gold/50"></span>
            Heritage Selection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-off-white mb-6">
            مشغولات <span className="text-gold italic">{category}</span>
          </h1>
          <p className="text-off-white/40 text-lg max-w-2xl font-light leading-relaxed">
            مجموعة متميزة من {category} المصنوع يدوياً، تم انتقاؤها بعناية لتعكس أرقى الأذواق وتخلد أغلى اللحظات في حياتكم.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-dark-surface border border-gold/20 p-6 md:p-8 mb-16 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
            <input
              type="text"
              placeholder="ابحث عن قطعة محددة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-luxury-black/40 border border-gold/20 pr-12 pl-4 py-4 text-off-white outline-none focus:border-gold transition-all text-sm placeholder:opacity-40 focus:bg-luxury-black"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-off-white/50 tracking-widest">تـرتيب:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-luxury-black/40 border border-gold/20 text-off-white px-4 py-3 outline-none text-xs font-bold hover:border-gold transition-colors"
              >
                <option value="price_desc">الأعلى سعراً</option>
                <option value="price_asc">الأقل سعراً</option>
                <option value="weight">الأثقل وزناً</option>
                <option value="karat">العيار (الأعلى)</option>
              </select>
            </div>

            {category === Category.Gold && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-off-white/50 tracking-widest">العيـار:</span>
                <div className="flex gap-2">
                  {[24, 21, 18].map((k) => (
                    <button
                      key={k}
                      onClick={() => setFilterKarat(k as Karat === filterKarat ? 'all' : k as Karat)}
                      className={cn(
                        "px-4 py-2 text-[10px] font-bold border transition-all",
                        filterKarat === k ? "bg-gold text-luxury-black border-gold" : "bg-luxury-black/40 text-off-white/70 border-gold/20 hover:border-gold"
                      )}
                    >
                      {k}K
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} dailyPrice={DAILY_GOLD_PRICES} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 border border-dashed border-gold/10"
            >
              <div className="text-gold/20 mb-8 flex justify-center italic">
                <Search size={64} />
              </div>
              <h3 className="text-3xl font-serif font-light text-off-white mb-4">لم نجد ما تبحث عنه</h3>
              <p className="text-off-white/30 font-light">حاول تغيير كلمات البحث أو الفلاتر المختارة.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
