import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import NavigationBar from "../navbar/NavigationBar";
import { Link } from "react-router-dom";
import WorkoutCard from "../common/Card/WorkoutCard";
import SportsmanCard from "../common/Card/SportsmanCard";
const AllWorkout = () => {
  const location = useLocation();
  const sportsman = location.state.data;
  const { data, loading, response } = useAxios(
    "/sportsman/" + sportsman._id + "/workout",
    "GET",
    "",
    {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  );

  const mapData = data.map((d, i) => (
    <div className="col-4">
      <div className="card m-2">
        <Link
          className="text-decoration-none"
          to={{
            pathname:
              "/home/" + sportsman._id + "/workouts/" + d._id + "/comments",
          }}
          state={{ workout: d, sportsman }}
        >
          <WorkoutCard
            name={d.name}
            link={d.link}
            description={d.description}
            index={i}
          />
        </Link>
      </div>
    </div>
  ));

  return (
    <>
      <NavigationBar />
      <SportsmanCard
        name={sportsman.name}
        username={sportsman.username}
        club={sportsman.club}
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

export default AllWorkout;
