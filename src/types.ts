/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Karat {
  K24 = 24,
  K21 = 21,
  K18 = 18,
  Silver925 = 925,
}

export enum Category {
  Gold = 'ذهب',
  Silver = 'فضة',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  karat: Karat;
  weight: number;
  makingFee: number; // المصنعية للجرام الواحد
  image: string;
}

export interface DailyPrice {
  gold24: number;
  gold21: number;
  gold18: number;
  silver925: number;
  lastUpdated: string;
}
