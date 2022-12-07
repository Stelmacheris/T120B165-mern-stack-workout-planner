import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavigationBar = () => {
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      className="navbar-expand-lg"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Toggle
          aria-controls="NavBarScroll"
          data-bs-target="#NavBarScroll"
        />
        <Navbar.Collapse id="NavBarScroll">
          <Link to="/home">
            <Navbar.Brand>Workout Planner</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/measurement"
              >
                Mesurements
              </Link>
            </Nav.Link>
          </Nav>
          {user.userType === "admin" ? (
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/sportsman"
                >
                  Sportsmans
                </Link>
              </Nav.Link>
            </Nav>
          ) : null}

          <Nav className="me-auto">
            {user.userType === "trainer" ? (
              <Nav.Link>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/workout"
                >
                  Workouts
                </Link>
              </Nav.Link>
            ) : null}
          </Nav>

          <Nav.Link
            onClick={logoutHandler}
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "20px",
              fontSize: "16px",
            }}
          >
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
