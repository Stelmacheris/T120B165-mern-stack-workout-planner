import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const FirstPage = () => {
  return (
    <>
      <div className=" bg-dark  d-flex justify-content-center align-items-center vh-100 vw-100">
        <h1 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          WORKOUT PLANNER
        </h1>
        <Link to="/login">
          <Button>Sign In</Button>
        </Link>
        <Link to="/register">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </>
  );
};

export default FirstPage;
