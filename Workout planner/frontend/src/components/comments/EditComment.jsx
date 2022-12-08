import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Forbidden403 from "../ErrorPages/Forbidden403";
import jwt_decode from "jwt-decode";

const EditComment = () => {
  const navigate = useNavigate();
  const { commentId } = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const location = useLocation();
  const workout = location.state.workout;
  const sportsman = location.state.sportsman;
  const comment = location.state.d;

  console.log(commentId);

  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const [info, setInfo] = useState({
    name: comment.name,
    description: comment.description,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.name !== "" && info.description !== "") {
      try {
        const response = await axios.put(
          `http://localhost:3000/sportsman/${sportsman._id}/workout/${workout._id}/comments/` +
            commentId,
          info,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response.data);
        navigate(
          "/home/" + sportsman._id + "/workouts/" + workout._id + "/comments"
        );
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
            value={info.name}
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
            value={info.description}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditComment;
