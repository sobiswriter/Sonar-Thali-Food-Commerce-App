import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#0a0806] text-stone-300 border-t-2 border-amber-900/40 pt-20 pb-16 overflow-hidden w-full">
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Philosophy */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-amber-500/60 bg-stone-900 flex items-center justify-center rounded-xl shadow-lg">
                <span className="font-serif italic text-amber-500 font-extrabold text-2xl">S</span>
              </div>
              <div>
                <span className="font-serif italic text-3xl font-extrabold tracking-tight text-stone-100">
                  Sonar Thali
                </span>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-500 font-mono font-bold">
                  Royal Indian Gastronomy
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              Immerse yourself in the grand heritage of Indian royalty. Experience 32-course silver platter Thalis, 36-hour charcoal slow-cooked Dal Makhani, and Sheesh Mahal dining.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-widest font-mono font-bold pt-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Imperial Michelin Standard</span>
            </div>
          </div>

          {/* Hours & Seating Times */}
          <div className="space-y-4">
            <h4 className="font-serif text-base uppercase tracking-widest text-amber-300 font-bold border-b border-stone-800 pb-2">
              Palace Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-stone-200">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Royal Lunch Banquets</span>
                <span className="font-mono text-amber-400 font-bold">12:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center text-stone-200">
                <span>Grand Evening Feast</span>
                <span className="font-mono text-amber-400 font-bold">18:30 - 23:30</span>
              </div>
              <div className="flex justify-between items-center text-stone-200">
                <span>Royal Home Delivery</span>
                <span className="font-mono text-amber-400 font-bold">12:00 - 22:30</span>
              </div>
              <p className="text-xs text-stone-400 pt-2 italic">
                * Advance table reservations recommended for Sheesh Mahal private chambers.
              </p>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base uppercase tracking-widest text-amber-300 font-bold border-b border-stone-800 pb-2">
              Royal Navigation
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              {[
                { id: 'menu', label: 'Imperial Menu & Thalis' },
                { id: 'gallery', label: 'Royal Dishes Gallery' },
                { id: 'reservation', label: 'Reserve Table & Private Hall' },
                { id: 'onsite', label: 'Palace Ambience & Location' },
                { id: 'delivery', label: 'Order Royal Home Delivery' },
                { id: 'services', label: 'Palace Banquets & Catering' },
                { id: 'feedback', label: 'Guest Reviews & Ratings' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.id as PageView);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors flex items-center gap-2 text-stone-300 font-medium"
                  >
                    <span className="text-amber-500 font-bold">›</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Private Soirées Invitation */}
          <div className="space-y-4">
            <h4 className="font-serif text-base uppercase tracking-widest text-amber-300 font-bold border-b border-stone-800 pb-2">
              The Royal Dispatch
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              Subscribe to receive secret seasonal thali drops, royal festival banquet invitations, and private dining allocations.
            </p>

            {subscribed ? (
              <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-2xl text-amber-300 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>You are on the Royal Guestlist. Welcome to Sonar Thali.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for Royal invitations..."
                    className="w-full bg-stone-900 border-2 border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-all pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-600 hover:bg-amber-500 text-black font-extrabold rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Strictly confidential palace guestlist.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Location & Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-stone-400">
          <div className="flex flex-wrap items-center gap-6 text-stone-300 font-medium">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Sonar Thali Palace, Rajpath Heritage District, New Delhi
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500" />
              +91 (011) 4800-THALI
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500" />
              concierge@sonarthali.com
            </span>
          </div>

          <div className="text-center md:text-right text-xs uppercase tracking-[0.3em] text-amber-500/80 font-mono font-bold">
            <p>© {new Date().getFullYear()} SONAR THALI • Royal Indian Fine Dining</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
