import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Icon from '@material-ui/core/Icon'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ComputerIcon from '@mui/icons-material/Computer';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MenuIcon from "@mui/icons-material/Menu"
import MenuOpenIcon  from "@mui/icons-material/MenuOpen"
import AssignmentIndIcon  from "@mui/icons-material/AssignmentInd"
import DeveloperBoardIcon  from "@mui/icons-material/DeveloperBoard"
import TaskIcon   from "@mui/icons-material/Task"
import Loader from "../Others/Loader";

// function Sidebar(props) {
//   const location = useLocation();
//   const { pathname } = location;
//   const splitLocation = pathname.split("/");

//   let token = localStorage.getItem("auth_token");

  
//   const [sidebar, setsidebar] = useState([]);


//   let dashboard = sidebar.map((item) => {
//     if (
//       item.isMainMenu == "1" &&
//       item.menuPresent == "0" 

//     ) {
//       return <li key={item.id}>{item.name}</li>;
//     }
//   });



//   useEffect(() => {
//     axios
//       .get("https://freshhu.com/cnu/projectmanagement/api/admin/auth-menus", {
//         headers: {
//           Authorization: `Bearer ${token}`,

//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//           "Access-Control-Allow-Headers":
//             "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
//         },
//       })
//       .then((response) => {
//         // handle success
//         // console.log(response.data);
//         console.log("sidebar success");
//         setsidebar(response.data);
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       });
//   }, []);

//   // console.log(sidebar);
//   return (
//     <div>
//       <div className="sidebar">
//         <div className="sidebar_block">
//           <div className="sidebar_block_img">
//             <Link to="/DashBoard" className="">
//               <img src="/images/logoimg.png" className="sidebar_logo" alt="" />
//             </Link>
//           </div>
//           <div className="sidebar_block_list">
//             <ul>
//               <Link to="/Dashboard" className={props.cname1}>
//                 <li
//                   className={
//                     splitLocation[1] === "DashBoard" ? "activeclass" : ""
//                   }
//                 >
//                   <DashboardIcon />
//                   Dashboard
//                 </li>
//               </Link>
//               {/* {dashboard} */}
            

//               <Link to="/clients" className={props.cname2}>
//                 <li
//                   className={
//                     splitLocation[1] === "Clients" ? "activeclass" : ""
//                   }
//                 >
//                   <SupervisedUserCircleIcon /> Clients
//                 </li>
//               </Link>

//               <Link to="/Projects" className={props.cname3}>
//                 <li
//                   className={
//                     splitLocation[1] === "Projects" ? "activeclass" : ""
//                   }
//                 >
//                   <WorkIcon /> Projects
//                 </li>
//               </Link>

//               <Link to="/BillingReports" className={props.cname4}>
//                 <li
//                   className={
//                     splitLocation[1] === "BillingReports" ? "activeclass" : ""
//                   }
//                 >
//                   <AssessmentIcon /> Billing Reports
//                 </li>
//               </Link>

//               <Link to="/ProjectTechnologies" className={props.cname5}>
//                 <li
//                   className={
//                     splitLocation[1] === "Users" ? "activeclass" : ""
//                   }
//                 >
//                   <ComputerIcon /> Technology
//                 </li>
//               </Link>
          

//               <Link to='/GetRoles' className={props.cname6}>
//                  <li  className={
//                     splitLocation[1] === "ProfileCreation" ? "activeclass" : ""
//                   }> <AccountBoxIcon /> Roles
//                 </li>
//               </Link>

            

//               <Link to="/users" className={props.cname7}>
//                 <li
//                   className={
//                     splitLocation[1] === "Users" ? "activeclass" : ""
//                   }
//                 >
//                   < ContactsIcon /> Users
//                 </li>
//               </Link>

//               <Link to='/ProjectType' className={props.cname8}>
//                  <li  className={
//                     splitLocation[1] === "ProjectType" ? "activeclass" : ""
//                   }> <AccountBoxIcon /> Project Type
//                 </li>
//               </Link>

//               <Link to="/ProjectTeamtype" className={props.cname9}>
//                 <li
//                   className={
//                     splitLocation[1] === "ProjectTeamtype" ? "activeclass" : ""
//                   }
//                 >
//                   < PeopleOutlineIcon /> Project Team
//                 </li>
//               </Link>

            
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

