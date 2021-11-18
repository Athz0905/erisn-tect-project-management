import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Others/Loader";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../Others/Message";

const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  const [error, setError] = useState("");

  const url =
    "https://freshhu.com/cnu/projectmanagement/api/admin/master/users";
  let token = localStorage.getItem("auth_token");
  toast.configure();

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
        console.log(response.data.users);
        setUsersList(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const deleteClientHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/master/users/${id}`,
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
        .then(() => {
          console.log("User Deleted Succesfully");
          window.location.reload(false);
          toast("User Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(usersList.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  const currentPosts = usersList.slice(offset, offset + PER_PAGE);

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
      {error && <Message variant="danger">{errorMessage}</Message>}
      <div style={{ overflow: "hidden" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>User Name</th>
              <th>Role</th>
              <th>User email</th>
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
                    item.firstName
                      .toLowerCase()
                      .includes(searchbar.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td> {item.roleName}</td>
                    <td>{item.email} </td>
                    <td>
                      <div className="editDelete">
                        <Link
                          to={`/usertDetails/${item.id}`}
                          className="signuplinks"
                        >
                          <Button variant="danger" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteClientHandler(item.id)}
                      />
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

export default ProjectList;
