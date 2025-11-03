Advanced React E-Commerce Web App

----- Project Overview -----
This project is an advanced e-commerce application built with React, showcasing modern front-end development practices such as React Query, Redux Toolkit, Context API, and session storage for state persistence. The app fetches product data from the FakeStoreAPI (https://fakestoreapi.com) and provides users with a fully interactive product catalog, category filtering, and a shopping cart with dynamic state management.

----- Project Features -----
This project features:

- A product catalog: Retrieves products from the FakeStoreAPI using React Query and displays each product with:

* Title
* Price
* Category
* Description
* Rating (rate and count)
* Image (with fallback for broken URLs via https://via.placeholder.com)
* Each product also includes an “Add to Cart” button

- Category navigation: Dynamically fetches all product categories from the API; Users can select a category from a dropdown to filter displayed products; Selecting a category triggers a filtered product display using React Query; Includes a Clear Filter button to reset the category selection
- Shopping cart which has state management with Redux Toolkit: Manages cart state globally using Redux; Updates are persisted in sessionStorage, ensuring cart contents remain between page reloads; Actions include:

* addToCart
* removeFromCart
* updateCount
* clearCart

- Shopping cart component: Displays all products currently in the cart; Provides controls to remove individual items and adjust quantities; Dynamically calculates and displays the total number of products in the cart and the total price of all items; Checkout simulation clears the cart state and session storage, with visual feedback to confirm completion

- Data fetching and performance:

* React Query: Efficiently fetches and caches product and category data; Handles loading and error states gracefully
* Fallback Handling: Displays a placeholder image for any product images that fail to load
* Context API: ProductContext is used to manage global product state, including the currently selected category

----- Installation Steps -----

1. Clone the repository
   git clone https://github.com/SabrinaLamprecht/Advanced-React-E-Commerce-Web-App.git
   cd Advanced-React-E-Commerce-Web-App
2. Install dependencies
   npm install
3. Run the application: npm run dev
   Open http://localhost:5173 in your browser

----- Usage -----

1. Home Page

   - Displays all products fetched from FakeStoreAPI
   - Category dropdown filters products dynamically
   - Add products to cart using the "Add to Cart" button

2. Shopping Cart
   - Accessible from the navbar cart icon
   - Adjust product quantities or remove products
   - View total price and item count
   - Checkout clears cart and provides confirmation

----- Folder Structure -----

src/
├── api/
│ └── api.ts # API functions for fetching products and categories
├── components/
│ ├── NavBar.tsx # Navigation bar with cart badge
│ ├── ProductCard.tsx # Individual product cards
├── context/
│ └── ProductContext.tsx # Context API for product state
├── pages/
│ └── Home.tsx # Home page with product catalog
│ └── ShoppingCart.tsx # Shopping cart page
├── redux/
│ ├── cartSlice.ts # Redux Toolkit slice for cart
│ └── store.ts # Redux store configuration
├── types/
│ └── types.ts # TypeScript type definitions
├── App.tsx # Main app component with routing and providers
└── main.tsx # Entry point