function Sidebar(props) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  let token = localStorage.getItem("auth_token");
  console.log(token);
  const [sidebar, setsidebar] = useState([]);
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/auth-menus", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data, "sidebar");
        console.log("sidebar success");

        setsidebar(response.data);
        setLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  console.log(sidebar);
 
       

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar_block">
        <div className="sidebar_block_img">
             <Link to="/admin/dashboard" className="">
              <img src="/images/logoimg.png" className="sidebar_logo" alt="" />
             </Link>
           </div>
          <div className="sidebar_block_list">
         
            <ul className="sidebarList"> 
       

              {sidebar.map((item, index) => {
                if (item.menus.length == 0) {
                  console.log(item.url , "itemurl")
                  // let base_url =
                  return (
                   
                    <>
                     {loading ? (
                      <Loader />
                    ) : (
                      <NavLink
                 
                        activeClassName="navbar__link--active"
                        className="sidebarListItem"
                        to={`/${item.url}`} 
                      >
                          <li key={item.id}>
                            <div style={{display:'flex', width:'100%'}}>
                            <i className={item.imageIcon} style={{marginTop:'6px', marginLeft:'10px', marginRight:'5px'}}></i>
                               {item.name}
                            </div>
                          
                        </li>
                      </NavLink>
                        )}
                    </>
                  
                  );
                   
                } else {
               

                  return (
                    
                    <>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle 
                          key={item.id}
                          className="dropdownlists"
                          style={{marginLeft:'0%'}}
                        >
                          <MenuIcon />
                          {item.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {item.menus.map((menus) => (
                           
                            <NavLink
                              activeClassName="navbar__link--active"
                              className="sidebarListItem"
                           
                              to = {`/${menus.url}`} 
                              key={menus.id}
                              activeClassName="navbar__link--active"
                              className="sidebarListItem"
                            >
                              <div style={{display:'flex',justifyContent:'flex-start', width:'100%',margin:'10px auto', fontSize:"15px",padding:"5px 10px", fontWeight:'600'}}> 
                                <i className={menus.imageIcon} style={{marginTop:'4px', marginLeft:'10px', marginRight:'8px'}}></i>
                        
                                {menus.name}
                              </div> 
                            </NavLink> 
                           
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                       )}
                    </>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Dropdown } from "react-bootstrap";
// import ReactDOM from "react-dom";

// function Sidebar(props) {
//   const location = useLocation();
//   const { pathname } = location;
//   const splitLocation = pathname.split("/");

//   let token = localStorage.getItem("auth_token");
//   console.log(token);
//   const [sidebar, setsidebar] = useState([]);


//   useEffect(() => {
//     axios
//       .get("https://freshhu.com/cnu/projectmanagement/api/admin/auth-menus", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       })
//       .then((response) => {
//         // handle success
//         console.log(response.data, "sidebar");
//         localStorage.setItem("baseUrl", response.data[0].url)
//         console.log("sidebar success");

//         setsidebar(response.data);
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       });
//   }, []);

//   console.log(sidebar);

//   return (
//     <div>
//       <div className="sidebar">
//         <div className="sidebar_block">
//         <div className="sidebar_block_img">
//            <Link to="/DashBoard" className="">
//               <img src="/images/logoimg.png" className="sidebar_logo" alt="" />
//             </Link>
//           </div>
//           <div className="sidebar_block_list">
          
          
//             <ul className="sidebarList"> 
       

//               {sidebar.map((item, index) => {
//                 if (item.menus.length == 0) {
//                   return (
//                     <>
//                       <NavLink
//                         exact
//                         activeClassName="navbar__link--active"
//                         className="sidebarListItem"
//                         to={item?.url}
//                       >
//                         <li key={item.id}>
//                           <img src="/images/Icon awesome-file-alt.svg" />
//                           {item.name}
//                         </li>
//                       </NavLink>
//                     </>
//                   );
//                 } else {
               

//                   return (
//                     <>
//                       <Dropdown>
//                         <Dropdown.Toggle
//                           key={item.id}
//                           className="dropdownlists"
//                         >
//                           {item.name}
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                           {item.menus.map((menus) => (
//                              <div> 
//                             <NavLink
//                               activeClassName="navbar__link--active"
//                               className="sidebarListItem"
//                               to={menus?.url}
//                               key={menus.id}
//                               activeClassName="navbar__link--active"
//                               className="sidebarListItem"
//                             >
//                             {menus.name}
//                             </NavLink> 
//                             </div> 
//                           ))}
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </>
//                   );
//                 }
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

