import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Others/Loader";
import ClientsList from "../../components/Clients/ClientsList";
import { Link } from "react-router-dom";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { useLocation } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPaginate from "react-paginate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Message from "../Others/Message";

function Projects() {
  toast.configure();

  let token = localStorage.getItem("auth_token");

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

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

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects",
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
        console.log(response.data, "projects");
        setProjects(response.data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //delete projects

  const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${id}`,
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
          setLoading(false);
          console.log("Project Deleted Succesfully");
          window.location.reload(false);
          toast("Project Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //trash projects

  const trashHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to trash ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${id}`,
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
          setLoading(false);
          console.log("Project Trashed Succesfully");
          window.location.reload(false);
          toast("Project Trashed Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //restore projects

  const restoreHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to restore ?");
    if (todelete) {
      axios
        .get(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${id}/restore`,
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
          setLoading(false);
          console.log("Project Restored Succesfully");
          window.location.reload(false);
          toast("Project Restored Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clock = <img src="/images/Icon awesome-file-alt.svg" />;

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

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 2;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(projects.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  const currentPosts = projects.slice(offset, offset + PER_PAGE);

  const Showsearchnbtn = () => (
    <div className="">
      <img src="/images/Icon awesome-filter.svg" class="mx-3" />
      <input
        type="text"
        placeholder="Search"
        autoFocus
        value={searchbar}
        style={{
          border: "1px solid darkgray",
          padding: "3px 5px",
          borderRadius: "5px",
        }}
        onChange={(e) => {
          setsearchbar(e.target.value);
        }}
      />
    </div>
  );

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span>{clock} Existing Projects</span>}>
              <div className="d-flex justify-content-end projectmaintabs">
                <div className="mx-5 my-3">
                  <h6 className="" style={{ marginLeft: "49px" }}>
                    Status
                  </h6>
                  <img src="/images/Icon awesome-filter.svg" className="mx-3" />
                  <select
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Select</option>
                    {projectStatus.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                {/* <div  className="mx-5 my-3">
  <h6>Project Type</h6>
  <select  
     style={{border:'1px solid darkgray', padding:'3px 5px', borderRadius:'5px'}}
     
  > 
      {proTypes.map((item) => (
          <option value={item.name}>{item.name}</option>
      ))}    
  </select>
 </div>  */}

                <div className="projectmaintabs_sec">
                  <Link to={"/AddProjectDetail"} className="side_links">
                    <ButtonIcon
                      text="Add Project"
                      src="../../images/Icon ionic-ios-add (2).svg"
                      id="btn_radius"
                    />
                  </Link>
                </div>
              </div>
              {/* //project details */}
              <hr />
              <div className="searchbar">
                {showsearchnbtncond ? <Showsearchnbtn /> : null}
              </div>

              <div style={{ overflow: "hidden" }}>
                {error && <Message variant="danger"> {errorMessage}</Message>}
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>SI NO</th>
                      <th>Project Name</th>
                      <th> Client Name</th>
                      <th>Business Type</th>
                      <th> Status </th>
                      <th> Action </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      currentPosts
                        .filter((item) => {
                          if (searchbar == "") {
                            return item;
                          } else if (
                            item.projectName
                              .toLowerCase()
                              .includes(searchbar.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.projectName}</td>
                            <td> {item.clientName}</td>
                            <td>{item.businessType} </td>
                            <td>{item.status}</td>
                            <td>
                              {item.deleted_at !== null ? (
                                <Button variant="danger" size="sm" disabled>
                                  View Details
                                </Button>
                              ) : (
                                <Link
                                  to={`/ProjectVeiwDetail/${item.id}`}
                                  className="signuplinks"
                                >
                                  <Button variant="danger" size="sm">
                                    View Details{" "}
                                  </Button>
                                </Link>
                              )}
                            </td>

                            <td>
                              {item.deleted_at ? (
                                <>
                                  <RestoreIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => restoreHandler(item.id)}
                                  />
                                  <DeleteForeverIcon
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "6%",
                                    }}
                                    onClick={() => deleteHandler(item.id)}
                                  />
                                </>
                              ) : (
                                <DeleteIcon
                                  onClick={() => trashHandler(item.id)}
                                  style={{ cursor: "pointer", color: "red" }}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </Table>
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </div>
              {/* project details-end */}
            </Tab>
            <Tab
              eventKey="profile"
              title={<span>{clock} Potential Projects </span>}
            >
              <div className="d-flex justify-content-end projectmaintabs">
                <div className="mx-5 my-3">
                  <h6 style={{ marginLeft: "49px" }}>Status</h6>
                  <img src="/images/Icon awesome-filter.svg" className="mx-3" />
                  <select
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Select</option>
                    {projectStatus.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ClientsList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Projects;
