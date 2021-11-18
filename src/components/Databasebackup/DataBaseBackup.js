import React, { useState, useEffect } from "react";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import { saveAs } from "file-saver";
import qs from "qs";
import { Button } from "react-bootstrap";

const DataBaseBackup = () => {
  let token = localStorage.getItem("auth_token");
  const [backupdata, setbackupdata] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://freshhu.com/cnu/projectmanagement/api/admin/master/database-backup",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data, "statusresp");
        console.log(response.data);
        setbackupdata(response.data);
      })
      .catch((error) => {
        console.log("fail");
      });
  }, [token]);

  const downloaddata = () => {
    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/master/database-backup/download",
        [],

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log("success");
        saveAs(response.data.filePath, response.data.message);
      })

      .catch((error) => {
        console.error("There was an error!", error.response);
      });
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="mb-3">
            <h5 style={{ fontWeight: "600", marginBottom: "0%" }}>
              Database Backup
            </h5>
          </div>
          <Button variant="danger" size="sm" onClick={downloaddata}>
            Download Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataBaseBackup;
