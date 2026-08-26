import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AudioAmbience } from './AudioAmbience';
import { 
  Menu, X, Sun, Moon, ShoppingBag, Calendar, Clock, Crown
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  openCart: () => void;
  openReservationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openReservationModal
}) => {
  const { mode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [palaceTime, setPalaceTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setPalaceTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'onsite', label: 'Ambience' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'services', label: 'Banquets' },
    { id: 'feedback', label: 'Reviews' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0806]/95 backdrop-blur-md border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3' 
          : 'bg-gradient-to-b from-[#0a0806]/90 via-[#0a0806]/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            id="brand-logo"
            className="flex items-center gap-3 group text-left focus:outline-none flex-shrink-0"
          >
            <div className="w-10 h-10 border border-amber-500/80 bg-amber-500/10 flex items-center justify-center rounded-xl group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="block font-serif italic text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors leading-none">
                Sonar Thali
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-amber-500 font-mono font-bold mt-1">
                Royal Gastronomy
              </span>
            </div>
          </button>

          {/* Spacious Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-auto">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-xs xl:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive 
                      ? 'text-amber-400 font-bold after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-amber-400 after:rounded-full after:shadow-[0_0_10px_#f59e0b]' 
                      : 'text-stone-300 hover:text-amber-300 opacity-90 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls & Palace Clock */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
            
            {/* Live Palace Time */}
            {palaceTime && (
              <div className="hidden 2xl:flex items-center gap-2 bg-stone-900/90 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-mono text-amber-400">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] uppercase text-stone-400 tracking-widest">Palace Time</span>
                <span className="font-bold">{palaceTime}</span>
              </div>
            )}

            {/* Ambient Sound Toggle */}
            <AudioAmbience />

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-amber-300 hover:border-amber-500/50 hover:bg-stone-800 transition-all"
              title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {mode === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              id="cart-drawer-trigger"
              className="relative p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-amber-200 hover:border-amber-500/50 transition-all flex items-center gap-2 px-3 sm:px-3.5"
              title="View Gourmet Delivery Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-amber-300">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-amber-500 text-black text-xs font-extrabold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Reserve CTA */}
            <button
              onClick={openReservationModal}
              id="quick-reserve-btn"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-[#0a0806]/98 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-5 py-6 space-y-3 max-w-md mx-auto">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-500 font-mono font-bold px-2 mb-2">
              Sonar Thali Navigation
            </div>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm uppercase tracking-widest font-bold transition-all ${
                    isActive 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                      : 'text-stone-300 hover:bg-stone-900 hover:text-amber-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-stone-800 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservationModal();
                }}
                id="mobile-reserve-btn"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

