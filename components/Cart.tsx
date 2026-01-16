
import React from 'react';
import { X, Minus, Plus, ShoppingBag, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    const shopOwnerPhone = '212719591617';
    let message = `السلام عليكم دار BMK،\nأود طلب المنتجات التالية:\n\n`;
    
    items.forEach(item => {
      message += `• أريد طلب [${item.name}] بسعر [${item.price}] درهم (الكمية: ${item.quantity})\n`;
    });

    message += `\n*الإجمالي: ${subtotal.toFixed(2)} درهم*\nيرجى التواصل لتأكيد الطلب.`;
    window.open(`https://wa.me/${shopOwnerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className={`fixed inset-0 bg-charcoal-dark/80 backdrop-blur-md z-[120] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-charcoal-light z-[130] shadow-2xl border-l border-gold/10 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full text-right font-arabic">
          <div className="p-5 border-b border-gold/10 flex flex-row-reverse items-center justify-between bg-charcoal-dark">
            <h2 className="text-lg font-black text-white">حقيبة التسوق</h2>
            <button onClick={onClose} className="p-2 text-beige/40 hover:text-gold transition-colors"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <ShoppingBag size={48} />
                <p className="text-white text-sm font-bold">الحقيبة فارغة</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex flex-row-reverse gap-3 bg-charcoal-dark/40 p-3 rounded-xl border border-white/5">
                  <div className="w-14 h-14 bg-charcoal-dark rounded-lg overflow-hidden p-1 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-xs truncate">{item.name}</h3>
                    <div className="flex flex-row-reverse items-center justify-between mt-2">
                      <div className="flex flex-row-reverse items-center gap-2 bg-charcoal-dark p-1 rounded-md">
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gold"><Plus size={12} /></button>
                        <span className="text-[10px] font-bold text-white">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gold"><Minus size={12} /></button>
                      </div>
                      <p className="font-bold text-gold text-sm">{item.price * item.quantity} درهم</p>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-white/10 p-1 self-start"><X size={14} /></button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 bg-charcoal-dark border-t border-gold/10 space-y-4">
              <div className="flex flex-row-reverse justify-between items-center text-white">
                <span className="text-xs font-bold">الإجمالي</span>
                <span className="text-xl font-bold text-gold">{subtotal.toFixed(2)} درهم</span>
              </div>
              <button onClick={handleWhatsAppCheckout} className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                <MessageSquare size={18} />
                <span>إرسال الطلب عبر واتساب</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
