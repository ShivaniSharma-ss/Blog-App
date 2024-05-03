import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./addUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddUser = ({ showToast }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  let email = searchParams.get("email");
  const [count, setCount] = useState(3);
  const [error, setShowError] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });

  useEffect(() => {
    if (showToast) {
      setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
  }, [showToast]);
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPassword((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSignUp(e) {
    e.preventDefault();

    let pass1 = password.password1;
    let pass2 = password.password2;

    if (pass1 === pass2) {
      let userBody = {
        email: email,
        password: pass1,
      };
      fetch(`http://localhost:4000/updateUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userBody),
      }).then((res) => {
        console.log(res);
            setTimeout(() => {
              navigate("/");
            }, 3000);
        showToast(
          `Password set successfully. Redirecting to home in ${count} sec.`
        );
      });
    } else {
      setShowError(true);
    }
  }
  // if (showToast) {

  // }
  return (
    <>
      {/* <ToastContainer limit={1} /> */}

      <div className="main-div">
        <div className="card">
          <div className="container">
            <form className="form-class" onSubmit={handleSignUp}>
              <input
                onChange={handleChange}
                type="password"
                name="password1"
                value={password.password1}
                placeholder="Enter Password"
              />
              {error && (
                <span className="error-span">Password is not matched</span>
              )}
              <input
                name="password2"
                onChange={handleChange}
                type="password"
                value={password.password2}
                placeholder="Re-Enter password "
              />
              {error && (
                <span className="error-span">Password is not matched</span>
              )}
              <button type="submit">Set Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
