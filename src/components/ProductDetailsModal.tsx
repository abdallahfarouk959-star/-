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

  // تكرار الصورة لمحاكاة المعرض الفخم
  const images = [product.image, product.image, product.image, product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* الخلفية المعتمة الشفافة خلف المودال */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* حاوية المودال الرئيسية المحدثة بالكامل للـ Light Mode عالي التباين */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{ colorScheme: 'light' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white border-2 border-black shadow-2xl z-[60] overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-black"
            dir="rtl"
          >
            {/* زر الإغلاق الفخم */}
            <button 
              onClick={onClose} 
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all outline-none rounded-sm"
            >
              <X size={20} />
            </button>

            {/* الجانب الأيمن: معرض صور المنتج */}
            <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col justify-between border-b md:border-b-0 md:border-l-2 border-black">
              <div className="aspect-square w-full overflow-hidden bg-white border border-black/20 flex items-center justify-center rounded-sm">
                <img 
                  src={images[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-300" 
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "aspect-square border-2 overflow-hidden bg-white transition-all rounded-sm",
                      activeImageIndex === idx ? "border-[#C8A155] scale-[1.02]" : "border-black/20 hover:border-black/60"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* الجانب الأيسر: تفاصيل ومواصفات القطعة الحصرية */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto bg-white text-right">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A155] block mb-1">قطعة حصرية معتمدة</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-black leading-tight">{product.name}</h2>
                </div>

                <p className="text-black/70 text-xs md:text-sm font-light leading-relaxed">
                  {product.description}
                </p>

                {/* جدول المواصفات الفنية باللون الأسود الواضح */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-black/20 py-4 text-xs font-bold">
                  <div className="flex flex-col gap-1">
                    <span className="text-black/40 text-[9px] uppercase tracking-wider">الكتلة الكلية</span>
                    <span className="text-black font-mono text-sm bg-gray-100 px-2 py-1 border border-black/10 w-max rounded-sm">
                      {product.weight} جرام
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-black/40 text-[9px] uppercase tracking-wider">العيار ونوع المعدن</span>
                    <span className="text-black text-sm">
                      {product.category === Category.Gold ? 'ذهب' : 'فضة'} عيار {product.karat}
                    </span>
                  </div>
                </div>

                {/* قسم عرض السعر الإجمالي الاستثماري المحدث */}
                <div className="pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">الاستثمار المتوقع (شامل المصنعية والدمغة)</span>
                    <div className="text-3xl md:text-4xl font-serif text-black font-black flex items-baseline gap-2">
                      {totalPrice.toLocaleString()} 
                      <span className="text-sm font-sans font-normal text-black/50">ج.م</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* زر تفعيل الحجز الفوري */}
              <button 
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all mt-8 border border-black shadow-md flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <Check size={16} className="text-[#C8A155]" />
                تأكيد اختيار القطعة وجدولة المعاينة بأسوان
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}