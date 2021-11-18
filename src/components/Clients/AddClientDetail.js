import React, { useState } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Button from "../../components/Others/Button";

const AddClientDetail = () => {
  const [Projectcost, setProjectcost] = useState("");

  const [Business, setBusiness] = useState("");
  const [Projectname, setProjectname] = useState("");
  const [ProjectType, setProjectType] = useState("");
  const [ProgLang, setProgLang] = useState("");
  const [yes, setyes] = useState("");

  const result = [
    { ProjectType },
    { Projectcost },
    { Business },
    { Projectname },
    { ProjectType },
    { ProgLang },
    { yes },
  ];
  const resultone = (e) => {
    setProgLang(e.target.value);
  };
  const resulttwo = (e) => {
    setyes(e.target.value);
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="activeclass" cname3="" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="step_details_block">
            <div class="step_details">
              <span class="active step_details_sec">1</span>
            </div>
            <div class="step_detailss">
              <span class="active step_details_sec">2</span>
            </div>
          </div>

          <div className="addproject">
            <h1>Project Details </h1>

            <form>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project *</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={Projectname}
                    onChange={(e) => {
                      setProjectname(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Business Type*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={Business}
                    onChange={(e) => {
                      setBusiness(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Cost*</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={Projectcost}
                    onChange={(e) => {
                      setProjectcost(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Referral*</h6>
                  <select onChange={resulttwo}>
                    <option></option>
                    <option value="yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Type</h6>
                  <input
                    type="text"
                    className="inp_feild"
                    value={ProjectType}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <h6>Select Platform</h6>
                  <select onChange={resultone}>
                    <option></option>
                    <option value="WordPress">Word Press</option>
                    <option value="PHP">PHP</option>
                  </select>
                </div>
              </div>

              <Button
                src="images/right-arrow.png"
                text="submit"
                id="btn_radius"
              />

              {JSON.stringify(result)}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientDetail;
