// src/components/ProductCard.tsx

import React, { useState } from "react";
import type { Product } from "../types/types";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { cardStyle, imgStyle } from "../styles/cardStyles";

interface SafeProduct extends Partial<Product> {
  id: string;
  title: string;
  price?: number;
  category?: string;
  description?: string;
  image?: string;
}

const ProductCard: React.FC<{ product: SafeProduct }> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(
    product.image || "https://placehold.co/200"
  );
  const [alertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price || 0,
        image: product.image || "https://placehold.co/200",
      })
    );
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  return (
    <div style={cardStyle}>
      {/* Title */}
      <h3 className="text-center">{product.title || "Untitled Product"}</h3>

      {/* Image */}
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
          alt={product.title || "Product image"}
          style={imgStyle}
          onError={() => setImgSrc("https://placehold.co/200")}
        />
      </div>

      {/* Category */}
      <h5 className="mt-2">{product.category || "UNCATEGORIZED"}</h5>

      {/* Description */}
      <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <p className="text-center mb-0">
          {product.description || "No description available."}
        </p>
      </div>

      {/* Price */}
      <p className="fw-bold">
        {product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A"}
      </p>

      {/* Success alert */}
      {alertVisible && (
        <div className="alert alert-success w-100 text-center mt-2 mb-2">
          Product added to cart!
        </div>
      )}

      {/* Add to Cart button */}
      <button className="btn btn-primary mt-auto" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
