import React, { useState, useMemo } from 'react';
import { MenuItem, DietaryTag, PageView } from '../types';
import { MENU_ITEMS } from '../data/mockData';
import { 
  Utensils, Search, Filter, Sparkles, Plus, Check, Info, 
  Wine, Clock, Flame, ShieldAlert, Heart, Truck
} from 'lucide-react';

interface MenuSectionProps {
  addToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
  openReservationModal: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  addToCart, 
  openReservationModal,
  setCurrentPage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState('');

  const categories = [
    { id: 'all', label: 'Entire Royal Collection' },
    { id: 'tasting', label: 'Royal Thalis & Flights' },
    { id: 'starters', label: 'Awadhi Starters & Kebabs' },
    { id: 'mains', label: 'Imperial Mains & Curries' },
    { id: 'desserts', label: 'Royal Desserts & Sweets' },
    { id: 'cocktails', label: 'Artisanal Drinks & Chai' },
  ];

  const dietaryTags: { id: DietaryTag; label: string }[] = [
    { id: 'chef-signature', label: 'Royal Signature' },
    { id: 'vegetarian', label: 'Pure Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'nut-free', label: 'Nut-Free' },
  ];

  const toggleDietaryFilter = (tag: DietaryTag) => {
    if (selectedDietary.includes(tag)) {
      setSelectedDietary(selectedDietary.filter(t => t !== tag));
    } else {
      setSelectedDietary([...selectedDietary, tag]);
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary match (must match ALL selected dietary tags)
      if (selectedDietary.length > 0) {
        const hasAllDietary = selectedDietary.every(tag => item.dietary.includes(tag));
        if (!hasAllDietary) return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const subMatch = item.subtitle.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const ingMatch = item.ingredients.some(i => i.toLowerCase().includes(query));
        if (!nameMatch && !subMatch && !descMatch && !ingMatch) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, 1, customNotes);
    setAddedItemNotice(item.name);
    setCustomNotes('');
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  return (
    <section className="py-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0a0806] text-stone-100">
      
      {/* Header Title */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-500 font-mono font-bold mb-3">
          Royal Heritage Gastronomy • Collection 2026
        </p>
        <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4">
          Sonar Thali <span className="text-amber-500">Royal Menu</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed">
          Silver platter Thalis, charcoal-fired tandoori delights, and 36-hour simmered curries. Select a royal category below or filter by dietary requirements.
        </p>
      </div>

      {/* Added Item Notification Toast */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-zinc-950 font-bold px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-zinc-950 text-amber-400 rounded-full p-0.5" />
          <span>Added "{addedItemNotice}" to Gourmet Delivery Cart</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="mb-10 space-y-6">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none border-b border-stone-800">
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

        {/* Search Input & Dietary Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-stone-900/90 p-5 rounded-2xl border-2 border-stone-800 shadow-xl">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search royal dishes, ingredients (e.g., Maharaja Thali, Paneer, Truffle, Dal Makhani)..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mr-1" />
            {dietaryTags.map((tag) => {
              const isSelected = selectedDietary.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleDietaryFilter(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Menu Item Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8">
          <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-zinc-300">No dishes match your specific search criteria.</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
            Try clearing dietary filters or searching for broader terms like "Truffle", "Wagyu", or "Cocktail".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDietary([]);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-stone-900/90 hover:bg-stone-900 border-2 border-stone-800 hover:border-amber-500 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-xl hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)]"
            >
              <div>
                {/* Image & Price Tag Overlay */}
                <div className="relative h-52 overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 px-3.5 py-1 rounded-full bg-stone-950/90 backdrop-blur-md border border-amber-500/50 text-amber-300 font-mono font-bold text-sm shadow-lg">
                    ₹{item.price}
                  </div>

                  {/* Chef's Special Badge */}
                  {item.isChefSpecial && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      <span>Signature</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-amber-500/80 font-medium italic">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.ingredients.slice(0, 3).map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-[10px] text-amber-500/80 self-center">
                        +{item.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-5 pb-5 pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveItemModal(item)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tasting Notes</span>
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow-[0_0_12px_rgba(217,119,6,0.2)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Order</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Dish Lightbox Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 bg-zinc-950">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-amber-300 border border-zinc-700 flex items-center justify-center text-lg"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest">
                    {activeItemModal.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
                    {activeItemModal.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium italic">
                    {activeItemModal.subtitle}
                  </p>
                </div>

                <div className="text-2xl font-mono font-bold text-amber-300 bg-stone-950/90 px-4 py-1.5 rounded-2xl border border-amber-500/50">
                  ₹{activeItemModal.price}
                </div>
              </div>
            </div>

            {/* Modal Details Body */}
            <div className="p-6 space-y-6">
              
              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {activeItemModal.description}
              </p>

              {/* Pairing & Prep info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                {activeItemModal.pairing && (
                  <div className="flex items-start gap-3">
                    <Wine className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold">Recommended Sommelier Pairing</div>
                      <div className="text-xs text-zinc-200 font-medium">{activeItemModal.pairing}</div>
                    </div>
                  </div>
                )}

                {activeItemModal.calories && (
                  <div className="flex items-start gap-3">
                    <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold">Nutritional Density</div>
                      <div className="text-xs text-zinc-200 font-medium">{activeItemModal.calories} kcal approx.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Ingredients List */}
              <div>
                <h4 className="text-xs font-serif uppercase tracking-widest text-amber-200 font-semibold mb-2">
                  Key Botanical & Culinary Elements
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeItemModal.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Instructions Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                  Special Preparation Requests / Allergy Notes (Optional)
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g., Extra sauce on side, low salt, allergic to shellfish..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setActiveItemModal(null);
                    openReservationModal();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-200 text-xs font-semibold tracking-wider uppercase border border-zinc-700"
                >
                  Reserve Table to Taste
                </button>

                <button
                  onClick={() => {
                    handleAddToCart(activeItemModal);
                    setActiveItemModal(null);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Add to Delivery Order (${activeItemModal.price})</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
