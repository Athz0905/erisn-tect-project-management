import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNotes = ({ history }) => {
  const [heading, setHeading] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);

  toast.configure();

  let token = localStorage.getItem("auth_token");

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const discussion = {
    project_id: id,
    heading: heading,
    description: notes,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(discussion);

    axios
      .post(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/discussions`,
        qs.stringify(discussion),
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
        toast("Discussion Added Succesfully", { type: "success" });
        history.push("/admin/project/projects");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
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
          <h5 className="projectheadline" style={{ marginBottom: "2%" }}>
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
            Add Discussions
          </h5>
          <form action="">
            <div className="addnotes_feilds">
              <h6>Add Heading*</h6>
              <input
                type="text"
                placeholder="Add Heading"
                name="heading"
                className="todo-input edit"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <br />
            </div>
            <br />

            <div className="addnotes_feilds">
              <h6>Notes*</h6>
              <textarea
                placeholder="Add Notes"
                name="notes"
                className="todo-input edit"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <Button
              style={{ marginTop: "1%" }}
              variant="danger"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Add{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
