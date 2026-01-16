
import React, { useEffect, useRef, useMemo } from 'react';
import { X, Search as SearchIcon, ArrowLeft, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, onClose, searchQuery, setSearchQuery, products, onAddToCart 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const liveResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    ).slice(0, 4); // Limit to top 4 for the overlay
  }, [searchQuery, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-charcoal-dark/95 backdrop-blur-2xl animate-fadeIn font-arabic overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <button onClick={onClose} className="p-3 text-beige/40 hover:text-gold transition-colors">
            <X size={32} />
          </button>
          <div className="text-right">
            <h2 className="text-2xl md:text-4xl font-black text-white">ابحث عن كنوزك</h2>
            <p className="text-gold/60 text-sm mt-1">اكتشف أفضل ما جادت به الطبيعة</p>
          </div>
        </div>

        {/* Search Input Area */}
        <div className="relative group">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gold opacity-50 group-focus-within:opacity-100 transition-opacity">
            <SearchIcon size={28} />
          </div>
          <input 
            ref={inputRef}
            type="text"
            placeholder="اكتب ما تبحث عنه هنا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border-b-2 border-gold/10 focus:border-gold py-8 pr-20 pl-6 text-2xl md:text-4xl text-white outline-none transition-all placeholder:text-white/10 font-arabic text-right"
          />
        </div>

        {/* Dynamic Results Preview */}
        {searchQuery.trim().length > 0 && (
          <div className="mt-12 space-y-6 animate-page-in">
            <div className="flex items-center justify-between flex-row-reverse border-b border-white/5 pb-4">
              <span className="text-beige/40 text-[10px] font-bold uppercase tracking-widest">نتائج البحث المباشرة</span>
              <span className="text-gold text-[10px] font-bold">{liveResults.length} منتجات موجودة</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveResults.length > 0 ? (
                liveResults.map((product) => (
                  <div key={product.id} className="group bg-white/5 border border-white/5 hover:border-gold/20 p-3 rounded-2xl flex flex-row-reverse items-center gap-4 transition-all">
                    <div className="w-16 h-16 bg-charcoal-dark rounded-xl overflow-hidden p-2 shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 text-right min-w-0">
                      <p className="text-[9px] text-gold font-bold mb-1">{product.category}</p>
                      <h4 className="text-white font-bold text-sm truncate">{product.name}</h4>
                      <p className="text-gold font-serif text-sm mt-1">{product.price.toFixed(2)} <span className="text-[8px]">درهم</span></p>
                    </div>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="p-3 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-charcoal transition-all active:scale-90"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-beige/20 text-sm italic">
                  لم يتم العثور على نتائج دقيقة لـ "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Suggestions - Always Visible or Only if Search Empty */}
        <div className="mt-16 text-right">
          <p className="text-beige/30 text-[10px] font-bold uppercase tracking-widest mb-6">اقتراحات شائعة</p>
          <div className="flex flex-wrap flex-row-reverse gap-2 md:gap-3">
            {['مجهول ملكي', 'لوز محمص', 'صندوق هدايا', 'تين مجفف', 'تمور'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-6 py-3 rounded-full border transition-all text-xs md:text-sm font-arabic ${
                  searchQuery === tag 
                  ? 'bg-gold text-charcoal border-gold' 
                  : 'bg-white/5 border-white/5 hover:border-gold/30 hover:bg-gold/5 text-beige/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Action Button for full results */}
        {searchQuery && (
          <div className="mt-16 text-center">
            <button 
              onClick={onClose}
              className="bg-gold text-charcoal px-12 py-5 rounded-2xl font-black flex items-center gap-3 mx-auto shadow-2xl active:scale-95 transition-all hover:bg-gold-light"
            >
              عرض جميع النتائج
              <ArrowLeft size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
