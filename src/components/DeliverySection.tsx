import React, { useState, useEffect } from 'react';
import { DeliveryOrder, MenuItem, PageView } from '../types';
import { MENU_ITEMS } from '../data/mockData';
import { 
  Truck, ShieldCheck, Clock, MapPin, CheckCircle2, 
  Sparkles, Plus, ArrowRight, PackageCheck, Flame
} from 'lucide-react';

interface DeliverySectionProps {
  activeOrder: DeliveryOrder | null;
  addToCart: (item: MenuItem, quantity: number) => void;
  openCart: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  activeOrder,
  addToCart,
  openCart,
  setCurrentPage
}) => {
  const [addressInput, setAddressInput] = useState('');
  const [distanceCheck, setDistanceCheck] = useState<{ checked: boolean; inRange: boolean; estMins: number } | null>(null);
  const [orderProgress, setOrderProgress] = useState<number>(0);

  const handleCheckDistance = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      // Simulate distance check calculation
      const isEligible = true;
      const mins = Math.floor(25 + Math.random() * 20);
      setDistanceCheck({ checked: true, inRange: isEligible, estMins: mins });
    }
  };

  // Simulate progress bar for active order
  useEffect(() => {
    if (activeOrder) {
      setOrderProgress(35);
      const timer1 = setTimeout(() => setOrderProgress(65), 5000);
      const timer2 = setTimeout(() => setOrderProgress(90), 12000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [activeOrder]);

  const deliveryMenuItems = MENU_ITEMS.filter(m => m.category !== 'tasting'); // All except multi-course tasting

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Title Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold mb-4">
          <Truck className="w-4 h-4" />
          <span>Sonar Thali Palace Express</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          Royal Home <span className="text-amber-500">Delivery</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          Experience Sonar Thali’s 32-course silver platter Thalis, tandoori starters, and desserts delivered in temperature-vaulted brass-lined insulated carriers.
        </p>
      </div>

      {/* Active Live Order Tracker Banner */}
      {activeOrder && (
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-zinc-900 border-2 border-amber-500/60 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-amber-400">
                Live Courier Tracker • Ref #{activeOrder.orderCode}
              </span>
              <h3 className="font-serif text-2xl font-bold text-amber-100 mt-1">
                Order Status: {orderProgress < 50 ? 'Chef Preparing' : orderProgress < 85 ? 'Courier En Route' : 'Arriving Soon'}
              </h3>
            </div>

            <div className="text-right">
              <div className="text-xs text-zinc-400">Estimated Delivery Time</div>
              <div className="font-serif text-xl font-bold text-amber-300">~{activeOrder.estimatedMinutes} Minutes</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                style={{ width: `${orderProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-400 pt-1 font-mono">
              <span className={orderProgress >= 15 ? 'text-amber-300 font-bold' : ''}>1. Order Received</span>
              <span className={orderProgress >= 40 ? 'text-amber-300 font-bold' : ''}>2. Binchotan Sear</span>
              <span className={orderProgress >= 70 ? 'text-amber-300 font-bold' : ''}>3. Vault Courier</span>
              <span className={orderProgress >= 95 ? 'text-amber-300 font-bold' : ''}>4. Delivered</span>
            </div>
          </div>

          {/* Courier Details */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-amber-400" />
              <div>
                <strong>Destination:</strong> {activeOrder.address}
              </div>
            </div>
            <span className="text-amber-400 font-bold">{activeOrder.items.length} Items</span>
          </div>
        </div>
      )}

      {/* Address Eligibility Checker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 mb-12 max-w-3xl mx-auto shadow-xl">
        <h3 className="font-serif text-lg font-bold text-amber-200 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Check Delivery Eligibility & Estimate ETA</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Enter your location to verify thermal vault courier availability within our 15-mile service radius.
        </p>

        <form onSubmit={handleCheckDistance} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Enter Street Address, Suite or Postal Code..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
          >
            Check Range
          </button>
        </form>

        {distanceCheck && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Location within optimal temperature vault delivery zone.</span>
            </div>
            <span className="font-bold font-mono">ESTIMATED ETA: {distanceCheck.estMins} MINS</span>
          </div>
        )}
      </div>

      {/* Curated Delivery Menu Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
          <h3 className="font-serif text-2xl font-bold text-amber-100">
            Curated Delivery Menu
          </h3>
          <button
            onClick={openCart}
            className="px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/30 transition-colors"
          >
            View Cart
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryMenuItems.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative h-40 rounded-xl overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 bg-zinc-950/90 rounded-full text-amber-300 font-serif font-bold text-xs border border-amber-500/40">
                    ${item.price}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-amber-100">{item.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] text-amber-500 uppercase font-mono">Thermal Sealed</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
