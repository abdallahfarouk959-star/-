/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { DAILY_GOLD_PRICES } from '../constants';
import { Karat, Category } from '../types';
import { cn } from '../lib/utils';

export function LiveGoldCalculator() {
  const [weight, setWeight] = useState<number | ''>('');
  const [karat, setKarat] = useState<Karat>(Karat.K21);
  const [category, setCategory] = useState<Category>(Category.Gold);

  const pricePerGram = useMemo(() => {
    if (category === Category.Silver) return DAILY_GOLD_PRICES.silver925;
    if (karat === Karat.K24) return DAILY_GOLD_PRICES.gold24;
    if (karat === Karat.K21) return DAILY_GOLD_PRICES.gold21;
    return DAILY_GOLD_PRICES.gold18;
  }, [category, karat]);

  const estimatedValue = useMemo(() => {
    const w = typeof weight === 'number' ? weight : 0;
    return w * pricePerGram;
  }, [weight, pricePerGram]);

  return (
    <div className="bg-dark-surface border border-gold/20 p-8 md:p-10 flex flex-col relative overflow-hidden geometric-bg w-full">
      <div className="absolute top-0 left-0 p-8 opacity-5 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <Calculator size={160} />
      </div>
      
      <h3 className="text-gold text-xl font-serif italic mb-8 relative z-10 flex items-center gap-3">
         <Calculator size={20} className="text-gold/70" />
         حاسبة القيمة التقريبية المباشرة
      </h3>

      <div className="flex flex-col gap-8 relative z-10">
        <div>
           <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-3">نوع المعدن والعيار</label>
           <div className="grid grid-cols-4 gap-2 md:gap-3">
             {[
               { k: Karat.K24, c: Category.Gold, label: '24K' },
               { k: Karat.K21, c: Category.Gold, label: '21K' },
               { k: Karat.K18, c: Category.Gold, label: '18K' },
               { k: Karat.Silver925, c: Category.Silver, label: '925s' },
             ].map(opt => (
               <button
                 key={opt.label}
                 onClick={() => { setKarat(opt.k); setCategory(opt.c); }}
                 className={cn(
                   "py-3 text-xs md:text-sm font-bold border transition-colors duration-300 font-mono",
                   karat === opt.k && category === opt.c
                     ? "bg-gold text-luxury-black border-gold shadow-[0_0_15px_rgba(200,161,85,0.3)]"
                     : "bg-luxury-black/60 border-gold/20 text-off-white/60 hover:border-gold/50 hover:text-gold"
                 )}
               >
                 {opt.label}
               </button>
             ))}
           </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-3">الوزن بالجرام</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full bg-luxury-black/60 border border-gold/20 text-gold px-6 py-4 text-xl md:text-2xl font-mono focus:border-gold outline-none transition-colors focus:bg-luxury-black placeholder:text-gold/20"
              placeholder="0.00"
              dir="ltr"
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/50 font-sans text-sm uppercase font-bold tracking-widest">جرام</span>
          </div>
        </div>

        <motion.div 
          key={estimatedValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 pt-8 border-t border-gold/10"
        >
          <span className="block text-[10px] uppercase tracking-widest text-off-white/30 mb-2">القيمة الإجمالية المقدرة (خام)</span>
          <div className="text-4xl md:text-5xl font-serif text-gold font-bold break-all leading-none py-2">
            {estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-sans text-off-white/40 font-normal">ج.م</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
