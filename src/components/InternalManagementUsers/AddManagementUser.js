import React, { useState, useEffect } from "react";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import ButtonIcon from "../Others/ButtonIcon";
import { useHistory } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { toast } from "react-toastify";

const AddManagementUser = () => {
  const [usersList, setUsersList] = useState([]);
  const [details, setDetails] = useState({
    name: "",

    firstName: "",
    lastName: "",
    email: "",
    role_id: "",
    password: "",
    password_confirmation: "",
  });
  let token = localStorage.getItem("auth_token");

  const [roleId, setRoleId] = useState("");
  const [userId, setuserId] = useState("");

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/master/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.users);
        setUsersList(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //getting team type

  const [teamTypes, setTeamTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  //add users

  const userData = {
    name: details.firstName + details.lastName,

    user_id: userId,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(userData);

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/internalManagementUserList",
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
          history.push("admin/masterMenu/InternalManagementUserList");
          console.log(details.firstName);
          toast("successfully users Added", { type: "success" });
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
          <Sidebar cname1="" cname2="" cname3="activeclass" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="addproject">
            <h3 className="projectheadline">
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />
              Add Management User
            </h3>

            <form onSubmit={submitHandler}>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6> Name*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.lastName}
                    name="lastName"
                    onChange={inputHandler}
                    autoComplete="off"
                  />
                </div>
                <div className="col-md-3">
                  <h6>Users*</h6>
                  <select onChange={(e) => setuserId(e.target.value)}>
                    <option>Select users</option>
                    {usersList.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.firstName} {item.lastName}
                      </option>
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

export default AddManagementUser;
