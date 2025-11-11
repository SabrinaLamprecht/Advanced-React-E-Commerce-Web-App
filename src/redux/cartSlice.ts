//src/redux/cartSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  count: number;
}

interface CartState {
  items: CartItem[];
}

// Initialize cart from localStorage
const savedCart = localStorage.getItem("cartItems");
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "count">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    setCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    setItemCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const { id, count } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (isNaN(count) || count <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.count = count;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
  setCartFromStorage,
  setItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
