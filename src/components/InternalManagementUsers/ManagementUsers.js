import React, { useState, useEffect } from 'react'
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import Button from "../Others/Button";
import Tabs from "react-bootstrap/Tabs";
import axios from 'axios';
import Tab from "react-bootstrap/Tab";

import { Link } from "react-router-dom";
import ButtonIcon from "../Others/ButtonIcon";
import ManagementUsersList from './ManagementUsersList';

function ManagementUsers() {

  //getting project Types
  let token = localStorage.getItem("auth_token");
     
 
  const [loading, setLoading] = useState(true)

  


  const clock = <img src="/images/Icon awesome-file-alt.svg" alt="not found" />;


  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="activeclass" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span>{clock} Management Users</span>}>
              <div className="d-flex justify-content-end projectmaintabs">
               
               
                <div className="projectmaintabs_sec">
                  <Link to="/AddManagementUser" className="side_links">
                    <ButtonIcon
                      text="Add User"
                      src="../../images/Icon ionic-ios-add (2).svg"
                      id="btn_radius"
                    />
                  </Link>
                </div>
              </div>
              <ManagementUsersList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default ManagementUsers;
