import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Others/Loader";

const EditInstallment = ({ history }) => {
  toast.configure();

  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();

  const [installmentName, setInstallmentName] = useState("");
  const [installmentnumber, setInstallmentnumber] = useState("");
  const [deadline, setDeadline] = useState("");
  const [paidStatus, setPaidStatus] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [sendMail, setSendMail] = useState("");

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const projectId = location.pathname.split("/")[3];

  //filling installment details

  let iName = localStorage.getItem("installment-name");
  let iNumber = localStorage.getItem("installment-number");
  let iAmount = localStorage.getItem("installment-amount");
  let iDesc = localStorage.getItem("installment-desc");

  useEffect(() => {
    if ((installmentName, installmentnumber, amount, description == "")) {
      setInstallmentName(iName);
      setInstallmentnumber(iNumber);
      setAmount(iAmount);
      setDescription(iDesc);
    } else {
      console.log("details are filled");
    }
  }, []);

  //handle create submit

  const installment = {
    project_id: projectId,
    installmentName: installmentName,
    invoiceNo: installmentnumber,
    amount: amount,
    deadlineDate: deadline,
    paidDate: paidDate,
    paidStatus: paidStatus,
    description: description,
    sendMailToInternalManagementUsers: sendMail,
  };
  console.log(installment.sendMailToInternalManagementUsers, "test");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("clicked");

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/installments/${id}`,
        qs.stringify(installment),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Installment Updated Succesfully", { type: "success" });
        setLoading(false);
        history.push("/admin/project/projects");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2=""
            cname3="activeclass"
            cname4=""
            cname5=""
          />
        </div>
        <div className="Proj_main_r">
          <Header />

          <div className="addproject">
            <h3 className="projectheadline" style={{ marginBottom: "2%" }}>
              {" "}
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  marginRight: "0.5%",
                }}
                onClick={() => history.goBack()}
              />{" "}
              Edit Installment
            </h3>
            {loading ? (
              <Loader />
            ) : (
              <>
                {error && <Message variant="danger">{error}</Message>}
                <form>
                  <div className="row">
                    <div className="col-md-3">
                      <h6>Installment Name*</h6>
                      <input
                        type="text"
                        className="inp_feild"
                        value={installmentName}
                        onChange={(e) => {
                          setInstallmentName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="viewdetail_l col-md-3">
                      <h6>Invoice Number*</h6>
                      <input
                        type="text"
                        className="inp_feild"
                        value={installmentnumber}
                        onChange={(e) => {
                          setInstallmentnumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="viewdetail_l col-md-3">
                      <h6>Amount*</h6>
                      <input
                        type="text"
                        className="inp_feild"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-md-3 ">
                      <h6>Payment Deadline*</h6>
                      <input
                        type="date"
                        className="inp_feild form-control"
                        onChange={(e) => setDeadline(e.target.value)}
                        value={deadline}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ">
                      <h6>Paid Date*</h6>
                      <input
                        type="date"
                        className="inp_feild form-control"
                        onChange={(e) => setPaidDate(e.target.value)}
                        value={paidDate}
                      />
                    </div>

                    <div className="col-md-3 ">
                      <h6>Payment Status*</h6>
                      <select
                        onChange={(e) => {
                          setPaidStatus(e.target.value);
                        }}
                      >
                        <option>Select</option>
                        <option value="1">Paid</option>
                        <option value="0">Not Paid</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="viewdetail_l col-md-3">
                      <h6>Description</h6>
                      <input
                        type="text"
                        className="inp_feild"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className="viewdetail_l col-md-3">
                      <h6>Send Mail to Internal Users*</h6>
                      <select
                        onChange={(e) => {
                          setSendMail(e.target.value);
                        }}
                      >
                        <option>Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="danger"
                    style={{ marginTop: "1%" }}
                    size="md"
                    onClick={handleSubmit}
                  >
                    {" "}
                    Update{" "}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInstallment;
