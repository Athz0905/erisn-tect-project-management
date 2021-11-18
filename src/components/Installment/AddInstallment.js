import React, {useState, useEffect} from 'react';
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import qs from "qs";
import { useLocation } from "react-router"
import Message from "../../components/Others/Message"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddInstallment = ({ history }) => {

    toast.configure();

    let token = localStorage.getItem("auth_token");
    const [error, setError] =useState(false)
    const [loading, setLoading] = useState(true)
  
    const [installmentName , setInstallmentName]=useState("");  
    const [installmentnumber, setInstallmentnumber]= useState('')
    const [deadline, setDeadline] = useState('')
    const [paidStatus, setPaidStatus] = useState('')
    const [paidDate, setPaidDate] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')


    const location = useLocation();
    const id = location.pathname.split("/")[2];

 
    
      //handle create submit

      const installment = {
        project_id: id,
        installmentName: installmentName,
        installmentNo: installmentnumber,
        amount: amount,
        deadlineDate: deadline,
        paidDate: paidDate,
        paidStatus: paidStatus,
        description: description
     }
   

       const handleSubmit = (e) => {
           e.preventDefault()
           console.log('clicked');
           console.log(installment);
           
           
            axios.post(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/installments`, qs.stringify(installment),{
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
                },
              })
            
            .then((response) => { 
                console.log(response);
                toast("Installment Added Succesfully", { type: "success" });
                history.push("/Projects")
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
          }
       
    

    return (
        <div>
            <div className="Proj_main">
                <div className="Proj_main_l">
                    <Sidebar 
                      cname1=""
                      cname2=""
                      cname3="activeclass"
                      cname4=""
                      cname5="" />
                </div>
                <div className="Proj_main_r">
                    <Header />
                    


                    <div className="addproject">
                    <h3 className="projectheadline" style={{marginBottom:'2%'}}>
                         {" "}
                      <img src="/images/backarrows.svg" width="25px" style={{cursor: "pointer",fontWeight:'600', marginRight :"0.5%"}} onClick={() => history.goBack()} /> Add Installment
                    </h3>                           
                    {error && <Message variant='danger'>{}</Message>}
                        <form>
                             <div className="row">
                                <div className="col-md-3">
                                        <h6>Installment Name</h6>
                                        <input type='text' className="inp_feild" value={installmentName} 
                                        onChange={(e)=> {setInstallmentName(e.target.value)}}/>
                                    </div>

                                    <div className="viewdetail_l col-md-3">
                                        <h6>Invoice Number</h6>
                                        <input type='text' className="inp_feild" value={installmentnumber} 
                                        onChange={(e)=> {setInstallmentnumber(e.target.value)}}/>
                                    </div>
                             </div>
                              
                            <div className='row'>
                               <div className="viewdetail_l col-md-3">
                                    <h6>Amount</h6>
                                    <input type='text' className="inp_feild" value={amount} 
                                     onChange={(e)=> {setAmount(e.target.value)}}/>
                                </div>

                                <div className="col-md-3 ">
                                    <h6 >Payment Deadline</h6>
                                    <input type='date' className="inp_feild form-control" onChange={(e) => setDeadline(e.target.value)} value={deadline}  />
                                </div>
                            </div>
                                
                            <div className='row'>
                                <div className="col-md-3 ">
                                    <h6 >Paid Date</h6>
                                    <input type='date' className="inp_feild form-control" onChange={(e) => setPaidDate(e.target.value)} value={paidDate}  />
                                </div>

                                <div className="col-md-3 ">
                                    <h6 >Payment Status</h6>
                                    <select onChange={(e)=> {setPaidStatus(e.target.value)}}>
                                        <option></option>   
                                        <option value="1">Paid</option> 
                                        <option value="0">Not Paid</option>     
                                    </select>
                                </div>
                              </div>  
                              <div className='row'>
                                <div className="viewdetail_l col-md-3">
                                    <h6>Description</h6>
                                    <input type='text' className="inp_feild" value={description} 
                                     onChange={(e)=> {setDescription(e.target.value)}}/>
                                </div>
                              </div>  
    
                            <Button
                                type="submit"
                                variant='danger'
                                onClick={handleSubmit}
                             > Create </Button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddInstallment;
