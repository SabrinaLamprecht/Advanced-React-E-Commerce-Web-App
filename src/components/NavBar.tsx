// src/components/NavBar.tsx

import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const totalCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.count, 0)
  );

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="py-3">
      <Container className="d-flex align-items-center justify-content-between">
        {/* Left side: Brand + Admin Panel */}
        <Nav className="d-flex align-items-center gap-4">
          <Navbar.Brand href="/">E-Commerce App </Navbar.Brand>
          {user && (
            <Link to="/admin" className="link-lightning">
              Admin Panel ⚙️
            </Link>
          )}
        </Nav>

        {/* Right side: Other links */}
        <Nav className="d-flex align-items-center gap-4">
          <Link to="/" className="link-lightning">
            Home
          </Link>

          <span
            onClick={() => navigate("/cart")}
            className="link-lightning position-relative"
            style={{ cursor: "pointer" }}
          >
            🛒 Cart
            {totalCount > 0 && (
              <Badge
                bg="primary"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalCount}
              </Badge>
            )}
          </span>

          {user ? (
            <>
              <Link to="/profile" className="link-lightning">
                Profile
              </Link>
              <Link to="/logout" className="link-lightning">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="link-lightning">
                Register
              </Link>
              <Link to="/login" className="link-lightning">
                Login
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
