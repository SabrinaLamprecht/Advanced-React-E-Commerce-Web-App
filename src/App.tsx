// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ShoppingCart from "./pages/ShoppingCart";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import OrderDetails from "./pages/OrderDetails";
import OrderHistory from "./pages/OrderHistory";
import AdminProductManager from "./pages/AdminProductManager";

function App() {
  const client = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ProductProvider>
          <AuthProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} />
                <Route path="/admin" element={<AdminProductManager />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ProductProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
