import React from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "../../components/Others/Button";
import ProjectList from "../../components/Projects/ProjectList";
import ClientsList from "../../components/Clients/ClientsList";
import { Link } from "react-router-dom"; 
import "../../Veiwdetail.css";
import BillingDetailTable from "../../components/Billing/BillingdetailTable";
const ClientProjectDetail = () => {

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar 
              cname1=""
              cname2="activeclass"
              cname3=""
              cname4="" />
        </div>

        <div className="Proj_main_r">
          <Header />

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
          
            <Tab eventKey="home" title={<span> Client Details </span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Client Full Name</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>Chris Morgan</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Email Address</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>+1 6595586658</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Phone</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>+1 6595586658</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Address</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> 1405 Nagel Ct, West Chicago, IL, 60185</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Source of Lead </h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>India Mart</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>State </h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>Chicago</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Country</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>United States</p>
                      </div>
                    </div>
                    <Link to="/AddClient" className="side_links">
                    <Button text="edit" />
                    </Link>
                  </div>
                  <div className="viewdetail_r"></div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title={<span> Project Details</span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Project Name</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>ErisnTech Billing Software</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Business Type</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>POS Billing</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Project Type</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>Website</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Platform</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> PHP</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Project Cost</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>₹ 1,00,000</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Start Date</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>09-Sep-2021</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Estimated Closure Time</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>09-Nov-2021</p>
                      </div>
                    </div>
                    <Link to="/AddClient" className="side_links">
                    <Button text="edit" />
                    </Link>

                  </div>
                  <div className="viewdetail_r"></div>
                </div>
              </div>
            </Tab>
           
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ClientProjectDetail;
