import { React, useEffect } from "react";
import "./navbar.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = ({showToast}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // toast.success("JHEHOEO")
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            navigate("/signIn");
          }, 3000);
          showToast("Logged Out Successfully");
          localStorage.removeItem("userEmail");
        }
      });
  };

  return (
    <>
      {/* <ToastContainer limit={1} /> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark main-nav">
        <img
          alt="logo"
          className="navbar-brand logo"
          src="../../images/main_logo.png"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {localStorage.getItem("userEmail") && (
              <li className="nav-item active d-flex">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            {!localStorage.getItem("userEmail") && (
              <li className="nav-item d-flex">
                &&
                <Link className="nav-link" to="/signIn">
                  Sign In
                </Link>
              </li>
            )}
            {!localStorage.getItem("userEmail") && (
              <li className="nav-item d-flex">
                <Link className="nav-link" to="/signUp">
                  Sign Up
                </Link>
              </li>
            )}

            {localStorage.getItem("userEmail") && (
              <li className="nav-item d-flex">
                <Link to="/allBlogs" className="nav-link">
                  All Blogs
                </Link>
              </li>
            )}

            {localStorage.getItem("userEmail") && (
              <li className="nav-item d-flex">
                <Link to="/allBloggers" className="nav-link">
                  Bloggers
                </Link>
              </li>
            )}

            {localStorage.getItem("userEmail") && (
              <li className="nav-item d-flex">
                <Link to="/addBlog" className="nav-link">
                  Add Blog
                </Link>
              </li>
            )}
          </ul>
        </div>
        {localStorage.getItem("userEmail") && (
          <div className="right">
            <ul className="navbar-nav">
              <li className="nav-item dropdown d-flex">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} /> {/* User icon */}
                  <p className="para">{localStorage.getItem("userEmail")}</p>
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <span
                    onClick={handleLogout}
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
