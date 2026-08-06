# 🛒 Relish — Frontend Customer Web App

The client-side web application for **Relish**, built using **React 19** and **Vite**.

## 🚀 Key Features

- **Dynamic Hero & Explore Menu**: Smooth category filters for Salads, Rolls, Desserts, Pasta, Veg, Cake, Noodles, etc.
- **Instant Dish Search**: Real-time keyword filter across food catalog names and descriptions.
- **Cart Management**: Add/remove items with dynamic total calculation and persistent local storage sync.
- **User Authentication Modal**: Sign In & Sign Up popup with JWT token persistence.
- **Stripe Checkout Integration**: Seamless payment session generation & address submission.
- **Order Tracking ("My Orders")**: Track live delivery progress (Food Processing -> Out for delivery -> Delivered).
- **About Us & Feature Highlights**: Brand mission story, impact counters, and value pillars.

## 📁 Component Overview

- `src/components/Navbar/`: Navigation bar with search bar toggle, active section tracking, cart item badge, and profile dropdown.
- `src/components/Header/`: Hero banner with visual tagline and quick menu CTA.
- `src/components/ExploreMenu/`: Interactive category selector.
- `src/components/FoodDisplay/`: Responsive catalog grid with search and category filtering.
- `src/components/Fooditem/`: Food item card with quantity controls (+/-) and pricing.
- `src/components/AboutUs/`: Showcase component highlighting Relish mission and stats.
- `src/components/WhyUs/`: Feature cards highlighting fast delivery, quality, and payment security.
- `src/components/Loginpopup/`: Auth modal dialog.
- `src/context/storecontext.jsx`: React Context API provider for global state management.

## 💻 Development & Scripts

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build

# Preview build
npm run preview
```
