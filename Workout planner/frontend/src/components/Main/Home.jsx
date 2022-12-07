import jwt_decode from "jwt-decode";
import SportsmanCard from "../common/Card/SportsmanCard";
import NavigationBar from "../navbar/NavigationBar";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import Logo from "../../assets/stronger-than-yesterday-svg.svg";
const Home = () => {
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);
  const { data, loading, response } = useAxios("/sportsman", "GET", "", {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });

  const mapData = data.map((d, i) => (
    <div className="col-4">
      <div className="card m-2">
        <Link
          className="text-decoration-none"
          to={{
            pathname: "/home/" + d._id + "/workouts",
          }}
          state={{ data: d }}
        >
          <SportsmanCard
            name={d.name}
            username={d.username}
            club={d.club}
            index={i}
          />
        </Link>
      </div>
    </div>
  ));

  //   <SportsmanCard
  //   name={d.name}
  //   username={d.username}
  //   club={d.club}
  //   index={i}
  // />
  return (
    <>
      <NavigationBar />
      <img src={Logo} alt="React Logo" />
      <div className="container pt-4">
        <div className="row">{mapData}</div>
      </div>
      {/* <div className="card-group">{mapData}</div> */}
    </>
  );
};

export default Home;
