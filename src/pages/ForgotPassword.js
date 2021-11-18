import React, {useEffect, useState} from "react";
import Button from "../components/Others/Button";
import { Link } from "react-router-dom";
import useForm from '../components/Others/UseForm';
import validate from "../components/Others/ValidateInfo";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import qs from "qs";

const ForgotPassword = () => {
    const url = "https://freshhu.com/cnu/projectmanagement/api/forgot-password"; 

    const [reset, setreset] = useState(); 
   

   let fogotmail =
 
      {
        "email": reset
        
      }
   
  
   
   
   console.log(fogotmail)
    

      const handleUpdate = (event) => {
        setreset(event.target.value);
      };

    let history = useHistory();
//   const { handleChange, handleSubmit, values, errors } = useForm(validate);


localStorage.setItem("reset_email", reset);
const onSubmit =(e) => {
    e.preventDefault();
 

  axios.post(url, qs.stringify(fogotmail), {
    headers: {
        'Accept':'application/json'
      }
  })
    .then((response) => { 
      console.log(response);
      

      if (response.status == 201) { 
       
        history.push("/OptVal");
     
        toast("successfully sent the otp to your registered email", { type: "success" });
      } else {
        history.push("/ForgorPassword");
        toast("please Enter Valid registered Email", { type: "error" }); 
      }
    })

    .catch((error) => {
      console.error("There was an error!", error);
      console.log("error");
      toast("please Enter Valid registered Email", { type: "error" }); 
    });
};


  return (
    <div className="login_manage">
      <div className="login_manage_logo">
        <img src="/images/Group 3967.svg" className="sidebar_logo" alt="" />
      </div>
      <div className="login_manage_block">
        <div className="login_manage_block_l">
          <img src="/images/Group 4119.svg" className="image_proj" alt="" />
        </div>
        <div className="login_manage_block_r">
          <div className="forgotpassword_info login_manage_block_r_sec">
            <h2>Forgot Password</h2>
            <span>
              Please enter your registered email address to verify and get link
              to reset password
            </span>
            {/* <form onSubmit={handleSubmit} className="form my-4" noValidate> */}
            <form>
              <h6>Enter Registered Email</h6>
              <input
                id="email"
                name="email"
                type="email" 
                value={reset}
                onChange={handleUpdate} 
                className="inp_feild"
              />
              {/* {errors.email && <p>{errors.email}</p>} */}

              <div className="text-center">
           
                <button type="submit"  className="btn_val" onClick={onSubmit}>Submit</button>
            
                <h6>
                  <Link to="/" className="signuplinks"> 
                   Go Back to Login
                  </Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  
  );
};

export default ForgotPassword;
