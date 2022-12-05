import { Routes, Route } from "react-router-dom";
import SportsmanList from "../components/admin/SportsmanList";
import UpdateSportsman from "../components/admin/UpdateSportsman";
import Login from "../components/authorization/Login";
import Register from "../components/authorization/Register";
import Home from "../components/Main/Home";
import AddSportsman from "../components/admin/AddSportsman";
import FirstPage from "../components/Main/FirstPage";
import WorkoutList from "../components/trainer/WorkoutList";
import AddWorkout from "../components/trainer/AddWorkout";
import UpdateWorkout from "../components/trainer/UpdateWorkout";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sportsman">
        <Route index element={<SportsmanList />} />
        <Route path="add" element={<AddSportsman />} />
        <Route path=":id" element={<UpdateSportsman />} />
      </Route>

      <Route path="/workout">
        <Route index element={<WorkoutList />} />
        <Route path="add" element={<AddWorkout />} />
        <Route path=":id" element={<UpdateWorkout />} />
      </Route>

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Navigation;
