import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { Button } from "react-bootstrap"
import "../../Veiwdetail.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import dateFormat from "dateformat";
import Loader from "../../components/Others/Loader"
import axios from "axios";

function RoleViewDetail({ history }) { 
  

  let token = localStorage.getItem("auth_token");

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    console.log(id);

    const [loading, setLoading] = useState(true)
    const [roleDetails, setRoleDetails] = useState([])
    const [permissions, setPermissions] = useState([])
    
    


    useEffect(() => {
      axios
        .get(`https://freshhu.com/cnu/projectmanagement/api/admin/master/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          console.log(response.data.accessable_menus);
          setRoleDetails(response.data.role);
          setPermissions(response.data.accessable_menus)
         
          localStorage.setItem("role-name", response.data.role.name)
        
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);

    const createdAt = dateFormat(roleDetails.created_at, "yyyy-mm-dd")


    
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="" cname5='' cname6='activeclass' />
        </div>

        <div className="Proj_main_r">
          <Header />
          <h3 className="projectheadline">
            {" "}
            <img src="/images/backarrows.svg" width="25px" style={{cursor: "pointer"}} onClick={() => history.goBack()}/> Role
            Details
          </h3>
         
         
           <div className="  projectmaintabs">
                <div className="viewdetail">

                  {loading ? <Loader /> :
                  <div className="viewdetail_l">
                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Role Name</h5>
                      </div>
                      <div className="viewdetail_r">
                       {roleDetails.name}
                      </div>
                    </div>

                    <div className="d-flex viewdetail">
                      <div className="viewdetail_l">
                        <h5>Created At</h5>
                      </div>
                      <div className="viewdetail_r">
                      {dateFormat(createdAt, "mmm d, yyyy")}
                      </div>
                    </div>

                    
                      <div className="viewdetail_l">
                        <h5>Permissions</h5>
                      </div>

                  {permissions.map((item, index) => {
                if (item.menus.length == 0) {
                  return (
                    <>
                    <div  key={item.id}>
                      <FormControlLabel
                     
                        control={
                          <Checkbox name="permission"
                          disabled  />
                        }
                        label={item.name}
                      />
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <ul style={{paddingLeft:'0px', marginBottom:'0px'}}> 
                        <li key={item.id} > 
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="permission"
                                disabled
                              />
                            }
                            label={item.name}
                          />
                        </li>
                   
                          {item.menus.map((menus, index) => (
                         
                              <li key={menus.id} >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="permission"
                                      disabled
                                    />
                                  }
                                  label={menus.name}
                                />
                               </li>
                         
                          ))}
                     
                      </ul>
                    </>
                  );
                }
              })}
                   

                    
                   
                    <Link to={`/EditRoleDetails/${id}`} className="side_links">
                    <Button variant="danger" size='md' style={{marginTop:'3%'}}>Edit</Button>
                    </Link>
                  </div>
}

                 
                </div>
              </div>
            
        </div>
      </div>

     
    </div>
  );
}

export default RoleViewDetail
