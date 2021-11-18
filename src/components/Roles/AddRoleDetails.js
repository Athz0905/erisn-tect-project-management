import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button, Dropdown, NavLink } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoleDetails = ({ history }) => {
  toast.configure();
  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const myRef = useRef(null);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  let permission = [];

  //getting menus

  const [getRoles, setGetRoles] = useState([]);

  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/master/menus", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.menuList);
        setGetRoles(response.data.menuList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleChange = (e) => {
    console.log(e.target.checked);
    const isChecked = e.target.checked;
    let index;

    if (isChecked) {
      permissions.push(e.target.value);
    } else {
      index = permissions.indexOf(e.target.value);
      permissions.splice(index, 1);
    }

    console.log(Object.values(permissions), "permissionss");
  };

  const updatecheckbox = () => {};

  const roles = {
    name: roleName,
    menu_id_list: permissions,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(roles);

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/master/roles",
        qs.stringify(roles),
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
        console.log(response);
        toast("Role Created Successfully", { type: "success" });
        history.push("/admin/roles");
      })

      .catch((error) => {
        console.log("there is an error y", error.response);

        var array = error.response.data.errors;

        for (const [key, value] of Object.entries(array)) {
          console.log(`${key}: ${value}`);

          localStorage.setItem("errorsval", `${value}`);

          let errorsval = localStorage.getItem("errorsval");

          toast(errorsval, { type: "error" });
        }
      });
  };
  const handleQueryChange = (event) => {
    console.log("Event:", event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2=""
            cname3=""
            cname4=""
            cname5=""
            cname6="activeclass"
          />
        </div>
        <div className="Proj_main_r">
          <Header />

          <div className="addproject">
            <h3 className="projectheadline">
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />
              Add Role Details
            </h3>
            {error && <Message variant="danger">{}</Message>}
            <form>
              <div className="col-md-3">
                <h6 style={{ marginTop: "2%", fontWeight: "600" }}>
                  Role Name*
                </h6>
                <input
                  type="text"
                  className="inp_feild"
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                  }}
                />
              </div>

              <div className="viewdetail_l">
                <h6 style={{ marginTop: "2%", fontWeight: "600" }}>
                  Permissions*
                </h6>
              </div>

              {getRoles.map((item, index) => {
                if (item.menus.length == 0) {
                  return (
                    <>
                      <div key={item.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="permission"
                              value={item.id}
                              onChange={handleChange}
                            />
                          }
                          label={item.name}
                        />
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <ul className="showul">
                        <li key={item.id}>
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                onChange={handleChange}
                                value={item.id}
                              />
                            }
                            label={item.name}
                          />
                        </li>

                        {item.menus.map((menus, index) => (
                          <li key={menus.id} className="showlitag">
                            <FormControlLabel
                              key={item.id}
                              control={
                                <Checkbox
                                  name="permission"
                                  value={menus.id}
                                  onChange={handleChange}
                                />
                              }
                              label={menus.name}
                            />
                            {menus.subMenus.map((subMenus, index) => (
                              <li key={subMenus.id} className="showlitags">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="permission"
                                      value={subMenus.id}
                                      onChange={handleChange}
                                    />
                                  }
                                  label={subMenus.name}
                                />
                              </li>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                }
              })}

              <Button
                type="submit"
                variant="danger"
                size="md"
                style={{ marginTop: "2%" }}
                onClick={handleSubmit}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleDetails;

// const AddRoleDetails = ({ history }) => {

//     let token = localStorage.getItem("auth_token");
//     const [error, setError] =useState(false)
//     const [loading, setLoading] = useState(true)

//     const [roleName , setRoleName]=useState("");
//     const [permissions, setPermissions]= useState([])

//     const location = useLocation();
//     const id = location.pathname.split("/")[2];

//     let permission = []

//     //getting menus

//     const [getRoles, setGetRoles] = useState([])

//     useEffect(() => {
//         axios
//           .get("https://freshhu.com/cnu/projectmanagement/api/admin/master/menus", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Access-Control-Allow-Origin": "*",
//               "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//               "Access-Control-Allow-Headers":
//                 "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
//             },
//           })
//           .then((response) => {
//             console.log(response.data.menuList);
//             setGetRoles(response.data.menuList);
//             setLoading(false)
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }, [token]);

//     const handleChange = (e) => {
//        console.log(e.target.checked)
//        const isChecked = e.target.checked

//     //    if(isChecked){
//     //        setPermissions({ permissions: [ ...permissions , e.target.value ]})
//     //    } else {
//     //        const index = permissions.indexOf(e.target.value)
//     //        permissions.splice(index, 1)
//     //        setPermissions({ permissions: permission})
//     //    }
//     }

//       //handle create submit

//       const roles = {
//         name: roleName,
//         menu_id_list: [1,2,3]
// }

//        const handleSubmit = (e) => {
//            e.preventDefault()
//            console.log('clicked');
//            console.log(roles);

//             axios.post("https://freshhu.com/cnu/projectmanagement/api/admin/master/roles", qs.stringify(roles),{
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   "Access-Control-Allow-Origin": "*",
//                   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//                   "Access-Control-Allow-Headers":
//                     "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
//                 },
//               })

//             .then((response) => {
//                 console.log(response);
//                 history.push("/GetRoles")
//             })

//             .catch((error) => {
//                 console.error("There was an error!", error);

//                 setError(true)
//             });
//           }

//     return (
//         <div>
//             <div className="Proj_main">
//                 <div className="Proj_main_l">
//                     <Sidebar
//                       cname1=""
//                       cname2=""
//                       cname3=""
//                       cname4=""
//                       cname5=""
//                       cname6='activeclass' />
//                 </div>
//                 <div className="Proj_main_r">
//                     <Header />

//                     <div className="addproject">
//                     <h1 className="projectheadline">
//                         {" "}
//                         <img src="/images/backarrows.svg" width="25px" style={{cursor: "pointer", marginRight :"1%"}} onClick={() => history.goBack()} /> Add Role Details
//                       </h1>
//                       {error && <Message variant='danger'>{}</Message>}
//                         <form>

//                                <div className="col-md-3">
//                                     <h6>Role Name</h6>
//                                     <input type='text' className="inp_feild" value={roleName}
//                                      onChange={(e)=> {setRoleName(e.target.value)}}/>
//                                 </div>

//                                 <div className="viewdetail_l">
//                                     <h6>Permissions</h6>
//                                 </div>

//                                 <FormGroup>
//                                 {getRoles.map((item) =>
//                                   {
//                                     if (item.menus.length == 0) {
//                                       return (
//                                         <>
//                                       <FormControlLabel control={<Checkbox name="permissions" onChange={handleChange} />} label={item.name} />
//                                         </>
//                                       )
//                                     }
//                                     else {
//                                       return (
//                                       <>
//                                       <Dropdown>
//                                       <Dropdown.Toggle
//                                         key={item.id}
//                                         className="dropdownlists"
//                                       >
//                                         {item.name}
//                                       </Dropdown.Toggle>
//                                       <Dropdown.Menu>
//                                         {item.menus.map((menus) => (
//                                            <div>
//                                           <NavLink
//                                             activeClassName=""
//                                             className=""
//                                             to="/Projects"
//                                             key={menus.id}
//                                             activeClassName=""
//                                             className=""
//                                           >
//                                   <FormControlLabel control={<Checkbox name="permissions" onChange={handleChange} />} label={menus.name} />

//                                           </NavLink>
//                                           </div>
//                                         ))}
//                                       </Dropdown.Menu>
//                                     </Dropdown>
//                                   </>
//                                       )
//                                     }

//                                   })}

//                                 </FormGroup>

//                               <Button
//                                 type="submit"
//                                 variant='danger'
//                                 size='sm'
//                                 style={{marginTop:'2%'}}
//                                 onClick={handleSubmit}
//                              > Create </Button>

//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddRoleDetails;

// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Roles" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Project Types" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Project Technologies" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Billing" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Clients" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Projects" />
// <FormControlLabel control={<Checkbox name="permission" onChange={handleChange} />} label="Installments" />
