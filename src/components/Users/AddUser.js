import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { useHistory } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  toast.configure();
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role_id: "",
    password: "",
    password_confirmation: "",
  });
  let token = localStorage.getItem("auth_token");

  const [roleId, setRoleId] = useState("");

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  //getting roles
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/master/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRoles(res.data.roles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //getting team type
  const [teamType, setTeamType] = useState([]);
  const [teamTypes, setTeamTypes] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.projectTeamTypes);
        setTeamType(res.data.projectTeamTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //add users

  const userData = {
    firstName: details.firstName,
    lastName: details.lastName,
    email: details.email,
    role_id: roleId,
    projectTeamType_id: teamTypes,
    password: details.password,
    password_confirmation: details.password_confirmation,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(userData);

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/master/users",
        qs.stringify(userData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("status", response.status);
        let status = localStorage.getItem("status");
        if (status == 201) {
          toast("Successfully Added User", { type: "success" });
          history.push("/admin/users");
          console.log(details.firstName);
        }
      })
      .catch((error) => {
        console.log("there is an error y", error.response);

        var array = error.response.data.errors;

        for (const [key, value] of Object.entries(array)) {
          console.log(`${key}: ${value}`);

          localStorage.setItem("errorsval", `${value}`);

          let errorsval = localStorage.getItem("errorsval");

          toast(errorsval, { type: "error" });
        }
      });
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2=""
            cname3=""
            cname4=""
            cname5=""
            cname6=""
            cname7="activeclass"
            cname8=""
            cname9=""
            cname10=""
          />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="addproject">
            <h3 className="projectheadline">
              {" "}
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />
              Add User Details
            </h3>

            <form onSubmit={submitHandler}>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>First Name*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.firstName}
                    name="firstName"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>
                <div className="col-md-3">
                  <h6>Last Name*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.lastName}
                    name="lastName"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Email*</h6>
                  <input
                    type="email"
                    className="inp_feild"
                    value={details.email}
                    name="email"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>

                <div className="col-md-3">
                  <h6>Role *</h6>
                  <select onChange={(e) => setRoleId(e.target.value)}>
                    <option>Select a role</option>
                    {roles.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Password*</h6>
                  <input
                    type="password"
                    className="inp_feild"
                    value={details.password}
                    name="password"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>
                <div className="col-md-3">
                  <h6>Confirm Password*</h6>
                  <input
                    type="password"
                    className="inp_feild"
                    value={details.password_confirmation}
                    name="password_confirmation"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Team Type* </h6>
                  <select onChange={(e) => setTeamTypes(e.target.value)}>
                    <option>Select a role</option>
                    {teamType.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="buttonWrap">
                <ButtonIcon
                  src="images/right-arrow.png"
                  text="Submit"
                  id="btn_radius"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
