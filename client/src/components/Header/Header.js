import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userActions";

const Header = () => {
  // get cart items from store
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // get loggedIn user from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand " to="/">
            <h1>Navbar</h1>
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <form className="d-flex mx-auto mt-2 me-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  About
                </Link>
              </li>

              {userInfo ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="#">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <Link className="nav-link " to="/login">
                  Signin
                </Link>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                  {console.log("cart", cart)}
                  {/* Cart {cart.cartItems.length} */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
