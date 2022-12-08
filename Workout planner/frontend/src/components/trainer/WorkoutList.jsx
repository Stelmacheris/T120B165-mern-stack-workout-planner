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

const WorkoutList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = jwt_decode(token);

  const { data, loading, response } = useAxios(
    `/sportsman/${user._id}/workout`,
    "GET",
    "",
    {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  );

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/sportsman/${user._id}/workout/` + id,
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
        <td>{d.name}</td>
        <td>{d.link}</td>
        <td>{d.description}</td>
        {user.userType == "trainer" ? (
          <td colSpan={2}>
            <>
              <Link
                to={{
                  pathname: `/workout/` + d._id,
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
        ) : null}
      </tr>
    );
  });

  const navigateHandler = () => {
    navigate("/workout/add");
  };
  return (
    <>
      {user.userType === "trainer" ? (
        <>
          <NavigationBar />
          <AddButton addHandler={navigateHandler} text="Add Workout" />
          {data.length !== 0 ? (
            <DataTable
              mapData={mapData}
              header={["Name", "Link", "Description"]}
            />
          ) : (
            <p>No Data</p>
          )}
        </>
      ) : (
        <Forbidden403 />
      )}
    </>
  );
};

export default WorkoutList;
