import { Routes, Route } from "react-router-dom";
import Login from "../components/authorization/Login";
import Register from "../components/authorization/Register";
import Home from "../components/Home";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Navigation;
