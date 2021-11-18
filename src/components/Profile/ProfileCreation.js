import React from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "../../components/Others/Button";
import ProjectList from "../../components/Projects/ProjectList";
import ClientsList from "../../components/Clients/ClientsList";
import { Link } from "react-router-dom";
import ProfileLiatTable from "./ProfileLiatTable";

const ProfileCreation = () => {
  const clock = <img src="/images/Icon awesome-file-alt.svg" />;
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />
        <div className="profileCreation">
          <h1>Profile Creation</h1>
          <div>
          <Link to='/ProfileInviteUsers' className='side_links'>
          <Button
  text='Invite Users'/>
  </Link> 

          </div>
          
        </div>

        <ProfileLiatTable/>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
