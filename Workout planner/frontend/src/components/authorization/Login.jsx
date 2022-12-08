import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginInfo
      );
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/home");
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className=" Auth-form-container bg-dark  d-flex justify-content-center align-items-center vh-100 vw-100">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content p-5 bg-white">
          {error && (
            <p style={{ color: "red" }}>Invalid username or password</p>
          )}
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setLoginInfo((prevstate) => ({
                  username: e.target.value,
                  password: prevstate.password,
                }));
              }}
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              onChange={(e) =>
                setLoginInfo((prevstate) => ({
                  password: e.target.value,
                  username: prevstate.username,
                }))
              }
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <div className="mt-2 d-flex justify-content-center align-items-center">
            <Link to={"/register"}>SignUp</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
