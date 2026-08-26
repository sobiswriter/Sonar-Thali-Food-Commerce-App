import React, { useState } from 'react';
import { CartItem, MenuItem } from '../types';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  onPlaceOrder: (customerDetails: { name: string; phone: string; address: string; notes?: string }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  onPlaceOrder
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    onPlaceOrder({ name, phone, address, notes });
    setStep('cart');
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-amber-500/30 text-zinc-100 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-100">Gourmet Delivery Cart</h3>
                <span className="text-[11px] text-zinc-400">Insulated Thermal Packaging Guaranteed</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-amber-300 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                <p className="font-serif text-base text-zinc-300">Your delivery cart is currently empty.</p>
                <p className="text-xs text-zinc-500 mt-1">Browse our Alchemist Menu and add signature dishes.</p>
              </div>
            ) : step === 'cart' ? (
              /* CART ITEMS LIST */
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.menuItem.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif font-bold text-sm text-amber-100 line-clamp-1">{item.menuItem.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-amber-400">
                        ₹{item.menuItem.price * item.quantity}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, -1)}
                            className="text-zinc-400 hover:text-amber-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-amber-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, 1)}
                            className="text-zinc-400 hover:text-amber-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* CHECKOUT ADDRESS FORM */
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord / Lady / Full Name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Contact Phone *
                  </label>
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
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Penthouse Suite, Gate Code..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                    Courier Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Leave at concierge desk, call upon arrival..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Insulated temperature vault courier dispatched upon chef completion.</span>
                </div>
              </form>
            )}

          </div>

          {/* Footer Totals & Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-3">
              
              <div className="space-y-1.5 text-xs text-stone-300 border-b border-stone-800 pb-3 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-stone-200 font-mono">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insulated Courier Fee:</span>
                  <span className="text-stone-200 font-mono">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5% GST):</span>
                  <span className="text-stone-200 font-mono">₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-amber-300 pt-1">
                  <span>Total Order:</span>
                  <span className="font-mono text-base font-extrabold text-amber-400">₹{total}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Delivery Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('cart')}
                    className="px-4 py-3.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Place Order (₹{total})</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
