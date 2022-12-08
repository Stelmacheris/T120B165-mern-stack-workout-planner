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
const SportsmanList = () => {
  const navigate = useNavigate();
  const { data, loading, response } = useAxios("/sportsman", "GET", "", {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });

  const token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  const user = token ? jwt_decode(token) : null;

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/sportsman/" + id,
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
        <td>{d.username}</td>
        <td>{d.club}</td>
        <td>{d.name}</td>
        {user.userType == "admin" ? (
          <td colSpan={2}>
            <>
              <Link
                to={{
                  pathname: "/sportsman/" + d._id,
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
    navigate("/sportsman/add");
  };

  return (
    <>
      {user.userType === "admin" ? (
        <>
          <NavigationBar />
          <AddButton addHandler={navigateHandler} text="Add Sportsman" />
          {data.length !== 0 ? (
            <DataTable
              mapData={mapData}
              header={["Username", "Club", "Name"]}
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
export default SportsmanList;
