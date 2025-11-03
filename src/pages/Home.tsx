// src/pages/Home.tsx

// Imports
import { useEffect, useState } from "react";
import type { Category, Product } from "../types/types";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/api";
import NavBar from "../components/NavBar";

// Define the Home page component
const Home: React.FC = () => {
  // Access global product context state and dispatcher
  const { products, selectedCategory, dispatch } = useProductContext();
  // Local state for tracking potential product errors (currently unused)
  const [productError] = useState<string | null>(null);

  // Fetch all products (array) - useQuery automatically handles fetching, caching, and refetching data
  // queryKey uniquely identifies the query, and queryFn defines how to fetch the data
  const {
    data: productsData, // fetched array of products
    isLoading, // true while data is being fetched
    isError, // true if fetching fails
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Fetch all categories (array)
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Initialize Products in Context - When product data is successfully fetched, store it in global state
  useEffect(() => {
    if (productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [dispatch, productsData]);

  // Reset Products When Filter is Cleared - If the user clears the selected category, show all products again
  useEffect(() => {
    if (selectedCategory === "" && productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [selectedCategory, productsData, dispatch]);

  // Filter products based on category - Returns a filtered product list if a category is selected
  // Otherwise returns all products
  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  // Loading and Error States
  if (isLoading) return <h1>Loading products...</h1>;
  if (isError) return <h1>Error fetching products</h1>;

  return (
    <>
      {/* Navigation bar at the top */}
      <NavBar />
      {/* Styling */}
      <div className="container pt-5 mt-5 pb-5">
        {/* Header text */}
        <h2 className="mb-3 text-center">
          ⚡ Welcome to the E-Commerce App! ⚡
        </h2>
        <h4 className="mb-3 text-center">
          {" "}
          Check out the Product Catalog below ⬇️
        </h4>

        {/* Category filter dropdown + clear filter button */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          {/* Dropdown for selecting product categories */}
          <select
            className="form-select w-auto"
            value={selectedCategory}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_CATEGORY",
                payload: e.target.value,
              })
            }
          >
            {/* Default option shows all products */}
            <option value="">All Categories</option>

            {/* Dynamically render available categories */}
            {categories?.map((category: Category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Button to reset category filter */}
          <button
            className="btn btn-secondary"
            onClick={() => {
              dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" });
              if (productsData) {
                dispatch({ type: "SET_PRODUCTS", payload: productsData });
              }
            }}
          >
            Clear Filter
          </button>
        </div>

        {/* Display product error if present */}
        {productError && (
          <div className="alert alert-danger text-center">{productError}</div>
        )}

        {/* Render all (filtered) products as cards */}
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

// Export the Home component for use in routing
export default Home;
