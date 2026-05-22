/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Mail, ShieldCheck, Award, Heart } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function About() {
  const locationPosition = { lat: 30.0911, lng: 31.3235 }; // مصر الجديدة

  return (
    <div className="pt-40 pb-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs block mb-6 italic flex items-center gap-3">
              <span className="w-12 h-[1px] bg-gold/50"></span>
              Al Abdul Qadir Heritage
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-light text-off-white mb-10 leading-tight">
              أصالة تتوارثها <br/><span className="text-gold italic">الأجيال</span>
            </h1>
            <div className="space-y-8 text-off-white/50 text-lg leading-relaxed font-light">
              <p>
                بدأت رحلة "مجوهرات العبد القادر" في عام 1938 كورشة فنية متخصصة في صياغة الذهب. ومنذ ذلك اليوم، جعلنا "الإتقان" هو لغتنا الوحيدة.
              </p>
              <p>
                على مدار أكثر من ثمانية عقود، تطورنا لنصبح صرحاً يجمع بين عبق التراث وتطور التصميم العالمي. نحن نؤمن أن كل قطعة مجوهرات هي حكاية فريدة، واستثمار في ذكرى غالية.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-0 mt-16 border border-gold/20 bg-dark-surface p-12">
              <div className="text-center border-l border-gold/20 px-4">
                <div className="text-4xl font-serif font-bold text-gold mb-2">85+</div>
                <div className="text-[9px] text-off-white/30 uppercase font-bold tracking-[0.2em]">Years of Expertise</div>
              </div>
              <div className="text-center border-l border-gold/10 px-4">
                <div className="text-4xl font-serif font-bold text-gold mb-2">15k+</div>
                <div className="text-[9px] text-off-white/30 uppercase font-bold tracking-[0.2em]">Loyal Partners</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl font-serif font-bold text-gold mb-2">200+</div>
                <div className="text-[9px] text-off-white/30 uppercase font-bold tracking-[0.2em]">Signature Designs</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden border border-gold/20 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000"
                alt="Jewelry Master"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gold/10 rotate-3 pointer-events-none" />
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="bg-dark-surface border-y border-gold/10 p-12 md:p-24 mb-40 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <ShieldCheck size={32} />, title: 'النزاهة التامة', desc: 'كل قطعة مختومة وموثقة لضمان العيار والجودة والدقة المتناهية.' },
              { icon: <Award size={32} />, title: 'الإتقان اليدوي', desc: 'نعتمد على أمهر الصاغة لضمان تفاصيل دقيقة تحاكي التراث العالمي.' },
              { icon: <Heart size={32} />, title: 'العلاقة الممتدة', desc: 'نحن هنا لخدمتك وتقديم النصيحة الصادقة التي تحمي استثمارك.' },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-gold mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 font-serif italic text-off-white">{value.title}</h3>
                <p className="text-off-white/40 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-4xl font-serif font-light text-off-white mb-12 italic border-r-4 border-gold pr-8 leading-tight">شرفنا <br/> بزيارتك</h1>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-off-white/30 mb-2">الموقع الجغرافي</h4>
                  <p className="text-off-white/80 font-light text-lg">شارع الذهب، مصر الجديدة، القاهرة</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Clock className="text-gold shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-off-white/30 mb-2">ساعات الاستقبال</h4>
                  <p className="text-off-white/80 font-light italic">السبت - الخميس: 10 صباحاً - 10 مساءً</p>
                  <p className="text-off-white/80 font-light italic">الجمعة: 2 ظهراً - 10 مساءً</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                 <Mail className="text-gold shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-off-white/30 mb-2">للاستفسارات الخاصة</h4>
                   <p className="text-off-white/80 font-light">concierge@alabdulqadir.com</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[600px] border border-gold/20 grayscale invert-[0.1]">
            {hasValidKey ? (
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  defaultCenter={locationPosition}
                  defaultZoom={15}
                  mapId="JEWELRY_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={locationPosition}>
                    <Pin background="#D4AF37" glyphColor="#000" borderColor="#000" />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gold/10 p-12 text-center bg-dark-surface">
                 <MapPin size={48} className="text-gold/20 mb-6 font-serif italic" />
                 <h3 className="text-2xl font-serif font-light text-off-white mb-4">خريطة المعرض</h3>
                 <p className="text-off-white/30 text-sm max-w-xs font-light">
                   الموقع الجغرافي مفعّل فقط لمستخدمي النظام. يرجى التواصل هاتفياً للحصول على اتجاهات دقيقة.
                 </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
