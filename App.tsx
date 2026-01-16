
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import FlavorProfile from './components/FlavorProfile';
import TrustBadges from './components/TrustBadges';
import Testimonials from './components/Testimonials';
import OurStory from './components/OurStory';
import Footer from './components/Footer';
import Cart from './components/Cart';
import MobileMenu from './components/MobileMenu';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import SearchOverlay from './components/SearchOverlay';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { supabase, fetchProductsFromDb, testSupabaseConnection } from './supabase';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { Loader2, AlertTriangle, RefreshCw, SearchX, Database, Sparkles, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHomeCategory, setSelectedHomeCategory] = useState<Category | 'All'>('All');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize document direction and language with state
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const checkAndLoad = async () => {
    setLoadingProducts(true);
    setConnectionStatus('loading');
    setErrorMessage(null);
    setIsDemoMode(false);
    
    const test = await testSupabaseConnection();
    
    if (!test.connected && test.isMissingTable) {
      setProducts(PRODUCTS);
      setConnectionStatus('connected');
      setIsDemoMode(true);
      setLoadingProducts(false);
      return;
    }
    
    if (!test.connected) {
      setConnectionStatus('error');
      setErrorMessage(test.error || 'Connection failed');
      setLoadingProducts(false);
      return;
    }

    try {
      const data = await fetchProductsFromDb();
      if (data && data.length > 0) {
        setProducts(data);
        setConnectionStatus('connected');
      } else {
        setProducts(PRODUCTS);
        setIsDemoMode(true);
        setConnectionStatus('connected');
      }
    } catch (err: any) {
      setProducts(PRODUCTS);
      setIsDemoMode(true);
      setConnectionStatus('connected');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    checkAndLoad();
    supabase.auth.getSession().then(({ data: { session } }) => setIsLoggedIn(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setIsLoggedIn(!!session));
    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const categories: (Category | 'All')[] = ['All', 'Dates', 'Nuts', 'Dried Fruits', 'Gift Boxes'];
  
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedHomeCategory !== 'All' && !searchQuery) {
      list = list.filter(p => p.category === selectedHomeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedHomeCategory, products, searchQuery]);

  // Dynamic Home Sections
  const bestSellers = useMemo(() => filteredProducts.filter(p => p.bestSeller), [filteredProducts]);
  const otherProducts = useMemo(() => filteredProducts.filter(p => !p.bestSeller), [filteredProducts]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const isAr = lang === 'ar';

  const categoryTranslations: Record<string, string> = {
    'All': isAr ? 'الكل' : 'All',
    'Dates': isAr ? 'تمور فاخرة' : 'Dates',
    'Nuts': isAr ? 'مكسرات محمصة' : 'Nuts',
    'Dried Fruits': isAr ? 'فواكه مجففة' : 'Dried Fruits',
    'Gift Boxes': isAr ? 'هدايا ملكية' : 'Gift Boxes'
  };

  return (
    <div className={`min-h-screen flex flex-col bg-charcoal selection:bg-gold/30 selection:text-white overflow-x-hidden pb-16 lg:pb-0 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {showLogin && <Login onLoginSuccess={() => { setIsLoggedIn(true); setShowLogin(false); }} onBack={() => setShowLogin(false)} />}
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        products={products}
        onAddToCart={addToCart}
      />

      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={(page) => {
          if (page === 'contact') {
            setActivePage('contact');
            // Give time for possible state updates
            setTimeout(() => scrollToSection('footer'), 100);
          } else if (page.startsWith('category-')) {
            const cat = page.replace('category-', '');
            setSelectedHomeCategory(cat as Category | 'All');
            setTimeout(() => scrollToSection('products-section'), 100);
          } else {
            setActivePage(page);
            if (page === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
            if (page === 'about') setTimeout(() => scrollToSection('our-story'), 100);
          }
        }} 
        activePage={activePage} 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)} 
        onOpenLogin={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn} 
        connectionStatus={isDemoMode ? 'connected' : connectionStatus} 
        onOpenSearch={() => setIsSearchOpen(true)}
        lang={lang}
        setLang={setLang}
      />
      
      <main className="flex-grow pt-28 md:pt-32">
        <Hero onShopNow={() => scrollToSection('products-section')} />
        
        <section id="products-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-3 opacity-80">BMK FRUITS PREMIUM</span>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-5xl font-black text-white">{isAr ? 'منتجاتنا المختارة' : 'Our Selected Products'}</h2>
              {isDemoMode && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[9px] text-gold font-bold animate-pulse">
                  <Sparkles size={10} /> {isAr ? 'عرض تجريبي' : 'Demo Mode'}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-10 overflow-x-auto w-full pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => {
                      setSelectedHomeCategory(cat as Category | 'All');
                      setSearchQuery('');
                    }}
                    className={`px-6 py-2.5 rounded-full text-xs transition-all border font-bold whitespace-nowrap ${
                      selectedHomeCategory === cat && !searchQuery
                      ? 'bg-gold text-charcoal border-gold shadow-lg shadow-gold/20' 
                      : 'bg-transparent text-beige/40 border-gold/10 hover:border-gold/30'
                    }`}
                >
                  {categoryTranslations[cat]}
                </button>
              ))}
            </div>
          </div>

          {loadingProducts ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6">
              <div className="relative">
                <Loader2 className="text-gold animate-spin" size={48} />
                <Database size={16} className="absolute inset-0 m-auto text-gold/30" />
              </div>
              <p className="text-gold/60 text-sm tracking-widest animate-pulse">{isAr ? 'جاري الاتصال بواحة BMK...' : 'Connecting to BMK Oasis...'}</p>
            </div>
          ) : (
            <div className="space-y-16 animate-fadeIn">
              {bestSellers.length > 0 && selectedHomeCategory === 'All' && !searchQuery && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Trophy className="text-gold" size={20} />
                    <h3 className="text-2xl font-black text-white">{isAr ? 'الأكثر طلباً' : 'Best Sellers'}</h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                    {bestSellers.map(product => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
                </div>
              )}

              <div className="space-y-8">
                {selectedHomeCategory === 'All' && !searchQuery && otherProducts.length > 0 && (
                   <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Sparkles className="text-luxury_green" size={20} />
                    <h3 className="text-2xl font-black text-white">{isAr ? 'تشكيلتنا المختارة' : 'Our Collection'}</h3>
                  </div>
                )}
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                  {(selectedHomeCategory === 'All' && !searchQuery ? otherProducts : filteredProducts).length > 0 ? (
                    (selectedHomeCategory === 'All' && !searchQuery ? otherProducts : filteredProducts).map(product => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))
                  ) : (
                    <div className="col-span-full py-24 flex flex-col items-center opacity-30 space-y-4">
                      <SearchX size={56} />
                      <p className="text-xl">{isAr ? 'لا توجد نتائج مطابقة لبحثك' : 'No results found'}</p>
                      <button 
                        onClick={() => {setSearchQuery(''); setSelectedHomeCategory('All')}}
                        className="text-gold text-sm font-bold underline"
                      >
                        {isAr ? 'عرض جميع المنتجات' : 'View all products'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
        
        <TrustBadges />
        <FlavorProfile />
        <OurStory />
        <Testimonials />
        <Footer />
      </main>

      <BottomNav onNavigate={setActivePage} onOpenCart={() => setIsCartOpen(true)} onOpenSearch={() => setIsSearchOpen(true)} cartCount={cartCount} activePage={activePage} onOpenLogin={() => setShowLogin(true)} />
      <FloatingWhatsApp />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onNavigate={setActivePage} />
    </div>
  );
};

export default App;
