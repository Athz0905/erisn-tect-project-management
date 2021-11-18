import React, { useState, useEffect } from 'react'
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import {  Table, Button } from 'react-bootstrap';
import Loader from "../../components/Others/Loader"
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Message from "../Others/Message";
import ButtonIcon from '../Others/ButtonIcon';
import EditIcon from '@mui/icons-material/Edit';


const ProjectStatusList = ( { history }) => {
    toast.configure();

    let token = localStorage.getItem("auth_token");

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const location = useLocation();
    const id = location.pathname.split("/")[2];



    //display project status by project id

    const [projectStatus, setProjectStatus] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Status Fetched Succesfully");
          console.log(response.data.projectStatusLists, "status list");
          setProjectStatus(response.data.projectStatusLists);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

     //edit status

  const editStatusHandler = (id) => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Status Fetched Succesfully");
        localStorage.setItem("statusId", response.data.status.id);
        localStorage.setItem("statusName", response.data.status.name);
        localStorage.setItem("statusOrder", response.data.status.orderNo);
        history.push(`/EditStatus/${id}`)
      })
      .catch((error) => {
        console.log(error);
      });
  };

   //delete status

   const deleteStatusHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Status Data Deleted Succesfully");
          window.location.reload(false);
          toast("Status Data Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          setError(true)
          setError(error.response.data.message)
          console.log(error);
        });
    }
  };

   

   
    return (
        <div>
             <div className="Proj_main">
        <div className="Proj_main_l">
            <Sidebar />
        </div>

        <div className="Proj_main_r">
            <Header />
         
    
<div className="projectmaintabs" style={{marginTop:'7%',justifyContent: 'space-between',display: 'flex',width: '90%',margin: '0% auto 2% auto'}}>


    <div>
    <h4
        style={{
            fontSize: "22px",
            fontWeight: "800",
            textAlign: "left",
            marginBottom:'1%'
            }}
                >
            {" "}
            Project Status List
        </h4>
    </div>

 <div className="" >
 <Link to={"/AddStatus"} className='side_links'>
   <ButtonIcon 
    text='Add Status'
    src='../../images/Icon ionic-ios-add (2).svg' 
    id='btn_radius' />

  </Link> 
   </div>


 </div>
   

   

      <div className="status-container">
                  {error && <Message variant='danger'>{error}</Message>}
                     {projectStatus.map((item) => ( 
                       <div
                        className="url-box"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "2%",
                        }}
                      >
                        <div style={{ marginLeft: "2%" }}>
                          <h5 style={{ fontSize: "15px", fontWeight: "600",paddingTop:'5%' }}>
                            {item.name}
                          </h5>
                          
                        </div>
                        <div>
                          <EditIcon
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => editStatusHandler(item.id)}
                          />
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteStatusHandler(item.id)}
                          />
                        </div>
                      </div> 
                ))} 
         </div>
   </div>


    </div>

      
        </div>
       
    )
}

export default ProjectStatusList



