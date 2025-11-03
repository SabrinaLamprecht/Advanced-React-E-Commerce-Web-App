// src/App.tsx

// Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ShoppingCart from "./pages/ShoppingCart";

// Define the main App component
function App() {
  // Initialize a React Query client for caching and managing server state
  const client = new QueryClient();

  return (
    // Redux Provider: Provides global state (cart) to all components
    <Provider store={store}>
      {/* --------------------------
          React Query Provider: Allows useQuery and useMutation hooks
          throughout the app for server data fetching
      -------------------------- */}
      <QueryClientProvider client={client}>
        {/* --------------------------
            ProductContext Provider: Provides product state and dispatch
            functions to components using the custom useProductContext hook
        -------------------------- */}
        <ProductProvider>
          {/* --------------------------
              BrowserRouter: Enables routing for the app
          -------------------------- */}
          <BrowserRouter>
            {/* --------------------------
                Define all routes for the app
            -------------------------- */}
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </QueryClientProvider>
    </Provider>
  );
}

// Export the App component as default
export default App;
