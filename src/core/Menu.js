import React from "react";
import { signout, isAuthenticated } from "../auth/index";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./styles/Menu.css";
import cart from "../cart/cart-helper";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "rgba(126, 213, 111, 0.8)" };
  else return { color: "black" };
};

const Menu = ({ history }) => (
  <div className="fixed-top">
    <nav>
      <input id="nav" class="hidden" type="checkbox" />

      <label for="nav" className="nav-btn">
        <i />
        <i />
        <i />
      </label>

      <div className="logo">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="http://modernwebbazaar.com/wp-content/uploads/2019/03/LogoMakr_2oYhLp.png"
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
          {"FlicKart"}
        </Navbar.Brand>
      </div>

      <div className="nav-wrapper">
        <ul>
          {isAuthenticated() && (
            <li>
              <NavDropdown
                title={`${isAuthenticated().user.name}'s Account`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href={`/user/${isAuthenticated().user._id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/orders">My orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => signout(() => history.push("/"))}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          )}

          {!isAuthenticated() && (
            <>
              <li>
                <a className="btn btn-light btn-raised" href="/signin" style={isActive(history, "/signin")}>
                  Sign In
                </a>
              </li>
              <li>
                <a className="btn btn-light btn-raised" href="/signup" style={isActive(history, "/signup")}>
                  Sign Up
                </a>
              </li>
            </>
          )}


{isAuthenticated().user && isAuthenticated().user.role === "seller" && (

<>
  <li>
  <a
    className="btn btn-light btn-raised"
    href="/products/new"
    style={isActive(history, "/products/new")}
  >
    Add product
  </a>
</li>
</>
)}

{isAuthenticated().user && isAuthenticated().user.role === "admin" && (

  <>
    <li>
    <a
      className="btn btn-light btn-raised"
      href="/products/new"
      style={isActive(history, "/products/new")}
    >
      Add product
    </a>
  </li>
  </>
  )}


       

          <li>
            <a href="/about" style={isActive(history, "/about")}>
              About Us
            </a>
          </li>
          <li>
            {" "}
            <a href="/support" style={isActive(history, "/support")}>
              Support
            </a>
          </li>

          <li>
            {" "}
            <a href="/users" style={isActive(history, "/users")}>
              Users
            </a>
          </li>

          <li>
            {" "}
            <a href="/cart" style={isActive(history, "/cart")}>
              <span className="badge badge-info" style={{ marginLeft: "7px" }}>
                {cart.itemTotal()}
                <i class="fas fa-cart-plus">Cart</i>
              </span>
            </a>
          </li>

      
        </ul>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
