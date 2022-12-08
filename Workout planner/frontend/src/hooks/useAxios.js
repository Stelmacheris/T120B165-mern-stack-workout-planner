import { useEffect, useState, useRef } from "react";
import axios from "axios";
const useAxios = (url, method, payload, headers) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  axios.defaults.baseURL = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "http://13.51.172.212:3000/sportsman",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //     },
        //   }
        // );
        setLoading(true);
        const response = await axios({
          method,
          url,
          data,
          headers,
        });
        setLoading(false);
        setData(response.data);
      } catch (e) {
        setResponse(e.response.status);
      }
    };

    fetchData();
  }, []);

  return { data, loading, response };
};
export default useAxios;
