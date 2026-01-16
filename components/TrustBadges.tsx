
import React from 'react';
import { Truck, HandCoins, Sprout } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Truck className="text-gold" size={32} />,
      title: "توصيل سريع",
      desc: "لكل المدن المغربية",
      accent: "🚚"
    },
    {
      icon: <HandCoins className="text-gold" size={32} />,
      title: "الدفع عند الاستلام",
      desc: "خلص ملي توصلك الأمانة",
      accent: "🤝"
    },
    {
      icon: <Sprout className="text-gold" size={32} />,
      title: "جودة مضمونة",
      desc: "منتجات طبيعية 100%",
      accent: "🌱"
    }
  ];

  return (
    <div className="bg-charcoal-dark border-y border-gold/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {badges.map((b, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-6 bg-charcoal rounded-full border border-gold/5 group-hover:border-gold/20 transition-all duration-500 shadow-xl">
                {b.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-arabic font-black text-white">{b.title}</h4>
                <p className="text-beige/40 text-sm font-arabic">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
