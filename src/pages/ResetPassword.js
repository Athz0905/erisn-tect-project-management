import React, {useState} from 'react'
import Button from '../components/Others/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import qs from "qs";

const ResetPassword = () => {  
    let email = localStorage.getItem("reset_email"); 
    let otp = localStorage.getItem("reset_otp"); 
    const [repass, setrepass] = useState({ 
        password: "",
        password_confirmation: "",
      }); 


  let resetdetails =
 
      {
        "email": email,
        "password": repass.password,
        "password_confirmation": repass.password_confirmation,
        "otp": otp
        
      }
  console.log(resetdetails)
const resethandle = (e) => {
    setrepass({
        ...repass,
        [e.target.name]: e.target.value, 
      });
}
    const url = "https://freshhu.com/cnu/projectmanagement/api/reset-password"; 

    let history = useHistory();

    const onReset = (e) => {
        e.preventDefault();
        
  axios.post(url, qs.stringify(resetdetails), {
    headers: {
        'Accept':'application/json'
      }
  })
    .then((response) => { 
      console.log(response);
       
      if (response.status == 201) { 
        history.push("/");
        toast("successfully reset the password", { type: "success" });
      } else {
        history.push("/ResetPassword");
        toast("password must be match and min 8 characters should be there", { type: "error" });
      }
    })

    .catch((error) => {
      console.error("There was an error!", error);
      console.log("error");
      // toast("password must be match and min 8 characters should be there", { type: "error" });
    });
    }
    
    return (
        <div className="login_manage" >
            <div className="login_manage_logo">
                <img src="/images/Group 3967.svg" className="sidebar_logo" alt="" />
            </div>
            <div className="login_manage_block">
                <div className="login_manage_block_l">
                <img src="/images/Group 4119.svg" className="image_proj"  alt="" />
                </div>
                <div className="login_manage_block_r">
                    <div className="forgotpassword_info login_manage_block_r_sec">
                        <h2>Reset Password</h2>
                        <span>Your Email is verified : example@gamil.com <br/>
                            Please reset your password.</span>
                        <form className="my-4" >
                            <h6>New Password</h6>
                            <input  id="password" name="password" 
                              value={repass.password}
                              onChange={resethandle}
                                type='password' className="inp_feild" />
                                         
                        <h6>Re-Enter Password</h6>
                        <input   id="password2" name="password_confirmation"
                              value={repass.password_confirmation}
                              onChange={resethandle}
                                 type='password' className="inp_feild" />
                                           

                   
                        <div className="text-center">
                            
                        <button type="submit"  className="btn_val" onClick={onReset}>Submit</button>
                            
                            <h6><Link to='/' className='signuplinks'> Go Back to Login </Link>   </h6> 
                        </div>
                        </form>
                    </div>

                </div>
            </div>
            <div style={{color:'#fff'}}> 
            {JSON.stringify(resetdetails)}
            </div>
        </div>
    )
}

export default ResetPassword;
