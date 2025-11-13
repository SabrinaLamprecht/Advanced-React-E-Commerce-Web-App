// src/__tests__/ShoppingCart.test.tsx

import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addItem } from "../redux/cartSlice";
import ShoppingCart from "../pages/ShoppingCart";

// Mock the useAuth context since ShoppingCart uses it
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: { uid: "test-user" } }),
}));

// Mock Firestore API
jest.mock("../api/api", () => ({
  createOrderInFirestore: jest.fn(),
}));

describe("ShoppingCart Integration Test", () => {
  test("updates the cart display when an item is added", async () => {
    // Integration setup - create a real Redux store; this test interaction between Redux and the UI
    const store = configureStore({
      reducer: { cart: cartReducer },
    });

    // Component rendering test - renders the full component tree with Redux provider to simulate a real app
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShoppingCart />
        </MemoryRouter>
      </Provider>
    );

    // Initial state assertion - Ensures the cart is initially empty
    expect(
      screen.getByText(/Your Shopping Cart is empty/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Total items: 0/i)).toBeInTheDocument();

    // State change simulation - Dispatch Redux action to simulate adding an item to the cart
    // This mimics user interaction
    act(() => {
      store.dispatch(
        addItem({
          id: "1",
          title: "Test Product",
          price: 19.99,
          image: "https://example.com/img.jpg",
        })
      );
    });

    // Ensure UI reflects updated cart - Confirms the UI updated in response to the Reduc state change
    // Integration between state managment and component rendering
    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();

    const prices = screen.getAllByText(/\$19\.99/);
    expect(prices.length).toBeGreaterThan(0);
    expect(prices[0]).toBeInTheDocument();

    expect(screen.getByText(/Total items: 1/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check/i })).toBeInTheDocument();
  });
});
