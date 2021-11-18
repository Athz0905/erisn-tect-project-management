import React, {useState} from 'react';
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Button from '../../components/Others/Button';
import { Link } from "react-router-dom";
import ButtonIcon from '../../components/Others/ButtonIcon';

const AddProject = () => { 
    const [firstname , setfirstname]=useState(""); 
    const [lastname , setlastname]=useState("");
    const [email , setemail]=useState("");  
    const [Phone , setphone]=useState("");
    const [Address , setAddress]=useState("");  
    const [Lead , setLead]=useState("");
    const [State , setState]=useState("");  
    const [Country , setCountry]=useState("");  

    const result = [
        {firstname}, {lastname}, {email}, {Phone}, {Address}, {Lead}, {State}, {Country}
    ]
    const addInput = (e) => {  
        setCountry(e.target.value);
 
      } 
   
    return (
        <div>
            <div className="Proj_main">
                <div className="Proj_main_l">
                    <Sidebar 
                      cname1=""
                      cname2="activeclass"
                      cname3=""
                      cname4="" />
                </div>
                <div className="Proj_main_r">
                    <Header />
                    <div className="step_details_block" >
                        <div class="step_details">
                            <span class="active step_details_sec">1</span>
                        </div>
                        <div class="step_details">
                            <span class=" step_details_sec">2</span>
                        </div>
                        <div class="step_detailss">
                            <span class=" step_details_sec">3</span>
                        </div>
                    </div>


                    <div className="addproject">
                        <h1>Client Details </h1>

                        <form>
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <h6>First Name</h6>
                                    <input type='text' className="inp_feild" value={firstname} 
                                     onChange={(e)=> {setfirstname(e.target.value)
                                    }} />
                                </div>
                                <div className="col-md-3">
                                    <h6>Last Name</h6>
                                    <input type='text' className="inp_feild" value={lastname}
                                                onChange={(e)=> {setlastname(e.target.value)}} 
                                    />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <h6>Email</h6>
                                    <input type='email' className="inp_feild" value={email}    onChange={(e)=> {setemail(e.target.value)}}  />
                                </div>
                                <div className="col-md-3">
                                    <h6>Phone</h6>
                                    <input type='number' className="inp_feild" value={Phone}  onChange={(e)=> {setphone(e.target.value)}} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <h6>Address</h6>
                                    <input type='text' className="inp_feild" value={Address}   onChange={(e)=> {setAddress(e.target.value)}} />
                                </div>
                                <div className="col-md-3">
                                    <h6>Source of Lead</h6>
                                    <input type='text' className="inp_feild" value={Lead}   onChange={(e)=> {setLead(e.target.value)}} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <h6>State</h6>
                                    <input type='text' className="inp_feild" value={State}   onChange={(e)=> {setState(e.target.value)}} />
                                </div>
                                <div className="col-md-3">
                                    <h6>Country</h6>
                                    <select  onChange={addInput}>
                                        <option></option>
                                        <option value="India">India</option>
                                        <option  value="Japan">Japan</option>
                                        <option  value="London">London</option>
                                        <option  value="USA">USA</option>
                                    </select>
                                </div>
                            </div>

                            <Link to='/AddProjectDetail' className='side_links'>
                            <ButtonIcon 
   src='images/right-arrow.png' 
  text='Next'
  
    id='btn_radius' />
                            </Link> 

                            {JSON.stringify(result)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject;
