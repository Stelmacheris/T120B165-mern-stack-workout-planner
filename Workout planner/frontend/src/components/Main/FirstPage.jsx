import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./FirstPage.css";
import jwt_decode from "jwt-decode";
import { Route, Navigate } from "react-router-dom";
import Home from "./Home";
const FirstPage = () => {
  const token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  const user = token ? jwt_decode(token) : null;

  return (
    <>
      {!user ? (
        <div className="bg-dark text-center text-white">
          <h1 className="header">WORKOUT PLANNER</h1>
          <div className=" d-flex justify-content-center align-items-center vh-100 vw-100">
            <Link to="/login">
              <Button className="m-5 left-button" size="lg">
                {" "}
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="m-5 right-button" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Navigate to="/home" replace={true} />
      )}
    </>
  );
};

export default FirstPage;
