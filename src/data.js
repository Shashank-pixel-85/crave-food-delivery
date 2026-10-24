export const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Burgers", emoji: "🍔" },
  { name: "Asian", emoji: "🍜" },
  { name: "Healthy", emoji: "🥗" },
  { name: "Desserts", emoji: "🍰" },
];

export const restaurants = [
  {
    id: 1,
    name: "Olive & Ember",
    cuisine: "Italian · Pizza · Pasta",
    rating: 4.8,
    time: "20–30 min",
    fee: 29,
    offer: "20% OFF",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    description: "Wood-fired favourites, fresh ingredients, and a little Italian sunshine."
  },
  {
    id: 2,
    name: "Burger District",
    cuisine: "Burgers · American",
    rating: 4.7,
    time: "15–25 min",
    fee: 19,
    offer: "FREE DELIVERY",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    description: "Smash burgers, crispy fries, and seriously good sauces."
  },
  {
    id: 3,
    name: "Miso Happy",
    cuisine: "Japanese · Asian · Ramen",
    rating: 4.9,
    time: "25–35 min",
    fee: 25,
    offer: "₹100 OFF",
    category: "Asian",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
    description: "Comforting bowls, bright flavours, and handcrafted Asian classics."
  },
  {
    id: 4,
    name: "Green Ritual",
    cuisine: "Healthy · Salads · Bowls",
    rating: 4.6,
    time: "15–25 min",
    fee: 15,
    offer: "15% OFF",
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    description: "Fresh bowls and feel-good meals made with seasonal produce."
  },
  {
    id: 5,
    name: "Sweet Theory",
    cuisine: "Desserts · Bakery · Coffee",
    rating: 4.8,
    time: "20–30 min",
    fee: 20,
    offer: "BUY 1 GET 1",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    description: "Little treats, big smiles — cakes, cookies, and more."
  },
  {
    id: 6,
    name: "Slice Society",
    cuisine: "Pizza · Italian",
    rating: 4.5,
    time: "20–30 min",
    fee: 0,
    offer: "FREE DELIVERY",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    description: "Big slices, bubbling cheese, and easy-going neighbourhood vibes."
  }
];

export const menuItems = [
  { id: 101, restaurantId: 1, name: "Margherita Pizza", description: "Tomato, mozzarella, basil, extra virgin olive oil.", price: 249, category: "Pizza", emoji: "🍕", popular: true },
  { id: 102, restaurantId: 1, name: "Truffle Mushroom Pizza", description: "Roasted mushrooms, truffle cream, mozzarella.", price: 349, category: "Pizza", emoji: "🍕", popular: true },
  { id: 103, restaurantId: 1, name: "Creamy Pesto Pasta", description: "Basil pesto, parmesan, cherry tomatoes.", price: 289, category: "Pasta", emoji: "🍝" },
  { id: 201, restaurantId: 2, name: "District Smash Burger", description: "Double patty, cheddar, pickles, house sauce.", price: 279, category: "Burgers", emoji: "🍔", popular: true },
  { id: 202, restaurantId: 2, name: "Crispy Chicken Burger", description: "Crunchy chicken, slaw, spicy mayo.", price: 259, category: "Burgers", emoji: "🍔" },
  { id: 203, restaurantId: 2, name: "Loaded Fries", description: "Golden fries, cheese sauce, spring onion.", price: 149, category: "Sides", emoji: "🍟" },
  { id: 301, restaurantId: 3, name: "Tonkotsu Ramen", description: "Rich broth, noodles, egg, spring onion.", price: 329, category: "Ramen", emoji: "🍜", popular: true },
  { id: 302, restaurantId: 3, name: "Crispy Veg Gyoza", description: "Pan-fried dumplings with sesame dip.", price: 189, category: "Sides", emoji: "🥟" },
  { id: 401, restaurantId: 4, name: "Avocado Power Bowl", description: "Avocado, quinoa, chickpeas, greens.", price: 299, category: "Bowls", emoji: "🥗", popular: true },
  { id: 402, restaurantId: 4, name: "Rainbow Crunch Salad", description: "Cabbage, carrot, cucumber, citrus dressing.", price: 229, category: "Salads", emoji: "🥬" },
  { id: 501, restaurantId: 5, name: "Chocolate Fudge Cake", description: "Rich chocolate sponge and silky ganache.", price: 199, category: "Cakes", emoji: "🍰", popular: true },
  { id: 502, restaurantId: 5, name: "Cookie Box", description: "Four warm cookies with chocolate chunks.", price: 179, category: "Bakery", emoji: "🍪" },
  { id: 601, restaurantId: 6, name: "Pepperoni Slice Box", description: "Four generous slices, mozzarella, pepperoni.", price: 319, category: "Pizza", emoji: "🍕", popular: true },
  { id: 602, restaurantId: 6, name: "Garlic Knots", description: "Soft baked knots, garlic butter, herbs.", price: 129, category: "Sides", emoji: "🥖" }
];
