import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import validate from "../components/Others/ValidateInfo";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = () => {
  let Baseurl = "https://freshhu.com/cnu/projectmanagement/api";

  let authToken = localStorage.getItem("auth_token");

  const url = `${Baseurl}/login`;

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  console.log(url);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  let history = useHistory();

  const handleLogin = (e) => {
    let error = 0;
    console.log("click");
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);

    const user = {
      email: values.email,
      password: values.password,
    };

    const instance = axios.create({
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    if (values.email === "" || values.password === "") {
      error++;
    } else {
      console.log("no errors");
    }

    if (error === 0) {
      axios
        .post(url, qs.stringify(user), instance)
        .then((response) => {
          console.log(response, "user-details");
          localStorage.setItem("status", response.status);
          localStorage.setItem("firstName", response.data.user.firstName);
          localStorage.setItem("lastName", response.data.user.lastName);
          localStorage.setItem("role-names", response.data.user.roleName);
          localStorage.setItem("base-url", response.data.user);

          let status = localStorage.getItem("status");

          if (status == 201) {
            // let baseUrl = localStorage.getItem("baseUrl")

            // let userType = baseUrl.split("/")[0];
            // history.push(`${userType}/Dashboard`);

            history.push("/admin/dashboard");
            console.log(response, "user-details");
            window.location.reload(true);
            localStorage.setItem("auth_token", response.data.token);
            localStorage.setItem("username", response.data.user.firstName);
            toast("You have Logged In Succesfully", { type: "success" });
          } else {
            history.push("/");
            toast("wrong credentials", { type: "error" });
          }
        })

        .catch((error) => {
          console.error("There was an error!", error);
          console.log("error");
          toast("Please Enter Valid Email and Password", { type: "error" });
        });
    } else {
      console.log("please fill the form");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
    }
  }, [errors]);

  return (
    <>
      {authToken ? (
        <Redirect to="/admin/dashboard" />
      ) : (
        <>
          <div className="login_manage">
            <div className="login_manage_logo" style={{ marginTop: "1%" }}>
              <img
                src="/images/logoimg.png"
                className="sidebar_logo"
                alt="adsfdghf"
              />
            </div>
            <div className="login_manage_block">
              <div className="login_manage_block_l">
                <img
                  src="/images/Group 4119.svg"
                  className="image_proj"
                  alt=""
                />
              </div>
              <div className="login_manage_block_r">
                <div className="login_manage_block_r_sec">
                  <h2>User Login</h2>
                  <form onSubmit={handleLogin}>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="inp_feild"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleUpdate}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}

                    <div style={{ position: "relative" }}>
                      <input
                        id="password"
                        name="password"
                        type={isRevealPwd ? "text" : "password"}
                        className="inp_feild"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleUpdate}
                      />

                      <i
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "20px",
                          cursor: "pointer",
                        }}
                        className={
                          isRevealPwd ? "fas fa-eye" : "fas fa-eye-slash"
                        }
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      />
                    </div>

                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}

                    <Link to="/ForgotPassword" className="side_links">
                      <p className="text-right">Forgot Password ?</p>
                    </Link>
                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="danger"
                        className="btn_val"
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
