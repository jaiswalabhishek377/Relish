# Relish App - Architecture & How It Works

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [App Entry Point](#app-entry-point)
4. [Routes Explained](#routes-explained)
5. [State Management](#state-management)
6. [How Food Items Are Displayed](#how-food-items-are-displayed)
7. [Hooks Used](#hooks-used)
8. [Step-by-Step Data Flow](#step-by-step-data-flow)

---

## 🎯 Project Overview

**Relish** is a food ordering web application built with **React + Vite**. It allows users to:
- Browse different food categories
- View food items with details (name, price, description)
- Filter food by category
- Navigate between Home, Cart, and Order pages (structure ready for future features)

**Tech Stack:**
- React 19.2.4
- React Router DOM 7.14.1 (for navigation)
- Context API (for state management)
- Vite (bundler)
- CSS for styling

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── assets/              # Images & data
│   │   ├── assets.js        # Images imports & food_list data
│   │   ├── food_1.png to food_32.png
│   │   └── menu_1.png to menu_8.png
│   │
│   ├── components/          # Reusable components
│   │   ├── Navbar/          # Navigation bar
│   │   ├── Header/          # Hero section
│   │   ├── ExploreMenu/     # Category filter menu
│   │   ├── FoodDisplay/     # Lists all food items
│   │   └── Fooditem/        # Individual food card
│   │
│   ├── pages/               # Full page components
│   │   ├── Home/            # Main home page
│   │   ├── Cart/            # Shopping cart (in progress)
│   │   └── PlaceOrder/      # Order placement (in progress)
│   │
│   ├── context/             # State management
│   │   └── storecontext.jsx # Global context for food data
│   │
│   ├── App.jsx              # Main app component with routes
│   ├── main.jsx             # Entry point with providers
│   └── index.css            # Global styles
│
└── index.html               # HTML template
```

---

## 🚀 App Entry Point

### **main.jsx** - The Starting Point
```javascript
// Order of providers (inside-out):
1. BrowserRouter      - Enables React Router for navigation
   ↓
2. StoreContextProvider - Provides global food_list data
   ↓
3. App Component      - Main app with routes
```

**Flow:** User visits app → BrowserRouter wraps it → StoreContextProvider wraps it → App component renders

---

## 🗺️ Routes Explained

**Routes are defined in App.jsx:**

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Main page showing all food items |
| `/cart` | Cart | Shopping cart (UI ready, logic pending) |
| `/order` | PlaceOrder | Order confirmation page (UI ready, logic pending) |

**Navigation:** The Navbar component has links to these routes (currently basic menu state).

---

## 🎛️ State Management

### **Context API - storecontext.jsx**

```javascript
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {
        food_list  // Array of all food items
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
```

**What it does:**
- Creates a global context to store food data
- Wraps the entire app so any component can access `food_list`
- No need to pass data through props (avoids prop drilling)

**Data Source:** `food_list` comes from `assets.js` and contains:
```javascript
[
    {
        _id: "1",
        name: "Greek salad",
        image: food_1,
        price: 12,
        description: "Food provides essential nutrients...",
        category: "Salad"
    },
    // ... more items
]
```

---

## 🍽️ How Food Items Are Displayed

### **Step-by-Step Flow:**

#### **Step 1: Home Page (pages/Home/home.jsx)**
```javascript
const [category, setCategory] = useState("All");
return (
    <Header />                                    // Hero banner
    <Exploremenu category={category} setCategory={setCategory} />  // Category buttons
    <FoodDisplay category={category} />           // Food list
)
```
**What happens:** State `category` is created and passed down to child components.

---

#### **Step 2: Explore Menu (components/ExploreMenu/exploremenu.jsx)**
```javascript
// Shows menu categories (Salad, Rolls, Deserts, etc.)
menu_list.map((item) => (
    <div onClick={() => setCategory(prev => 
        prev === item.menu_name ? "All" : item.menu_name
    )}>
        {item.menu_image} {item.menu_name}
    </div>
))
```
**What happens:** 
- User clicks a category button
- `setCategory` updates the category state
- Clicking same button again resets to "All"

---

#### **Step 3: Food Display (components/FoodDisplay/fooddisplay.jsx)**
```javascript
const { food_list } = useContext(StoreContext);  // Get data from context

food_list.map((item) => (
    <FoodItem 
        key={item._id} 
        _id={item._id}
        name={item.name} 
        price={item.price} 
        description={item.description} 
        image={item.image}
    />
))
```
**What happens:**
- Component gets `food_list` from global context
- Loops through each food item
- Passes data to individual `FoodItem` component
- `key={item._id}` is React optimization (unique identifier)

---

#### **Step 4: Food Item Card (components/Fooditem/fooditem.jsx)**
```javascript
const FoodItem = ({ _id, name, price, description, image }) => (
    <div className="food-item">
        <img src={image} alt={name} />           // Food image
        <div className="food-item-rating">
            <p>{name}</p>                         // Food name
            <img src={assets.rating_starts} />    // Rating stars
        </div>
        <p>{description}</p>                      // Description
        <p className="food-item-price">${price}</p>  // Price
    </div>
)
```
**What happens:**
- Receives props from FoodDisplay
- Renders a single food card with image, name, rating, description, and price
- This component is reusable for each food item

---

## 🎣 Hooks Used

### **1. useState() - Local State Management**

**In Navbar:**
```javascript
const [menu, setMenu] = useState("home");
// Tracks which nav menu item is active
```

**In Home Page:**
```javascript
const [category, setCategory] = useState("All");
// Tracks selected food category
```

**Purpose:** These hooks manage UI state that doesn't need to be global.

---

### **2. useContext() - Access Global State**

**In FoodDisplay:**
```javascript
const { food_list } = useContext(StoreContext);
// Gets food_list from global context instead of props
```

**Purpose:** Avoid passing `food_list` through every component (prop drilling). Any component can access it directly.

---

## 📊 Step-by-Step Data Flow

```
1. App Starts
   ↓
2. main.jsx wraps app with BrowserRouter + StoreContextProvider
   ↓
3. User loads Home page (/)
   ↓
4. Home component initializes:
   - Creates category state (default: "All")
   - Renders Header (hero banner)
   - Renders ExploreMenu with category & setCategory
   - Renders FoodDisplay with category
   ↓
5. User clicks a category (e.g., "Salad")
   ↓
6. ExploreMenu's onClick calls setCategory("Salad")
   ↓
7. Home re-renders, category state changes
   ↓
8. FoodDisplay re-renders:
   - Gets updated category prop
   - Gets food_list from StoreContext using useContext()
   - Maps through food_list
   - Creates FoodItem components only for items in "Salad" category
   ↓
9. Each FoodItem displays food card with props
   ↓
10. User sees filtered food items
```

---

## 🔄 Connection Between Folders

### **assets/** → **components/** → **pages/** Flow

```
assets/assets.js
├── Exports: food_list, menu_list, images
│
└─→ context/storecontext.jsx
    ├── Wraps food_list in global context
    │
    └─→ pages/Home/home.jsx
        ├── Uses useState for category
        │
        ├─→ Header (displays hero)
        ├─→ ExploreMenu (gets category + setCategory)
        │   └─→ Updates category state
        └─→ FoodDisplay (gets category)
            ├── Gets food_list from useContext(StoreContext)
            ├── Filters/displays items
            │
            └─→ FoodItem (receives props)
                └─→ Displays individual food card
```

---

## 📝 Component Props Flow

```
FoodDisplay
├── Props received: category
├── Context accessed: food_list
└── Props passed to FoodItem:
    ├── _id
    ├── name
    ├── price
    ├── description
    └── image

FoodItem
├── Props received: _id, name, price, description, image
└── Displays: All of the above
```

---

## 🎨 Currently Built vs To-Do

### ✅ Built:
- Home page with food display
- Category filtering (Explore Menu)
- Responsive food item cards
- Navigation bar structure
- Routes setup

### ⏳ To-Do (Structure Ready):
- Cart page functionality (add/remove items)
- Order placement logic
- Cart context state (cart items, totals)
- Search functionality in navbar
- Sign in / User authentication

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📌 Key Takeaways

1. **Context API** solves prop drilling - all components access `food_list` globally
2. **useState** manages local UI state (category, menu selection)
3. **map()** renders lists of components dynamically
4. **Props** pass data down to child components (FoodItem)
5. **React Router** handles page navigation (/, /cart, /order)
6. **Components** are modular and reusable (FoodItem used multiple times)

---

*Last Updated: April 2026*
