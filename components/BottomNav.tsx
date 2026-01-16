
import React from 'react';
import { Home, ShoppingBag, User, Search } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  cartCount: number;
  activePage: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, onOpenCart, onOpenSearch, onOpenLogin, cartCount, activePage }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-charcoal-dark/95 backdrop-blur-md border-t border-gold/10 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'home' ? 'text-gold' : 'text-beige/40'}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-arabic">الرئيسية</span>
        </button>
        <button 
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-beige/40 hover:text-gold transition-colors active:scale-90 duration-200"
        >
          <Search size={22} />
          <span className="text-[10px] font-arabic">بحث</span>
        </button>
        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 relative text-beige/40 hover:text-gold transition-colors"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-arabic">السلة</span>
        </button>
        <button 
          onClick={onOpenLogin}
          className="flex flex-col items-center gap-1 text-beige/40 hover:text-gold transition-colors"
        >
          <User size={22} />
          <span className="text-[10px] font-arabic">حسابي</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
