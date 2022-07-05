import { TextField, Button } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import chatlogo from "../images/chatlogo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const handleFormSubmit = (formdata) => {
    console.log("Login Successfull!");
    console.log(formdata);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
    password: Yup.string().required(" Required field"),
  });

  return (
    <div
      className="container-fluid"
      style={{
        background:
          "linear-gradient(to right, rgba(37, 37, 37, 0.547),rgba(33, 33, 33, 0.524)),url('') ",
        backgroundRepeat: "no-repeat",
        height: "92vh",
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "90vh" }}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-3">
            <div className="card card-blur">
              <div className="card-body">
                {/* <h3 className=" text-center">Login </h3> */}
                <img src={chatlogo} alt="logo" className="img-logo " />
                <hr />
                <Formik
                  initialValues={{ email: "", password: "" }} //specifying initial value for form
                  onSubmit={handleFormSubmit} // function to handle form submission
                  validationSchema={loginSchema}
                >
                  {({ values, handleChange, handleSubmit, errors }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        label="Email"
                        placeholder="Email Address"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />

                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        type="password"
                        label="Password"
                        placeholder="Password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5 }}
                        color="success"
                      >
                        Login Now
                      </Button>
                      <hr className="" />
                      <p
                        className="fs-6 fw-bold"
                        style={{ textAlign: "center" }}
                      >
                        Don't have an account?
                        <Link className=" darkgreen fs-5 " to={"/registerpage"}>Sign up</Link>
                        
                      </p>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
