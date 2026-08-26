import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Sparkles, Calendar, Utensils, Star, Clock, Crown, Flame } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: PageView) => void;
  openReservationModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentPage, openReservationModal }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 w-full overflow-hidden bg-[#0a0806] text-stone-200">
      
      {/* Background Image with Atmospheric Indian Palace Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
          alt="Sonar Thali Royal Interior Ambience"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-60 scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/80 to-[#0a0806]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Amber Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Stretched Container */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-10">
        
        {/* Hero Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          
          <div className="lg:col-span-8 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Imperial 32-Course Royal Thalis</span>
            </div>
            <h1 className="font-serif italic text-6xl sm:text-8xl lg:text-9xl leading-[0.92] text-stone-100 tracking-tight font-extrabold">
              SONAR <br />
              <span className="text-amber-500 font-normal">THALI</span>
            </h1>
          </div>

          <div className="lg:col-span-4 text-left space-y-6 lg:pb-3 border-l-2 border-amber-600/40 pl-6 sm:pl-8">
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
              Step into the grand heritage of Indian royalty. Experience 32-course silver platter Thalis, 36-hour Truffle Dal Makhani, 24k Gold Vark Shahi Paneer, and charcoal-fired Awadhi Galouti Kebabs.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-2">
              <button
                onClick={openReservationModal}
                id="hero-reserve-btn"
                className="py-4 px-8 sm:py-5 sm:px-10 bg-amber-600 hover:bg-amber-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span>Reserve Table</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="hero-menu-btn"
                className="py-4 px-8 sm:py-5 sm:px-10 border-2 border-amber-500/50 bg-stone-900/80 hover:bg-stone-800 text-amber-300 text-sm sm:text-base font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
              >
                <Utensils className="w-5 h-5 text-amber-400" />
                <span>Royal Menu</span>
              </button>
            </div>
          </div>

        </div>

        {/* Signature Dishes Spotlight Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="relative group overflow-hidden bg-stone-900/90 border-2 border-stone-800 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-amber-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Crown className="w-3.5 h-3.5" />
                <span>Imperial Jewel</span>
              </span>
              <span className="text-2xl font-mono text-amber-400 font-extrabold">₹1,850</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-stone-100 group-hover:text-amber-300 transition-colors relative z-10">
              Royal Sonar Maharaja Thali
            </h3>
            <p className="text-sm sm:text-base text-stone-300 mt-3 font-light leading-relaxed relative z-10">
              32-course silver platter with 24k Gold Shahi Paneer, 36-hr Truffle Dal Makhani, Zafrani Pulao, Truffle Naan & Royal Paan.
            </p>
          </div>

          <div className="relative group overflow-hidden bg-stone-900/90 border-2 border-stone-800 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-amber-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Flame className="w-3.5 h-3.5" />
                <span>Charcoal Grill</span>
              </span>
              <span className="text-2xl font-mono text-amber-400 font-extrabold">₹750</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-stone-100 group-hover:text-amber-300 transition-colors relative z-10">
              Smoked Awadhi Galouti
            </h3>
            <p className="text-sm sm:text-base text-stone-300 mt-3 font-light leading-relaxed relative z-10">
              Minced grass-fed lamb infused with 160 royal spices, smoked with clove embers over warm saffron Sheermal bread.
            </p>
          </div>

          <div className="relative group overflow-hidden bg-stone-900/90 border-2 border-stone-800 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-amber-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Royal Dessert</span>
              </span>
              <span className="text-2xl font-mono text-amber-400 font-extrabold">₹480</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-stone-100 group-hover:text-amber-300 transition-colors relative z-10">
              Shahi Gold Tukda & Kulfi
            </h3>
            <p className="text-sm sm:text-base text-stone-300 mt-3 font-light leading-relaxed relative z-10">
              Crispy ghee brioche soaked in saffron cardamom syrup with reduced pistachio rabri, artisanal kulfi & 24k gold leaf.
            </p>
          </div>

        </div>

        {/* Social Proof & Metrics Footer Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 bg-stone-900/80 border-2 border-stone-800 rounded-2xl shadow-2xl">
          <div className="text-center border-r border-stone-800/80 last:border-r-0 px-2">
            <div className="flex justify-center items-center gap-1 text-amber-500 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500" />
              ))}
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-stone-100">4.99 / 5.0</div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold mt-1">Royal Diner Rating</p>
          </div>

          <div className="text-center border-r border-stone-800/80 last:border-r-0 px-2">
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-400">32 Courses</div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold mt-1">Signature Maharaja Thali</p>
          </div>

          <div className="text-center border-r border-stone-800/80 last:border-r-0 px-2">
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-400">36 Hours</div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold mt-1">Charcoal Slow-Cooked Dal</p>
          </div>

          <div className="text-center px-2">
            <div className="font-serif text-xl sm:text-2xl font-bold text-stone-200">Sheesh Mahal</div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-500 font-bold mt-1">Private Mirror Chambers</p>
          </div>
        </div>

      </div>
    </section>
  );
};

