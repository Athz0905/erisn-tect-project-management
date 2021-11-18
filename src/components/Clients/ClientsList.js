import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Others/Loader";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dateFormat from "dateformat";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ClientsList = () => {
  let token = localStorage.getItem("auth_token");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("auth_token");

    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/potential-projects",
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
        console.log(response.data.projects);
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
          toast("Project Deleted Succesfully", { type: "success" });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
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
          toast("Project Trashed Succesfully", { type: "success" });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
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
          window.location.reload(false);
          console.log("Project Restored Succesfully");
          toast("Project Restored Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const endDate = dateFormat(projects.endDate, "mmm d, yyyy");

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
    <>
      <hr />
      <div className="searchbar">
        {showsearchnbtncond ? <Showsearchnbtn /> : null}
      </div>

      <div style={{ overflow: "hidden" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Client Name</th>
              <th> Project Name</th>
              <th>Project Type</th>
              <th className="text-center"> Estimated Agreement Date </th>
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
                    <td>{item.clientName}</td>
                    <td> {item.projectName}</td>
                    <td>{item.businessType} </td>
                    <td>{endDate}</td>
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
                            style={{ cursor: "pointer", marginLeft: "6%" }}
                            onClick={() => deleteHandler(item.id)}
                          />
                        </>
                      ) : (
                        <DeleteOutlineIcon
                          onClick={() => trashHandler(item.id)}
                          style={{ cursor: "pointer" }}
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
    </>
  );
};

export default ClientsList;
