
import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 zellij-pattern opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 space-y-4">
          <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs block font-arabic opacity-80">رأي زبنائنا</span>
          <h2 className="text-4xl md:text-6xl font-arabic font-black text-white">شهادات العملاء</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card p-10 rounded-[2rem] flex flex-col space-y-8 relative group hover:-translate-y-2 transition-transform">
              <Quote className="text-gold/20 absolute top-8 right-8" size={48} />
              
              <p className="text-beige/80 text-lg leading-relaxed italic font-body text-right">
                "{t.content}"
              </p>

              <div className="flex flex-row-reverse items-center gap-4 pt-4">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-gold/20 object-cover" />
                <div className="text-right">
                  <h4 className="text-white font-bold font-arabic">{t.name}</h4>
                  <p className="text-gold/60 text-xs font-arabic">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
