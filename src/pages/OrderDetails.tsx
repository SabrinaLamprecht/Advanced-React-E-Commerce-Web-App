//src/pages/OrderDetails.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/api";
import NavBar from "../components/NavBar";
import { Row, Col, Container } from "react-bootstrap";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
  });

  if (!orderId)
    return <div className="text-center pt-5">No order ID provided.</div>;
  if (isLoading)
    return <div className="text-center pt-5">Loading order details...</div>;
  if (isError || !order)
    return (
      <div className="text-center pt-5 text-danger">
        Failed to load order details.
      </div>
    );

  const orderDate = order.createdAt?.toMillis?.()
    ? new Date(order.createdAt.toMillis())
    : new Date(order.createdAt);

  return (
    <>
      <NavBar />
      <Container className="pt-5 mt-5 pb-5">
        <div
          style={{
            borderRadius: "0.5rem",
            backgroundColor: "white",
            boxShadow: "0 4px 8px 4px rgba(255, 215, 0, 0.6)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2 className="mb-3 text-center">Order #: {order.id}</h2>
          <p className="mb-1 text-center">
            Placed on: {orderDate.toLocaleString()}
          </p>
          <p className="mb-1 text-center">Status: {order.status}</p>
          <p className="mb-3 fw-bold text-center">
            Total Price: ${order.totalPrice.toFixed(2)}
          </p>

          <h3 className="mt-4 mb-3 text-center">Items</h3>
          <Row className="g-4 justify-content-center">
            {order.items.map((item) => (
              <Col
                key={item.id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className="d-flex justify-content-center"
              >
                <OrderItemCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

// Individual order item card with manual styling
const OrderItemCard: React.FC<{ item: any }> = ({ item }) => {
  const [imgSrc, setImgSrc] = useState(item.image || "/images/placeholder.png");

  useEffect(() => {
    if (item.image) setImgSrc(item.image);
  }, [item.image]);

  const handleImgError = () => {
    if (imgSrc !== "/images/placeholder.png")
      setImgSrc("/images/placeholder.png");
  };

  return (
    <div
      style={{
        borderRadius: "0.5rem",
        backgroundColor: "white",
        boxShadow: "0 4px 8px 4px rgba(255, 215, 0, 0.6)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <img
          src={imgSrc}
          alt={item.title}
          onError={handleImgError}
          style={{
            width: 120,
            height: 120,
            objectFit: "contain",
            borderRadius: "0.25rem",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h6 className="mb-1">{item.title}</h6>
        <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
        <p className="mb-0">Quantity: {item.count}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
