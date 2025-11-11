//src/pages/OrderHistory.tsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../api/api";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { cardStyle } from "../styles/cardStyles"; // reuse card styling
import { Row, Col } from "react-bootstrap";

const OrderHistory: React.FC = () => {
  const { user } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: () => getOrdersForUser(user!.uid),
    enabled: !!user,
  });

  if (!user)
    return (
      <div className="text-center pt-5">Please login to see your orders.</div>
    );
  if (isLoading)
    return <div className="text-center pt-5">Loading orders...</div>;
  if (isError)
    return (
      <div className="text-center pt-5 text-danger">Failed to load orders.</div>
    );

  return (
    <>
      <NavBar />
      <div className="container pt-5 mt-5 pb-5 mb-5">
        <h2 className="text-center mb-4">Order History</h2>

        {orders.length === 0 && (
          <p className="text-center text-muted">You have no orders yet.</p>
        )}

        <Row className="g-4 justify-content-center">
          {orders.map((order) => {
            const date =
              order.createdAt?.toMillis?.() ?? order.createdAt ?? new Date();
            return (
              <Col
                key={order.id}
                xs={12}
                md={6}
                lg={4}
                className="d-flex align-items-stretch"
              >
                <Link
                  to={`/orders/${order.id}`}
                  className="text-decoration-none flex-grow-1 w-100"
                >
                  <div
                    style={{
                      ...cardStyle,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "1rem",
                      color: "black", // <-- ensures all text inside card is black
                    }}
                  >
                    <h5 className="mb-2">Order #: {order.id}</h5>
                    <p className="mb-1">
                      Placed: {new Date(date).toLocaleString()}
                    </p>
                    <p className="fw-bold mb-0">
                      Total: ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default OrderHistory;
