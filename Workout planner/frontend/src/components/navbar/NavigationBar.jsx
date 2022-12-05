import { user } from "../authorization/User";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Workout Planner</Navbar.Brand>
        <Nav className="me-auto">
          {user.userType === "admin" ? (
            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/sportsman"
              >
                Sportsmans
              </Link>
            </Nav.Link>
          ) : null}
          <Nav.Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              href="#features"
            >
              Features
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              href="#pricing"
            >
              Pricing
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
