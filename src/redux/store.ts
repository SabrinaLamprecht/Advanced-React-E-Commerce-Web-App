// src/redux/store.ts

// Imports
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Create and configure the Redux store - The store holds the entire state tree of the app and
// connects all slices together
export const store = configureStore({
  // The reducer object defines all slices of global state.
  // Each key (e.g., "cart") becomes a field in the overall Redux state.
  reducer: {
    // Assign the cart reducer to the "cart" part of the state
    cart: cartReducer,
  },
});

//  Define TypeScript helper types for strong typing in components
// RootState → Represents the full shape of the Redux store’s state
// It uses `ReturnType` to infer the type returned by store.getState()
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch → Represents the type of the store's dispatch function
// This allows dispatch to recognize all valid action types (from slices)
export type AppDispatch = typeof store.dispatch;
