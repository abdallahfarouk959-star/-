/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { Category, type Product, Karat } from '../types';
import { MOCK_PRODUCTS, DAILY_GOLD_PRICES } from '../constants';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';

interface CatalogProps {
  category: Category;
}

export function Catalog({ category }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'weight' | 'karat'>('price_desc');
  const [filterKarat, setFilterKarat] = useState<Karat | 'all'>('all');

  const filteredProducts = useMemo(() => {
    // تصفية آمنة تتوافق مع أي Type للـ category
    let result = MOCK_PRODUCTS.filter(p => p.category === category || (p as any).category === (category as any));

    if (filterKarat !== 'all') {
      result = result.filter(p => p.karat === filterKarat);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.includes(searchQuery) || p.description.includes(searchQuery)
      );
    }

    // الترتيب بحساب السعر ديناميكياً لتفادي مشاكل استيراد الدالة الخارجية
    result = [...result].sort((a, b) => {
      const getProductPrice = (p: Product) => {
        let gp = 0;
        if (p.category === Category.Gold || (p as any).category === 'gold') {
          if (p.karat === Karat.K24) gp = DAILY_GOLD_PRICES.gold24;
          else if (p.karat === Karat.K21) gp = DAILY_GOLD_PRICES.gold21;
          else if (p.karat === Karat.K18) gp = DAILY_GOLD_PRICES.gold18;
        } else {
          gp = DAILY_GOLD_PRICES.silver925;
        }
        return p.weight * (gp + p.makingFee);
      };

      if (sortBy === 'price_asc') return getProductPrice(a) - getProductPrice(b);
      if (sortBy === 'price_desc') return getProductPrice(b) - getProductPrice(a);
      if (sortBy === 'weight') return b.weight - a.weight;
      if (sortBy === 'karat') return (b.karat as number) - (a.karat as number);
      return 0;
    });

    return result;
  }, [category, searchQuery, sortBy, filterKarat]);

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-white text-black text-right">
      <div className="max-w-7xl mx-auto">
        
        {/* العناوين والهيدر الأبيض النظيف */}
        <div className="mb-16 border-b-2 border-black pb-8">
          <span className="text-[#C8A155] font-bold uppercase tracking-[0.4em] text-xs block mb-4 italic flex items-center gap-3">
            <span className="w-12 h-[1px] bg-black"></span>
            Heritage Selection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">
            مشغولات <span className="text-[#C8A155] italic">{category === Category.Gold ? 'الذهب الملكي' : 'الفضة النقية'}</span>
          </h1>
          <p className="text-black/60 text-sm md:text-base max-w-2xl font-light leading-relaxed">
            مجموعة متميزة من القطع المصنوعة يدوياً، تم انتقاؤها بعناية لتعكس أرقى الأذواق وتخلد أغلى اللحظات في حياتكم بفرع أسوان.
          </p>
        </div>

        {/* فلاتر البحث والترتيب الفاتحة بإطارات حديدية سوداء */}
        <div className="bg-white border-2 border-black p-6 md:p-8 mb-16 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
            <input
              type="text"
              placeholder="ابحث عن قطعة محددة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-black pr-12 pl-4 py-3.5 text-black outline-none focus:border-[#C8A155] transition-all text-sm placeholder:text-black/30 text-right font-bold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-black/50 tracking-widest">تـرتيب:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-black text-black px-4 py-2.5 outline-none text-xs font-bold hover:border-[#C8A155] transition-colors text-right"
              >
                <option value="price_desc">الأعلى سعراً</option>
                <option value="price_asc">الأقل سعراً</option>
                <option value="weight">الأثقل وزناً</option>
                <option value="karat">العيار (الأعلى)</option>
              </select>
            </div>

            {category === Category.Gold && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-black/50 tracking-widest">العيـار:</span>
                <div className="flex gap-2">
                  {[24, 21, 18].map((k) => (
                    <button
                      key={k}
                      onClick={() => setFilterKarat(k as Karat === filterKarat ? 'all' : k as Karat)}
                      className={cn(
                        "px-4 py-2 text-[10px] font-bold border transition-all rounded-sm",
                        filterKarat === k ? "bg-black text-white border-black" : "bg-white text-black border-black/30 hover:border-black"
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

        {/* عرض المشغولات */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} dailyPrice={DAILY_GOLD_PRICES} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 border-2 border-dashed border-black/20 bg-gray-50">
              <h3 className="text-2xl font-serif font-bold text-black mb-2">لم نجد ما تبحث عنه</h3>
              <p className="text-black/50 text-xs font-light">حاول تغيير كلمات البحث أو الفلاتر المختارة.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}