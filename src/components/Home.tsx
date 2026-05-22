/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowDown, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { DAILY_GOLD_PRICES, MOCK_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { WarrantyModal } from './WarrantyModal';

export function Home() {
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  
  const featuredGold = MOCK_PRODUCTS.filter(p => (p as any).category === Category.Gold || p.category === 'gold' as any).slice(0, 3);

  return (
    <div className="flex flex-col bg-white text-black overflow-hidden relative" style={{ colorScheme: 'light' }}>
      
      {/* قسم الـ Hero الرئيسي المطور مع Spacing متناسق مع النيفبار المدمج الجديد */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center pt-48 pb-20 px-6 bg-white relative text-center border-b-2 border-black">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          {/* شارة اللوجو التراثي المظبوطة هندسياً */}
          <div className="flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2.5 border border-black/30 px-5 py-2 rounded-sm bg-gray-50/50 shadow-sm">
              <Diamond size={11} className="text-[#C8A155] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-black">
                مؤسسة آل عبد القادر للتراث <span className="text-[#C8A155] font-serif font-black">‹ ١٩٣٨ م ›</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-black text-black tracking-tight leading-[1.15]">
            نقاء الذهب وصياغة العراقة <br />
            <span className="text-[#C8A155] font-normal italic font-serif">بأعلى معايير الاستثمار</span>
          </h1>

          <p className="text-xs md:text-sm text-black/60 max-w-xl mx-auto font-light leading-relaxed">
            مجوهرات آل عبد القادر بأسوان، نجمع بين فخامة التصميم وضمان القيمة الاستثمارية الحقيقية لمدخراتكم عبر جيل بعد جيل من الموثوقية بفرع الصاغة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/gold" className="w-full sm:w-auto bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all border border-black">
              استكشاف المشغولات الملكية
            </Link>
            <Link to="/btc-bullion" className="w-full sm:w-auto bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all border border-black">
              عرض أسعار السبائك اليوم
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/30 animate-bounce">
          <ArrowDown size={20} />
        </div>
      </section>

      {/* قسم عرض الكتالوج الأكثر عشقاً وطلباً بأسوان */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-right">
            <div>
              <span className="text-black/50 font-bold text-[10px] tracking-wider block mb-2 uppercase font-mono">✦ Featured Masterpieces</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black leading-tight">
                المشغولات <span className="text-[#C8A155] italic font-normal">الأكثر طلباً وعشقاً بأسوان</span>
              </h2>
            </div>
            <Link to="/gold" className="px-6 py-3 border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded-sm">
              عرض كل المشغولات
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredGold.map(product => (
              <ProductCard key={product.id} product={product} dailyPrice={DAILY_GOLD_PRICES} />
            ))}
          </div>
        </div>
      </section>

      {/* كرت وثيقة الأمان والضمان المفتوح */}
      <section className="py-20 px-6 bg-gray-50 border-t border-b border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 bg-black text-[#C8A155] border border-[#C8A155] flex items-center justify-center mx-auto rounded-full">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-black">كل قطعة مدموغة وموثقة رسمياً</h3>
          <p className="text-black/60 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            نلتزم بتقديم فواتير ضريبية معتمدة وشهادات منشأ لكل جرام ذهب أو فضة، مدموغة بالكامل من مصلحة الدمغة والموازين المصرية لحماية كامل استثماراتكم.
          </p>
        </div>
      </section>

      <WarrantyModal isOpen={isWarrantyOpen} onClose={() => setIsWarrantyOpen(false)} />
    </div>
  );
}