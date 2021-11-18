import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { useHistory } from "react-router-dom";
import qs from "qs";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Message from "../Others/Message";

const EditClient = () => {
  toast.configure();
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    sourceOfLead: "",
    state: "",
    country: "",
  });

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  console.log(value.label);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  let token = localStorage.getItem("auth_token");
  //getting client details
  let cFName = localStorage.getItem("client-first-name");
  let cEmail = localStorage.getItem("client-email");
  let cLName = localStorage.getItem("client-last-name");
  let cPhone = localStorage.getItem("client-phone");
  let cAddress = localStorage.getItem("client-address");
  let cLead = localStorage.getItem("client-sourceoflead");
  let cState = localStorage.getItem("client-state");
  let cCountry = localStorage.getItem("client-country");
  const url = `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/clients/${id}`;
  useEffect(() => {
    if (
      (details.firstName,
      details.lastName,
      details.email,
      details.phone,
      details.address,
      details.sourceOfLead,
      details.state,
      details.country == "")
    ) {
      setDetails({
        firstName: cFName,
        lastName: cLName,
        email: cEmail,
        address: cAddress,
        sourceOfLead: cLead,
        state: cState,
        country: cCountry,
        phone: cPhone,
      });
    } else {
      console.log("details are filled");
    }
  }, [id]);

  const clientData = {
    firstName: details.firstName,
    lastName: details.lastName,
    email: details.email,
    phone: details.phone,
    address: details.address,
    sourceOfLead: details.sourceOfLead,
    state: details.state,
    country: value.label,
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(details);
    axios
      .put(url, qs.stringify(clientData), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("status", response.status);
        let status = localStorage.getItem("status");
        if (status == 201) {
          toast("Client Updated Succesfully", { type: "success" });
          history.push("/admin/project/clients");
          console.log(details.firstName);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2="activeclass"
            cname3=""
            cname4=""
            cname5=""
            cname6=""
            cname7=""
            cname8=""
            cname9=""
            cname10=""
          />
        </div>
        <div className="Proj_main_r">
          <Header />
          {error && <Message variant="danger">{errorMessage}</Message>}
          <div className="addproject">
            <h3 className="projectheadline">
              {" "}
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer" }}
                onClick={() => history.goBack()}
              />{" "}
              Edit Client Details
            </h3>

            <form onSubmit={submitHandler}>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>First Name*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.firstName}
                    name="firstName"
                    onChange={inputHandler}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Last Name*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.lastName}
                    name="lastName"
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Email*</h6>
                  <input
                    type="email"
                    className="inp_feild"
                    value={details.email}
                    name="email"
                    onChange={inputHandler}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Phone*</h6>
                  <input
                    type="number"
                    className="inp_feild"
                    value={details.phone}
                    name="phone"
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Address*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.address}
                    name="address"
                    onChange={inputHandler}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Country*</h6>
                  <Select
                    options={options}
                    value={value}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Source of Lead*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.sourceOfLead}
                    name="sourceOfLead"
                    onChange={inputHandler}
                  />
                </div>
                <div className="col-md-3">
                  <h6>State*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={details.state}
                    name="state"
                    onChange={inputHandler}
                  />
                </div>
              </div>

              <button type="submit" className="buttonWrap">
                <ButtonIcon
                  src="../../images/right-arrow.png"
                  text="Submit"
                  id="btn_radius"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
