import React, { useState } from 'react';
import { PageView } from '../types';
import { SEATING_AREAS } from '../data/mockData';
import { Sparkles, MapPin, Wine, Flame, Clock, ShieldCheck, Compass, Car, Glasses, Calendar } from 'lucide-react';

interface OnSiteExperienceProps {
  openReservationModal: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const OnSiteExperience: React.FC<OnSiteExperienceProps> = ({ openReservationModal, setCurrentPage }) => {
  const [selectedZone, setSelectedZone] = useState<string>('s1');

  const activeZone = SEATING_AREAS.find(s => s.id === selectedZone) || SEATING_AREAS[0];

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold mb-4">
          <MapPin className="w-4 h-4" />
          <span>Palace Grounds & Architecture</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          On-Site Dining & <span className="text-amber-500">Palace Ambience</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          Step into a realm inspired by Rajasthan’s golden palaces, carved teak arches, and Sheesh Mahal mirror walls. Explore our dining chambers and plan your visit.
        </p>
      </div>

      {/* Interactive Seating Map & Room Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left Interactive Zone Selector */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-serif text-lg font-bold text-amber-200 border-b border-zinc-800 pb-2">
            Select Atmosphere Zone
          </h3>
          <div className="space-y-3">
            {SEATING_AREAS.map((area) => (
              <div
                key={area.id}
                onClick={() => setSelectedZone(area.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedZone === area.id
                    ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-amber-100">{area.name}</h4>
                  <span className="text-[10px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-amber-400">
                    {area.availableSlots} Slots Tonight
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Zone Visual Display */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="relative h-72 sm:h-80 bg-zinc-950">
            <img
              src={activeZone.image}
              alt={activeZone.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-full">
                {activeZone.vibe}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
                {activeZone.name}
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {activeZone.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div>
                <span className="text-amber-400 font-semibold uppercase block text-[10px]">Capacity</span>
                {activeZone.capacity}
              </div>
              <div>
                <span className="text-amber-400 font-semibold uppercase block text-[10px]">Acoustics</span>
                Noise Isolation Level IX
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={openReservationModal}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table in {activeZone.name}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* House Etiquette & Visitor Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <Glasses className="w-8 h-8 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-amber-200">Dress Code Etiquette</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Elegant evening attire or smart bespoke formalwear is requested. Tailored jackets preferred for gentlemen in the Subterranean Vault.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <Car className="w-8 h-8 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-amber-200">Complimentary Valet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            White-glove private valet parking is available at our porte-cochère on Blackwood Boulevard starting from 17:00 nightly.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-amber-200">Discretion & Privacy</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Photography without flash is permitted. Private vault dining offers total acoustic isolation for confidential gatherings.
          </p>
        </div>
      </div>

    </section>
  );
};
