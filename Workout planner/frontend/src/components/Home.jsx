import jwt_decode from "jwt-decode";
import NavigationBar from "./navbar/NavigationBar";
const Home = () => {
  const handler = () => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwt_decode(token);
    console.log(decoded);
  };
  return (
    <>
      <NavigationBar />
      <button onClick={handler}>Home</button>
    </>
  );
};

export default Home;
