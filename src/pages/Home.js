import React, { useState, useEffect } from "react";
import Card from "../components/Others/Card";
import Card_manage from "../components/Others/Card_manage";
import Header from "../components/Others/Header";
import Sidebar from "../components/Others/Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import * as moment from "moment";


function Home() {
  let history = useHistory();
  const [value, onChange] = useState(new Date());
  const [dashboards, setdashboards] = useState([]);
  const [enddateshow, setenddateshow] = useState([]);
  const [updateenddateshow, setupdateenddateshow] = useState([]);
  const [Projectslist, setProjectslist] = useState([]);
  console.log(value, "clicked date");
  const selectedDate = moment(new Date(value)).format("YYYY-MM-DD");
  console.log(selectedDate, "selectedDate");
  let token = localStorage.getItem("auth_token");
  console.log(token);

  useEffect(() => {
    axios
      .get("https://freshhu.com/cnu/projectmanagement/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data, "1");
        console.log(
          response.data.projectDeadLineDates,
          "project deadline list"
        );
        setenddateshow(response.data.projectDeadLineDates);
        setdashboards(response.data.count);
        console.log(enddateshow, "enddateshow");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/deadline-date-projects?date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //   Authorization: "Bearer 8|S8eWVP45Z8lzgaEQ6u0BN7MBO0EqjTXdI3ox9WeA",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        // handle success
        console.log(response.data, "2");

        setProjectslist(response.data.projects);
       
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [selectedDate]);
  // .......................................................................
  useEffect(() => {
    let people = [];

    for (let i = 0; i < enddateshow.length; i++) {
      var dateval = moment(new Date(enddateshow[i].endDate)).format(
        "YYYY-MM-DD"
      );
      people.push(dateval);
    }

    setupdateenddateshow(people);
    localStorage.setItem("deadlines", people);
  }, [enddateshow]);

  // .......................................................................

  console.log(dashboards, "dashboard data");
  console.log(Projectslist, "Projectslist");

  let listitemdata;
  listitemdata = Projectslist.filter((item) => {
    let endDate = moment(new Date(item.endDate)).format("YYYY-MM-DD");
    localStorage.setItem("endDates", endDate);

    if (item == "") {
      return <p>No Projects on this Deadline</p>;
    } else if (item.endDate.includes(selectedDate)) {
      return item;
    }
  }).map((item) => {
    let endDate = moment(new Date(item.endDate)).format("YYYY-MM-DD");
    return (
      <>
        <Card_manage
          key={item.project_id}
          projectId={item.id}
          heading={item.projectName}
          status={item.status}
          Deadline={endDate}
     
        /> 
      </>
    );
  });

  let endDates = localStorage.getItem("endDates");

  console.log(endDates, selectedDate, "enddate");

  console.log(endDates, "endDates");

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="activeclass" cname2="" cname3="" cname4="" />
        </div>

        <div className="Proj_main_r">
          <Header />

          <div className="home">
            <h1>Dashboard</h1>
            <div className="home_block">
              <Card
                src="../../images/Group 11.svg"
                text="Ongoing Projects"
                val={dashboards.totalProjects}
              />

              <Card
                src="../../images/Icon awesome-money-check-alt.svg"
                text="Pending Projects"
                val={dashboards.totalPendingProjects}
              />
              <Card
                src="../../images/Icon awesome-money-check-alt.svg"
                text="Total Installments"
                val={dashboards.totalInstallments}
              />
              <Card
                src="../../images/Icon awesome-money-check-alt.svg"
                text="Pending Payments"
                val={dashboards.totalUnPaidInstallmentsAmount}
              />
              <Card
                src="../../images/Group 11.svg"
                text="Total Projects"
                val={dashboards.totalProjects}
              />
              <Card
                src="../../images/Group 11.svg"
                text="Potential  Projects"
                val={dashboards.totalPotentialProjects}
              />
            </div>
            <div className="home_block_sec">
              <div className="home_block_sec_l">
                <h2>Project Deadline</h2>
                <Calendar
                  onChange={onChange}
                  value={value}
                  tileClassName={({ date, view }) => {
                    if (
                      updateenddateshow.find(
                        (x) => x === moment(date).format("YYYY-MM-DD")
                      )
                    ) {
                      return "highlight";
                    }
                  }}
                ></Calendar>
              </div>
              <div className="home_block_sec_r">
                {endDates == selectedDate ? (
                  Projectslist.filter((item) => {
                    let endDate = moment(new Date(item.endDate)).format(
                      "YYYY-MM-DD"
                    );

                    if (item == "") {
                      return <p>No Projects on this Deadline</p>;
                    } else if (item.endDate.includes(selectedDate)) {
                      return item;
                    }
                  }).map((item) => {
                    let endDate = moment(new Date(item.endDate)).format(
                      "YYYY-MM-DD"
                    );
                    return (
                      <>
                        <Card_manage
                          key={item.project_id}
                          projectId={item.id}
                          heading={item.projectName}
                          status={item.status}
                          Deadline={endDate} 
                          alp= {item.teamsList.map((teamsList) => {
                          let datalistteam = teamsList.projectTeamType.match(/\b(\w)/g)
                          return (
                            <div className="item-nm" key={teamsList.id}>
                            {datalistteam}  
                            </div>
                          )
                       }
                       )} 
                        />
                      </>
                    );
                  })
                ) : (
                  <h6>No Projects on this Deadline</h6>
                )}
              </div>
              <div style={{ display: "none" }}>{listitemdata}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;