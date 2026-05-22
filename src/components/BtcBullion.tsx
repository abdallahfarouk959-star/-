/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Award, Coins, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DAILY_GOLD_PRICES } from '../constants';

export function BtcBullion() {
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);

  // مصفوفة أوزان سبائك BTC الشهيرة مع حساب الأسعار تلقائياً بناءً على سعر عيار 24 الحالي
  const bullionItems = [
    { id: 'b1', name: 'سبيكة BTC ذهب صافي 1 جرام', weight: 1, karat: '24', makingFee: 210 },
    { id: 'b2', name: 'سبيكة BTC ذهب صافي 5 جرام', weight: 5, karat: '24', makingFee: 155 },
    { id: 'b3', name: 'سبيكة BTC ذهب صافي 10 جرام', weight: 10, karat: '24', makingFee: 130 },
    { id: 'b4', name: 'سبيكة BTC ذهب صافي 20 جرام', weight: 20, karat: '24', makingFee: 110 },
    { id: 'b5', name: 'سبيكة BTC ذهب صافي 31.1 جرام (أونصة)', weight: 31.1, karat: '24', makingFee: 98 },
    { id: 'b6', name: 'سبيكة BTC ذهب صافي 50 جرام', weight: 50, karat: '24', makingFee: 92 },
    { id: 'b7', name: 'جنيه ذهب BTC إسلامي كلاسيك', weight: 8, karat: '21', makingFee: 125, isCoin: true },
    { id: 'b8', name: 'نصف جنيه ذهب BTC فاخر', weight: 4, karat: '21', makingFee: 140, isCoin: true },
  ];

  const calculatePrice = (weight: number, karat: string, makingFee: number) => {
    const gramPrice = karat === '24' ? DAILY_GOLD_PRICES.gold24 : DAILY_GOLD_PRICES.gold21;
    return weight * (gramPrice + makingFee);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F2ED] pt-32 pb-24 px-6 text-right">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* العناوين والترحيب بقسم الاستثمار */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#C8A155]/20 pb-8 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C8A155] text-xs font-bold uppercase tracking-widest">
              <Award size={14} />
              الكتالوج الرسمي للاستثمار والأوزان المعتمدة
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">منصة سبائك وجنيهات BTC الملكية</h1>
            <p className="text-sm text-[#F5F2ED]/60 font-light max-w-2xl">
              تحديث مباشر للأسعار وفق مؤشر الصاغة اليوم في مصر. السبائك مغلفة ومختومة بالكامل، مع ميزة الكاش باك (إعادة جزء من المصنعية عند إعادة البيع).
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-[#C8A155] font-bold hover:underline outline-none">
            العودة للرئيسية
            <ArrowRight size={14} className="rotate-180" />
          </Link>
        </div>

        {/* عرض شبكة المنتجات للسبائك */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bullionItems.map((item) => {
            const price = calculatePrice(item.weight, item.karat, item.makingFee);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-[#121212] border border-[#C8A155]/15 rounded-sm p-6 flex flex-col justify-between shadow-md relative group hover:border-[#C8A155]/40 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#C8A155]/10 text-[#C8A155] text-[10px] font-bold px-3 py-1 rounded-full border border-[#C8A155]/20 font-mono">
                      {item.isCoin ? 'جنيه ذهب عيار 21' : 'سبيكة عيار 24'}
                    </span>
                    {item.isCoin ? <Coins size={18} className="text-[#C8A155]" /> : <TrendingUp size={18} className="text-[#C8A155]" />}
                  </div>

                  <h3 className="text-base font-serif font-bold text-white line-clamp-2 min-h-[3rem] group-hover:text-[#C8A155] transition-colors">
                    {item.name}
                  </h3>
                  
                  <div className="mt-4 space-y-2 text-xs text-[#F5F2ED]/60 border-t border-[#C8A155]/10 pt-4 font-light">
                    <div className="flex justify-between">
                      <span>الوزن الصافي:</span>
                      <span className="font-bold text-white font-serif">{item.weight} جرام</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المصنعية والدمغة:</span>
                      <span className="font-bold text-white font-serif">{item.makingFee} ج.م / جرام</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#C8A155]/10 flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#F5F2ED]/40 uppercase font-bold">القيمة الشرائية اللحظية</span>
                    <span className="text-2xl font-serif font-bold text-[#C8A155]">
                      {Math.round(price).toLocaleString()} <span className="text-xs font-sans font-normal text-white/50">ج.م</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedWeight(item.name)}
                    className="w-full py-3 bg-[#C8A155] hover:bg-[#A68546] text-[#0A0A0A] hover:text-white transition-all font-bold text-xs rounded-sm shadow-sm uppercase tracking-widest outline-none"
                  >
                    حجز وتثبيت السعر بالصاغة
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* وثيقة وشارة الضمان المعتمدة لمصلحة الموازين */}
        <div className="bg-[#121212] border border-[#C8A155]/20 p-8 rounded-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <ShieldCheck size={48} className="text-[#C8A155] shrink-0" />
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-white">ميثاق الأمان والنزاهة الاستثمارية</h3>
            <p className="text-xs text-[#F5F2ED]/70 leading-relaxed font-light">
              جميع سبائك وجنيهات BTC المستلمة من خلال فروعنا بأسوان تكون مغلفة بغلاف المصنع الذكي المزود بالعلامة المائية والرقم التسلسلي لضمان النقاء الكلي، ومدموغة رسمياً بالكامل بمصلحة الموازين والدمغة المصرية. يمكنك إعادة بيعها بأي وقت والحصول على الكاش باك القانوني للمصنعية.
            </p>
          </div>
        </div>

        {/* نافذة تأكيد نجاح الحجز التفاعلي البسيط */}
        {selectedWeight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#121212] border border-[#C8A155] max-w-md w-full p-8 rounded-sm text-center space-y-6">
              <div className="w-16 h-16 bg-[#C8A155]/10 text-[#C8A155] rounded-full flex items-center justify-center mx-auto">
                <TrendingUp size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-white">طلب تثبيت السعر قيد المعالجة</h3>
                <p className="text-xs text-[#F5F2ED]/60 leading-relaxed">
                  تم اختيار **{selectedWeight}**. سيقوم خبراء الصاغة بفرع آل عبد القادر بمول الذهب بأسوان بالتواصل معك هاتفياً فوراً لتثبيت السعر الحالي وتأكيد موعد الاستلام السريع بالصاغة لحماية مدخراتك.
                </p>
              </div>
              <button onClick={() => setSelectedWeight(null)} className="px-6 py-2 bg-[#C8A155] text-[#0A0A0A] font-bold text-xs rounded-sm hover:bg-[#A68546] hover:text-white transition-all outline-none">
                العودة للوحة الاستثمار
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}