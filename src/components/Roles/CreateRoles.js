import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Dropdown, Table } from "react-bootstrap";


const CreateRoles = () => {  
    const [getmenus, setgetmenus] = useState([]);
    
  let token = localStorage.getItem("auth_token");
    useEffect(() => {
        axios.get("https://freshhu.com/cnu/projectmanagement/api/admin/master/menus", {
            headers: {
              Authorization: `Bearer ${token}`,
              //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            setgetmenus(response.data.menus);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []); 

      console.log(getmenus) 
      
  let getusersdata = getmenus.map((item, index) => {
    return (
      <> 
        <li key={item.id}> 
      <input type="checkbox" id="menus" name="getdata[]" value={"menus"} />
        {item.name}</li>
       
      </>
    );
  });
    return (
        <div>
            <ul className="getmenus">
           {getusersdata} 
           </ul>
        </div>
    )
}

export default CreateRoles
