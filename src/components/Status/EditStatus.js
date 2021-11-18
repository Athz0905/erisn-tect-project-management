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

const EditStatus = ({ history }) => {
  const [status, setStatus] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState(false);

  toast.configure();

  let token = localStorage.getItem("auth_token");

  //filling status details

  let statusName = localStorage.getItem("statusName");
  let statusOrder = localStorage.getItem("statusOrder");

  useEffect(() => {
    if ((status, orderNo == "")) {
      setStatus(statusName);
      setOrderNo(statusOrder);
    } else {
      console.log("details are filled");
    }
  }, []);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const statusList = {
    name: status,
    moveTargetOrderNo: orderNo,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(statusList);

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList/${id}`,
        qs.stringify(statusList),
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
        toast("Status Updated Succesfully", { type: "success" });
        history.push("/admin/masterMenu/projectStatusList");
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
          <h5
            className="projectheadline"
            style={{ marginBottom: "2%", fontWeight: "600" }}
          >
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
            Edit Status
          </h5>
          <form action="">
            <div className="addnotes_feilds">
              <h6> Status Name*</h6>
              <input
                type="text"
                placeholder="Add Status"
                name="heading"
                autoComplete="off"
                className="todo-input edit"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <br />
            </div>
            <div className="addnotes_feilds" style={{ marginTop: "2%" }}>
              <h6> Order No*</h6>
              <input
                type="text"
                placeholder="Add Status"
                name="heading"
                autoComplete="off"
                className="todo-input edit"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
              />
              <br />
            </div>
            <br />
            <Button
              style={{ marginTop: "1%" }}
              variant="danger"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Edit{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStatus;
