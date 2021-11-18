import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ClientsList from "../Clients/ClientList";
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import "../../Veiwdetail.css";
import Loader from "../../components/Others/Loader";
import axios from "axios";

function ClientViewDetails(props) {
  const [loading, setLoading] = useState(true);
  const [clientDetails, setClientDetails] = useState([]);
  const location = useLocation();
  const history = useHistory()
  const id = location.pathname.split("/")[2];
  const url = `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/clients/${id}`;
  let token = localStorage.getItem("auth_token");
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
        console.log(response.data.client);
        setClientDetails(response.data.client);
        localStorage.setItem(
          "client-first-name",
          response.data.client.firstName
        );
        localStorage.setItem("client-email", response.data.client.email);
        localStorage.setItem("client-last-name", response.data.client.lastName);
        localStorage.setItem("client-phone", response.data.client.phone);
        localStorage.setItem("client-address", response.data.client.address);
        localStorage.setItem(
          "client-sourceoflead",
          response.data.client.sourceOfLead
        );
        localStorage.setItem("client-state", response.data.client.state);
        localStorage.setItem("client-country", response.data.client.country);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

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
          <h3 className="projectheadline">
            {" "}
            <img src="/images/backarrows.svg" width="25px" style={{cursor: "pointer"}} onClick={() => history.goBack()}/> Client
            Details
          </h3>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span> Client Details</span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                {loading ? (
                    <Loader />
                  ) : (
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Client Name</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>
                          {clientDetails.firstName +
                            " " +
                            clientDetails.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Email ID</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{clientDetails.email}</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Phone Number</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{clientDetails.phone}</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Address</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> {clientDetails.address}</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Source of lead</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{clientDetails.sourceOfLead}</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>State</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{clientDetails.state}</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Country</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>{clientDetails.country}</p>
                      </div>
                    </div>
                    <Link to={`/editClient/${id}`} className="side_links">
                      <Button style={{marginTop:'2%'}} variant="danger" size="md"> Edit</Button>
                    </Link>
                  </div>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ClientViewDetails;
