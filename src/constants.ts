/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Karat, type Product, type DailyPrice } from './types';

export const DAILY_GOLD_PRICES: DailyPrice = {
  gold24: 4100, // مثال لسعر جرام الذهب عيار 24 بالجنيه المصري
  gold21: 3600, // مثال لسعر جرام الذهب عيار 21 بالجنيه المصري
  gold18: 3085, // مثال لسعر جرام الذهب عيار 18 بالجنيه المصري
  silver925: 55, // مثال لسعر جرام الفضة عيار 925 بالجنيه المصري
  lastUpdated: new Date().toISOString(),
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'خاتم سوليتير فاخر',
    description: 'خاتم من الذهب الأصفر عيار 21 مرصع بأحجار الزركون اللامعة.',
    category: Category.Gold,
    karat: Karat.K21,
    weight: 4.5,
    makingFee: 150,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'قلادة "إيزيس" الملكية',
    description: 'قلادة بتصميم فرعوني أصيل من الذهب عيار 18.',
    category: Category.Gold,
    karat: Karat.K18,
    weight: 12.0,
    makingFee: 180,
    image: 'https://images.unsplash.com/photo-1599643477877-5142e07e8e14?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'سوار فضي مجدول',
    description: 'سوار يدوي الصنع من الفضة الخالصة عيار 925.',
    category: Category.Silver,
    karat: Karat.Silver925,
    weight: 25.0,
    makingFee: 40,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'أقراط اللؤلؤ الطبيعي',
    description: 'أقراط من الذهب عيار 21 مع لؤلؤ مستخرج من أعماق البحار.',
    category: Category.Gold,
    karat: Karat.K21,
    weight: 3.2,
    makingFee: 200,
    image: 'https://images.unsplash.com/photo-1535633302704-b042c01380ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'خاتم فضة رجالي بذهب أسود',
    description: 'خاتم رجالي فخم بتصميم عصري من الفضة والزركون الأسود.',
    category: Category.Silver,
    karat: Karat.Silver925,
    weight: 15.0,
    makingFee: 60,
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'سلسال ذهب ناعم',
    description: 'سلسال كلاسيكي رقيق للارتداء اليومي، عيار 18.',
    category: Category.Gold,
    karat: Karat.K18,
    weight: 2.8,
    makingFee: 120,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
  },
];

export const COLORS = {
  gold: '#D4AF37',
  goldHover: '#C5A028',
  black: '#0A0A0A',
  silver: '#C0C0C0',
  paper: '#F5F2ED',
};
