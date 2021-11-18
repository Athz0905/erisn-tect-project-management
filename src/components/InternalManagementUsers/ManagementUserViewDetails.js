import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Loader from "../Others/Loader"
import ButtonIcon from "../Others/ButtonIcon";
import Button from "../Others/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";

function ManagementUserViewDetails() { 
  let history = useHistory();
  const [loading, setLoading] = useState(true);
 
  const [managementuserdetails, sestmanagementuserdetails] = useState([]);
  const location = useLocation();

  const id = location.pathname.split("/")[2];  
console.log(id, "id");
  
    console.log(managementuserdetails, "managementuserdetails")
  const url = `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/internalManagementUserList/${id}`;
  let token = localStorage.getItem("auth_token");
  localStorage.setItem("managementuser-firstname", managementuserdetails.firstName);
  localStorage.setItem("managementuser-email", managementuserdetails.email);
  localStorage.setItem("managementuser-lastname", managementuserdetails.lastName);
  
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
        console.log(response.data , "sadasdfasdf"); 
        sestmanagementuserdetails(response.data.user); 
      
        setLoading(false);
      })
      .catch((error) => {
        console.log("there is an error y", error);
       

      }); 

  }, []);




  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="activeclass" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />
          <h3 className="projectheadline">
            
            <img
              src="/images/backarrows.svg"
              width="25px"
              alt="img not found" 
              style={{cursor: "pointer", marginRight :"0.5%"}} onClick={() => history.goBack()}
            />
            Management User Details
          </h3>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span> Management User Details</span>}>
              {loading ? <Loader></Loader> :
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>User Name</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>
                          {managementuserdetails.firstName + " " + managementuserdetails.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Email ID</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{managementuserdetails.email}</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>User Role</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{managementuserdetails.roleName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               }
            </Tab>
           
             
          
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ManagementUserViewDetails;
