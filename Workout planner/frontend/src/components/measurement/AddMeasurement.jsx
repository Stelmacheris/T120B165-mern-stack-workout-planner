import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Forbidden403 from "../ErrorPages/Forbidden403";
import jwt_decode from "jwt-decode";

const AddMeasurement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const [info, setInfo] = useState({
    height: "",
    weight: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.height !== "" && info.height !== "") {
      try {
        const response = await axios.post(
          `http://localhost:3000/measurements/`,
          info,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response);
        navigate("/measurement");
      } catch (e) {
        setError(true);
      }
    } else {
      setError(true);
      setResponse(403);
    }
  };
  return (
    <>
      {error ? <p style={{ color: "red" }}>All fields required</p> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Height</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                height: e.target.value,
                weight: prevState.weight,
              }));
            }}
            type="Number"
            placeholder="Enter height"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                height: prevState.height,
                weight: e.target.value,
              }));
            }}
            type="number"
            placeholder="Enter weight"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddMeasurement;
