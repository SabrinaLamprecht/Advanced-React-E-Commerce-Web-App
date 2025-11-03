// src/types/types.ts

// Define the structure of a single product
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Type alias for category (simple string)
export type Category = string;

// Context-related types (used in ProductContext)
// --------------------------------------------------

// Define the allowed actions for the ProductContext reducer
// Each action type describes what change should occur in the product state
export type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] } // Replace all products with new data
  | { type: "SET_SELECTED_CATEGORY"; payload: string }; // Set or clear the selected category

// Define the shape of the ProductContext state
export interface ProductState {
  products: Product[]; // List of all available products
  selectedCategory: string; // Currently selected product category for filtering
}

// Define the initial default state for ProductContext
export const initialProductState: ProductState = {
  products: [], // Start with an empty product list
  selectedCategory: "", // No category selected by default
};
