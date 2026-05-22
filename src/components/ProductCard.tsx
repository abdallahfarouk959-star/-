/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Info } from 'lucide-react';
import { type Product, type DailyPrice, Karat, Category } from '../types';
import { calculateProductPrice } from '../lib/utils';
import { BookingModal } from './BookingModal';
import { ProductDetailsModal } from './ProductDetailsModal';

interface ProductCardProps {
  product: Product;
  dailyPrice: DailyPrice;
  key?: React.Key;
}

export function ProductCard({ product, dailyPrice }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  let gramPrice = 0;
  if (product.category === Category.Gold) {
    if (product.karat === Karat.K24) gramPrice = dailyPrice.gold24;
    else if (product.karat === Karat.K21) gramPrice = dailyPrice.gold21;
    else if (product.karat === Karat.K18) gramPrice = dailyPrice.gold18;
  } else {
    gramPrice = dailyPrice.silver925;
  }

  const totalPrice = calculateProductPrice(product.weight, gramPrice, product.makingFee);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ colorScheme: 'light' }}
      className="bg-white border-2 border-black flex flex-col group relative overflow-hidden text-black shadow-sm"
    >
      {/* حاوية الصورة وعلامة التمييز */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b-2 border-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-white/20">
          {product.category === Category.Gold ? `ذهب عيار ${product.karat}` : 'فضة نقية'}
        </div>
        
        <button 
          onClick={() => setIsDetailsModalOpen(true)}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md rounded-sm"
        >
          <Info size={16} />
        </button>
      </div>

      {/* تفاصيل الكارت بلون أسود واضح جداً */}
      <div className="p-6 flex flex-col flex-1 text-right bg-white">
        <h3 className="font-serif font-bold text-lg text-black mb-2 line-clamp-1 group-hover:text-[#C8A155] transition-colors">
          {product.name}
        </h3>
        <p className="text-black/60 text-xs font-light line-clamp-2 mb-6 min-h-[32px] leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto border-t border-black/10 pt-4 flex items-end justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-black/40 mb-1 font-bold">استثمارك التقريبي</span>
            <span className="text-2xl font-serif text-black font-black">
              {totalPrice.toLocaleString()} <span className="text-[10px] font-sans text-black/50">ج.م</span>
            </span>
          </div>
          <div className="text-left flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-black/40 mb-1 font-bold">الكتلة</span>
            <span className="text-sm font-mono font-bold text-black bg-gray-100 px-2 py-0.5 border border-black/10 rounded-sm">
              {product.weight} جرام
            </span>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-all active:scale-[0.98] border border-black"
        >
          تحديـد موعـد معايـنة بأسوان
        </button>
      </div>
      
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        totalPrice={totalPrice}
      />

      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={product}
        totalPrice={totalPrice}
        onBookNow={() => {
          setIsDetailsModalOpen(false);
          setIsModalOpen(true);
        }}
      />
    </motion.div>
  );
}