
import React from 'react';
import { Sparkles, Cookie, Wind } from 'lucide-react';

const FlavorProfile: React.FC = () => {
  const profiles = [
    {
      icon: <Sparkles className="text-luxury_green" size={32} />,
      title: "حلاوة طبيعية",
      desc: "نضجت تحت شمس المغرب القوية للحصول على مذاق عميق يشبه العسل الأصيل."
    },
    {
      icon: <Cookie className="text-luxury_green" size={32} />,
      title: "قرمشة مثالية",
      desc: "محمص ببطء واحترافية في أفراننا التقليدية للحفاظ على القوام المثالي."
    },
    {
      icon: <Wind className="text-luxury_green" size={32} />,
      title: "غنية بالألياف",
      desc: "وجبات خفيفة عضوية من مزارعنا، تغذي جسمك وروحك بكل حب."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-charcoal-dark relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-gold/5 rounded-full blur-[100px] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-luxury_green font-black tracking-[0.3em] uppercase text-[10px] mb-4 block font-arabic opacity-80">سر الجودة المغربية</span>
          <h2 className="text-3xl lg:text-6xl font-arabic font-black text-white">النكهة التي لا تُنسى</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {profiles.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group bg-charcoal-light/20 p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/20 transition-all duration-500">
              <div className="mb-8 p-6 bg-charcoal-dark rounded-full border border-gold/10 shadow-2xl group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h4 className="text-2xl font-arabic font-black text-gold-light mb-4">{p.title}</h4>
              <p className="text-beige/40 leading-loose font-medium font-arabic max-w-xs text-sm lg:text-base">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorProfile;
