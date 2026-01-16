
import React, { useState } from 'react';
import { MessageSquare, ArrowLeft, Loader2, Mail, UserCheck } from 'lucide-react';
import { supabase } from '../supabase';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setErrorMsg('');
    
    // Magic Link (OTP) login
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    setLoading(false);
    if (error) {
      // If the Supabase project doesn't have SMTP set up, it will fail.
      // We show the actual error and provide a demo bypass.
      setErrorMsg(error.message || 'Error sending magic link. SMTP might not be enabled.');
      console.error('Login error:', error);
    } else {
      setSent(true);
    }
  };

  const handleDemoLogin = () => {
    // This provides a way to see the "logged in" state even if Supabase Auth is having issues in this environment
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#1A1D1A] overflow-y-auto font-arabic">
      <div className="absolute inset-0 zellij-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
        <button onClick={onBack} className="absolute top-8 right-8 p-3 text-gold/60 hover:text-gold transition-colors">
          <ArrowLeft size={28} />
        </button>

        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-8 bg-luxury_green rounded-full shadow-[0_0_15px_rgba(27,77,62,0.6)]"></span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none font-arabic">BMK</h1>
            <span className="w-1.5 h-8 bg-luxury_green rounded-full shadow-[0_0_15px_rgba(27,77,62,0.6)]"></span>
          </div>
          <span className="text-xs md:text-sm font-sans font-bold tracking-[0.5em] text-gold uppercase">MOROCCAN LUXE</span>
        </div>

        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl md:text-4xl font-black text-white font-arabic">مرحباً بكم في عالم الأصالة</h2>
          <p className="text-beige/40 text-sm md:text-base font-arabic">سجل دخولك لتجربة تسوق فريدة ومميزة</p>
        </div>

        <div className="w-full max-w-md glass-card rounded-[2.5rem] p-8 md:p-12 border-gold/10 shadow-2xl relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-sm z-20 flex items-center justify-center">
              <Loader2 className="text-gold animate-spin" size={48} />
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl text-terracotta text-center text-sm font-arabic space-y-3">
              <p>{errorMsg}</p>
              <button 
                onClick={handleDemoLogin}
                className="text-[10px] font-black underline uppercase tracking-widest text-white/60 hover:text-white"
              >
                الدخول كضيف (Demo Mode)
              </button>
            </div>
          )}

          {!sent ? (
            <form onSubmit={handleEmailSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-gold text-sm font-bold pr-1 font-arabic">البريد الإلكتروني</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center text-beige/40">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="maruanebelawi65@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-charcoal-dark border border-gold/10 rounded-2xl py-5 pl-12 pr-6 text-white text-lg focus:border-gold outline-none transition-all placeholder:text-beige/10 font-serif"
                    dir="ltr"
                    required
                  />
                </div>
                <p className="text-[10px] text-beige/20 text-center font-arabic">سنرسل لك رابط دخول آمن (Magic Link) إلى بريدك</p>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  type="submit"
                  disabled={!email}
                  className="w-full bg-terracotta hover:bg-terracotta-hover disabled:opacity-50 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all cta-shadow font-arabic"
                >
                  إرسال رابط الدخول
                </button>
                
                <button 
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-white/5 border border-white/5 text-beige/60 py-4 rounded-2xl font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck size={18} />
                  دخول سريع كضيف
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8 animate-fadeIn text-center">
              <div className="w-20 h-20 bg-luxury_green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-luxury_green" size={40} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white font-arabic">تحقق من بريدك الإلكتروني</h3>
                <p className="text-sm text-beige/60 font-arabic">لقد أرسلنا رابط تسجيل الدخول إلى <br/> <span className="text-gold font-serif">{email}</span></p>
              </div>
              <button 
                onClick={() => setSent(false)}
                className="text-gold/60 hover:text-gold text-sm font-bold underline font-arabic"
              >
                تغيير البريد الإلكتروني؟
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <a href="https://wa.me/212719591617" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-beige/40 hover:text-white transition-colors group">
            <span className="text-sm font-bold font-arabic">هل تحتاج مساعدة؟ تواصل معنا عبر واتساب</span>
            <div className="bg-[#25D366]/10 p-2 rounded-full group-hover:bg-[#25D366]/20 transition-colors">
              <MessageSquare size={20} className="text-[#25D366]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
