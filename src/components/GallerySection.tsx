import React, { useState } from 'react';
import { GalleryItem, PageView } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { Sparkles, Maximize2, Wine, Flame, Eye, Compass, Calendar, ArrowRight } from 'lucide-react';

interface GallerySectionProps {
  openReservationModal: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ openReservationModal, setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGalleryModal, setActiveGalleryModal] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'plating', label: 'Plated Culinary Art' },
    { id: 'cocktails', label: 'Dark Mixology' },
    { id: 'atmosphere', label: 'Sanctuary & Vaults' },
    { id: 'chef', label: 'Fire & Craft' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-500 font-mono font-bold mb-3">
          Royal Visual Portfolio • Aesthetic Masterpieces
        </p>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          Sonar Thali <span className="text-amber-500">Royal Gallery</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          Explore the royal visual narrative of Sonar Thali. From 32-course silver platter Thalis to charcoal tandoori flames and Sheesh Mahal mirror chambers.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveGalleryModal(item)}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border-2 border-stone-800 hover:border-amber-500 transition-all duration-500 hover:-translate-y-2.5 shadow-2xl hover:shadow-[0_20px_40px_rgba(245,158,11,0.25)]"
          >
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Hover Action Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Content overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] uppercase font-bold tracking-widest">
                {item.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-300 font-light line-clamp-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Detail Lightbox Modal */}
      {activeGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl bg-zinc-900 border border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveGalleryModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-amber-300 border border-zinc-700 flex items-center justify-center text-lg shadow-lg"
            >
              ✕
            </button>

            {/* Image Box */}
            <div className="relative h-80 sm:h-96 bg-zinc-950">
              <img
                src={activeGalleryModal.image}
                alt={activeGalleryModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

            {/* Details Box */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest">
                  {activeGalleryModal.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 mt-2">
                  {activeGalleryModal.title}
                </h3>
                <p className="text-sm text-amber-400/90 font-medium italic mt-1">
                  {activeGalleryModal.subtitle}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {activeGalleryModal.description}
              </p>

              {activeGalleryModal.originStory && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-900/30">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold mb-1 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>The Culinary Genesis</span>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    "{activeGalleryModal.originStory}"
                  </p>
                </div>
              )}

              {/* Flavor Profile Notes */}
              {activeGalleryModal.flavorNotes && (
                <div>
                  <h4 className="text-xs font-serif uppercase tracking-widest text-amber-200 font-semibold mb-2">
                    Sensory & Aroma Profile
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeGalleryModal.flavorNotes.map((note, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium">
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pairing */}
              {activeGalleryModal.pairingRecommendation && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <Wine className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div className="text-xs text-zinc-300">
                    <span className="text-amber-400 font-semibold">Recommended Pairing: </span>
                    {activeGalleryModal.pairingRecommendation}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setActiveGalleryModal(null);
                    setCurrentPage('menu');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold tracking-wider uppercase"
                >
                  Explore Full Menu
                </button>

                <button
                  onClick={() => {
                    setActiveGalleryModal(null);
                    openReservationModal();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table Experience</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
