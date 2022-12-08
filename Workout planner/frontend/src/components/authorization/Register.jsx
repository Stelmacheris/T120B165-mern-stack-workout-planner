import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        registerInfo
      );
      setError(false);
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(true);
    }

    navigate("/login");
  };
  return (
    <div className=" Auth-form-container bg-dark  d-flex justify-content-center align-items-center vh-100 vw-100">
      <form onSubmit={submitHandler} className="Auth-form">
        <div className="Auth-form-content p-5 bg-white border border-dark">
          {error && <p style={{ color: "red" }}>Error in form</p>}
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => {
                setRegisterInfo((prevstate) => ({
                  username: e.target.value,
                  password: prevstate.password,
                  email: prevstate.email,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {
                setRegisterInfo((prevstate) => ({
                  username: prevstate.username,
                  password: prevstate.password,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setRegisterInfo((prevstate) => ({
                  username: prevstate.username,
                  password: e.target.value,
                  email: prevstate.email,
                }));
              }}
            />
          </div>
          {/* <div className="form-group mt-3">
            <label>Repeat password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div> */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <div className="mt-2 d-flex justify-content-center align-items-center">
            <Link to={"/login"}>SignIn</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
