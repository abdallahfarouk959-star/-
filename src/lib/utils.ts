/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * حساب سعر القطعة بناءً على سعر الجرام والمصنعية
 */
export function calculateProductPrice(
  weight: number,
  gramPrice: number,
  makingFee: number
): number {
  return weight * (gramPrice + makingFee);
}
