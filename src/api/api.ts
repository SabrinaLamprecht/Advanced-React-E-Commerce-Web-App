// src/api/api.ts

// Imports
import axios from "axios";
import type { Product, Category } from "../types/types";

// Create an Axios instance with a predefined base URL
// This helps avoid repeating the base URL for every API request
const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// Fetch all products from the Fake Store API
// Returns an array of Product objects
export const fetchProducts = async (): Promise<Product[]> => {
  // Make a GET request to the '/products' endpoint
  const res = await apiClient.get<Product[]>("/products");
  // Return only the response data (array of products)
  return res.data;
};

// Fetch all available product categories from the API
// Returns an array of category names (strings)
export const fetchCategories = async (): Promise<Category[]> => {
  // Make a GET request to the '/products/categories' endpoint
  const res = await apiClient.get<Category[]>("/products/categories");
  // Return only the response data (array of categories)
  return res.data;
};

// Fetch all products belonging to a specific category
// 'category' is passed as a parameter to the function
// Returns an array of Product objects
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  // Encode the category name to ensure it’s URL-safe (e.g., replaces spaces or special chars)
  // Then make a GET request to '/products/category/{category}'
  const res = await apiClient.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );
  // Return only the response data (array of products)
  return res.data;
};
