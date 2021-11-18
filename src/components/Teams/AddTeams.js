import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import qs from "qs";
import Select from "react-select";
import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTeams = ({ history }) => {
  const [heading, setHeading] = useState("");
  const [notes, setNotes] = useState("");

  toast.configure();

  let token = localStorage.getItem("auth_token");

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [deadlineDate, setDeadlineDate] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [teamType, setTeamType] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");

  // fetch project team type

  const [projectTeamType, setProjectTeamType] = useState([]);

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
      .then((response) => {
        console.log(response.data);
        setProjectTeamType(response.data.projectTeamTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //fetch users

  const [usersList, setUsersList] = useState([]);

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
        console.log(response.data);
        setUsersList(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const teamPeople = [];

  for (let i = 0; i < usersList.length; i++) {
    teamPeople.push({
      value: usersList[i].id,
      label: usersList[i].firstName + " " + usersList[i].lastName,
    });
  }

  const [teamTypeUsers, setTeamTypeUsers] = useState([]);

  // handle onChange event of the dropdown
  const handleTeamType = (e) => {
    setTeamTypeUsers(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  console.log(Object.values(teamTypeUsers), "teams");

  const team = {
    project_id: id,
    projectTeamType_id: teamType,
    teamName: teamName,
    deadlineDate: deadlineDate,
    teamMembers_id_list: Object.values(teamTypeUsers),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(team.teammembers_id_list, "list");

    axios
      .post(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/teams`,
        qs.stringify(team),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Team Added Succesfully", { type: "success" });
        history.push("/admin/project/projects");
      })

      .catch((error) => {
        console.log("there is an error y", error.response);
        setError(true);
        setErrorMessage(error.response.data.message);

        var array = error.response.data.errors;

        // for (const [key, value] of Object.entries(array)) {

        //   console.log(`${key}: ${value}`);

        //   localStorage.setItem("errorsval", `${value}`);

        //   let errorsval = localStorage.getItem("errorsval");

        //   toast(errorsval, { type: "error" });

        // }
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
          {error && <Message variant="danger"> {errorMessage}</Message>}

          <h3 className="projectheadline" style={{ marginBottom: "2%" }}>
            {" "}
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginRight: "1%",
              }}
              onClick={() => history.goBack()}
            />{" "}
            Create Team
          </h3>
          <form action="">
            <div className="addnotes_feilds">
              <h6>Team Name*</h6>
              <input
                type="text"
                placeholder="Add Name"
                name="heading"
                className="todo-input edit"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <br />
            </div>
            <br />
            <div className="row">
              <div className="addnotes_feilds col-md-3">
                <h6>Team Type*</h6>
                <select
                  style={{
                    border: "1px solid darkgray",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setTeamType(e.target.value)}
                >
                  <option>Select</option>
                  {projectTeamType.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="addnotes_feilds col-md-3">
                <h6>Add Team*</h6>

                <Select
                  style={{ height: "10vh" }}
                  onChange={handleTeamType}
                  isMulti
                  name="projectTypes"
                  value={teamPeople.filter((obj) =>
                    teamTypeUsers.includes(obj.value)
                  )} // set selected values
                  options={teamPeople}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>

            <div className="row">
              <div
                className="col-md-3 addnotes_feilds"
                style={{ marginTop: "2%" }}
              >
                <h6>Deadline Date*</h6>
                <input
                  type="date"
                  className="inp_feild"
                  value={deadlineDate}
                  onChange={(e) => {
                    setDeadlineDate(e.target.value);
                  }}
                />
              </div>
            </div>

            <Button
              style={{ marginTop: "1%" }}
              variant="danger"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Create{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeams;
