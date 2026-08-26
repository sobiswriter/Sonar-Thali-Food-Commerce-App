import React, { useState, useEffect } from 'react';
import { Reservation, SeatingArea } from '../types';
import { SEATING_AREAS } from '../data/mockData';
import { 
  Calendar, Clock, Users, Sparkles, CheckCircle2, ShieldCheck, 
  MapPin, Copy, Check, Trash2, ArrowRight, X
} from 'lucide-react';

interface ReservationSectionProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ isModal = false, onCloseModal }) => {
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('19:30');
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('s1');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Anniversary');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking state
  const [createdBooking, setCreatedBooking] = useState<Reservation | null>(null);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Load existing reservations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aura_reservations');
    if (saved) {
      try {
        setMyReservations(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveReservations = (updated: Reservation[]) => {
    setMyReservations(updated);
    localStorage.setItem('aura_reservations', JSON.stringify(updated));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seatingArea = SEATING_AREAS.find(s => s.id === selectedAreaId) || SEATING_AREAS[0];
    const confCode = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      confirmationCode: confCode,
      guestName,
      email,
      phone,
      date: selectedDate,
      time: selectedTime,
      partySize,
      seatingAreaId: seatingArea.id,
      seatingAreaName: seatingArea.name,
      specialRequests,
      occasion,
      createdAt: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    const updated = [newReservation, ...myReservations];
    saveReservations(updated);
    setCreatedBooking(newReservation);
    setStep(3); // Confirmation step
  };

  const handleCancelBooking = (id: string) => {
    const updated = myReservations.map(res => 
      res.id === id ? { ...res, status: 'cancelled' as const } : res
    );
    saveReservations(updated);
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const availableTimeSlots = [
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const currentSeatingArea = SEATING_AREAS.find(s => s.id === selectedAreaId) || SEATING_AREAS[0];

  const content = (
    <div className={`w-full ${isModal ? 'p-6 max-w-5xl mx-auto' : 'py-16 px-4 sm:px-8 lg:px-12 xl:px-16'}`}>
      
      {/* Title Header */}
      {!isModal && (
        <div className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-500 font-mono font-bold mb-3">
            Royal Sanctuary Allocations & Table Booking
          </p>
          <h2 className="font-serif italic text-4xl sm:text-6xl font-extrabold text-stone-100 tracking-tight mb-4">
            Reserve Your <span className="text-amber-500">Royal Experience</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-normal">
            Select your preferred dining hall (Durbar Hall, Sheesh Mahal, Courtyard), party size, and date. Immediate instant palace confirmation guaranteed.
          </p>
        </div>
      )}

      {/* Tabs: Reserve vs My Bookings */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => { setActiveTab('book'); setStep(1); setCreatedBooking(null); }}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'book'
              ? 'bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          New Reservation
        </button>
        <button
          onClick={() => setActiveTab('my-bookings')}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'my-bookings'
              ? 'bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <span>My Reservations</span>
          {myReservations.filter(r => r.status === 'confirmed').length > 0 && (
            <span className="w-5 h-5 rounded-full bg-zinc-950 text-amber-400 text-[10px] flex items-center justify-center font-extrabold">
              {myReservations.filter(r => r.status === 'confirmed').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'my-bookings' ? (
        /* MY BOOKINGS VIEW */
        <div className="space-y-4">
          {myReservations.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8">
              <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-zinc-300">No active reservations found.</h3>
              <p className="text-xs text-zinc-500 mt-1">
                You haven't booked any tables yet. Create your first table allocation now!
              </p>
              <button
                onClick={() => setActiveTab('book')}
                className="mt-4 px-6 py-2.5 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                Book a Table Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myReservations.map((res) => (
                <div 
                  key={res.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    res.status === 'confirmed' 
                      ? 'bg-zinc-900/90 border-amber-500/40 shadow-lg' 
                      : 'bg-zinc-950/60 border-zinc-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        {res.confirmationCode}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {res.status}
                      </span>
                    </div>

                    {res.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(res.id)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                        title="Cancel Reservation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-300">
                    <div className="font-serif text-base font-bold text-amber-200">{res.seatingAreaName}</div>
                    <div className="flex items-center gap-4 text-zinc-400 text-xs">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {res.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {res.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-500" /> {res.partySize} Guests</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
                      Reserved for: <strong className="text-zinc-200">{res.guestName}</strong> ({res.phone})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* NEW BOOKING WORKFLOW */
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Step Indicator */}
          {step < 3 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 1 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  1
                </span>
                <span className="text-xs font-serif uppercase tracking-wider text-amber-200">Date, Time & Area</span>
              </div>
              <div className="h-px bg-zinc-800 flex-1 mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 2 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  2
                </span>
                <span className="text-xs font-serif uppercase tracking-wider text-amber-200">Guest Information</span>
              </div>
            </div>
          )}

          {step === 1 && (
            /* STEP 1: DATE, TIME, PARTY SIZE & SEATING AREA */
            <div className="space-y-8">
              
              {/* Seating Area Picker */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
                  Choose Atmosphere & Seating Sanctuary
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SEATING_AREAS.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAreaId === area.id
                          ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={area.image}
                          alt={area.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-amber-100">{area.name}</h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{area.description}</p>
                          <div className="text-[10px] text-amber-400/90 font-medium mt-1">
                            {area.vibe} • {area.capacity}
                          </div>
                        </div>
                      </div>
                      {selectedAreaId === area.id && (
                        <CheckCircle2 className="w-5 h-5 text-amber-400 absolute top-3 right-3" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Date, Time & Party Size controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                
                {/* Date Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                    Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                  >
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time} PM
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Step 1 Action */}
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {step === 2 && (
            /* STEP 2: GUEST DETAILS & SPECIAL OCCASION */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Lord / Lady / Dr. / Full Name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@domain.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Special Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="Romantic Dinner">Romantic Date Night</option>
                    <option value="Business Soiree">Executive Business Soirée</option>
                    <option value="Birthday Tasting">Private Birthday Tasting</option>
                    <option value="Casual Gathering">Casual Culinary Exploration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Special Dietary Requirements or Seating Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Quiet corner, nut allergy for 1 guest, anniversary champagne toast..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all"
                >
                  Confirm Table Reservation
                </button>
              </div>

            </form>
          )}

          {step === 3 && createdBooking && (
            /* STEP 3: GOLDEN CONFIRMATION PASS */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                  Allocation Confirmed
                </span>
                <h3 className="font-serif text-3xl font-bold text-amber-100 mt-1">
                  Welcome to AURA, {createdBooking.guestName}
                </h3>
              </div>

              {/* Confirmation Pass Box */}
              <div className="p-6 rounded-3xl bg-zinc-950 border-2 border-amber-500/50 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-zinc-950 font-bold text-[10px] uppercase tracking-widest rounded-bl-xl">
                  Golden Pass
                </div>

                <div className="space-y-3 text-left">
                  <div className="text-xs text-zinc-400 uppercase tracking-widest">Confirmation Reference</div>
                  <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <span className="font-mono text-lg font-bold text-amber-300">
                      {createdBooking.confirmationCode}
                    </span>
                    <button
                      onClick={() => copyCodeToClipboard(createdBooking.confirmationCode)}
                      className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 text-zinc-300">
                    <div><strong>Sanctuary:</strong> {createdBooking.seatingAreaName}</div>
                    <div><strong>Party Size:</strong> {createdBooking.partySize} Guests</div>
                    <div><strong>Date:</strong> {createdBooking.date}</div>
                    <div><strong>Time:</strong> {createdBooking.time} PM</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('my-bookings')}
                  className="px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider"
                >
                  View All Reservations
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-900 text-zinc-300 hover:text-amber-300 border border-zinc-700 flex items-center justify-center text-lg"
          >
            ✕
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};
