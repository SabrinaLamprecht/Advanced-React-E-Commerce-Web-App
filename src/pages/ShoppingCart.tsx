// src/components/ShoppingCart.tsx

// Imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { removeFromCart, updateCount, clearCart } from "../redux/cartSlice";
import NavBar from "../components/NavBar";

// Define the ShoppingCart component as a React Functional Component
const ShoppingCart: React.FC = () => {
  // Get all cart items from the Redux store
  const items = useSelector((state: RootState) => state.cart.items);
  // Get the dispatch function to trigger Redux actions
  const dispatch = useDispatch();
  // Calculate total number of items in the cart
  const totalCount = items.reduce((acc, it) => acc + it.count, 0);
  // Calculate total price of all items in the cart
  const totalPrice = items.reduce((acc, it) => acc + it.price * it.count, 0);

  // Handle checkout action: clears the cart and shows a confirmation alert
  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout complete — your cart has been cleared.");
  };

  return (
    <>
      {/* Reuse the navigation bar at the top of the page */}
      <NavBar />
      {/* Styling */}
      <div className="container pt-5 mt-5">
        {/* Header section with totals and checkout button */}
        <div className="text-center mb-4">
          <h2>Your Shopping Cart</h2>
          <p>Total items: {totalCount}</p>
          <p>Total price: ${totalPrice.toFixed(2)}</p>

          {/* Checkout button — disabled when cart is empty */}
          <button
            className="btn btn-primary mt-auto"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>

        {/* Message displayed if the cart is empty */}
        {items.length === 0 && (
          <p className="text-center">Your Shopping Cart is empty.</p>
        )}

        {/* Cart items displayed as responsive Bootstrap cards */}
        <div className="row justify-content-center">
          {items.map((item) => (
            <div className="col-md-5 p-3" key={item.id}>
              <div
                className="shadow p-3 d-flex flex-column justify-content-between align-items-center"
                style={{
                  minHeight: 400,
                  borderRadius: "0.5rem",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px 0 rgba(255, 215, 0, 0.6)", // lightning bolt color
                }}
              >
                {/* Top section: product title and image */}
                <div className="text-center">
                  <h5>{item.title}</h5>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-50 mb-2"
                    style={{ objectFit: "contain", maxHeight: 150 }}
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/150")
                    }
                  />
                </div>

                {/* Middle section: price, quantity input, and remove button */}
                <div className="d-flex flex-column align-items-center justify-content-between flex-grow-1 my-2">
                  <p className="mb-2">${item.price.toFixed(2)}</p>

                  {/* Quantity input — allows user to update count */}
                  <input
                    type="number"
                    min={1}
                    value={item.count}
                    onChange={(e) =>
                      dispatch(
                        updateCount({
                          id: item.id,
                          count: Number(e.target.value),
                        })
                      )
                    }
                    style={{ width: 80 }}
                    className="mb-2"
                  />

                  {/* Remove button — removes item from cart */}
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Export the ShoppingCart component for use in other parts of the app
export default ShoppingCart;
