
import React from 'react';

const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-24 relative overflow-hidden bg-charcoal-dark">
      {/* Golden Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark via-charcoal to-luxury_green/10 opacity-50"></div>
      <div className="absolute -left-20 top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-page-in">
            <div className="space-y-2">
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs block font-arabic">إرثنا العريق</span>
              <h2 className="text-4xl md:text-6xl font-arabic font-black text-white leading-tight">قصتنا مع <span className="text-gold">الأصالة</span></h2>
            </div>
            
            <div className="space-y-6 text-beige/70 font-arabic text-lg leading-loose">
              <p>
                في قلب الواحات المغربية، حيث تلتقي الشمس بالرمال الذهبية، ولدت BMK FRUITS. قصتنا ليست مجرد تجارة، بل هي رحلة للحفاظ على تقاليد الضيافة المغربية الأصيلة التي توارثتها الأجيال.
              </p>
              <p>
                نحن نؤمن بأن كل حبة تمر أو لوز تحكي قصة أرض معطاءة. لذلك، ننتقي محاصيلنا حبة بحبة من أفضل المزارع في واحات تافيلالت وجبال الأطلس، لنضمن وصول الطعم الملكي إلى مائدتكم بأبهى حلة.
              </p>
              <p>
                فخامتنا تنبع من بساطة الطبيعة وجودة الإتقان، لنقدم لكم تجربة لا تنسى تعكس كرم المغرب وفخامة تاريخه.
              </p>
            </div>

            <div className="flex justify-end gap-12 pt-4">
              <div className="text-center">
                <p className="text-3xl font-serif text-gold font-bold">100%</p>
                <p className="text-[10px] text-beige/40 font-arabic uppercase tracking-widest mt-1">طبيعي عضوي</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif text-gold font-bold">+25</p>
                <p className="text-[10px] text-beige/40 font-arabic uppercase tracking-widest mt-1">عام من الخبرة</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-gold/10 shadow-2xl relative group">
              <img 
                src="https://njchsnmgxydeztuofoki.supabase.co/storage/v1/object/public/product-images/IMG-20260115-WA0058.jpg" 
                alt="Moroccan Tradition"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-dark/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            {/* Floating element */}
            <div className="absolute -bottom-10 -left-10 bg-gold p-8 rounded-3xl shadow-2xl hidden md:block">
              <p className="font-arabic text-charcoal font-black text-xl">جودة موروثة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
