import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import chatlogo from "../images/chatlogo.png";

// import { Link, NavLink } from "react-router-dom";



const Header = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-black bg-black fixed-top  ">
        <div class="container ">
          <a class="navbar-brand m-2" href="/">
            <img
              src={chatlogo}
              height="40"
              alt="logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
            <small className="text-white mx-3 fs-3 ">Convo</small>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                {/* <NavLink className="nav-link white" to="/homepage">
                  Home
                </NavLink> */}
              </li>
              <li className="nav-item mx-2">
                if(currentUser==false){
                  <button className="btn btn-success white">Login/Registration</button>
                }else{
                  <button className="btn btn-danger white">Logout</button>
                }
                {/* <NavLink className="btn btn-success white" to="/loginpage">
                  { ? "Logout" : "Login/Registration"}
                </NavLink> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
