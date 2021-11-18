import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonIcon from "../Others/ButtonIcon";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Table, Button } from "react-bootstrap";

const UserLogActivity = () => {
  let history = useHistory();
  let token = localStorage.getItem("auth_token");
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  const [userlogactivity, setuserlogactivity] = useState([]);
  const [selectvalactivities, setselectvalactivities] = useState([]);
  const [lastdate, setlastdate] = useState([]);
  const [perpage, setperpage] = useState([]);
  const [startdate, setstartdate] = useState();
  const [loading, setLoading] = useState(true);
  const [enddate, setenddate] = useState();
  localStorage.setItem("logstartdate", startdate);
  localStorage.setItem("logenddate", enddate);
  let Baseurl = "https://freshhu.com/cnu/projectmanagement/api";
  const logurl = `${Baseurl}/admin/user-log-activity?page=${selectvalactivities}`;
  const datewiseurl = `${Baseurl}/admin/user-log-activity?dateFrom=${startdate}&dateTo=${enddate}`;
  console.log(datewiseurl, "datewiseurl");

  useEffect(() => {
    axios
      .get(logurl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "statusresp");
        console.log(response.data);
        setlastdate(response.data.activities.last_page);
        setperpage(response.data.activities.per_page);
        setuserlogactivity(response.data.activities.data);

      })
      .catch((error) => {
        // console.log(error);
        console.log("fail");
      });
  }, [token]);

  const getdata = () => {
    axios
      .get(logurl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "statusresp");
        console.log(response.data);
        setlastdate(response.data.activities.last_page);
        setuserlogactivity(response.data.activities.data);
      })
      .catch((error) => {
        // console.log(error);
        console.log("fail");
      });
  };

  console.log(userlogactivity, "userlogactivity");

  const selectvalactivity = (e) => {
    setselectvalactivities(e.target.value);
  };

  let getusersdata = userlogactivity
    .filter((item) => {
      if (searchbar == "") {
        return item;
      } else if (
        item.userName?.toLowerCase().includes(searchbar.toLowerCase())
      ) {
        return item;
      }
    })
    .map((item, index) => {
      return (
        <>
          <tr key={item.id}>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.agent}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.created_at}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.ip}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.userName}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.projectName}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.method}</p>
            </td>

            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.subject}</p>
            </td>
            <td style={{ border: "1px solid darkgray" }}>
              <p>{item.url}</p>
            </td>
          </tr>
        </>
      );
    });

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(getusersdata.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    if (currentPage == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }
    setCurrentPage(selectedPage);
  }
  const currentPosts = getusersdata.slice(offset, offset + PER_PAGE);

  // ***********************************************************************************************
  var sub_array = [];
  for (var i = 1; i <= lastdate; i++) {
    sub_array.push(i);
  }
  let sub_arrayies = sub_array.map((item, index) => {
    return (
      <>
        <option value={item}>
          {perpage * index}-{(index + 1) * perpage}
        </option>
      </>
    );
  });

  // ***********************************************************************************************

  const movetodatebased = () => {

    if((enddate > startdate) && (startdate || enddate)){
  
      history.push("/UserLogBasedondate");
  
    }else if(enddate < startdate){
  
      history.push("/admin/user-log-activity");
  
      toast("The Deadlinedate End must be a greater than Deadlinedate Start", { type: "error" });
  
  
  
    }else{
  
      history.push("/admin/user-log-activity");
  
      toast("please select Deadlinedate Start and Deadlinedate End", { type: "error" });
  
  
  
    } 
    };
  

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <h3 className="projectheadline">User Log Activity</h3>
          <hr />

          <select onChange={selectvalactivity} style={{border:'1px solid darkgray' , borderRadius:'5px',padding:'3px 5px'}}>{sub_arrayies}</select>

          <Button variant="danger" size="sm" className="m-3" onClick={getdata}>
            get Data
          </Button>

          <div className="d-flex justify-content-end projectmaintabs">
            <div className="mx-5 my-3">
              <h6 className="text-center">Start Date</h6>
              <img src="/images/Icon awesome-filter.svg" className="mx-3" />
              <input
                type="date"
                value={startdate}
                onChange={(e) => {
                  setstartdate(e.target.value);
                }}
              />
            </div>
            <div className="mx-5 my-3">
              <h6 className="text-center">End Date</h6>

              <input
                type="date"
                value={enddate}
                onChange={(e) => {
                  setenddate(e.target.value);
                }}
              />
            </div>
            <div className="mt-auto mb-3">
              <Button variant="danger" onClick={movetodatebased} type="button">
                Submit
              </Button>
            </div> 
            
          </div>

          {/* <div className="mx-5 my-3 searchbar"> 
          <img src="/images/Icon awesome-filter.svg" className="mx-3" />

            <input
              type="text"
              placeholder="Search Project Name"
              value={searchbar}
              style={{
                border: "1px solid darkgray",
                padding: "3px 5px",
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setsearchbar(e.target.value);
              }}
            />
          </div> */}
          <Table striped  hover responsive >
            <thead>
              <tr>
                <th>Agent</th>
                <th>Created_at</th>
                <th>IP</th>
                <th>UserName</th>
                <th>ProjectName</th>
                <th>Method</th>
                <th>Subject</th>
                <th>url</th>
              </tr>
            </thead>
            <tbody className="userlogactivity">{currentPosts}</tbody>
          </Table>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLogActivity;
