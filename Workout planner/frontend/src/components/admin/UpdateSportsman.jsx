import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Forbidden403 from "../ErrorPages/Forbidden403";

const UpdateSportsman = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const location = useLocation();
  const sportsman = location.state.data;

  const [info, setInfo] = useState({
    name: sportsman.name,
    username: sportsman.username,
    password: sportsman.password,
    club: sportsman.club,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      info.name !== "" &&
      info.username !== "" &&
      info.password !== "" &&
      info.club !== ""
    ) {
      try {
        const response = await axios.put(
          "http://localhost:3000/sportsman/" + id,
          info,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        navigate("/sportsman");
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
      {response != 403 ? (
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
                value={info.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setInfo((prevState) => ({
                    username: e.target.value,
                    email: prevState.email,
                    password: prevState.password,
                    club: prevState.club,
                    name: prevState.name,
                  }));
                }}
                type="text"
                placeholder="Enter username"
                value={info.username}
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
                value={info.club}
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
                value={info.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <Forbidden403 />
      )}
    </>
  );
};
export default UpdateSportsman;
