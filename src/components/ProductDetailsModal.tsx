/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { type Product, Category } from '../types';
import { cn } from '../lib/utils';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  totalPrice: number;
  onBookNow: () => void;
}

export function ProductDetailsModal({ isOpen, onClose, product, totalPrice, onBookNow }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Since we have one mock image, we'll repeat it for the gallery simulation
  const images = [product.image, product.image, product.image, product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-dark-surface border border-gold/30 shadow-2xl z-[60] overflow-hidden flex flex-col max-h-[90vh] md:max-h-[80vh] geometric-bg"
            dir="rtl"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 left-6 z-10 w-10 h-10 flex items-center justify-center bg-luxury-black/50 hover:bg-gold border border-gold/20 text-off-white hover:text-luxury-black transition-colors rounded-full"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto overflow-x-hidden">
              {/* Right Side: Image Gallery */}
              <div className="flex flex-col p-6 md:p-10 border-b md:border-b-0 md:border-l border-gold/10 bg-black/20">
                <div className="relative aspect-[4/5] overflow-hidden border border-gold/20 mb-4 bg-luxury-black">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative aspect-square overflow-hidden border transition-all duration-300",
                        activeImageIndex === idx ? "border-gold scale-95 shadow-[0_0_15px_rgba(200,161,85,0.4)]" : "border-gold/20 opacity-50 hover:opacity-100 hover:border-gold/50"
                      )}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-luminosity" />
                      {activeImageIndex === idx && (
                        <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Left Side: Product Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-2">
                   <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-widest mb-6 shadow-sm">
                     {product.category === Category.Gold ? `ذهب صلب عيار ${product.karat}` : `فضة نقية عيار ${product.karat}`}
                   </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-light text-off-white mb-6 leading-tight">
                  {product.name}
                </h2>
                
                <div className="w-12 h-[1px] bg-gold/50 mb-8" />
                
                <p className="text-off-white/70 font-light leading-relaxed mb-10 text-lg">
                  {product.description} قطعة استثنائية صُممت بعناية فائقة لتعكس روعة التراث المعاصر، وتخلد ذكرى لا تُنسى في سجل عائلتكم العريق.
                </p>

                <div className="space-y-4 mb-12">
                   <div className="flex justify-between items-center py-3 border-b border-gold/10">
                     <span className="text-[11px] uppercase tracking-widest text-off-white/40">الكتلة الصافية</span>
                     <span className="font-mono text-off-white font-bold">{product.weight}g</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-gold/10">
                     <span className="text-[11px] uppercase tracking-widest text-off-white/40">المصنعية والدمغة لتشغيل الجرام</span>
                     <span className="font-mono text-off-white font-bold">{product.makingFee} <span className="font-sans text-[10px] font-normal text-off-white/50">ج.م</span></span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-gold/10">
                     <span className="text-[11px] uppercase tracking-widest text-off-white/40">نوع المعدن</span>
                     <span className="font-serif text-off-white font-bold text-sm">{product.category} عيار {product.karat}</span>
                   </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between mb-8">
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-off-white/40 mb-2">الاستثمار المتوقع (شامل)</span>
                        <div className="text-4xl font-serif text-gold font-bold flex items-baseline gap-2">
                          {totalPrice.toLocaleString()} 
                          <span className="text-sm font-sans font-normal text-off-white/50">ج.م</span>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => {
                      onClose();
                      onBookNow();
                    }}
                    className="w-full bg-gold text-luxury-black py-5 text-sm uppercase font-bold tracking-widest hover:bg-gold-dark transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(200,161,85,0.2)] flex items-center justify-center gap-3"
                  >
                    <Check size={18} />
                    تأكيد اختيار القطعة وجدولة المعاينة
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
