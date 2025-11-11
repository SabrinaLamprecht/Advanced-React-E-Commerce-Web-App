// src/components/ProductForm.tsx

import React, { useState, useEffect } from "react";
import type { Product } from "../types/types";
import { Form, Button } from "react-bootstrap";

interface Props {
  initial?: Product;
  onSave: (data: Partial<Product>, id?: string) => void;
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({ initial, onSave, onClose }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [price, setPrice] = useState(initial?.price || 0);
  const [category, setCategory] = useState(initial?.category || "");
  const [image, setImage] = useState(initial?.image || "");
  const [preview, setPreview] = useState<string | null>(initial?.image || null);

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setPrice(initial?.price || 0);
    setCategory(initial?.category || "");
    setImage(initial?.image || "");
    setPreview(initial?.image || null);
  }, [initial]);

  const handleFileSelect = (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setImage(`/images/${file.name}`);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initial && !image) {
      alert("Please upload or provide an image for the listing.");
      return;
    }
    onSave({ title, description, price, category, image }, initial?.id);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          value={isNaN(price) ? "" : price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Upload or URL</Form.Label>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="p-3 border rounded text-center"
          style={{ backgroundColor: "#f9f9f9", cursor: "pointer" }}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Drag & drop an image here, or click to select
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        <Form.Control
          type="text"
          className="mt-2"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="https://placehold.co/200"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", marginTop: "10px", objectFit: "contain" }}
            onError={(e) => (e.currentTarget.src = "https://placehold.co/200")}
          />
        )}
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {initial ? "Update Listing" : "Add Listing"}
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;
