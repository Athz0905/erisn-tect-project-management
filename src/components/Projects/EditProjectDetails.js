import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import Select from "react-select";
import Message from "../../components/Others/Message";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import validation from "../../validation";

import "react-toastify/dist/ReactToastify.css";

const EditProjectDetail = ({ history }) => {
  let Baseurl = "https://freshhu.com/cnu/projectmanagement/api";
  const url = `${Baseurl}/admin/projectManagement/projects`;
  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [selectClient, setSelectClient] = useState("");
  const [Projectcost, setProjectcost] = useState("");
  const [ClosureTime, setClosureTime] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [Business, setBusiness] = useState("");
  const [Projectname, setProjectname] = useState("");
  const [ProjectType, setProjectType] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [ProgLang, setProgLang] = useState([]);
  const [referral, setReferral] = useState("");
  const [potentialProject, setPotentialProjects] = useState("");

  const [values, setValues] = useState({
    Projectcost: "",
    ClosureTime: "",
    StartDate: "",
    Business: "",
    Projectname: "",
    referral: "",
    potentialProject: "",
    status: "",
  });

  const handleChangesHappened = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [status, setStatus] = useState("");

  // const resultone = (e) => {
  //   setProgLang(e.target.value);
  // };
  // const resulttwo = (e) => {
  //   setReferral(e.target.value);
  // };
  // const resultthree = (e) => {
  //   setSelectClient(e.target.value);
  // };

  //getting clients

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/clients",
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
        setClients(response.data.clients);
        console.log(clients);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const clientLists = [];

  for (let i = 0; i < clients.length; i++) {
    clientLists.push({
      value: clients[i].id,
      label: clients[i].firstName,
    });
  }

  const [value, setValue] = useState("");

  const changeHandler = (value) => {
    setValue(value);
  };

  console.log(value.value);

  //getting Technologies

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTechnologies",
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
        setTechnologies(response.data.projectTechnologies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //getting project Types

  const [proTypes, setproTypes] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTypes",
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
        setproTypes(response.data.projectTypes);

        setLoading(false);
        console.log(response.data.projectTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const people = [];

  for (let i = 0; i < technologies.length; i++) {
    people.push({
      value: technologies[i].id,
      label: technologies[i].name,
    });
  }
  const peopletype = [];

  for (let i = 0; i < proTypes.length; i++) {
    peopletype.push({
      value: proTypes[i].id,
      label: proTypes[i].name,
    });
  }

  const [selectedValue, setSelectedValue] = useState([]);
  const [showerrormsg, setshowerrormsg] = useState();
  console.log(showerrormsg, "showerrormsg");

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const [projecttypeselect, setprojecttypeselect] = useState([]);

  // handle onChange event of the dropdown
  const handleChanges = (e) => {
    setprojecttypeselect(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //getting project details

  let pName = localStorage.getItem("project-name");
  let bType = localStorage.getItem("business-type");
  let pCost = localStorage.getItem("project-cost");
  let startDateproj = localStorage.getItem("startDateproj");
  let endDateproj = localStorage.getItem("endDateproj");

  useEffect(() => {
    if (
      (values.Projectname,
      values.Business,
      values.Projectcost,
      values.StartDate,
      values.ClosureTime == "")
    ) {
      setValues({
        Projectname: pName,
        Business: bType,
        StartDate: startDateproj,
        ClosureTime: endDateproj,
        Projectcost: pCost,
      });
    } else {
      console.log("details are filled");
    }
  }, [id]);

  //display project status by project id

  const [projectStatus, setProjectStatus] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList`,
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
        setLoading(false);
        console.log("Status Fetched Succesfully");
        console.log(response.data.projectStatusLists, "status list");
        setProjectStatus(response.data.projectStatusLists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handle create submit
  //updating the project

  const project = {
    client_id: value.value,
    projectName: values.Projectname,
    businessType: values.Business,
    cost: values.Projectcost,
    referral: values.referral,
    startDate: values.StartDate,
    endDate: values.ClosureTime,
    potentialProject: potentialProject,
    status: status,
    projectType_id_list: Object.values(selectedValue),
    projectTechnology_id_list: Object.values(projecttypeselect),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorss = 0;
    e.preventDefault();
    setErrors(validation(values));
    console.log(project);

    if (
      (values.Projectname,
      values.Business,
      values.Projectcost,
      values.referral,
      values.StartDate,
      values.ClosureTime,
      potentialProject == "")
    ) {
      errorss++;
    } else {
      errorss = 0;
    }

    if (errorss == 0) {
      axios
        .put(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${id}`,
          qs.stringify(project),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )

        .then((response) => {
          console.log(response.status);

          history.push("/admin/project/projects");
          toast("Project Updated Succesfully", { type: "success" });
        })

        .catch((error) => {
          console.error("There was an error!", error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const selectpotentialproject = (e) => {
    setPotentialProjects(e.target.value);
    if (e.target.value == 0) {
      setShowResults(true);
    }
    if (e.target.value == 1) {
      setShowResults(false);
    }
  };

  const Results = () => (
    <div className="">
      <h6>Status</h6>
      <select
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      >
        <option>Select</option>
        {projectStatus.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );

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
              {" "}
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "0.5%" }}
                onClick={() => history.goBack()}
              />{" "}
              Edit Project Details
            </h3>
            {error && <Message variant="danger">{errorMessage}</Message>}
            <form>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Name*</h6>
                  <input
                    type="text"
                    name="Projectname"
                    className="inp_feild"
                    value={values.Projectname}
                    onChange={handleChangesHappened}
                  />
                  {errors.Projectname && (
                    <p className="error">{errors.Projectname}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Business Type*</h6>
                  <input
                    type="text"
                    name="Business"
                    className="inp_feild"
                    value={values.Business}
                    onChange={handleChangesHappened}
                  />
                  {errors.Business && (
                    <p className="error">{errors.Business}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Cost*</h6>
                  <input
                    type="text"
                    name="Projectcost"
                    className="inp_feild"
                    value={values.Projectcost}
                    onChange={handleChangesHappened}
                  />
                  {errors.Projectcost && (
                    <p className="error">{errors.Projectcost}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Referral*</h6>
                  <select onChange={handleChangesHappened} name="referral">
                    <option></option>
                    <option value="yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.referral && (
                    <p className="error">{errors.referral}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Start Date*</h6>
                  <input
                    type="date"
                    name="StartDate"
                    className="inp_feild"
                    value={values.StartDate}
                    onChange={handleChangesHappened}
                  />
                  {errors.StartDate && (
                    <p className="error">{errors.StartDate}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Estimated Closure Time*</h6>
                  <input
                    type="date"
                    name="ClosureTime"
                    className="inp_feild"
                    value={values.ClosureTime}
                    onChange={handleChangesHappened}
                  />
                  {errors.ClosureTime && (
                    <p className="error">{errors.ClosureTime}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Select Project Type*</h6>

                  <Select
                    onChange={handleChanges}
                    isMulti
                    name="projectTypes"
                    options={peopletype}
                    value={peopletype.filter((obj) =>
                      projecttypeselect.includes(obj.value)
                    )} // set selected values
                    options={peopletype}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div className="col-md-3">
                  <h6>Select Technologies*</h6>

                  <Select
                    onChange={handleChange}
                    isMulti
                    name="projectTechs"
                    options={people} // set list of the data}
                    value={people.filter((obj) =>
                      selectedValue.includes(obj.value)
                    )} // set selected values
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Select Client*</h6>
                  <Select
                    options={clientLists}
                    value={value}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-md-3">
                  <h6>Potential Project*</h6>
                  <select onChange={selectpotentialproject}>
                    <option>Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {/* {errors.potentialProject && <p className="error">{errors.potentialProject}</p>} */}
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  {showResults ? <Results /> : null}
                </div>
              </div>

              <Button type="submit" variant="danger" onClick={handleSubmit}>
                Update{" "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectDetail;
