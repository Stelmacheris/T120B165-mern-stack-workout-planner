import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { redirect, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
const AddComments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState({
    name: "",
    description: "",
  });
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const workout = location?.state?.workout;
  const sportsman = location?.state?.sportsman;

  console.log(workout);
  console.log(sportsman);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/sportsman/${sportsman._id}/workout/${workout._id}/comments`,
        info,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      navigate(
        "/home/" +
          response.data.trainer +
          "/workouts/" +
          response.data.workout +
          "/comments"
      );
    } catch (e) {
      setError(true);
    }
  };
  return (
    <>
      <h1>AddComment</h1>
      {error ? <p style={{ color: "red" }}>All fields required</p> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                description: prevState.description,
                name: e.target.value,
              }));
            }}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                description: e.target.value,
                name: prevState.name,
              }));
            }}
            type="textarea"
            placeholder="Enter description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddComments;
