// src/components/NavBar.tsx

// Imports
import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router";

// Define the NavBar component as a React Functional Component
const NavBar: React.FC = () => {
  // Initialize navigate function to allow navigation between routes
  const navigate = useNavigate();

  // Access the Redux store to calculate the total number of items in the cart
  // This takes all items in the cart and sums their "count" values
  const totalCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.count, 0)
  );

  // Render the navigation bar UI
  return (
    // Styling
    <Navbar bg="dark" variant="dark" fixed="top" className="py-3">
      <Container className="d-flex align-items-center">
        {/* Brand Name */}
        <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-4">
          {/* Home link */}
          <Nav.Link href="/" className="text-white text-decoration-none">
            Home
          </Nav.Link>

          {/* Cart link with cart icon and item count badge */}
          <Nav.Link
            onClick={() => navigate("/cart")}
            className="text-white position-relative"
          >
            🛒 Cart
            {/* If there are items in the cart, show a badge with the count */}
            {totalCount > 0 && (
              <Badge
                bg="primary"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalCount}
              </Badge>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

// Export the NavBar component so it can be used in other parts of the app
export default NavBar;
