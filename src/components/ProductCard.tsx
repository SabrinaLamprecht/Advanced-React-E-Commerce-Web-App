// src/components/ProductCard.tsx

// Imports
import React, { useState } from "react";
import type { Product } from "../types/types";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

// Define ProductCard component that receives a single "product" prop
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // State to store the image source (fallbacks to a placeholder if image is missing)
  const [imgSrc, setImgSrc] = useState(
    product.image || "https://via.placeholder.com/300"
  );
  // State to control visibility of the "Product added" alert message
  const [alertVisible, setAlertVisible] = useState(false); // <-- new state
  // Get the Redux dispatch function for dispatching actions
  const dispatch = useDispatch();

  // Function called when the "Add to Cart" button is clicked
  const handleAddToCart = () => {
    // Dispatch the addToCart action to add the current product to the cart
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      })
    );

    // Show a temporary success alert for 2 seconds
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  return (
    // Styling
    <div className="col-md-5 p-3 d-flex">
      <div className="d-flex flex-column shadow p-3 w-100 align-items-center">
        {/* Product title */}
        <h3 className="text-center">{product.title}</h3>
        {/* Product image with error handling (fallback if image fails to load) */}
        <img
          src={imgSrc}
          alt={product.title}
          className="w-25"
          style={{ objectFit: "contain", maxHeight: 200 }}
          onError={() => setImgSrc("https://via.placeholder.com/300")}
        />
        {/* Product price formatted to two decimal places */}
        <p>${product.price.toFixed(2)}</p>
        {/* Product category, displayed in uppercase */}
        <h5>{product.category.toUpperCase()}</h5>
        {/* Read-only rating stars (based on product.rating.rate) */}
        <Rating
          style={{ maxWidth: 150 }}
          value={product.rating?.rate ?? 0}
          readOnly
        />
        {/* Product description, grows to fill available vertical space */}
        <p className="flex-grow-1 text-center mt-2">{product.description}</p>

        {/* Conditional success alert when item is added to the cart */}
        {alertVisible && (
          <div className="alert alert-success w-100 text-center mt-2">
            Product added to cart!
          </div>
        )}
        {/* "Add to Cart" button triggers the handleAddToCart function */}
        <button className="btn btn-primary mt-auto" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the app
export default ProductCard;
