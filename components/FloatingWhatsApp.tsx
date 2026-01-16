
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    const phone = '212719591617';
    const message = 'السلام عليكم، أود الاستفسار عن منتجات BMK FRUITS الفاخرة.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-20 lg:bottom-10 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:hidden"></div>
      <MessageCircle size={30} fill="currentColor" />
    </button>
  );
};

export default FloatingWhatsApp;
