import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import qs from "qs";
import Loader from "../Others/Loader";
import Message from "../Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserViewDetails() {
  toast.configure();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [details, setDetails] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [userDetails, sestUserDetails] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const url = `https://freshhu.com/cnu/projectmanagement/api/admin/master/users/${id}`;
  let token = localStorage.getItem("auth_token");

  const userData = {
    current_password: details.current_password,
    password: details.password,
    password_confirmation: details.password_confirmation,
  };

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.user);
        sestUserDetails(response.data.user);
        localStorage.setItem("user-first-name", response.data.user.firstName);
        localStorage.setItem("user-email", response.data.user.email);
        localStorage.setItem("user-last-name", response.data.user.lastName);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, url]);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(details);
    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/master/users/${id}/update-password`,
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
          toast("Password Updated Successfully", { type: "success" });
          history.push("/admin/users");
          console.log(details.password);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
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
          <h3 className="projectheadline">
            {" "}
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{ cursor: "pointer", marginRight: "1%" }}
              onClick={() => history.goBack()}
            />{" "}
            User Details
          </h3>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span> User Details</span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="viewdetail_l">
                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>User Name</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>
                            {userDetails.firstName + " " + userDetails.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Email ID</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{userDetails.email}</p>
                        </div>
                      </div>
                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>User Role</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{userDetails.roleName}</p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>User Team Type</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{userDetails.projectTeamType}</p>
                        </div>
                      </div>

                      <Link to={`/editUser/${id}`} className="side_links">
                        <Button
                          style={{ marginTop: "2%" }}
                          variant="danger"
                          size="md"
                        >
                          Edit
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Tab>
            <Tab
              eventKey="changePassword"
              title={<span> Update Password</span>}
            >
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="addprojects">
                      <h3 className="projectheadline">
                        {" "}
                        <img
                          src="/images/backarrows.svg"
                          width="25px"
                          style={{
                            cursor: "pointer",
                            marginRight: "1%",
                            marginTop: "1%",
                          }}
                          onClick={() => history.goBack()}
                        />
                        Update User Password
                      </h3>
                      {error && (
                        <Message variant="danger">Invalid Data</Message>
                      )}
                      <form onSubmit={submitHandler}>
                        <div className="row my-3">
                          <div className="col-md-8">
                            <h6>Current password</h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.current_password}
                              name="current_password"
                              onChange={inputHandler}
                            />
                            <h6>New password</h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.password}
                              name="password"
                              onChange={inputHandler}
                            />
                            <h6>Confirm password</h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.password_confirmation}
                              name="password_confirmation"
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <button type="submit" className="buttonWrap">
                          <ButtonIcon
                            src="../../images/right-arrow.png"
                            text="Submit"
                            id="btn_radius"
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default UserViewDetails;
