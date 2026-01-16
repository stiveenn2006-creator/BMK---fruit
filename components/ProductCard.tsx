
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Heart, Loader2, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex flex-row-reverse items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={10}
            className={`${
              star <= Math.round(rating)
                ? 'text-gold fill-gold'
                : 'text-gold/20 fill-transparent'
            } transition-colors duration-300`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative bg-charcoal-light/40 border border-gold/10 rounded-[15px] overflow-hidden transition-all duration-500 hover:border-gold/30 shadow-[0_8px_25px_rgba(212,175,55,0.12)] flex flex-col h-full font-arabic animate-page-in">
      
      {/* 1:1 Aspect Ratio Container */}
      <div className={`relative aspect-square overflow-hidden bg-charcoal-dark flex items-center justify-center p-3 sm:p-4 ${!isLoaded ? 'shimmer-bg animate-shimmer' : ''}`}>
        
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-60`}></div>
        
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="text-gold/10 animate-spin" size={20} />
          </div>
        )}

        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain transition-all duration-700 ease-out z-20 
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            group-hover:scale-105 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setHasError(true);
            (e.target as HTMLImageElement).src = 'https://njchsnmgxydeztuofoki.supabase.co/storage/v1/object/public/product-images/IMG-20260115-WA0056.jpg';
          }}
        />
        
        {product.bestSeller && (
          <div className="absolute top-2 left-0 z-30">
            <span className="bg-gold text-charcoal-dark px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter rounded-r-md font-arabic shadow-md">الأفضل</span>
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="p-3 sm:p-4 text-right flex flex-col flex-grow relative z-10">
        <div className="flex flex-row-reverse justify-between items-center mb-1">
          <p className="text-[8px] font-bold text-luxury_green bg-luxury_green/10 px-1.5 py-0.5 rounded-full">{product.category}</p>
          <span className="text-[8px] text-white/20 font-bold">{product.weight}</span>
        </div>
        
        <h3 className="text-sm sm:text-base font-arabic font-black text-gold-light group-hover:text-white transition-colors mb-1 leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex flex-row-reverse items-center gap-1.5 mb-2">
          {renderStars(product.rating)}
          <span className="text-[9px] text-beige/40 font-bold">{product.rating?.toFixed(1)}</span>
        </div>
        
        <div className="mt-auto pt-2 border-t border-white/5 flex flex-col gap-2">
          <p className="text-gold font-black text-lg font-serif">
            {product.price.toFixed(2)} <span className="text-[10px]">درهم</span>
          </p>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-terracotta hover:bg-terracotta-hover active:scale-95 text-white py-2 rounded-lg text-[10px] font-black transition-all flex items-center justify-center gap-1.5 font-arabic shadow-lg"
          >
            <Plus size={14} />
            <span>طلب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
