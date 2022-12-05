import jwt_decode from "jwt-decode";
import NavigationBar from "../navbar/NavigationBar";
const Home = () => {
  const handler = () => {
    //const token = localStorage.getItem("accessToken");
    const decoded = jwt_decode(token);
    console.log(decoded);
  };
  // const token = localStorage.getItem("accessToken");
  // if (jwtDecode(token).exp < Date.now() / 1000) {
  //   token = null;
  // }
  return (
    <>
      <NavigationBar />
    </>
  );
};

export default Home;
