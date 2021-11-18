import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Others/Loader";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";

const ManagementUsersList = () => {
  const [loading, setLoading] = useState(true);
  const [ManagementUsersList, setManagementUsersList] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  console.log(ManagementUsersList, "ManagementUsersList");
  const url =
    "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/internalManagementUserList";
  let token = localStorage.getItem("auth_token");
  toast.configure();

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "usrtslist");
        setManagementUsersList(response.data.users);
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
          `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/internalManagementUserList/${id}`,
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
          toast("User Deleted Succesfully", { type: "success" });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
   
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 8;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(ManagementUsersList.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const currentPosts = ManagementUsersList.slice(offset, offset + PER_PAGE);

  return (
    <>
  
      <div className="searchbar">
        <img
          src="/images/Icon awesome-filter.svg"
          className="mx-3"
          alt="not found"
        />
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
      <div style={{ overflow: "hidden" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>User Name</th>

              <th>User email</th>
              <th>Veiw Details</th>
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

                    <td>{item.email} </td>
                    <td>
                      <div className="editDelete">
                        <Link
                          to={`/ManagementUserViewDetails/${item.id}`}
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

export default ManagementUsersList;
