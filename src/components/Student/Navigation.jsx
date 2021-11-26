import React, { Component } from "react";
import Profile from "../../pages/User/Profile";
import "./css/nav.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import Login from "../../pages/User/Login.jsx";
import Register from "../../pages/User/Register";
class Navigation extends Component {


  render() {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light border-bottom">
          {/* <!-- Container wrapper --> */}
          <div class="container-fluid ">
            {/* <!-- Toggle button --> */}
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
            {/*             
                <!-- Collapsible wrapper --> */}
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!-- Navbar brand --> */}
              <a
                class="navbar-brand mt-2 mt-lg-0 border-end border-2 pe-3 "
                href="#"
              >
                <img
                  src="https://i.postimg.cc/vmXFPyj0/logo-Zappy.gif"
                  height="45px"
                />
              </a>
              {/* <!-- Left links --> */}
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item me-3 text-uppercase">
                  <NavLink
                    to="/home"
                    className="nav-link"
                    avtiveClassName="selected"
                  >Trang chủ</NavLink>
                </li>
                <li class="nav-item me-3 text-uppercase ">
                  <NavLink
                    to="/study"
                    className="nav-link"

                  >Học tập</NavLink>
                </li>
                <li class="nav-item me-3 text-uppercase">
                  <NavLink
                    to="/exam"
                    className="nav-link"

                  >Kiểm tra</NavLink>
                </li>
                <li class="nav-item me-3 text-uppercase">
                  <NavLink
                    to="/play-game"
                    className="nav-link"
                  >Chơi game</NavLink>
                </li>
              </ul>
              {/* <!-- Left links --> */}
            </div>
            {/* <!-- Collapsible wrapper -->
            
                <!-- Right elements --> */}
            <div class="d-flex align-items-center">
              {/* <!-- Icon --> */}

              {/* <!-- Notifications --> */}
              {AuthenticationService.getCurrentUser() != null ? <>

                <div class="nav-item container" id="sim-progress">
                  <div class="progress progress-striped active sim-pro">
                    <div class="progress-bar" role="progressbar" style={{ width: "60%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">45% Complete</span>
                    </div>
                  </div>
                </div>
                <a
                  class="text-reset me-3"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >

                  <i class="fas fa-bell"></i>

                  <span class="badge rounded-pill badge-notification bg-danger">
                    1
                  </span>
                </a>

                <div class="nav-item dropdown">
                  <a
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    data-mdb-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                      class="rounded-circle"
                      height="25"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                  <ul
                    class="dropdown-menu"
                    style={{ right: "-20%" }}
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item list" data-bs-toggle="modal" data-bs-target="#profileModal">
                        Thông tin cá nhân
                      </a>

                    </li>
                    <li>
                      <a class="dropdown-item list" href="#" onClick={() => AuthenticationService.logout()}>
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              </> :
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item me-3 text-uppercase">
                    <a
                      href=""
                      data-toggle="modal"
                      data-target="#loginModal"
                      className="nav-link active"
                    >Đăng nhập</a>
                    <Login />
                  </li>
                  <li class="nav-item me-3 text-uppercase">
                    <a
                      href=""
                      className="nav-link active"
                      data-toggle="modal"
                      data-target="#registerModal"
                    >Đăng kí</a>
                    <Register />
                  </li>
                </ul>

              }



            </div>

            {/* <!-- Right elements --> */}
          </div>
          {/* <!-- Container wrapper --> */}
        </nav>
        {/* <Profile /> */}
      </>
      // <!-- Navbar -->
    );
  }
}

export default Navigation;