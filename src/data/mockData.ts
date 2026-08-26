import { MenuItem, GalleryItem, SeatingArea, Review } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Royal Thalis / Tasting Flights
  {
    id: 'm1',
    name: "Royal Sonar Maharaja Thali",
    subtitle: "32-Course Imperial Royal Feast with 24k Gold Vark",
    category: 'tasting',
    price: 1850,
    description: "The ultimate crown jewel of Sonar Thali. A silver platter arraying 24k gold-leafed Shahi Paneer, 36-hour Dal Makhani, Zafrani Pulao, Truffle Butter Naan, Smoked Galouti Kebab, Kashmiri Dum Aloo, Saffron Kheer, and Royal Paan.",
    ingredients: ["24k Gold Vark", "Aged Basmati Rice", "Kashmiri Saffron", "A2 Desi Ghee", "Black Winter Truffle", "Royal Spices"],
    dietary: ['chef-signature'],
    pairing: "Royal Saffron Masala Elixir or Aged Amarone",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000",
    calories: 1250,
    preparationTime: "Royal Sequence (60 mins)",
    isChefSpecial: true
  },
  {
    id: 'm2',
    name: "Sonar Maharani Heritage Thali",
    subtitle: "Grand 24-Item Pure Vegetarian & Sattvic Feast",
    category: 'tasting',
    price: 1450,
    description: "An authentic royal vegetarian banquet featuring Rajasthani Ker Sangri, Paneer Kesar Pasanda, Smoked Baingan Bharta, Churma Ladoo, Puran Poli, and saffron-infused Thandai.",
    ingredients: ["Fresh Artisanal Paneer", "Kashmiri Saffron", "A2 Desi Ghee", "Pistachio Dust", "Organic Lentils"],
    dietary: ['vegetarian', 'chef-signature'],
    pairing: "Chilled Zafrani Badam Milk or Vintage Riesling",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000",
    calories: 980,
    isChefSpecial: true
  },
  {
    id: 'm3',
    name: "Awadhi Royal Shahi Feast",
    subtitle: "Imperial Non-Veg Tasting Odyssey",
    category: 'tasting',
    price: 2200,
    description: "Slow-cooked Awadhi delicacies including Raan-e-Sonar, Smoked Galouti, Murgh Musallam, Lobster Malabar, Zafrani Biryani, and Shahi Tukda.",
    ingredients: ["Grass-fed Mutton", "Jumbo Bay Lobster", "Mace & Nutmeg", "Rose Water", "Silver Vark"],
    dietary: ['chef-signature', 'nut-free'],
    pairing: "2016 Châteauneuf-du-Pape",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000",
    calories: 1350,
    isChefSpecial: true
  },

  // Royal Starters & Kebabs
  {
    id: 'm4',
    name: "Smoked Awadhi Galouti Kebabs",
    subtitle: "Melt-in-Mouth Lamb & Saffron Sheermal",
    category: 'starters',
    price: 750,
    description: "Minced grass-fed lamb infused with 160 royal spices, smoked with cloves over charcoal embers, served over golden saffron Sheermal bread.",
    ingredients: ["Grass-fed Lamb", "160 Secret Spices", "Clove Smoke", "Saffron Sheermal", "Mint Chutney"],
    dietary: ['chef-signature', 'nut-free'],
    pairing: "2020 Syrah Rhone Valley",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1000",
    calories: 420
  },
  {
    id: 'm5',
    name: "Charcoal Gold Paneer Tikka",
    subtitle: "Organic Cottage Cheese & Kashmiri Red Chili",
    category: 'starters',
    price: 650,
    description: "Thick slabs of house-made A2 cottage cheese marinated in hung curd, Kashmiri chili, mustard oil, and edible gold dust, charred in clay tandoor.",
    ingredients: ["A2 Organic Paneer", "Kashmiri Red Chili", "Mustard Oil", "Hung Curd", "24k Gold Dust"],
    dietary: ['vegetarian', 'gluten-free'],
    pairing: "2021 Sauvignon Blanc Marlborough",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1000",
    calories: 360
  },
  {
    id: 'm6',
    name: "Truffle Saffron Dahi Puri Spheres",
    subtitle: "Molecular Gastronomy Street Artistry",
    category: 'starters',
    price: 550,
    description: "Crisp semolina spheres filled with spiced potato mash, sweet yogurt foam, black truffle pearls, tamarind glaze, and mint air.",
    ingredients: ["Crispy Puris", "Truffle Pearls", "Sweet Yogurt Foam", "Tamarind Glaze", "Pomegranate"],
    dietary: ['vegetarian'],
    pairing: "Sparkling Prosecco Superiore",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000",
    calories: 280
  },

  // Imperial Mains
  {
    id: 'm7',
    name: "Maharani 36-Hour Truffle Dal Makhani",
    subtitle: "Slow-Simmered Black Lentils & Truffle Ghee",
    category: 'mains',
    price: 680,
    description: "Black urad lentils slow-cooked overnight over glowing cow dung charcoal embers with white butter, vine tomatoes, and finished with black truffle ghee.",
    ingredients: ["Black Urad Lentils", "White Cultured Butter", "Black Truffle Ghee", "Vine Tomatoes", "Kashmiri Fenugreek"],
    dietary: ['vegetarian', 'gluten-free', 'chef-signature'],
    pairing: "Garlic Truffle Naan",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000",
    calories: 480,
    isChefSpecial: true
  },
  {
    id: 'm8',
    name: "Zafrani Lobster Malabar Curry",
    subtitle: "Jumbo Bay Lobster & Coconut Mustard Velvet",
    category: 'mains',
    price: 1250,
    description: "Pan-seared jumbo lobster tail simmered in a silky coastal sauce of fresh coconut milk, raw mango, mustard seeds, curry leaves, and saffron.",
    ingredients: ["Jumbo Bay Lobster", "Fresh Coconut Milk", "Mustard Seeds", "Curry Leaves", "Raw Mango"],
    dietary: ['gluten-free', 'nut-free'],
    pairing: "2020 Chablis Premier Cru",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000",
    calories: 520
  },
  {
    id: 'm9',
    name: "Dum Pukht Lucknowi Biryani",
    subtitle: "Sealed Clay Pot Goat Biryani with Mace & Rose",
    category: 'mains',
    price: 850,
    description: "Aged long-grain Basmati rice layered with tender goat meat, saffron milk, caramelized onions, and attam-sealed dough cooked under slow steam.",
    ingredients: ["Aged Basmati Rice", "Tender Goat Meat", "Kashmiri Saffron", "Rose & Kewra Essence", "Crisp Shallots"],
    dietary: ['chef-signature', 'nut-free'],
    pairing: "Pomegranate Mint Raita & Mirchi Salan",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=1000",
    calories: 780
  },

  // Royal Desserts
  {
    id: 'm10',
    name: "Shahi Gold Tukda & Zafrani Kulfi",
    subtitle: "Crispy Ghee Brioche, Rabri & 24k Gold Leaf",
    category: 'desserts',
    price: 480,
    description: "Golden fried brioche soaked in cardamom saffron syrup, topped with thick reduced pistachios rabri, artisanal saffron kulfi, and 24k gold leaf.",
    ingredients: ["Ghee Brioche", "Saffron Rabri", "Pistachio Kulfi", "Silver & Gold Leaf", "Cardamom"],
    dietary: ['vegetarian', 'chef-signature'],
    pairing: "Warm Cardamom Masala Chai",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000",
    calories: 510,
    isChefSpecial: true
  },
  {
    id: 'm11',
    name: "Royal Alphonso Mango Saffron Kheer",
    subtitle: "Slow-Simmered Rice Pudding & Silver Pearls",
    category: 'desserts',
    price: 420,
    description: "Creamy slow-simmered basmati rice pudding infused with Alphonso mango pulp, green cardamom, toasted slivered almonds, and silver pearls.",
    ingredients: ["Alphonso Mango", "A2 Whole Milk", "Basmati Rice", "Green Cardamom", "Slivered Pistachio"],
    dietary: ['vegetarian', 'gluten-free'],
    pairing: "Royal Rose Lassi",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1000",
    calories: 340
  },

  // Artisanal Drinks & Cocktails
  {
    id: 'm12',
    name: "Sonar Golden Zafrani Elixir",
    subtitle: "Saffron Gin, Rose Water & Gold Vapor",
    category: 'cocktails',
    price: 580,
    description: "Artisanal London Dry Gin infused with Kashmiri saffron, organic rose hydrosol, fresh cardamom citrus, topped with edible gold leaf and cardamom smoke.",
    ingredients: ["Kashmiri Saffron Gin", "Organic Rose Hydrosol", "Cardamom Citrus", "Edible Gold Dust"],
    dietary: ['vegan', 'gluten-free', 'chef-signature'],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000",
    isChefSpecial: true
  },
  {
    id: 'm13',
    name: "Royal Smoked Cardamom Old Fashioned",
    subtitle: "Single Malt Bourbon & Star Anise Bitters",
    category: 'cocktails',
    price: 650,
    description: "18-Year Single Malt, house smoked cardamom syrup, aromatic star anise bitters, poured over a hand-carved ice sphere with edible silver leaf.",
    ingredients: ["18-Yr Single Malt", "Smoked Cardamom", "Star Anise Bitters", "Ice Crystal Sphere"],
    dietary: ['gluten-free'],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: "The Maharaja Thali Platter",
    subtitle: "32-Course Imperial Royal Presentation",
    category: 'plating',
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000",
    description: "Each dish in the Sonar Thali is served in handcrafted solid brass and silver bowls (katoris), maintaining perfect heat and regal aesthetics.",
    flavorNotes: ["Saffron Richness", "Charcoal Smoke", "Creamy Makhani", "Aromatic Spices"],
    pairingRecommendation: "Royal Zafrani Thandai or Aged Amarone",
    originStory: "Inspired by the royal banquets of Rajasthani Maharanis and Awadhi Nawabs."
  },
  {
    id: 'g2',
    title: "Smoked Galouti Kebab Art",
    subtitle: "Saffron Sheermal & Clove Smoke",
    category: 'plating',
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1000",
    description: "Our kebabs are smoked over live applewood embers and cloves before being presented on warm hand-pressed saffron breads.",
    flavorNotes: ["Melts in Mouth", "Nutmeg & Mace", "Subtle Clove Smoke", "Silky Texture"],
    pairingRecommendation: "2020 Syrah Rhone Valley"
  },
  {
    id: 'g3',
    title: "The Royal Durbar Dining Hall",
    subtitle: "Golden Archways & Crystal Chandeliers",
    category: 'atmosphere',
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    description: "Carved teakwood, velvet seating, hand-painted royal murals, and golden warm lighting create an grand palace atmosphere.",
    flavorNotes: ["Palatial Luxury", "Acoustic Elegance", "Warm Amber Glow"]
  },
  {
    id: 'g4',
    title: "Tandoori Charcoal Masterwork",
    subtitle: "Clay Oven Embers & Fresh Naan",
    category: 'chef',
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000",
    description: "Master Tandoor Chef Birender Singh slapping fresh garlic truffle naan dough onto clay oven walls at 900°F.",
    flavorNotes: ["Crispy Naan Crust", "Charred Garlic", "Smoked Ghee Aroma"]
  },
  {
    id: 'g5',
    title: "Shahi Gold Tukda Presentation",
    subtitle: "24k Gold Leaf & Pistachio Rabri",
    category: 'plating',
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000",
    description: "Warm saffron-soaked brioche crowned with reduced pistachios and gold leaf leafing.",
    flavorNotes: ["Crisp & Creamy", "Pure Saffron", "Rich Pistachio"],
    pairingRecommendation: "Royal Cardamom Chai"
  },
  {
    id: 'g6',
    title: "Sheesh Mahal Private Vault",
    subtitle: "Mirror-Inlaid Private Palace Chamber",
    category: 'atmosphere',
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000",
    description: "A private dining sanctuary inspired by the Palace of Mirrors, accommodating up to 16 guests for royal thali tasting banquets.",
    flavorNotes: ["Private Attendants", "Dedicated Butler", "Regal Seclusion"]
  }
];

