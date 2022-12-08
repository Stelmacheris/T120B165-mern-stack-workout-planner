import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Forbidden403 from "../ErrorPages/Forbidden403";
import jwt_decode from "jwt-decode";

const UpdateWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const location = useLocation();
  const workout = location.state.data;
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const [info, setInfo] = useState({
    name: workout.name,
    link: workout.link,
    description: workout.description,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.name !== "" && info.link !== "" && info.description !== "") {
      try {
        const response = await axios.put(
          `http://localhost:3000/sportsman/${user._id}/workout/` + id,
          info,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        navigate("/workout");
      } catch (e) {
        setError(true);
        setRes;
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                description: prevState.description,
                link: prevState.link,
                name: e.target.value,
              }));
            }}
            type="text"
            placeholder="Enter name"
            value={info.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                description: e.target.value,
                link: prevState.link,
                name: prevState.name,
              }));
            }}
            type="textarea"
            placeholder="Enter description"
            value={info.description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicClub">
          <Form.Label>Link</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                description: prevState.description,
                link: e.target.value,
                name: prevState.name,
              }));
            }}
            type="text"
            placeholder="Enter link"
            value={info.link}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UpdateWorkout;
