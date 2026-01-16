
import React from 'react';
import { X, ChevronLeft } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const links = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'تمور فاخرة', id: 'category-Dates' },
    { name: 'مكسرات محمصة', id: 'category-Nuts' },
    { name: 'فواكه مجففة', id: 'category-Dried Fruits' },
    { name: 'بوكسات الهدايا', id: 'category-Gift Boxes' },
    { name: 'قصتنا', id: 'about' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-charcoal-dark/90 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-charcoal z-[110] shadow-2xl transition-transform duration-500 ease-in-out border-r border-gold/10 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gold/10 flex items-center justify-between">
            <h2 className="text-xl font-arabic font-bold text-white">القائمة</h2>
            <button onClick={onClose} className="p-2 text-beige/40 hover:text-gold">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  onClose();
                }}
                className="w-full text-right py-4 px-4 text-beige/80 hover:text-gold hover:bg-gold/5 flex items-center justify-between font-arabic text-lg rounded-xl transition-all"
              >
                <ChevronLeft size={18} className="text-gold/20" />
                <span>{link.name}</span>
              </button>
            ))}
          </div>
          <div className="p-8 border-t border-gold/10 text-center">
            <p className="text-gold/60 text-[10px] uppercase tracking-widest font-bold">BMK FRUITS • MOROCCO</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
