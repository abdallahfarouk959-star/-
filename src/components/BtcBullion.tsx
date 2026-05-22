/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, TrendingUp, Layers, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DAILY_GOLD_PRICES } from '../constants';

export function BtcBullion() {
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'bullion' | 'coin'>('all');

  const bullionItems = [
    { id: 'b1', name: 'سبيكة BTC ذهب صافي 1 جرام', weight: 1, karat: '24', makingFee: 210, type: 'bullion' },
    { id: 'b2', name: 'سبيكة BTC ذهب صافي 5 جرام', weight: 5, karat: '24', makingFee: 155, type: 'bullion' },
    { id: 'b3', name: 'سبيكة BTC ذهب صافي 10 جرام', weight: 10, karat: '24', makingFee: 130, type: 'bullion' },
    { id: 'b4', name: 'سبيكة BTC ذهب صافي 20 جرام', weight: 20, karat: '24', makingFee: 110, type: 'bullion' },
    { id: 'b5', name: 'سبيكة BTC ذهب صافي 31.1 جرام (أونصة)', weight: 31.1, karat: '24', makingFee: 98, type: 'bullion' },
    { id: 'b6', name: 'سبيكة BTC ذهب صافي 50 جرام', weight: 50, karat: '24', makingFee: 92, type: 'bullion' },
    { id: 'b7', name: 'جنيه ذهب BTC إسلامي كلاسيك', weight: 8, karat: '21', makingFee: 125, type: 'coin' },
    { id: 'b8', name: 'نصف جنيه ذهب BTC فاخر', weight: 4, karat: '21', makingFee: 140, type: 'coin' },
  ];

  const calculatePrice = (weight: number, karat: string, makingFee: number) => {
    const gramPrice = karat === '24' ? DAILY_GOLD_PRICES.gold24 : DAILY_GOLD_PRICES.gold21;
    return weight * (gramPrice + makingFee);
  };

  const filteredItems = bullionItems.filter(item => 
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24 px-6 text-right">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* هيدر الصفحة الاستثمارية الموحد بالكامل */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-2 border-black pb-8 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C8A155] text-xs font-bold uppercase tracking-widest">
              <Layers size={14} />
              منصة الادخار الذهبي المعتمدة بأسوان
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-black">سبائك وجنيهات BTC النقدية</h1>
            <p className="text-sm text-black/60 font-light max-w-xl">
              تصفح الأوزان الاستثمارية الفاخرة بأسعار الدمغة المحدثة لحظياً. احمِ قوتك الشرائية بسبائك معتمدة 100%.
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-[#C8A155] font-bold hover:underline outline-none">
            العودة للرئيسية
            <ArrowRight size={14} className="rotate-180" />
          </Link>
        </div>

        {/* أزرار التصفية السريعة والراقية */}
        <div className="flex flex-wrap gap-3 border-b border-black/10 pb-4">
          {['all', 'bullion', 'coin'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-5 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                activeFilter === filter ? 'bg-black text-white' : 'bg-gray-50 border border-black/20 text-black/70'
              }`}
            >
              {filter === 'all' ? 'كل المعروضات المالية' : filter === 'bullion' ? 'السبائك (عيار 24)' : 'الجنيهات الذهب (عيار 21)'}
            </button>
          ))}
        </div>

        {/* كروت الأوزان المبتكرة بالخلفية البيضاء الفاخرة والإطار الأسود */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const price = calculatePrice(item.weight, item.karat, item.makingFee);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="bg-white border-2 border-black p-6 flex flex-col justify-between hover:shadow-md transition-all rounded-sm relative overflow-hidden group"
                >
                  <div className="absolute -left-4 -bottom-6 text-7xl font-mono font-bold text-black/[0.02] pointer-events-none select-none">
                    {item.weight}g
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-black font-serif">{item.name}</h3>
                      <p className="text-[11px] text-[#C8A155] font-mono tracking-widest font-bold">غلاف معتمد مصنع BTC</p>
                    </div>
                    <div className="w-14 h-14 bg-black border border-[#C8A155] rounded-sm flex flex-col items-center justify-center shrink-0 text-white">
                      <span className="text-base font-serif font-bold text-[#C8A155]">{item.weight}</span>
                      <span className="text-[9px] text-white/50 uppercase font-mono">جرام</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-y border-black/10 py-3 my-4 font-light text-black/70">
                    <div className="flex justify-between">
                      <span>العيار والنقاء المالي:</span>
                      <span className="font-bold text-black font-mono">عيار {item.karat} ({item.karat === '24' ? '999.9' : '875'})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المصنعية والدمغة الرسمية:</span>
                      <span className="font-bold text-black font-serif">{item.makingFee} ج.م / جرام</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-black/40 uppercase font-bold">السعر الإجمالي اللحظي</span>
                      <span className="text-xl font-serif font-bold text-black">
                        {Math.round(price).toLocaleString()} <span className="text-xs font-sans font-normal opacity-60">ج.م</span>
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedWeight(item.name)}
                      className="px-5 py-3 bg-black hover:bg-black/90 text-white transition-all font-bold text-xs rounded-sm outline-none shrink-0"
                    >
                      تثبيت وحجز السعر
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* وثيقة وشارة الضمان الفاتحة */}
        <div className="bg-white border-2 border-black p-6 rounded-sm flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
          <ShieldCheck size={36} className="text-[#C8A155] shrink-0" />
          <p className="text-xs text-black/70 leading-relaxed font-light">
            مؤسسة آل عبد القادر تضمن تثبيت السعر فور إتمام الحجز الهاتفي وحماية قيمة أموالكم الاستثمارية. جميع السبائك مدموغة ومختومة رسمياً بالكامل بمصلحة الموازين والدمغة المصرية.
          </p>
        </div>

        {/* مودال حجز السبائك الفاتح */}
        {selectedWeight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-black max-w-md w-full p-8 rounded-sm text-center space-y-6 text-black">
              <div className="w-12 h-12 bg-black text-[#C8A155] rounded-full flex items-center justify-center mx-auto border border-[#C8A155]">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-black">تثبيت السعر الاستثماري</h3>
                <p className="text-xs text-black/60 leading-relaxed">
                  تم تحديد اختياركم لـ **{selectedWeight}**. سيقوم مستشارو الاستثمار بفرع مول الذهب بأسوان بالتواصل معكم لتثبيت القيمة النقدية وتأكيد موعد الاستلام الفوري لحماية مدخراتكم.
                </p>
              </div>
              <button onClick={() => setSelectedWeight(null)} className="px-6 py-2 bg-black text-white font-bold text-xs rounded-sm hover:bg-black/90 transition-all outline-none">
                العودة للوحة الاستثمار
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}