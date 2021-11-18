import React, { useState, useEffect } from 'react'
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import axios from 'axios';
import Tab from "react-bootstrap/Tab";
import ClientList from "./ClientList";
import { Link } from "react-router-dom";
import ButtonIcon from "../../components/Others/ButtonIcon";

function Clients() {

        //getting project Types
        let token = localStorage.getItem("auth_token");
     
        const [proTypes, setproTypes] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
          axios
            .get("https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectTypes", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
              },
            })
            .then((response) => {
              setproTypes(response.data.projectTypes);
             
              setLoading(false)
              console.log(response.data.projectTypes);
            })
            .catch((error) => {
              console.log(error);     
            });
        }, [token]);


  const clock = <img src="/images/Icon awesome-file-alt.svg" alt="not found" />;

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2="activeclass"
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

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span>{clock} All Clients</span>}>
              <div className="d-flex justify-content-end projectmaintabs">
              
                <div className="projectmaintabs_sec">
                  <Link to="/addClients" className="side_links">
                    <ButtonIcon
                      text="Add Client"
                      src="../../images/Icon ionic-ios-add (2).svg"
                      id="btn_radius"
                    />
                  </Link>
                </div>
              </div>
              <ClientList />
            </Tab>
         
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Clients;
