//src/pages/Home.tsx

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProductsFromFirestore } from "../api/api";
import { useProductContext } from "../context/ProductContext";
import NavBar from "../components/NavBar";
import { Row, Col, Container } from "react-bootstrap";

const Home: React.FC = () => {
  const { products, selectedCategory, dispatch } = useProductContext();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsFromFirestore,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [productsData, dispatch]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products || [];

  const categories = [...new Set((products || []).map((p) => p.category))];

  return (
    <>
      <NavBar />
      <Container className="pt-5 mt-5 pb-5 text-center">
        <h2 className="mb-3">⚡ Welcome to the E-Commerce App! ⚡</h2>
        <h4 className="mb-4">
          Check out our Product & Animal Catalog below ⬇️
        </h4>

        {/* Category Filter */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <select
            className="form-select w-auto"
            value={selectedCategory || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_CATEGORY",
                payload: e.target.value,
              })
            }
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            className="btn btn-secondary"
            onClick={() =>
              dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })
            }
          >
            Clear Filter
          </button>
        </div>

        {/* Products Grid */}
        {isLoading && <h3 className="text-center">Loading listings...</h3>}
        {isError && (
          <h3 className="text-center text-danger">Failed to load listings.</h3>
        )}
        {!isLoading && filteredProducts.length === 0 && (
          <h4 className="text-center">No products or animals available.</h4>
        )}

        <Row className="g-4 justify-content-center align-items-stretch">
          {filteredProducts.map((product) => (
            <Col
              key={product.id || product.title}
              xs={12}
              md={6}
              lg={4}
              className="d-flex align-items-stretch"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
