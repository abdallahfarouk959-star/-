/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ShieldCheck, Award, Heart, Diamond } from 'lucide-react';

export function About() {
  return (
    <div className="pt-40 pb-24 px-6 bg-white text-black text-right">
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[#C8A155] font-bold uppercase tracking-[0.4em] text-xs block mb-2 italic flex items-center gap-3">
              <span className="w-12 h-[1px] bg-black"></span>
              Al Abdul Qadir Heritage
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-black leading-tight">
              أصالة تتوارثها <br/><span className="text-[#C8A155] italic font-normal">الأجيال بأسوان</span>
            </h1>
            <div className="space-y-6 text-black/70 text-base leading-relaxed font-light">
              <p>
                بدأت رحلة "آل عبد القادر للمجوهرات" في عام 1938 كصاغة تراثية متخصصة في صياغة الذهب الصافي. ومنذ ذلك اليوم، جعلنا "الأمانة والإتقان" هو عهدنا الوحيد مع زبائننا.
              </p>
              <p>
                على مدار أكثر من ثمانية عقود بقلب ميدان المحطة، تطورنا لنصبح الوكيل المعتمد لسبائك الاستثمار بأسوان، لنجمع بين عراقة التراث ونقاء المشغولات الموثقة بختم مصلحة الدمغة المصرية.
              </p>
            </div>
            
            {/* أرقام الخبرة التكتلية بإطارات سوداء حديدية كـ البورصة */}
            <div className="grid grid-cols-3 gap-0 mt-12 border-2 border-black bg-white p-8">
              <div className="text-center border-l border-black/20 px-4">
                <div className="text-3xl font-serif font-bold text-black mb-1">85+</div>
                <div className="text-[9px] text-black/50 uppercase font-bold tracking-[0.1em]">عاماً من الخبرة</div>
              </div>
              <div className="text-center border-l border-black/20 px-4">
                <div className="text-3xl font-serif font-bold text-black mb-1">15k+</div>
                <div className="text-[9px] text-black/50 uppercase font-bold tracking-[0.1em]">عميل كريم</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-serif font-bold text-black mb-1">200+</div>
                <div className="text-[9px] text-black/50 uppercase font-bold tracking-[0.1em]">طقم ملكي حصري</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden border-2 border-black relative z-10 bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000"
                alt="Jewelry Master"
                className="w-full h-full object-cover grayscale transition-transform hover:scale-105 duration-700"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-black/10 rotate-2 pointer-events-none" />
          </motion.div>
        </section>

        {/* Values Section - مظهر ناصع البياض بإطار أسود عريض */}
        <section className="bg-white border-2 border-black p-8 md:p-16 mb-32 text-black relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck size={28} />, title: 'النزاهة التامة والدمغة', desc: 'كل قطعة مشغولات أو سبائك مختومة وموثقة رسمياً لضمان النقاء الكلي للعيار.' },
              { icon: <Award size={28} />, title: 'الصياغة التراثية', desc: 'نعتمد على أدق النقوش لتقديم قطع ملكية ساحرة تتوارثها العائلات.' },
              { icon: <Heart size={28} />, title: 'الادخار الاستثماري الآمن', desc: 'نقدم استشارات مجانية صادقة تحمي مدخراتكم بسبائك وجنيهات BTC الأصلية.' },
            ].map((value, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-black mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold font-serif text-black">{value.title}</h3>
                <p className="text-black/60 text-xs leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info & Map Box */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <h2 className="text-3xl font-serif font-bold text-black border-r-4 border-black pr-6 leading-tight">شرفنا بزيارتك <br/> بفرع الصاغة</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#C8A155] shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-black/40 mb-1">الموقع الجغرافي</h4>
                  <p className="text-black/80 font-light text-base">أسوان - ميدان المحطة - شارع الصاغة (داخل مول الذهب)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-[#C8A155] shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-black/40 mb-1">ساعات العمل واستقبال المستثمرين</h4>
                  <p className="text-black/80 font-light text-sm italic">السبت - الخميس: ١٠ صباحاً - ١٠ مساءً</p>
                  <p className="text-black/80 font-light text-sm italic">الجمعة: ٢ ظهراً - ١٠ مساءً لتأكيد التثبيت</p>
                </div>
              </div>
            </div>
          </div>

          {/* بوكس الخريطة الاستثماري الفاتح النظيف */}
          <div className="lg:col-span-7 h-[450px] border-2 border-black">
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-gray-50">
               <MapPin size={40} className="text-black/20 mb-4 animate-bounce" />
               <h3 className="text-xl font-serif font-bold text-black mb-2">خريطة فرع آل عبد القادر</h3>
               <p className="text-black/50 text-xs max-w-sm font-light leading-relaxed">
                 موقع فرع ميدان المحطة مفعّل بالكامل داخل النظام الرقمي لفرع أسوان. يرجى زيارتنا بالصاغة مباشرة لعيش تجربة تسوق ملكية فاخرة.
               </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}