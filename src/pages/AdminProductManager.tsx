//src/pages/AdminProductManager.tsx

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsFromFirestore,
  createProductInFirestore,
  updateProductInFirestore,
  deleteProductInFirestore,
} from "../api/api";
import type { Product } from "../types/types";
import ProductForm from "../components/ProductForm";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { cardStyle, imgStyle } from "../styles/cardStyles";

const AdminProductManager: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsFromFirestore,
  });

  const products: Product[] = productsData || [];

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleSave = async (productData: Partial<Product>, id?: string) => {
    try {
      if (id) {
        await updateProductInFirestore(id, productData);
      } else {
        const newProduct: Omit<Product, "id"> = {
          title: productData.title!,
          description: productData.description!,
          price: productData.price!,
          image: productData.image,
          category: productData.category,
        };

        await createProductInFirestore(newProduct);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowModal(false);
      setEditingProduct(null);
      setCreating(false);
    } catch (err) {
      console.error("Error saving product and/or animal:", err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteProductInFirestore(id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  const openCreateModal = () => {
    setCreating(true);
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="text-center" style={{ marginTop: "150px" }}>
        <h4>Loading listings...</h4>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Failed to load products and/or animals.</h3>
      </div>
    );
  }

  return (
    <Container className="pt-5 mt-5 pb-5 text-center">
      <h2 className="mb-3">Admin Listing Manager</h2>

      <Button variant="primary" className="mb-4" onClick={openCreateModal}>
        + Add Listing
      </Button>

      <Row className="g-4 justify-content-center align-items-stretch">
        {products.length === 0 && (
          <div className="text-center w-100">
            <h4>No products and/or animals available.</h4>
          </div>
        )}

        {products.map((product) => (
          <Col
            key={product.id || product.title}
            xs={12}
            md={6}
            lg={4}
            className="d-flex align-items-stretch"
          >
            <div
              className="d-flex flex-column w-100"
              style={{ minHeight: "100%" }}
            >
              <div
                style={{
                  ...cardStyle,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/* Title */}
                <h3 className="text-center">
                  {product.title || "Untitled Product"}
                </h3>

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
                    src={product.image || "/images/placeholder.png"}
                    alt={product.title || "Product image"}
                    style={imgStyle}
                  />
                </div>

                {/* Category */}
                <h5 className="mt-2">{product.category || "UNCATEGORIZED"}</h5>

                {/* Description */}
                <div
                  style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                >
                  <p className="text-center mb-0">
                    {product.description || "No description available."}
                  </p>
                </div>

                {/* Price */}
                <p className="fw-bold">
                  {product.price !== undefined
                    ? `$${product.price.toFixed(2)}`
                    : "N/A"}
                </p>

                {/* Action buttons */}
                <div className="d-flex justify-content-center gap-2 mt-auto">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            initial={editingProduct || undefined}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminProductManager;
