import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import qs from "qs";
 

let email = localStorage.getItem("reset_email"); 

 const url ="https://freshhu.com/cnu/projectmanagement/api/verify-reset-password-otp";
export class OptVal extends Component {
  state = { otp: '', email:email };
    handleChange = (otp) => this.setState({ otp }); 


     verifyotp = (event) => {
      event.preventDefault(); 

      
    
      axios.post(url, qs.stringify(this.state), {
        headers: {
            'Accept':'application/json'
          }
      })
        .then((response) => { 
          console.log(response);
          
          
          if (response.status == 200) { 
            this.props.history.push('/ResetPassword');
            toast("Your Email is verified", { type: "success" });
          } else {
            this.props.history.push('/OtpVal');
            toast("OTP does not matched", { type: "error" });
          }
        })
      
        .catch((error) => {
          console.error("There was an error!", error);
          console.log("error");
          toast("OTP does not matched", { type: "error" });
        });
        
       
    }

    render() { 
      const optvalue = this.state.otp
      localStorage.setItem("reset_otp", optvalue);
      console.log(optvalue) 
    
  

      return (
          <>
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

            <h2>Enter OTP</h2>
            <form>
            <OtpInput
          value={this.state.otp}
      className="otpfeild"
          onChange={this.handleChange}
          numInputs={6}
          separator={<span> &nbsp; </span>}
        />
            


              <div className="text-center"> 
              {/* <Link to="/ResetPassword" className="signuplinks"> */}
                <button type="submit"  className="btn_val" onClick={this.verifyotp}>Submit</button>
                {/* </Link>  */}
            
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
    <div style={{color:'#fff'}}> 
    {JSON.stringify(this.state)}
      </div>
    
   
    </>
      );
    }
}

export default OptVal
