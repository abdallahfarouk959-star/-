/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WarrantyModal({ isOpen, onClose }: WarrantyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-dark-surface border border-gold/30 shadow-2xl z-[60] overflow-hidden geometric-bg flex flex-col max-h-[90vh]"
            dir="rtl"
          >
            <div className="relative p-10 flex flex-col items-center text-center">
              <button 
                onClick={onClose} 
                className="absolute top-4 left-4 text-off-white/50 hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-16 h-16 rounded-full border border-gold/50 flex flex-col items-center justify-center bg-black/40 mb-8 relative">
                <ShieldCheck className="text-gold" size={32} />
                <div className="absolute inset-0 border border-gold/30 rounded-full scale-110 animate-ping opacity-20"></div>
              </div>

              <h2 className="text-3xl font-serif text-gold mb-4 italic">وثيقة الضمان الملكية</h2>
              <div className="w-12 h-[1px] bg-gold/50 mb-8" />
              
              <div className="space-y-6 text-off-white/70 font-light leading-relaxed text-sm">
                <p>
                  نلتزم في مجوهرات العبد القادر بتأصيل الأمانة واستدامة الثقة التي بنيناها على مدار أكثر من ثمانية عقود من الزمان.
                </p>
                <p>
                  جميع مسوغاتنا تخضع لرقابة صارمة ومدموغة رسمياً من مصلحة الدمغة والموازين المصرية، ونحن نضمن لك النقاء الكامل لعيار المعادن الثمينة التي تقتنيها منا.
                </p>
                <p>
                  ولأنك فردٌ من عائلتنا العريقة، فإن كل قطعة مصحوبة بشهادة منشأ مفصلة وفاتورة ضريبية رسمية تضمن حقوقك بالكامل، سواءً في التبديل أو الاسترداد حسب سياساتنا العادلة والصريحة.
                </p>
              </div>

              <span className="mt-10 text-[10px] uppercase font-bold tracking-[0.2em] text-gold border-t border-gold/20 pt-6 block w-full">
                إرث الثقة منذ عام 1938
              </span>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
