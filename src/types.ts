export type PageView = 
  | 'home' 
  | 'menu' 
  | 'gallery' 
  | 'reservation' 
  | 'onsite' 
  | 'delivery' 
  | 'services' 
  | 'feedback';

export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'nut-free' | 'chef-signature';

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'tasting' | 'starters' | 'mains' | 'desserts' | 'cocktails' | 'wines';
  price: number;
  description: string;
  ingredients: string[];
  dietary: DietaryTag[];
  pairing?: string;
  image: string;
  calories?: number;
  preparationTime?: string;
  isChefSpecial?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'plating' | 'cocktails' | 'atmosphere' | 'chef';
  image: string;
  description: string;
  flavorNotes?: string[];
  pairingRecommendation?: string;
  originStory?: string;
}

export interface SeatingArea {
  id: string;
  name: string;
  description: string;
  capacity: string;
  vibe: string;
  image: string;
  availableSlots: number;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingAreaId: string;
  seatingAreaName: string;
  specialRequests?: string;
  occasion?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export interface Review {
  id: string;
  guestName: string;
  rating: number; // 1 to 5
  visitType: 'On-Site Dining' | 'Chef\'s Table' | 'Gourmet Delivery' | 'Private Event';
  favoriteDish: string;
  moodTags: string[];
  comment: string;
  date: string;
  likes: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface DeliveryOrder {
  id: string;
  orderCode: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  status: 'received' | 'preparing' | 'en-route' | 'delivered';
  estimatedMinutes: number;
  createdAt: string;
}
