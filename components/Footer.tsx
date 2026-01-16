
import React from 'react';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative bg-charcoal-dark border-t border-gold/10 pt-20 pb-10 overflow-hidden">
      {/* Zellij Pattern Watermark */}
      <div className="absolute inset-0 zellij-pattern opacity-[0.05] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-right">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-6 bg-luxury_green rounded-full"></span>
                <h3 className="text-3xl font-arabic font-bold text-white tracking-tighter">BMK</h3>
                <span className="w-1 h-6 bg-luxury_green rounded-full"></span>
              </div>
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase">Premium Moroccan Fruits</span>
            </div>
            <p className="text-beige/40 text-sm leading-relaxed font-arabic max-w-xs ml-auto">
              نحن في BMK نفخر بتقديم أجود أنواع التمور والمكسرات المغربية، منتقاة بعناية من أفضل المزارع لنضمن لكم تجربة طعم استثنائية تعكس كرم الضيافة المغربية.
            </p>
            <div className="flex flex-row-reverse gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full text-beige/40 hover:text-gold hover:bg-gold/10 transition-all border border-white/5">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full text-beige/40 hover:text-gold hover:bg-gold/10 transition-all border border-white/5">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/212719591617" className="p-3 bg-white/5 rounded-full text-beige/40 hover:text-gold hover:bg-gold/10 transition-all border border-white/5">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-arabic font-black text-white">روابط سريعة</h4>
            <ul className="space-y-4 text-beige/40 font-arabic text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">عن BMK</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">منتجاتنا</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">عروض الهدايا</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">قصة الزليج</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-arabic font-black text-white">خدمة العملاء</h4>
            <ul className="space-y-4 text-beige/40 font-arabic text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">سياسة الشحن</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">سياسة الإرجاع</a></li>
              <li className="flex flex-row-reverse items-center gap-2 group cursor-pointer">
                <Phone size={16} className="text-gold/40 group-hover:text-gold" />
                <span dir="ltr" className="group-hover:text-white transition-colors">+212 719-591617</span>
              </li>
              <li className="flex flex-row-reverse items-center gap-2 group cursor-pointer">
                <MapPin size={16} className="text-gold/40 group-hover:text-gold" />
                <span className="group-hover:text-white transition-colors">المغرب، واحات تافيلالت</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-arabic font-black text-white">النشرة البريدية</h4>
            <p className="text-beige/40 text-sm font-arabic">اشترك لتصلك أحدث عروضنا ومنتجاتنا الموسمية.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="w-full bg-white/5 border border-gold/10 rounded-xl py-4 pr-6 pl-12 text-white outline-none focus:border-gold transition-all font-arabic text-sm text-right"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-gold text-charcoal rounded-lg hover:bg-gold-light transition-all">
                <ArrowLeft size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-gold/5 flex flex-col md:flex-row-reverse items-center justify-between gap-6 text-[10px] text-beige/20 font-arabic uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} BMK FRUITS. جميع الحقوق محفوظة.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-gold transition-colors">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
