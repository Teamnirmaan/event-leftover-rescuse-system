import React, { useState, useEffect } from 'react';
import banquetImg from '../assets/images/banquet_leftovers_1791790095389.jpg';
import heroImg from '../assets/images/hero_food_rescue_1791790078792.jpg';
import volunteerImg from '../assets/images/volunteer_delivery_1791790113261.jpg';
import reusableImg from '../assets/images/reusable_materials_1791790124637.jpg';

export { banquetImg, heroImg, volunteerImg, reusableImg };

export function resolveImageSource(rawSrc?: string, category?: string): string {
  if (!rawSrc) {
    return getCategoryFallback(category);
  }

  // If path is a legacy dev relative path that broke when shared or built:
  if (rawSrc.includes('banquet_leftovers')) {
    return banquetImg;
  }
  if (rawSrc.includes('hero_food_rescue')) {
    return heroImg;
  }
  if (rawSrc.includes('volunteer_delivery')) {
    return volunteerImg;
  }
  if (rawSrc.includes('reusable_materials')) {
    return reusableImg;
  }

  return rawSrc;
}

export function getCategoryFallback(category?: string): string {
  switch (category) {
    case 'cooked_food':
      return banquetImg;
    case 'packaged_food':
      return heroImg;
    case 'beverages':
      return volunteerImg;
    case 'decorations':
    case 'stationery':
    case 'reusable_materials':
      return reusableImg;
    default:
      return heroImg;
  }
}

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  fallbackCategory,
  fallbackSrc,
  ...props
}) => {
  const resolved = resolveImageSource(src, fallbackCategory);
  const [currentSrc, setCurrentSrc] = useState<string>(resolved);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const next = resolveImageSource(src, fallbackCategory);
    setCurrentSrc(next);
    setHasError(false);
  }, [src, fallbackCategory]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = fallbackSrc || getCategoryFallback(fallbackCategory);
      if (currentSrc !== fallback) {
        setCurrentSrc(fallback);
      } else {
        // Last resort: static public image
        setCurrentSrc('/images/hero_food_rescue.jpg');
      }
    }
  };

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt || 'EventRescue visual item'}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
};
