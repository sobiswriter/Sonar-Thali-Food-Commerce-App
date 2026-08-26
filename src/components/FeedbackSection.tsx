import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { REVIEWS } from '../data/mockData';
import { 
  Star, MessageSquareHeart, ThumbsUp, Sparkles, CheckCircle2, 
  Send, Filter, Heart, Award
} from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [filterVisitType, setFilterVisitType] = useState<string>('all');

  // Form State
  const [guestName, setGuestName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [visitType, setVisitType] = useState<'On-Site Dining' | 'Chef\'s Table' | 'Gourmet Delivery' | 'Private Event'>('On-Site Dining');
  const [favoriteDish, setFavoriteDish] = useState('The Obsidian Truffle Flight');
  const [comment, setComment] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['Hypnotic']);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aura_reviews');
    if (saved) {
      try {
        setReviewsList(JSON.parse(saved));
      } catch {
        setReviewsList(REVIEWS);
      }
    } else {
      setReviewsList(REVIEWS);
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviewsList(updated);
    localStorage.setItem('aura_reviews', JSON.stringify(updated));
  };

  const moodOptions = [
    'Hypnotic', 'Flawless Service', 'Sensory Masterpiece', 
    'Intimate Glow', 'Cocktail Perfection', 'Acoustic Bliss', 
    'Pristine Packaging', 'Michelin Quality at Home'
  ];

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      guestName,
      rating,
      visitType,
      favoriteDish,
      moodTags: selectedMoods,
      comment,
      date: 'Just now',
      likes: 1
    };

    const updated = [newReview, ...reviewsList];
    saveReviews(updated);
    setSubmitted(true);
    setGuestName('');
    setComment('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleLike = (id: string) => {
    const updated = reviewsList.map(r => 
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    saveReviews(updated);
  };

  // Metrics
  const avgRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / (reviewsList.length || 1)).toFixed(2);
  const fiveStarPercentage = Math.round((reviewsList.filter(r => r.rating === 5).length / (reviewsList.length || 1)) * 100);

  const filteredReviews = filterVisitType === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.visitType === filterVisitType);

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-500 font-mono font-bold mb-3">
          Royal Diner Reflections & Real-time Reviews
        </p>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          The Sonar Thali <span className="text-amber-500">Royal Wall</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          Read authentic reflections from guests who dined at Sonar Thali or ordered royal home delivery.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="p-8 rounded-3xl bg-stone-900/90 border-2 border-stone-800 text-center space-y-3 shadow-xl">
          <div className="flex justify-center items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400" />
            ))}
          </div>
          <div className="font-serif text-5xl font-extrabold text-amber-100">{avgRating} / 5.0</div>
          <p className="text-xs sm:text-sm text-stone-300 font-bold uppercase tracking-widest">Average Royal Rating</p>
        </div>

        <div className="p-8 rounded-3xl bg-stone-900/90 border-2 border-stone-800 text-center space-y-3 shadow-xl">
          <div className="font-serif text-5xl font-extrabold text-amber-400">{fiveStarPercentage}%</div>
          <p className="text-xs sm:text-sm text-stone-300 font-bold uppercase tracking-widest">5-Star Flawless Reviews</p>
          <p className="text-xs text-amber-500 font-mono font-bold">Based on {reviewsList.length} total royal submissions</p>
        </div>

        <div className="p-8 rounded-3xl bg-stone-900/90 border-2 border-stone-800 text-center space-y-3 shadow-xl">
          <Award className="w-10 h-10 text-amber-400 mx-auto" />
          <div className="font-serif text-2xl font-extrabold text-amber-100">Top Rated Dish</div>
          <p className="text-sm text-amber-400 italic font-bold">"Royal Sonar Maharaja Thali"</p>
        </div>
      </div>

      {/* Main Grid: Feedback Form vs Community Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Submit Review */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="font-serif text-xl font-bold text-amber-100">Leave Your Impression</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Your review will immediately publish to the live wall below.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-amber-500/20 border border-amber-500/50 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
              <h4 className="font-serif text-lg font-bold text-amber-200">Thank You For Your Reflection</h4>
              <p className="text-xs text-zinc-300">Your review has been dynamically appended to the Community Wall.</p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Overall Experience Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating || rating) >= star
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-300 ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Your Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g., Lord Vance / Elena / Dr. Finch"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Visit Type
                  </label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="On-Site Dining">On-Site Dining</option>
                    <option value="Chef's Table">Chef's Table</option>
                    <option value="Gourmet Delivery">Gourmet Delivery</option>
                    <option value="Private Event">Private Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Favorite Dish
                  </label>
                  <input
                    type="text"
                    value={favoriteDish}
                    onChange={(e) => setFavoriteDish(e.target.value)}
                    placeholder="e.g. Truffle Flight, Wagyu"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Mood Tags */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Select Atmosphere & Vibe Tags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {moodOptions.map((mood) => {
                    const isSel = selectedMoods.includes(mood);
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => toggleMood(mood)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                          isSel 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' 
                            : 'bg-zinc-950 text-zinc-500 border border-zinc-800'
                        }`}
                      >
                        {mood}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the flavors, atmosphere, wine pairing, or delivery quality..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish Review to Live Wall</span>
              </button>

            </form>
          )}

        </div>

        {/* Right Wall: Live Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-serif text-xl font-bold text-amber-100">Live Guest Reflections</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={filterVisitType}
                onChange={(e) => setFilterVisitType(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1 text-xs text-amber-300 focus:outline-none"
              >
                <option value="all">All Visit Types</option>
                <option value="On-Site Dining">On-Site Dining</option>
                <option value="Chef's Table">Chef's Table</option>
                <option value="Gourmet Delivery">Gourmet Delivery</option>
                <option value="Private Event">Private Event</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-amber-100">{rev.guestName}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {rev.visitType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 mt-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  "{rev.comment}"
                </p>

                {/* Mood Tags & Dish */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/80 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {rev.moodTags.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] text-zinc-400 border border-zinc-800">
                        ✦ {m}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>{rev.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
