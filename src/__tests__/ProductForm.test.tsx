// src/__tests__/ProductForm.test.tsx

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductForm from "../components/ProductForm";

describe("ProductForm Component Unit Test", () => {
  test("submits the form with correct data", () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    // Tests component rendering (requirement)
    render(<ProductForm onSave={mockOnSave} onClose={mockOnClose} />);

    // Tests state changes (requirement)
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Product" },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "A test description" },
    });

    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "19.99" },
    });

    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Toys" },
    });

    // Provide an image URL so validation passes
    fireEvent.change(
      screen.getByPlaceholderText(/https:\/\/placehold\.co\/200/i),
      {
        target: { value: "https://example.com/image.jpg" },
      }
    );

    // Simulate user interaction (form submission)
    fireEvent.click(screen.getByText(/Add Listing/i));

    // Validate form submission result
    expect(mockOnSave).toHaveBeenCalledWith(
      {
        title: "Test Product",
        description: "A test description",
        price: 19.99,
        category: "Toys",
        image: "https://example.com/image.jpg",
      },
      undefined
    );
  });

  test("calls onClose when Cancel is clicked", () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    // Component rendering (requirement)
    render(<ProductForm onSave={mockOnSave} onClose={mockOnClose} />);

    // Simulate user interaction (button click)
    fireEvent.click(screen.getByText(/Cancel/i));

    // Verify correct handler call
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
