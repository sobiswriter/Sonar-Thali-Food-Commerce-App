import React, { useState } from 'react';
import { PageView, MenuItem, CartItem, DeliveryOrder } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { OnSiteExperience } from './components/OnSiteExperience';
import { DeliverySection } from './components/DeliverySection';
import { CartDrawer } from './components/CartDrawer';
import { ServicesSection } from './components/ServicesSection';
import { FeedbackSection } from './components/FeedbackSection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);

  // Cart operations
  const addToCart = (item: MenuItem, quantity: number = 1, instructions?: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === item.id 
          ? { ...i, quantity: i.quantity + quantity, specialInstructions: instructions || i.specialInstructions } 
          : i
        );
      }
      return [...prev, { menuItem: item, quantity, specialInstructions: instructions }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.menuItem.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.menuItem.id !== itemId));
  };

  const clearCart = () => setCartItems([]);

  const handlePlaceDeliveryOrder = (customer: { name: string; phone: string; address: string; notes?: string }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const deliveryFee = 15;
    const tax = Math.round(subtotal * 0.08);

    const order: DeliveryOrder = {
      id: `ord-${Date.now()}`,
      orderCode: `AURA-DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems,
      subtotal,
      deliveryFee,
      tax,
      total: subtotal + deliveryFee + tax,
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes,
      status: 'received',
      estimatedMinutes: 35,
      createdAt: new Date().toLocaleTimeString()
    };

    setActiveOrder(order);
    clearCart();
    setIsCartOpen(false);
    setCurrentPage('delivery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="min-h-screen bg-[#0a0806] text-stone-100 font-sans selection:bg-amber-500 selection:text-black transition-colors duration-300 overflow-x-hidden max-w-full">
        
        {/* Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cartCount={totalCartCount}
          openCart={() => setIsCartOpen(true)}
          openReservationModal={() => setIsReservationModalOpen(true)}
        />

        {/* Main Page Content Router */}
        <main className="transition-all duration-500">
          {currentPage === 'home' && (
            <>
              <Hero
                setCurrentPage={setCurrentPage}
                openReservationModal={() => setIsReservationModalOpen(true)}
              />
              <MenuSection
                addToCart={addToCart}
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
              <GallerySection
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
              <OnSiteExperience
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
              <FeedbackSection />
            </>
          )}

          {currentPage === 'menu' && (
            <div className="pt-24">
              <MenuSection
                addToCart={addToCart}
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {currentPage === 'gallery' && (
            <div className="pt-24">
              <GallerySection
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {currentPage === 'reservation' && (
            <div className="pt-24">
              <ReservationSection />
            </div>
          )}

          {currentPage === 'onsite' && (
            <div className="pt-24">
              <OnSiteExperience
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {currentPage === 'delivery' && (
            <div className="pt-24">
              <DeliverySection
                activeOrder={activeOrder}
                addToCart={addToCart}
                openCart={() => setIsCartOpen(true)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {currentPage === 'services' && (
            <div className="pt-24">
              <ServicesSection
                openReservationModal={() => setIsReservationModalOpen(true)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {currentPage === 'feedback' && (
            <div className="pt-24">
              <FeedbackSection />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer setCurrentPage={setCurrentPage} />

        {/* Delivery Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onPlaceOrder={handlePlaceDeliveryOrder}
        />

        {/* Global Reservation Modal */}
        {isReservationModalOpen && (
          <ReservationSection
            isModal={true}
            onCloseModal={() => setIsReservationModalOpen(false)}
          />
        )}

      </div>
    </ThemeProvider>
  );
}
