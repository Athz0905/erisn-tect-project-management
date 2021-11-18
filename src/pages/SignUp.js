import React from 'react';
import Button from '../components/Others/Button';
import { Link } from "react-router-dom";
import useForm from '../components/Others/UseForm';
import validate from "../components/Others/ValidateInfo";
import Header from '../components/Others/Header';


const SignUp = () => {  



    const { handleChange, handleSubmit, values, errors } = useForm(validate);


// const gotoDashboard = ()=> {
//     console.log();
//     history.push('/DashBoard')
// }


    return (
        <div className="signup_manage" >
            <div className="login_manage_logo">
                <img src="/images/Group 3967.svg" className="sidebar_logo" alt="" />
            </div>

            <h2><img  src="/images/backarrows.svg" width="25px" /> Create Account</h2>
            <form onSubmit={handleSubmit} className='form' noValidate>
            <div className="signup_manage_block">

                <div className="signup_manage_block_l">
                    <div className="signup_manage_block_r_sec">
                        <div className="row my-3">
                            <div className="col-md-4">
                                <h6>First Name</h6>
                                <input id="firstName" name="firstName" type='text'
                                value={values.firstName}
                                onChange={handleChange}
                                className="inp_feild" /> 
                                  {errors.firstName && <p>{errors.firstName}</p>}
                            </div>
                            <div className="col-md-4">
                                <h6>Last Name</h6>
                                <input  id="lastName" name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                type='text' className="inp_feild" /> 
                                             {errors.lastName && <p>{errors.lastName}</p>}      

                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-8">
                                <h6>Email Address</h6>
                                <input id="email" name="email" type='email' 
                                    value={values.email}
                                    onChange={handleChange}
                                className="inp_feild" />
                                   {errors.email && <p>{errors.email}</p>}
                            </div>

                        </div>
                        <div className="row my-3">
                            <div className="col-md-4">
                                <h6>Password</h6>
                                <input  id="password" name="password" 
                                      value={values.password}
                                      onChange={handleChange}
                                type='password' className="inp_feild" />
                                             {errors.password && <p>{errors.password}</p>}
                            </div>
                            <div className="col-md-4">
                                <h6>Conform Password</h6>
                                <input   id="password2" name="password2"
                                   value={values.password2}
                                   onChange={handleChange}
                                 type='password' className="inp_feild" />
                                              {errors.password2 && <p>{errors.password2}</p>}
                            </div>
                        </div>
                    </div>
                    {/* <Link to='/' className='signuplinks'> */}
                 <button type="submit"  className="btn_val">Create Account</button>
          

                    {/* </Link> */}
                </div>
  
                <div className="signup_manage_block_r">
                <img src="/images/Group 4119.svg" className="image_proj"  alt="" />
                </div>
            </div>
            </form>

        </div>
    )
}

export default SignUp;
