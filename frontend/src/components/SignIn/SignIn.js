import React from "react";
import { useState, useEffect } from "react";
import "./signIn.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({showToast}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("userEmail");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSignIn(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    let userBody = {
      email,
      password,
    };

    fetch(`http://localhost:4000/getUserByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify(userBody),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Data");
        if (data.success) {
          setTimeout(() => {
            navigate("/");
          }, 3000);

          console.log("Signed In Successfully");
          // toast.success("Logged In successfully");
          showToast("Logged In successfully");

          localStorage.setItem("userEmail", email);
        } else {
          setError({ isError: true, msg: "Please check email or password" });
        }
      })
      .catch((e) => {
        console.log(e);
        setError({
          isError: true,
          msg: "User does not exist.Please sign up for creating new user",
        });
      });
  }

  return (
    <>
      {/* <ToastContainer limit={1} /> */}
      <div className="main-div">
        <div className="card">
          <b style={{ margin: "20px" }}>Welcome To Blog Hunt</b>
          <div className="container">
            <form className="form-class" onSubmit={handleSignIn}>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                value={user.email}
                placeholder="Enter email"
              />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                value={user.password}
                placeholder="Enter password"
              />
              {error && <span className="error">{error.msg}</span>}
              <span>
                Not Existing User?{" "}
                <Link to="/signUp">Click here to sign up</Link>
              </span>
              <button className="btn btn-outline-dark mt-3" type="submit">
                Sign In{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
