import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              Auctions App
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to={"/"}>
              List Auctions
            </Link>

            {/* unAuthenticated Route  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}

            {/* Seller Routes  */}

            {auth && auth.type === 'seller' && (
              <>
                <Link className="nav-link" to={"/manage-auctions"}>
                  Manage Auctions
                </Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
