import { Routes, Route } from "react-router-dom";
import SportsmanList from "../components/admin/SportsmanList";
import UpdateSportsman from "../components/admin/UpdateSportsman";
import Login from "../components/authorization/Login";
import Register from "../components/authorization/Register";
import Home from "../components/Home";
import AddSportsman from "../components/admin/AddSportsman";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sportsman">
        <Route index element={<SportsmanList />} />
        <Route path="add" element={<AddSportsman />} />
        <Route path=":id" element={<UpdateSportsman />} />
      </Route>

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Navigation;
