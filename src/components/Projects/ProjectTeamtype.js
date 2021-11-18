import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import qs from "qs";
import { useLocation } from "react-router";
import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const ProjectTeamtype = ({ history }) => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const [searchbar, setsearchbar] = useState("");
  const [showerrormsg, setshowerrormsg] = useState();
  const [error, setError] = useState(false);

  const url =
    "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes";
  const [inpprojectTeamTypes, setinpprojectTeamTypes] = useState({
    name: "",
  });

  let token = localStorage.getItem("auth_token");
  const [projectTeamTypes, setprojectTeamTypes] = useState([]);
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  const [showResults, setshowResults] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setprojectTeamTypes(response.data.projectTeamTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const deleteHandler = (id) => {
    setshowResults("false");
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      setshowResults("false");
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes/${id}`,
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
          window.location.reload(false);
          console.log("Project Deleted successfully");
          toast("Project Deleted successfully", { type: "success" });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log("sdfas", error.response);
          toast(error.response.data.message, { type: "error" });
        });
    }
    setshowResults("false");
  };

  const updateHandler = (id) => {
    setshowResults("true");
    localStorage.setItem("idvalue", `${id}`);

    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        setinpprojectTeamTypes({ name: response.data.projectTeamType.name });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let getusersdata = projectTeamTypes
    .filter((item) => {
      if (searchbar == "") {
        return item;
      } else if (item.name.toLowerCase().includes(searchbar.toLowerCase())) {
        return item;
      }
    })
    .map((item, index) => {
      return (
        <>
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
              {" "}
              <EditIcon
                style={{ color: "#F23801", cursor: "pointer" }}
                onClick={() => updateHandler(item.id)}
              />
              <DeleteIcon
                style={{ color: "#F23801", cursor: "pointer" }}
                onClick={() => deleteHandler(item.id)}
              />
            </td>
          </tr>
        </>
      );
    });
  const projectTeamTypeschanges = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes",
        qs.stringify(inpprojectTeamTypes),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast("Successfully created the project technology", {
          type: "success",
        });
        // if (response.status == 201) {
        //   history.push("/");
        //   toast("successfully reset the password", { type: "success" });
        // } else {
        //   history.push("/ResetPassword");
        //   toast("password must be match and min 8 characters should be there", { type: "error" });
        // }
        window.location.reload(false);
        toast("Successfully created the project technology", {
          type: "success",
        });
      })

      .catch((error) => {
        console.error("There was an error!", error.response);
        localStorage.setItem("errorstatus", error.response.data.errors.name);
        let errorstatus = localStorage.getItem("errorstatus");
        toast(errorstatus, { type: "error" });
        setshowerrormsg(errorstatus);
        setError(true);
        setTimeout(() => setError(false), 3000);
        // toast("password must be match and min 8 characters should be there", { type: "error" });
      });
  };
  const handleupdatevaal = (e) => {
    setinpprojectTeamTypes({
      ...inpprojectTeamTypes,
      [e.target.name]: e.target.value,
    });
  };
  let idvalue = localStorage.getItem("idvalue");
  const urlput = `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTeamTypes/${idvalue}`;

  const updatethevalue = () => {
    axios
      .put(urlput, qs.stringify(inpprojectTeamTypes), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("update");
        console.log(response);

        if (response.status == 201) {
          toast("Successfully Added", { type: "success" });
        } else {
          toast("the given data was invalid ", { type: "error" });
        }

        // if (response.status == 201) {
        //   history.push("/");
        //   toast("successfully reset the password", { type: "success" });
        // } else {
        //   history.push("/ResetPassword");
        //   toast("password must be match and min 8 characters should be there", { type: "error" });
        // }
        window.location.reload(false);
      })

      .catch((error) => {
        console.error("There was an error!", error);
        console.log("error");
        console.log("not update");
        // toast("password must be match and min 8 characters should be there", { type: "error" });
      });
  };

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(getusersdata.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  const currentPosts = getusersdata.slice(offset, offset + PER_PAGE);

  const Showsearchnbtn = () => (
    <div className="">
      <img src="/images/Icon awesome-filter.svg" class="mx-3" />
      <input
        type="text"
        placeholder="Search"
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
          <Sidebar
            cname1=""
            cname2=""
            cname3=""
            cname4=""
            cname5=""
            cname6=""
            cname7=""
            cname8=""
            cname9=""
            cname10=""
          />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="projectType_sec">
            <h3 style={{ fontSize: "23px", fontWeight: "700" }}>
              Project Team Type
            </h3>
            <hr />
            {/* {error && <Message variant="danger">{showerrormsg}</Message>}  */}

            <h5
              className="projectheadline"
              style={{
                marginBottom: "0%",
                fontSize: "18px",
                fontWeight: "600",
                color: "#F23801",
              }}
            >
              Add Project Team Type
            </h5>

            <input
              type="text"
              className="projectype_inp"
              style={{
                border: "1px solid darkgray",
                padding: "3px 5px",
                borderRadius: "5px",
              }}
              name="name"
              value={inpprojectTeamTypes.name}
              onChange={handleupdatevaal}
            />
            {showResults ? (
              <button className="btn_val" onClick={updatethevalue}>
                Update
              </button>
            ) : (
              <button className="btn_val" onClick={projectTeamTypeschanges}>
                Add
              </button>
            )}

            <hr />
            <div className="searchbar">
              {showsearchnbtncond ? <Showsearchnbtn /> : null}
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>SI NO</th>
                  <th>Project Team Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{currentPosts}</tbody>
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
            {/* {getusersdata} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTeamtype;
