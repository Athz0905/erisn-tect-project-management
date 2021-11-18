import React , { useState ,useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import Button from '../../components/Others/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router"
import Loader from "../../components/Others/Loader"
import { useHistory } from "react-router-dom"
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from '../Others/Message';


const BillingDetailTable = () => {
  toast.configure();

  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const history = useHistory()

  //getting installment details by project id
  const [loading, setLoading] = useState(true)
  const [installments, setInstallments] = useState([])
  

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    axios
      .get(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/installments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.installments);
        setInstallments(response.data.installments)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setError(true)
        setErrorMessage(error.response.data.message)
      });
  }, [token]);


       //delete installments
    
    const deleteHandler = (id) => {
      const todelete = window.confirm("Are you sure you want to delete ?");
      if (todelete) {
      axios
      .delete(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/installments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setLoading(false)
        console.log("Installment Deleted Succesfully");
        window.location.reload(false);
        toast("Installment Deleted Succesfully", { type: "success" });
      })
      .catch((error) => {
        console.log(error);
        setError(true)
        setErrorMessage(error.response.data.message)
      });
    } 
  }

    //edit discussion
    
    const editHandler = (id) => {
      axios
      .get(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/installments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setLoading(false)
        console.log("INSTALLMENT Fetched Succesfully");
        localStorage.setItem("installment-name", response.data.installment.installmentName)
        localStorage.setItem("installment-number", response.data.installment.installmentNo)
        localStorage.setItem("installment-amount", response.data.installment.amount)
        localStorage.setItem("installment-desc", response.data.installment.description)
        history.push(`/EditInstallment/${id}/${projectId}`)
      })
      .catch((error) => {
        console.log(error);
        setError(true)
        setErrorMessage(error.response.data.message)
      });
    } 


    return (
       <div style={{overflow:"auto"}}>
          {error && <Message variant='danger'> {errorMessage}</Message>}
            <Table striped  hover >
  <thead>
  
    <tr>
      <th>Installments</th>
      <th> Payment Deadline</th>
      <th>Amount </th>
      <th> Payment Status </th> 
      <th> Action  </th>
    </tr>
  
  </thead>
  <tbody>
 
  {loading ? <Loader /> :
      installments.map((item) => 
      <tr key={item.id}>
        <td>{item.installmentName}</td>
        <td>{ dateFormat(item.deadlineDate, "mmm d, yyyy")}</td>
        <td>₹{item.amount} </td> 
      
      <td><p className="" >   {item.paidStatus == 1 ? <span style={{fontSize:'15px', color:'green',fontWeight:'600'}}>Paid</span> : <span style={{fontSize:'15px', color:'red',fontWeight:'600'}}>Not Paid</span> }</p></td> 

        <td>
            <img onClick={() => editHandler(item.id)} src="/images/Icon material-edit.svg" style={{cursor:"pointer"}} className="mx-1" /> 
        
            <img src="/images/Icon material-delete.svg" style={{cursor:"pointer"}} onClick={() => deleteHandler(item.id)} className="mx-1" /> 
        </td>
    </tr> 
    )}
   
 
  </tbody>
</Table>


       </div>
    )
}

export default BillingDetailTable;
