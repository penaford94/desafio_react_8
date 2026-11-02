import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const Navigation = () => {
  const { total } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex flex-wrap gap-3">
        <Navbar.Brand as={Link} to="/">
          Pizzería Mamma Mía!
        </Navbar.Brand>

        <Link
          to="/"
          className="text-white text-decoration-none"
        >
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/profile"
              className="text-white text-decoration-none"
            >
              Profile
            </Link>

            <button
              type="button"
              className="btn btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white text-decoration-none"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-white text-decoration-none"
            >
              Register
            </Link>
          </>
        )}

        <Link
          to="/cart"
          className="btn btn-outline-info ms-auto"
        >
          🛒 Total: ${formatCurrency(total)}
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;