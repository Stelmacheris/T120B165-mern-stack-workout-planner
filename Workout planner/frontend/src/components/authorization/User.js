import jwt_decode from "jwt-decode";
const token = localStorage.getItem("accessToken");
const user = jwt_decode(token);

export { user };
