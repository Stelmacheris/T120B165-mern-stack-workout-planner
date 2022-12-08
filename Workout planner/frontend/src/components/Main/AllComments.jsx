import { Link, useLocation } from "react-router-dom";
import WorkoutCard from "../common/Card/WorkoutCard";
import NavigationBar from "../navbar/NavigationBar";
import useAxios from "../../hooks/useAxios";
import AddButton from "../common/Buttons/AddButton";
import CommentCard from "../common/Card/CommentCard";
import { Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AllComments = () => {
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token);
  const location = useLocation();
  let sportsman = location?.state?.sportsman;
  let workout = location?.state?.workout;
  if (sportsman) {
    sessionStorage.removeItem("sportsman");
    sessionStorage.setItem("sportsman", JSON.stringify(sportsman));
  } else {
    sportsman = JSON.parse(sessionStorage.getItem("sportsman"));
  }
  if (workout) {
    sessionStorage.removeItem("workout");
    sessionStorage.setItem("workout", JSON.stringify(workout));
  } else {
    workout = JSON.parse(sessionStorage.getItem("workout"));
  }

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/sportsman/${sportsman._id}/workout/${workout._id}/comments/` +
          id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(sportsman._id + " " + workout._id);
      window.location.reload(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const { data, loading, response } = useAxios(
    "/sportsman/" + sportsman._id + "/workout/" + workout._id + "/comments",
    "GET",
    "",
    {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  );
  console.log(data);
  const mapData = data.map((d, i) => (
    <div className="col-4">
      <div className="card m-2">
        <CommentCard name={d.name} description={d.description} />
        {d.user == user._id ? (
          <div className="d-flex justify-content-center">
            <Link
              to={{
                pathname:
                  "/home/" +
                  sportsman._id +
                  "/workouts/" +
                  workout._id +
                  "/comments/" +
                  d._id,
              }}
              state={{ sportsman, workout, d }}
            >
              <Button className="m-1">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                console.log("Clicked");
                deleteHandler(d._id);
              }}
              variant="danger"
              className="m-1"
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  ));
  return (
    <>
      <NavigationBar />
      <Link
        to={{
          pathname:
            "/home/" +
            sportsman._id +
            "/workouts/" +
            workout._id +
            "/comments/add",
        }}
        state={{ sportsman, workout }}
      >
        <AddButton text="AddComment" />
      </Link>

      <WorkoutCard
        name={workout.name}
        link={workout.link}
        description={workout.description}
      />
      {data.length > 0 ? (
        <div className="container pt-4">
          <div className="row">{mapData}</div>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default AllComments;
