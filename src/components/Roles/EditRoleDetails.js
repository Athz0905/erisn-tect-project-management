import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRoleDetails = ({ history }) => {
  toast.configure();
  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  let rName = localStorage.getItem("role-name");

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

  useEffect(() => {
    if (roleName == "") {
      setRoleName(rName);
    } else {
      console.log("details are filled");
    }
  }, [id]);

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

  //handle create submit

  const roles = {
    name: roleName,
    menu_id_list: permissions,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(roles);

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/master/roles/${id}`,
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
        toast("Role Updated Successfully", { type: "success" });
        history.push("/admin/roles");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
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
            cname5="activeclass"
          />
        </div>
        <div className="Proj_main_r">
          <Header />

          <div className="addproject">
            <h3 className="projectheadline" style={{ marginBottom: "2%" }}>
              {" "}
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />{" "}
              Edit Role Details
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
                            control={
                              <Checkbox
                                name="permission"
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
                              control={
                                <Checkbox
                                  name="permission"
                                  value={menus.id}
                                  onChange={handleChange}
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

              <Button
                type="submit"
                variant="danger"
                onClick={handleSubmit}
                style={{ marginTop: "2%" }}
              >
                {" "}
                Update{" "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleDetails;
