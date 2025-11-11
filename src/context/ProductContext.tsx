// src/context/ProductContext.tsx

import { createContext, useContext, type ReactNode, useReducer } from "react";
import {
  type ProductState,
  type ProductAction,
  initialProductState,
} from "../types/types";

// Reducer function - Handles how the product state changes in response to dispatched actions
const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    // Update the list of products in state
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    // Update the selected category in state
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    // Catch any unsupported actions to avoid silent errors
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context type - Defines the shape of the data and methods available via the context
interface ProductContextType extends ProductState {
  // Allows components to send actions to the reducer
  dispatch: React.Dispatch<ProductAction>;
}

// Create context - Initialize the context with an undefined default value ( will be provided by the ProductProvider)
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Context Provider Component - Wraps part of the React tree and provides product-related state and actions to it
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // useReducer initializes state and gives a dispatch function to trigger updates
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  // Pass the state and dispatch function down via context
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook - Provides easy access to the context values (state + dispatch) &
// ensures that its only used within a ProductProvider
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);

  // Throw an error if this hook is used outside of the provider
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }

  // Return the context data for use in components
  return context;
};
