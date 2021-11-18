import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Dropdown, Table } from "react-bootstrap";

const GetUsers = () => {
  let Baseurl = "https://freshhu.com/cnu/projectmanagement/api";
  const url = `${Baseurl}/admin/auth-menus`;
  let token = localStorage.getItem("auth_token");
  const [getusers, setgetusers] = useState([]);
  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/master/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setgetusers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(getusers);

  let getusersdata = getusers.map((item, index) => {
    return (
      <>
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.role_name}</td>
        </tr>
      </>
    );
  });
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>{getusersdata}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GetUsers;
