import React from 'react';
import { DonationCategory } from '../types';
import { 
  UtensilsCrossed, 
  Package, 
  CupSoda, 
  Sparkles, 
  BookOpen, 
  Recycle,
  Layers
} from 'lucide-react';

export interface CategoryMeta {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  textColor: string;
  bgColor: string;
  borderColor: string;
  pillColor: string;
}

export const getCategoryMeta = (category: DonationCategory): CategoryMeta => {
  switch (category) {
    case 'cooked_food':
      return {
        label: 'Cooked Food',
        Icon: UtensilsCrossed,
        textColor: 'text-amber-800',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        pillColor: 'bg-amber-700 text-white'
      };
    case 'packaged_food':
      return {
        label: 'Packaged Food',
        Icon: Package,
        textColor: 'text-emerald-800',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        pillColor: 'bg-emerald-700 text-white'
      };
    case 'beverages':
      return {
        label: 'Beverages',
        Icon: CupSoda,
        textColor: 'text-sky-800',
        bgColor: 'bg-sky-50',
        borderColor: 'border-sky-200',
        pillColor: 'bg-sky-700 text-white'
      };
    case 'decorations':
      return {
        label: 'Decorations',
        Icon: Sparkles,
        textColor: 'text-purple-800',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        pillColor: 'bg-purple-700 text-white'
      };
    case 'stationery':
      return {
        label: 'Stationery',
        Icon: BookOpen,
        textColor: 'text-blue-800',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        pillColor: 'bg-blue-700 text-white'
      };
    case 'reusable_materials':
      return {
        label: 'Reusable Materials',
        Icon: Recycle,
        textColor: 'text-teal-800',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
        pillColor: 'bg-teal-700 text-white'
      };
    default:
      return {
        label: 'Surplus Resources',
        Icon: Layers,
        textColor: 'text-slate-800',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200',
        pillColor: 'bg-slate-700 text-white'
      };
  }
};
