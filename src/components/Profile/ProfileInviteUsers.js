import React , {useState} from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Button from "../../components/Others/Button";
import { Link } from "react-router-dom";

const ProfileInviteUsers = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [dropdown, setdropdown] = useState("admin");


  const res = [{ firstname }, { lastname }, { email }, { dropdown }];

  console.log(res, ...res);



  return (
    <div className="">
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="invite_users">
            <h1>Invite Users</h1>
            <h6>User Profile</h6>
            <form>
              <div className="row ">
                <div className="col-md-6 my-3">
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e)=> {setfirstname(e.target.value)}}
                  />
                </div>
                <div className="col-md-6 my-3">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e)=> {setlastname(e.target.value)}}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6 my-3">
                  <p>Email Address</p>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e)=> {setemail(e.target.value)}} 
                  />
                </div>
                <div className="col-md-6 my-3">
                  <p>Select Role</p>
                  <select   onChange={(e)=> {setdropdown(e.target.value)}}>
                    <option value="admin">Admin</option>
                    <option value="PHP Developer">PHP Developer</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>
              <Link to="/ProfileusersDetail" className="side_links">
                <Button type="button" text="Invite" />
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInviteUsers;
