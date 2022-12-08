import jwt_decode from "jwt-decode";
import SportsmanCard from "../common/Card/SportsmanCard";
import NavigationBar from "../navbar/NavigationBar";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import Logo from "../../assets/stronger-than-yesterday-svg.svg";
import NoAuthorized401 from "../ErrorPages/NoAuthorized401";
const Home = () => {
  const token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  const user = token ? jwt_decode(token) : null;
  const { data, loading, response } = useAxios("/sportsman", "GET", "", {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });

  const dateNow = new Date();

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

  console.log(user);
  return (
    <>
      {
        <>
          <NavigationBar />
          <img src={Logo} alt="React Logo" />
          <div className="container pt-4">
            <div className="row">{mapData}</div>
          </div>
        </>
      }
    </>
  );
};

export default Home;
