//src/pages/ShoppingCart.tsx

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { removeItem, setItemCount, clearCart } from "../redux/cartSlice";
import NavBar from "../components/NavBar";
import { Row, Col, Container } from "react-bootstrap";
import { cardStyle, imgStyle } from "../styles/cardStyles";
import { useAuth } from "../context/AuthContext";
import { createOrderInFirestore } from "../api/api"; // import the API function

const ShoppingCart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const totalItems = items.reduce((acc, it) => acc + it.count, 0);
  const totalPrice = items.reduce((acc, it) => acc + it.price * it.count, 0);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // Save the order to Firestore
      await createOrderInFirestore(user.uid, items, totalPrice);

      // Clear cart only after successful save
      dispatch(clearCart());
      localStorage.removeItem("cartItems");

      alert("Checkout complete — your order has been saved and cart cleared.");
    } catch (err: any) {
      console.error("Error saving order:", err);
      alert("Failed to save your order. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <Container className="pt-5 mt-5 pb-5">
        <div className="text-center mb-4">
          <h2>Your Shopping Cart</h2>
          <p>Total items: {totalItems}</p>
          <p>Total price: ${totalPrice.toFixed(2)}</p>

          <button
            className="btn btn-primary mt-auto"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>

        {items.length === 0 && (
          <p className="text-center">Your Shopping Cart is empty.</p>
        )}

        <Row className="g-4 justify-content-center align-items-stretch">
          {items.map((item) => (
            <CartItem key={item.id} item={item} dispatch={dispatch} />
          ))}
        </Row>
      </Container>
    </>
  );
};

// Cart item component with flexbox fixes
const CartItem: React.FC<{ item: any; dispatch: any }> = ({
  item,
  dispatch,
}) => {
  const [imgSrc, setImgSrc] = useState(item.image || "/images/placeholder.png");

  const handleImgError = () => {
    if (imgSrc !== "/images/placeholder.png") {
      setImgSrc("/images/placeholder.png");
    }
  };

  return (
    <Col xs={12} md={6} lg={4} className="d-flex align-items-stretch">
      <div className="d-flex flex-column w-100" style={{ minHeight: "100%" }}>
        <div
          style={{
            ...cardStyle,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <h5 className="text-center">{item.title}</h5>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              width: "100%",
            }}
          >
            <img
              src={imgSrc}
              alt={item.title}
              style={imgStyle}
              onError={handleImgError}
            />
          </div>

          <p className="text-center fw-bold mt-2 mb-2">
            ${item.price.toFixed(2)}
          </p>

          <input
            type="number"
            min={1}
            value={item.count || 1}
            onChange={(e) =>
              dispatch(
                setItemCount({
                  id: item.id,
                  count: parseInt(e.target.value, 10),
                })
              )
            }
            style={{ width: 80 }}
            className="mb-2 mx-auto"
          />

          <button
            className="btn btn-danger mt-auto"
            onClick={() => dispatch(removeItem(item.id))}
          >
            Remove
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ShoppingCart;
