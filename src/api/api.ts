// src/api/api.ts

// Imports - Firestore functions to interact with the database; TypeScript types for type
// safety; db for the Firestore instance
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import type { Product, OrderItem, Order } from "../types/types";
import { db } from "../lib/firebase";

// Fetches all products from the "Products" collection & returns an array of products
// including their Firestore documnet IDs
export async function getProductsFromFirestore(): Promise<Product[]> {
  const colRef = collection(db, "Products");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }));
}

// Fetches a single product by ID & returns null if it does not exist
export async function getProductById(id: string): Promise<Product | null> {
  const dref = doc(db, "Products", id);
  const snap = await getDoc(dref);
  return snap.exists() ? { id: snap.id, ...(snap.data() as Product) } : null;
}

// Adds a new product document & removes undefined fields for safety
export async function createProductInFirestore(product: Omit<Product, "id">) {
  const colRef = collection(db, "Products");
  const safeProduct = Object.fromEntries(
    Object.entries(product).filter(([_, v]) => v !== undefined)
  ) as Omit<Product, "id">;
  const newDoc = await addDoc(colRef, safeProduct);
  return newDoc.id;
}

// Updates a product by ID with only the fields you provide
export async function updateProductInFirestore(
  id: string,
  productPatch: Partial<Product>
) {
  const dref = doc(db, "Products", id);
  const cleanPatch = Object.fromEntries(
    Object.entries(productPatch).filter(([_, v]) => v !== undefined)
  );
  await updateDoc(dref, cleanPatch);
}

// Deletes a product by ID
export async function deleteProductInFirestore(id: string) {
  const dref = doc(db, "Products", id);
  await deleteDoc(dref);
}

// Saves a new order for a specific user
export async function createOrderInFirestore(
  userId: string | undefined,
  items: OrderItem[],
  totalPrice: number
) {
  if (!userId) throw new Error("User not authenticated");

  // Validates order items (ensures they have all necessary info)
  const validItems = items.map((item) => ({
    id: item.id || "unknown",
    title: item.title || "Untitled Product",
    price: item.price ?? 0,
    image: item.image || "",
    count: item.count ?? 1,
  }));

  // Ensures Firestore sets a valid timestamp
  const orderData: Omit<Order, "id"> = {
    userId,
    items: validItems,
    totalPrice: totalPrice ?? 0,
    status: "placed",
    createdAt: serverTimestamp(),
  };

  const colRef = collection(db, "orders");
  const newDoc = await addDoc(colRef, orderData);

  // Fetch the order back with server timestamp as a Date object
  const createdOrder = await getDoc(newDoc);
  const data = createdOrder.data();

  // Convert serverTimestamp to a proper Date if needed
  const createdAt = data?.createdAt?.toDate
    ? data.createdAt.toDate()
    : new Date();

  return newDoc.id;
}

// Queries all orders for a specific user and returns an array of orders
export async function getOrdersForUser(userId: string): Promise<Order[]> {
  if (!userId) return [];

  const colRef = collection(db, "orders");
  const q = query(colRef, where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data() as Order;

    // Convert Firestore timestamp to Date object
    const createdAt = data.createdAt?.toDate
      ? data.createdAt.toDate()
      : data.createdAt;

    return {
      id: d.id,
      ...data,
      createdAt,
    };
  });
}

// Fetches a single order by its ID and returns null if not found
export async function getOrderById(orderId: string): Promise<Order | null> {
  const dref = doc(db, "orders", orderId);
  const snap = await getDoc(dref);

  if (!snap.exists()) return null;

  const data = snap.data() as Order;

  // Convert Firestore timestamp to Date object
  const createdAt = data.createdAt?.toDate
    ? data.createdAt.toDate()
    : data.createdAt;

  return {
    id: snap.id,
    ...data,
    createdAt,
  };
}
