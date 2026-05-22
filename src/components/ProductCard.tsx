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

  // تحديد سعر الجرام بناءً على العيار
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
      className="group bg-dark-surface border border-gold/10 hover:border-gold/40 transition-all duration-500 flex flex-col"
    >
      {/* Product Image */}
      <button 
        onClick={() => setIsDetailsModalOpen(true)}
        className="relative overflow-hidden aspect-[4/5] bg-black text-left block w-full outline-none focus:ring-2 focus:ring-gold focus:ring-inset"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 bg-gold text-luxury-black px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-md">
          عـيار {product.karat}
        </div>
      </button>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow border-t border-gold/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase font-bold text-gold/60 tracking-widest">
            {product.category === Category.Gold ? 'Gold Solid' : 'Fine Silver'}
          </span>
          <div className="w-8 h-[1px] bg-gold/20"></div>
        </div>

        <button 
          onClick={() => setIsDetailsModalOpen(true)}
          className="text-right w-full block outline-none"
        >
          <h3 className="text-2xl font-serif font-light text-off-white mb-3 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </button>
        
        <p className="text-off-white/40 text-xs leading-relaxed mb-8 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing Info */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-off-white/30 mb-1">استثمارك التقريبي</span>
              <span className="text-2xl font-serif text-gold font-bold">
                {totalPrice.toLocaleString()} <span className="text-[10px] font-sans text-off-white/40">ج.م</span>
              </span>
            </div>
            <div className="text-left flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-off-white/30 mb-1">الكتلة</span>
              <span className="text-sm font-mono text-off-white">
                {product.weight}g
              </span>
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-2 border border-gold/30 py-4 text-[10px] uppercase font-bold tracking-widest text-gold hover:bg-gold hover:text-luxury-black transition-all active:scale-95">
            تحديـد موعـد معايـنة
          </button>
        </div>
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
        onBookNow={() => setIsModalOpen(true)}
      />
    </motion.div>
  );
}
