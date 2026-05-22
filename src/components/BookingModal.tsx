/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Calendar, MapPin, User, Phone } from 'lucide-react';
import { type Product } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  totalPrice: number;
}

export function BookingModal({ isOpen, onClose, product, totalPrice }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    branch: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', date: '', branch: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-luxury-black border border-gold/30 shadow-2xl z-50 overflow-hidden geometric-bg flex flex-col max-h-[90vh]"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-dark-surface">
              <h2 className="text-2xl font-serif text-gold italic">تحديد موعد معاينة</h2>
              <button onClick={handleClose} className="text-off-white/50 hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {!isSubmitted ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Details */}
                  <div className="flex flex-col">
                    <div className="aspect-[4/5] bg-black border border-gold/20 mb-6 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2 right-2 bg-gold text-luxury-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        عيار {product.karat}
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif text-off-white mb-2 leading-tight">{product.name}</h3>
                    <p className="text-off-white/40 text-xs mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="mt-auto border-t border-gold/10 pt-4 flex justify-between items-center">
                      <span className="text-[10px] text-off-white/50 uppercase tracking-widest">القيمة التقريبية</span>
                      <span className="text-gold font-serif text-xl font-bold">{totalPrice.toLocaleString()} <span className="text-[10px] font-sans text-off-white/50">ج.م</span></span>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-2">الاسم الكريم</label>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input
                          required
                          type="text"
                          className="w-full bg-dark-surface border border-gold/20 text-off-white pr-12 pl-4 py-3 text-sm focus:border-gold outline-none transition-colors focus:bg-luxury-black"
                          placeholder="الاسم الثلاثي"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-2">رقم الهاتف</label>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input
                          required
                          type="tel"
                          dir="ltr"
                          className="w-full bg-dark-surface border border-gold/20 text-off-white pr-12 pl-4 py-3 text-sm focus:border-gold outline-none transition-colors text-right focus:bg-luxury-black"
                          placeholder="+20 100 000 0000"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-2">تاريخ الزيارة</label>
                      <div className="relative">
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <input
                          required
                          type="date"
                          className="w-full bg-dark-surface border border-gold/20 text-off-white pr-12 pl-4 py-3 text-sm focus:border-gold outline-none transition-colors focus:bg-luxury-black"
                          value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/50 mb-2">الفرع الأقرب</label>
                      <div className="relative">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                        <select
                          required
                          className="w-full bg-dark-surface border border-gold/20 text-off-white pr-12 pl-4 py-3 text-sm focus:border-gold outline-none transition-colors appearance-none focus:bg-luxury-black"
                          value={formData.branch}
                          onChange={e => setFormData({ ...formData, branch: e.target.value })}
                        >
                          <option value="" disabled>اختر الفرع...</option>
                          <option value="heliopolis">مصر الجديدة (شارع الذهب)</option>
                          <option value="zayed">الشيخ زايد (أركان بلازا)</option>
                          <option value="tagamoa">التجمع الخامس (كايرو فيستيفال)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="mt-4 w-full bg-gold text-luxury-black py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-gold-dark transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-[0_0_15px_rgba(200,161,85,0.2)]">
                      تأكيد الحجز للحضور
                    </button>
                    
                    <p className="text-center text-off-white/30 text-[9px] mt-2 leading-relaxed">
                      * يرجى إحضار الهوية الشخصية لتأكيد الاستلام داخل الفرع. يرجى الملاحظة أن القيمة قد تتغير بحسب سعر جرام السوق الفعلي يوم الاستلام.
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 rounded-full border border-gold flex items-center justify-center mb-8 relative geometric-bg">
                    <CheckCircle className="text-gold" size={48} strokeWidth={1.5} />
                    <div className="absolute inset-0 border border-gold/30 rounded-full scale-110 animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-4xl font-serif text-gold mb-6 italic">موعدكم مؤكد</h3>
                  <p className="text-off-white/60 mb-10 max-w-sm leading-relaxed font-light text-lg">
                    يسعدنا استقبالك قريباً {formData.name}.<br/>
                    تم تسجيل موعد معاينة القطعة بفرع المبيعات بنجاح. سيتواصل معك أحد مستشارينا قريباً لتأكيد التفاصيل.
                  </p>
                  <button onClick={handleClose} className="border border-gold/50 text-gold px-12 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-luxury-black transition-all">
                    العودة للمعرض
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
