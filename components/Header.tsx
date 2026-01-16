
import React from 'react';
import { ShoppingBag, Search, Menu, User, Loader2, Globe } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
  activePage: string;
  onOpenMobileMenu: () => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  connectionStatus: 'connected' | 'error' | 'loading';
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, onOpenCart, onNavigate, onOpenSearch, activePage, onOpenMobileMenu, onOpenLogin, isLoggedIn, connectionStatus, lang, setLang
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Live Promo Bar */}
      <div className="bg-gold text-charcoal-dark h-8 flex items-center justify-center overflow-hidden">
        <p className="text-[10px] md:text-xs font-bold font-arabic tracking-wide animate-pulse px-4 text-center">
          {isAr ? 'شحن مجاني للطلبات أكثر من 500 درهم! 🇲🇦' : 'Free Shipping on orders over 500 MAD! 🇲🇦'}
        </p>
      </div>

      <header className="header-glass h-20 md:h-24 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8">
          <div className="grid grid-cols-3 items-center h-full">
            
            {/* LEFT: Branding/Logo */}
            <div className={`flex items-center gap-4 ${isAr ? 'justify-start' : 'justify-start'}`}>
              <button onClick={onOpenMobileMenu} className="p-2 text-white hover:text-gold transition-colors lg:hidden">
                <Menu size={24} />
              </button>
              
              <div 
                className="flex flex-col items-start cursor-pointer group" 
                onClick={() => onNavigate('home')}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-5 md:h-7 bg-gold rounded-full group-hover:bg-white transition-colors"></span>
                  <h1 className="text-2xl md:text-4xl font-black text-white leading-none font-serif tracking-tight">BMK</h1>
                </div>
                <span className="text-[7px] md:text-[9px] font-sans font-bold tracking-[0.3em] text-gold uppercase -mt-0.5">FRUITS PREMIUM</span>
              </div>
            </div>

            {/* CENTER: Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-10 font-arabic text-[11px] font-bold uppercase tracking-[0.1em] text-beige/60">
              <button onClick={() => onNavigate('home')} className={`hover:text-gold transition-colors relative group ${activePage === 'home' ? 'text-gold' : ''}`}>
                {isAr ? 'الرئيسية' : 'Home'}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${activePage === 'home' ? 'w-full' : ''}`}></span>
              </button>
              <button onClick={() => onNavigate('category-All')} className={`hover:text-gold transition-colors relative group ${activePage.includes('category') ? 'text-gold' : ''}`}>
                {isAr ? 'منتجاتنا' : 'Products'}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${activePage.includes('category') ? 'w-full' : ''}`}></span>
              </button>
              <button onClick={() => onNavigate('about')} className={`hover:text-gold transition-colors relative group ${activePage === 'about' ? 'text-gold' : ''}`}>
                {isAr ? 'قصتنا' : 'About'}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${activePage === 'about' ? 'w-full' : ''}`}></span>
              </button>
              <button onClick={() => onNavigate('contact')} className={`hover:text-gold transition-colors relative group ${activePage === 'contact' ? 'text-gold' : ''}`}>
                {isAr ? 'اتصل بنا' : 'Contact'}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${activePage === 'contact' ? 'w-full' : ''}`}></span>
              </button>
            </nav>

            {/* RIGHT: Actions */}
            <div className={`flex items-center gap-2 md:gap-5 ${isAr ? 'justify-end' : 'justify-end'}`}>
              {/* Language Switcher */}
              <button 
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/10 transition-all text-[10px] font-bold text-white group"
              >
                <Globe size={14} className="text-gold group-hover:rotate-12 transition-transform" />
                <span>{isAr ? 'EN' : 'AR'}</span>
              </button>

              <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>

              <button onClick={onOpenSearch} className="p-2 text-beige/60 hover:text-gold transition-colors">
                <Search size={22} />
              </button>

              <button 
                onClick={onOpenLogin}
                className={`p-2 transition-colors hidden sm:block ${isLoggedIn ? 'text-gold' : 'hover:text-gold text-beige/60'}`}
              >
                <User size={22} />
              </button>

              <button onClick={onOpenCart} className="relative p-2 text-beige/60 hover:text-gold transition-colors group">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg ring-2 ring-charcoal-dark animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
