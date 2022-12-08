import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { redirect, useNavigate } from "react-router-dom";
const AddSportsman = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    username: "",
    password: "",
    club: "",
  });
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/sportsman",
        {
          ...info,
          email: makeid(9) + "@test.com",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/sportsman");
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
                username: prevState.username,
                password: prevState.password,
                club: prevState.club,
                name: e.target.value,
              }));
            }}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                username: e.target.value,
                password: prevState.password,
                club: prevState.club,
                name: prevState.name,
              }));
            }}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicClub">
          <Form.Label>Club</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                username: prevState.username,
                password: prevState.password,
                club: e.target.value,
                name: prevState.name,
              }));
            }}
            type="text"
            placeholder="Enter club"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setInfo((prevState) => ({
                username: prevState.username,
                password: e.target.value,
                club: prevState.club,
                name: prevState.name,
              }));
            }}
            type="password"
            placeholder="Password"
            min="6"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default AddSportsman;
