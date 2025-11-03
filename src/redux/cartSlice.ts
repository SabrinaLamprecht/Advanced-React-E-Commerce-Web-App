// src/redux/cartSlice.ts

// Imports
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the structure of each item stored in the cart
export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  count: number;
};

// Helper function: Load cart data from sessionStorage (if it exists)
const loadFromSession = (): CartItem[] => {
  try {
    const raw = sessionStorage.getItem("cart");
    // If there's no cart data in sessionStorage, return an empty array
    if (!raw) return [];
    // Otherwise, parse and return the stored JSON
    return JSON.parse(raw) as CartItem[];
  } catch {
    // If parsing fails or something goes wrong, return an empty array
    return [];
  }
};

// Define the initial state of the cart - Loads existing items from session storage (persistent cart data)
const initialState: { items: CartItem[] } = {
  items: loadFromSession(),
};

// Create a Redux slice for managing cart state - The slice includes actions (reducers) for
// adding, removing, updating, and clearing cart items
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart
    addToCart(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        image: string;
        price: number;
      }>
    ) {
      const { id, title, image, price } = action.payload;

      // Check if the item already exists in the cart
      const existing = state.items.find((i) => i.id === id);

      if (existing) {
        // If it exists, increase the count by 1
        existing.count += 1;
      } else {
        // Otherwise, add a new item with count = 1
        state.items.push({ id, title, image, price, count: 1 });
      }
      // Save updated cart state to sessionStorage (so it persists on reload)
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Remove a product from the cart
    removeFromCart(state, action: PayloadAction<number>) {
      // Filter out the item matching the given ID
      state.items = state.items.filter((i) => i.id !== action.payload);
      // Update sessionStorage with the new cart data
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Update the quantity (count) of a specific product
    updateCount(state, action: PayloadAction<{ id: number; count: number }>) {
      // Find the matching item
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        // Ensure count is at least 1 (no zero or negative quantities)
        item.count = Math.max(1, action.payload.count);
        // Save changes to sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // Clear all items from the cart
    clearCart(state) {
      // Empty the cart
      state.items = [];
      // Remove from session storage
      sessionStorage.removeItem("cart");
    },
  },
});

// Export the individual action creators for use in components
export const { addToCart, removeFromCart, updateCount, clearCart } =
  cartSlice.actions;

// Export the reducer to include it in the Redux store
export default cartSlice.reducer;
