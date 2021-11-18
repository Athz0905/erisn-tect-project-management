import React , {useEffect, useState} from 'react'
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Card from '../../components/Others/Card';
import axios from "axios";
import { useHistory } from'react-router-dom'
import BillingList from './BillingList';
import { Link } from "react-router-dom"; 
import { Dropdown, Table, Button } from "react-bootstrap";
import Loader from '../Others/Loader';
import { toast } from "react-toastify";


function BillingReports() {
  let history = useHistory();
  const [BillingReports, setBillingReports] = useState([]);
  const [BillingReportsTable, setBillingReportsTable] = useState([]);  
  const [startdate, setstartdate] = useState();
  const [loading,setLoading] = useState(true)
  const [enddate, setenddate] = useState();  
  localStorage.setItem("startdate", startdate);
  localStorage.setItem("enddate", enddate);
  const [movetonext, setmovetonext] = useState("/admin/billing-reports");  
  let token = localStorage.getItem("auth_token");

  const movetodatebased = () => {



    if((enddate > startdate) && (startdate || enddate)){
  
      history.push("/BillingBasedDate");
  
    }else if(enddate < startdate){
  
      history.push("/admin/billing-reports");
  
      toast("The Deadlinedate End must be a greater than Deadlinedate Start", { type: "error" });
  
  
  
    }else{
  
      history.push("/admin/billing-reports");
  
      toast("please select Deadlinedate Start and Deadlinedate End", { type: "error" });
  
  
  
    }
  
  }

console.log(enddate >  startdate , "truefalse")
console.log(startdate,enddate);

  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/billing-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        console.log("setBillingReports success");
        setBillingReports(response.data.billingReportCount);
        setBillingReportsTable(response.data.projectBillingReports);
        setLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
console.log(startdate ,"1")
console.log(enddate ,"2")
    return (
        <div>
        <div className="Proj_main">
        <div className="Proj_main_l">
            <Sidebar />
        </div>

        <div className="Proj_main_r">
            <Header />
            <div className="home">
            <h1>Billing Reports</h1>
            <div className="home_block">
            <Link to="/admin/project/projects" style={{color:"#000", textDecoration:"none"}}> 
            <Card
               src='../../images/Group 11.svg'
               text='Total Projects'
              val={BillingReports.totalProjects}
            /> 
            </Link>
             <Link to="/BillingAllData" style={{color:"#000", textDecoration:"none"}}> 
              <Card
               src='../../images/Icon awesome-money-check-alt.svg'
               text='Total Payments'
              val={BillingReports.totalInstallments}
            />
            </Link>
              <Link to="/BillingFilterpaid" style={{color:"#000", textDecoration:"none"}}> 
              <Card
               src='../../images/Icon awesome-money-check-alt.svg' 
               text='Completed Payments'
              val={BillingReports.totalPaidInstallments}
            />
            </Link>


           <Link to="/BillingFilteration" style={{color:"#000", textDecoration:"none"}}>
         
              <Card
               src='../../images/Icon awesome-money-check-alt.svg' 
               text='Pending Payments'
              val={BillingReports.totalUnpaidInstallments}
            />

           </Link>

            </div>
            </div>
            <div className="d-flex justify-content-end projectmaintabs">
       

        <div className="mx-5 my-3">
            <h6 className="text-center">Start Date</h6>
            <img  src="/images/Icon awesome-filter.svg" className="mx-3" />
         <input type="date" value={startdate} onChange={(e)=> { setstartdate(e.target.value)}}/>
          </div> 
          <div className="mx-5 my-3">
            <h6 className="text-center">End Date</h6>
           
         <input type="date" value={enddate} onChange={(e)=> { setenddate(e.target.value)}}/>
          </div> 
          <div className="mt-auto mb-3">
       
         <Button variant="danger" onClick={movetodatebased} type="button">Submit</Button>
          </div>
          </div>
<div className="billing_list">
{loading ? (
        <Loader />
      ) : (
<BillingList  BillingReportsTable={BillingReportsTable} /> 
      )}
  
</div>
    </div>

     
        </div>
        </div>
    )
}

export default BillingReports;
