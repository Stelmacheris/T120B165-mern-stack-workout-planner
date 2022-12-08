import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { redirect, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AddWorkout = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/sportsman/${user._id}/workout`,
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
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddWorkout;
