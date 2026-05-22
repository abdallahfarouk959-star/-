/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowDown, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { DAILY_GOLD_PRICES, MOCK_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { WarrantyModal } from './WarrantyModal';

export function Home() {
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  
  // text تصفية المنتجات ليعرض أول 3 قطع ذهب في الواجهة
  const featuredGold = MOCK_PRODUCTS.filter(p => (p as any).category === Category.Gold || p.category === 'gold' as any).slice(0, 3);

  return (
    <div className="flex flex-col bg-[#0A0A0A] text-[#F5F2ED] overflow-hidden relative">
      
      {/* 1. شريط الأسعار الحيّة اللانهائي أعلى الصفحة */}
      <div className="absolute top-24 left-0 right-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-[#C8A155]/20 py-2.5 overflow-hidden select-none">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear'
          }}
          className="flex items-center gap-12 text-xs font-medium text-[#F5F2ED]/90 whitespace-nowrap will-change-transform"
        >
          <span className="text-[#C8A155] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A155] animate-pulse"></span>
            مؤشر الصاغة اليوم في مصر
          </span>
          <div>عيار 24: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold24.toLocaleString()}</span> ج.م</div>
          <div>عيار 21: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold21.toLocaleString()}</span> ج.م</div>
          <div>عيار 18: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold18.toLocaleString()}</span> ج.م</div>
          <div>فضة 925: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.silver925.toLocaleString()}</span> ج.م</div>
          
          <span className="text-[#C8A155] font-bold flex items-center gap-1.5 ml-12">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A155] animate-pulse"></span>
            أسعار التداول الحية
          </span>
          <div>عيار 24: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold24.toLocaleString()}</span> ج.م</div>
          <div>عيار 21: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold21.toLocaleString()}</span> ج.م</div>
          <div>عيار 18: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.gold18.toLocaleString()}</span> ج.م</div>
          <div>فضة 925: <span className="font-serif font-bold text-[#C8A155]">{DAILY_GOLD_PRICES.silver925.toLocaleString()}</span> ج.م</div>
        </motion.div>
      </div>

      {/* 2. قسم الـ Hero الأسود الفخم الممتد بكامل الشاشة */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 px-6 bg-[#0A0A0A] overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.04, 0.07, 0.04] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?w=1200&auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[radial-gradient(#C8A155_1px,transparent_1px)] [background-size:32px_32px]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#C8A155]/10 border border-[#C8A155]/30 px-4 py-1.5 rounded-full text-[#C8A155] text-xs font-bold tracking-widest uppercase"
          >
            <Sparkles size={12} />
            تأسست عام 1938 • عراقة تتوارثها الأجيال
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold leading-tight md:leading-snug text-[#F5F2ED] max-w-4xl mx-auto"
          >
            روائع صاغتنا الفريدة <br />
            <span className="bg-gradient-to-r from-[#C8A155] via-[#F3E5AB] to-[#A68546] bg-clip-text text-transparent font-normal italic">تعود إليكم من جديد</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-[#F5F2ED]/60 font-light max-w-2xl mx-auto leading-relaxed"
          >
            تألقي بأفخم الأطقم والمشغولات الملكية المصاغة بدقة متناهية لتناسب ذوقك الرفيع. متوفر الآن قطع محدودة جداً بفرع آل عبد القادر بميدان المحطة (مول الذهب) بأسوان لعيش تجربة تسوق ملكية فاخرة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link
              to="/gold"
              className="px-10 py-4 bg-[#C8A155] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest hover:bg-[#A68546] hover:text-white transition-all rounded-full shadow-lg"
            >
              تصفح الغوايش الملكية
            </Link>
            <Link
              to="/btc-bullion"
              className="px-10 py-4 bg-transparent border border-[#C8A155] text-[#C8A155] font-bold text-xs uppercase tracking-widest hover:bg-[#C8A155] hover:text-[#0A0A0A] transition-all rounded-full shadow-sm"
            >
              قسم سبائك BTC للاستثمار
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-16 hidden md:flex flex-col items-center gap-2 text-[#F5F2ED]/40 text-xs font-bold tracking-widest"
          >
            انزل لأسفل لاستكشاف التشكيلة
            <ArrowDown size={14} className="text-[#C8A155]" />
          </motion.div>
        </div>
      </section>

      {/* [جديد] 3. قسم كروت التعريف بسبائك BTC التفاعلية لادخار واستثمار آمن */}
      <section className="py-20 bg-[#121212] border-y border-[#C8A155]/10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-[#C8A155] text-xs font-bold tracking-wider uppercase">
              <TrendingUp size={16} />
              حلول الادخار الذكي والمضمون
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white">الوكيل المعتمد لسبائك وجنيهات BTC بأسوان</h2>
            <p className="text-xs md:text-sm text-[#F5F2ED]/70 font-light leading-relaxed max-w-3xl">
              احمِ مدخراتك واستثمر بذكاء مع تشكيلة سبائك BTC الذهبية المصاغة من الذهب الخالص عيار 24 بنقاء 999.9، المتوفرة بجميع الأوزان من 1 جرام وحتى 100 جرام، بالإضافة إلى الجنيهات الذهب التراثية بأسعار محدثة لحظياً وبأقل مصنعية وكاش باك مميز عند إعادة البيع.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
            <Link to="/btc-bullion" className="w-full lg:w-auto px-8 py-4 bg-transparent border-2 border-[#C8A155] text-[#C8A155] text-xs font-bold uppercase tracking-wider rounded-sm text-center hover:bg-[#C8A155] hover:text-[#0A0A0A] transition-all">
              عرض أسعار السبائك اليوم
            </Link>
          </div>
        </div>
      </section>

      {/* 4. قسم عرض الكتالوج الأكثر عشقاً وطلباً */}
      <section className="py-24 px-6 bg-[#0A0A0A] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-right">
            <div>
              <span className="text-[#C8A155] font-bold text-[10px] tracking-wider block mb-2 uppercase">التشكيلة المخطوفة حالياً</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#F5F2ED] leading-tight">
                الغوايش والأطقم <span className="text-[#C8A155] italic underline decoration-[#C8A155]/20 underline-offset-8">اللي كل الستات بتعشقها</span>
              </h2>
            </div>
            <Link to="/gold" className="px-6 py-2.5 border border-[#C8A155]/30 text-[#C8A155] text-xs font-bold uppercase tracking-widest hover:bg-[#C8A155] hover:text-[#0A0A0A] transition-all rounded-sm shrink-0">
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

      <WarrantyModal isOpen={isWarrantyOpen} onClose={() => setIsWarrantyOpen(false)} />
    </div>
  );
}