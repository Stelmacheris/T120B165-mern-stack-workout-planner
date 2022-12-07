import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AddButton from "../common/Buttons/AddButton";
import NavigationBar from "../navbar/NavigationBar";
import axios from "axios";
import { useState } from "react";
import DataTable from "../common/Tables/DataTable";
import useAxios from "../../hooks/useAxios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Forbidden403 from "../ErrorPages/Forbidden403";
import NoAuthorized401 from "../ErrorPages/NoAuthorized401";
import jwt_decode from "jwt-decode";

const MeasurementList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/measurements", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/measurements/` + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      window.location.reload(false);
    } catch (e) {}
  };

  const mapData = data.map((d) => {
    return (
      <tr key={d._id}>
        <td>{d.height}</td>
        <td>{d.weight}</td>
        <td colSpan={2}>
          <>
            <Link
              to={{
                pathname: `/measurement/` + d._id,
              }}
              state={{ data: d }}
            >
              <Button className="m-1">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                deleteHandler(d._id);
              }}
              variant="danger"
              className="m-1"
            >
              Delete
            </Button>
          </>
        </td>
      </tr>
    );
  });

  const navigateHandler = () => {
    navigate("/measurement/add");
  };
  return (
    <>
      <NavigationBar />
      <AddButton addHandler={navigateHandler} text="Add measurement" />
      {data.length !== 0 ? (
        <DataTable mapData={mapData} header={["Height", "Weight"]} />
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default MeasurementList;
