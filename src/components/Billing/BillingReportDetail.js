import React from 'react';
import { Link } from "react-router-dom";
import BillingDetailTable from './BillingdetailTable';
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";

const BillingReportDetail = () => {
    return (
        <div className="">
            <div className="Proj_main">
        <div className="Proj_main_l">
            <Sidebar 
                cname1=""
                cname2=""
                cname3="activeclass"
                cname4=""/>
        </div>

        <div className="Proj_main_r">

     <Header/>
        
              <div className="  projectmaintabs ">
                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Total Amount Charged</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹ 1,00,000</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Amount Paid</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹ 0.00</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Balance Amount</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹ 1,00,000</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Total Installments</p>
                  </div>
                  <div className="col-md-4">
                    <p>4 Installments</p>
                  </div>
                </div>
                <BillingDetailTable />
              </div>
              </div>
        </div>
            
        </div>
    )
}

export default BillingReportDetail;