export const SEATING_AREAS: SeatingArea[] = [
  {
    id: 's1',
    name: "The Royal Durbar Hall",
    description: "Grand dining hall with carved teakwood pillars, plush velvet royal thrones, and golden amber chandeliers.",
    capacity: "2 - 8 Guests per Table",
    vibe: "Palatial & Majestic",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    availableSlots: 10
  },
  {
    id: 's2',
    name: "Sheesh Mahal Mirror Chamber",
    description: "Handcrafted mirror-work sanctuary featuring private butler service and customized royal thali pairings.",
    capacity: "6 - 16 Guests",
    vibe: "Ultra-Exclusive & Regal",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    availableSlots: 3
  },
  {
    id: 's3',
    name: "Live Tandoor & Chaat Counter",
    description: "Front-row seats directly observing master chefs crafting truffle puris, charcoal kebabs, and hot naan live.",
    capacity: "1 - 4 Guests per Seat",
    vibe: "Interactive & High Energy",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    availableSlots: 6
  },
  {
    id: 's4',
    name: "Maharani Courtyard Garden",
    description: "Open-air garden atrium surrounded by royal marigold flowers, soft sitar music, and water fountains.",
    capacity: "2 - 8 Guests",
    vibe: "Serene, Romantic & Atmospheric",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=800",
    availableSlots: 8
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    guestName: "Maharaja Samarjit Singh",
    rating: 5,
    visitType: "Chef's Table",
    favoriteDish: "Royal Sonar Maharaja Thali",
    moodTags: ["Flawless Hospitality", "Authentic Royal Flavors", "24k Gold Perfection"],
    comment: "Sonar Thali brings back the lost grandeur of royal palace banquets. The 32-course Maharaja Thali with the 36-hour Truffle Dal Makhani and Gold Shahi Paneer is utterly unmatchable in the fine dining world.",
    date: "1 day ago",
    likes: 38
  },
  {
    id: 'r2',
    guestName: "Priya Sharma",
    rating: 5,
    visitType: "On-Site Dining",
    favoriteDish: "Sonar Golden Zafrani Elixir",
    moodTags: ["Mesmerizing Atmosphere", "Live Sitar Music", "Melt-in-Mouth Kebabs"],
    comment: "The Sheesh Mahal dining chamber is breathtaking. The Awadhi Galouti kebabs melt instantly, and the saffron cocktail topped with gold cloud smoke made our wedding anniversary unforgettable.",
    date: "4 days ago",
    likes: 29
  },
  {
    id: 'r3',
    guestName: "Vikramaditya Roy",
    rating: 5,
    visitType: "Gourmet Delivery",
    favoriteDish: "Maharani 36-Hour Truffle Dal Makhani",
    moodTags: ["Royal Brass Box Packaging", "Hot & Fresh", "Palace Experience at Home"],
    comment: "Insulated brass thali box delivery arrived piping hot with fresh garlic truffle naans and saffron pulao. The quality is 100% Michelin standard right at home.",
    date: "Just now",
    likes: 19
  }
];

