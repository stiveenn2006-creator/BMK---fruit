
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background patterns */}
      <div className="absolute inset-0 zellij-pattern opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-luxury_green/20 via-transparent to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 w-full z-10 text-center space-y-10 animate-page-in">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
             <span className="w-1.5 h-12 md:h-16 bg-luxury_green rounded-full shadow-[0_0_15px_rgba(27,77,62,0.6)]"></span>
             <h1 className="text-6xl md:text-9xl font-serif font-black text-white leading-none tracking-tighter">BMK</h1>
             <span className="w-1.5 h-12 md:h-16 bg-luxury_green rounded-full shadow-[0_0_15px_rgba(27,77,62,0.6)]"></span>
          </div>
          <span className="text-gold font-bold tracking-[0.5em] uppercase text-xs md:text-sm font-sans">FRUITS PREMIUM</span>
        </div>

        <h2 className="text-2xl md:text-5xl font-arabic font-black text-beige/90 leading-tight max-w-4xl mx-auto">
          طعم الأصالة المغربية <br />
          <span className="text-gold mt-2 block">من قلب الطبيعة لمائدتكم</span>
        </h2>
        
        <div className="pt-8">
          <button 
            onClick={onShopNow}
            className="bg-terracotta hover:bg-terracotta-hover text-white px-16 py-5 text-sm md:text-lg font-black uppercase tracking-widest rounded-full cta-shadow transition-all active:scale-95 animate-cta-pulse"
          >
            تسوق الآن
          </button>
        </div>
      </div>

      {/* Decorative spotlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-spotlight pointer-events-none opacity-40"></div>
    </section>
  );
};

export default Hero;
