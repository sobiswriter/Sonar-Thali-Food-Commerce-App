import React, { useState } from 'react';
import { PageView } from '../types';
import { Award, Wine, Users, Calendar, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';

interface ServicesSectionProps {
  openReservationModal: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ openReservationModal, setCurrentPage }) => {
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState<string | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(10);
  const [details, setDetails] = useState('');

  const services = [
    {
      id: 'private-vault',
      title: 'Private Soirées & Vault Allocations',
      subtitle: 'Subterranean Cellar & Acoustic Isolation',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
      capacity: 'Up to 24 Guests',
      features: [
        'Dedicated Private Sommelier & Senior Captain',
        'Custom 7-Course Degustation Customization',
        'Acoustic soundproof architectural vault',
        'Discreet security entrance option'
      ],
      description: 'Host confidential diplomatic dinners, high-stakes corporate celebrations, or milestone family soirées surrounded by 2,000 rare grand crus.'
    },
    {
      id: 'chefs-table',
      title: 'Executive Chef’s Alchemist Table',
      subtitle: 'Front-Row Culinary Alchemy',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
      capacity: 'Up to 8 Guests',
      features: [
        'Interactive plating live with Executive Chef Marcus Thorne',
        'Rare Japanese binchotan ember techniques',
        'Off-menu experimental vintage pours',
        'Custom engraved souvenir menu scrolls'
      ],
      description: 'An unscripted culinary performance where each dish is conceptualized and seared directly before your eyes.'
    },
    {
      id: 'mixology-masterclass',
      title: 'Dark Mixology & Cocktail Masterclasses',
      subtitle: 'Botanical Alchemy & Smoke Vapor Workshops',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
      capacity: '4 to 16 Participants',
      features: [
        'Mastering activated charcoal & liquid nitrogen vapor',
        'Infusing rare agave spirits with wild botanicals',
        'Hand-carving crystal clear ice spheres',
        'Custom artisanal bitters creation kit included'
      ],
      description: 'Immerse your party in the secrets of dark mixology, guided by Master Mixologist Julian Vance.'
    },
    {
      id: 'bespoke-catering',
      title: 'Diplomatic & Estate Catering',
      subtitle: 'Off-site Full Service Luxury Dining',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000',
      capacity: '20 to 150 Guests',
      features: [
        'Mobile binchotan ember grills & sommelier bar',
        'Full service staffing, crystal glassware & gold cutlery',
        'Custom menu design aligned with dietary mandates',
        'White-glove event orchestration'
      ],
      description: 'Transform your private estate, yacht, or gallery into an AURA pop-up sanctuary.'
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setSelectedServiceInquiry(null);
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
    }, 4000);
  };

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm uppercase tracking-widest font-mono font-bold mb-4">
          <Award className="w-4 h-4" />
          <span>Bespoke Royal Services</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          Royal Banquets & <span className="text-amber-500">Catering</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          From Sheesh Mahal private mirror chamber allocations to live charcoal tandoor masterclasses and luxury estate catering, our royal concierge team orchestrates unforgettable feasts.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-zinc-900/70 border border-zinc-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="relative h-64 overflow-hidden bg-zinc-950">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/90 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs">
                  {service.capacity}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-amber-500 font-medium italic mt-0.5">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">Inclusions</span>
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedServiceInquiry(service.id)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                <span>Inquire & Reserve Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Form Modal */}
      {selectedServiceInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-zinc-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedServiceInquiry(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950 text-zinc-300 hover:text-amber-300 border border-zinc-700 flex items-center justify-center text-lg"
            >
              ✕
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl font-bold text-amber-100">Inquiry Received</h3>
                <p className="text-xs text-zinc-300">
                  Our Private Concierge Director will review your requirements and reach out within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">Private Concierge Request</span>
                  <h3 className="font-serif text-xl font-bold text-amber-100">
                    {services.find(s => s.id === selectedServiceInquiry)?.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-amber-400 uppercase font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-amber-400 uppercase font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-amber-400 uppercase font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-amber-400 uppercase font-medium mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-amber-400 uppercase font-medium mb-1">Inquiry Details & Event Vision</label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describe guest count, wine preferences, security or dietary mandates..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-amber-400 transition-colors"
                >
                  Submit Concierge Inquiry
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
