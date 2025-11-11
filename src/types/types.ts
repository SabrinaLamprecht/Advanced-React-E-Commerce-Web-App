// src/types/types.ts

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
};

export type OrderItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  count: number;
};

export type Order = {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt?: any;
  status?: string;
};

// Type alias for category (simple string)
export type Category = string;

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
