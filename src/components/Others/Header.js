import React from 'react';
import useForm from './UseForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory } from 'react-router-dom';
<meta name="csrf-token" content="{{ csrf_token() }}" />



function Header(props) {
  var history = useHistory();
  const { handleChange, handleSubmit, values, errors } = useForm(); 

  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let roleName = localStorage.getItem("role-names")

  let username = firstName +" "+lastName
  
  if(firstName !== ""){
    var firstStringChar = firstName.charAt(0).toUpperCase(); //H
  } else {
    var firstStringChar = "p" //H
  }

  const logOut = (e) => {
    const toLogout = window.confirm("Are you sure to logout ?");
    if (toLogout) {
      localStorage.clear();
      history.push("/");
    } else {

    }
  }
  
    return (
        <div>
          <div className="header_main">
         
              <div className="header_main_l">
              <input className='search_inp'
                        type='text'
                        name='Search'
                        id="Search"
                        placeholder='Search'/>
                        <img src="/images/Icon ionic-ios-search.svg" className="search_img"/>
              </div> 
              <div className="d-flex header_side" >
              <div className="header_main_c">
                  
              </div>
              <div className="header_main_r" >
                <h6 style={{marginTop:'-10px'}}>{firstStringChar}</h6>
                <div>
                <h4 style={{fontWeight:'650', fontSize:'17px'}}>{username}</h4>
                <p style={{textAlign:'left'}}>{roleName}</p>
                {/* <select onChange={logOut} style={{border:'1px solid darkgray', padding:'3px 5px', borderRadius:'5px'}}>
                  <option style={{border:'1px solid darkgray',fontWeight:'800', padding:'5px 5px'}}  id="header_main_r_text" value={username}>{username}</option>
                  <option>Logout</option>
                </select> */}
                  {/* <p>Project Manager</p> */}
                </div>
                <LogoutIcon style={{cursor:'pointer', marginLeft:'15%',marginTop:'-15px'}} onClick={logOut}/>
                
              </div>
              </div>
            
          </div>
        </div>
    )
}

export default Header;
