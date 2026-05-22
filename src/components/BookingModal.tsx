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
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', branch: '' });

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{ colorScheme: 'light' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white border-2 border-black shadow-2xl z-50 overflow-hidden text-black max-h-[95vh] flex flex-col"
            dir="rtl"
          >
            <div className="p-8 overflow-y-auto text-right">
              <div className="flex justify-between items-start border-b border-black/10 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-black">جدولة موعد معاينة خاصة</h2>
                  <p className="text-xs text-black/50 mt-1">احجز موعداً بفرع الصاغة بأسوان لرؤية القطعة وتثبيت سعرها.</p>
                </div>
                <button onClick={handleClose} className="w-8 h-8 bg-gray-100 border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all outline-none">
                  <X size={16} />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-gray-50 border border-black/10 p-4 rounded-sm flex items-center justify-between text-xs">
                    <span className="font-bold text-black">{product.name}</span>
                    <span className="font-serif font-black text-[#C8A155]">{totalPrice.toLocaleString()} ج.م</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/60 uppercase">الاسم بالكامل</label>
                    <div className="relative">
                      <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-black text-black pr-11 pl-4 py-3 text-sm focus:border-[#C8A155] outline-none" placeholder="عبد الله محمد" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/60 uppercase">رقم الهاتف (واتساب)</label>
                    <div className="relative">
                      <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-black text-black pr-11 pl-4 py-3 text-sm focus:border-[#C8A155] outline-none text-right" placeholder="0123456789" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/60 uppercase">التاريخ المفضل للزيارة</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white border border-black text-black pr-11 pl-4 py-3 text-sm focus:border-[#C8A155] outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/60 uppercase">فرع صالة العرض بأسوان</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <select required value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} className="w-full bg-white border border-black text-black pr-11 pl-4 py-3 text-sm focus:border-[#C8A155] outline-none appearance-none">
                        <option value="">اختر الفرع المناسب لك</option>
                        <option value="صاغة_اسوان">فرع سوق الصاغة القديم - أسوان</option>
                        <option value="مول_الذهب">فرع مول الذهب الجديد - أسوان</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-black text-white font-bold py-4 text-xs uppercase tracking-widest hover:bg-black/80 transition-all border border-black pt-4">
                    تأكيد حجز المعاينة وتثبيت السعر
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-8">
                  <CheckCircle className="text-green-600 mb-4" size={56} />
                  <h3 className="text-2xl font-serif font-bold text-black mb-2">موعدكم مؤكد ومحفوظ</h3>
                  <p className="text-black/60 mb-6 max-w-sm text-xs leading-relaxed font-light">
                    يسعدنا استقبالك قريباً يا **{formData.name}**.<br/>
                    تم تسجيل طلب المعاينة بفرع المبيعات بنجاح، وسيتواصل معك أحد مستشارينا لتثبيت السعر والترحيب بك.
                  </p>
                  <button onClick={handleClose} className="border border-black text-black px-10 py-3 text-xs font-bold hover:bg-black hover:text-white transition-all">
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