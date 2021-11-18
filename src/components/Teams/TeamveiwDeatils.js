import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Button from "../../components/Others/Button";
const TeamveiwDeatils = () => {
    return (
        <div className="">
              <div className="Proj_main">
        <div className="Proj_main_l">
            <Sidebar 
                cname1=""
                cname2=""
                cname3="activeclass"
                cname4="" />
        </div>

        <div className="Proj_main_r">
            <Header />
            <h4 className="deadline_text"> Team</h4> 
          <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Team Name</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>ErisnTech Billing Software</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5> Total Employees Working</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>5 Employees</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>UI/UX Designer</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>Jhon, Trivas</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>UI/UX Developer</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> Franklin, Rick</p>
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Backend Developer </h5>
                      </div>
                      <div className="viewdetail_r">
                        <p>Steve </p>
                      </div>
                    </div>

                    <h4 className="deadline_text"> Deadline</h4> 
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>UI/UX Developer</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> <img  src="/images/Icon awesome-calendar-alt.svg" width="15px"/> 07-Oct-2021</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Backend Developer</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> <img  src="/images/Icon awesome-calendar-alt.svg" width="15px"/> 07-Oct-2021</p>
                      </div>
                    </div>
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>UI/UX Designer</h5>
                      </div>
                      <div className="viewdetail_r">
                        <p> <img  src="/images/Icon awesome-calendar-alt.svg" width="15px"/> 07-Oct-2021</p>
                      </div>
                    </div>
                    <Link to="/ProjectVeiwDetail">
                    <Button text="edit" />
                    </Link>
                  </div>
                  <div className="viewdetail_r"></div> 
                </div>
              </div>
            
        </div>
        </div>
        </div>
    )
}

export default TeamveiwDeatils;
