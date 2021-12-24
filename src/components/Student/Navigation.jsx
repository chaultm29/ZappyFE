import React, { Component } from "react";
import Profile from "../../pages/User/Profile";
import "./css/nav.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import Login from "../../pages/User/Login.jsx";
import Register from "../../pages/User/Register";
import UserServices from "../../services/UserServices";
import S3config from '../../services/S3Config.js';
import defaultAvatar from '../../assets/img/default.png'
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, level: [], percentage: 0, avaLink: "" };
  }

  componentDidMount() {
    if (AuthenticationService.getCurrentUser() !== null) {
      UserServices.getProfile().then((res) => {
        this.setState({
          avaLink: S3config.baseURLAvatar + res.data.avatar
        });
      })
    }
    if (AuthenticationService.getRoleName() === "Student") {
      UserServices.getLevel().then((res) => {
        this.setState({ level: (res ? res.data : 0), percentage: (res.data.currentExp * 100 / res.data.levelExp) });
      });

    }
  }
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
                {AuthenticationService.getRoleName() === "Student" ? <>  <li class="nav-item me-3 text-uppercase ">
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
                    >Game</NavLink>
                  </li> </> : AuthenticationService.getRoleName() === "Content Manager" ? <>
                    <li class="nav-item me-3 text-uppercase">
                      <NavLink
                        to="/content-mng/question-mng"
                        className="nav-link"

                      >Trang quản lý</NavLink>
                    </li> </> : AuthenticationService.getRoleName() === "Admin" ?
                  <> <li class="nav-item me-3 text-uppercase">
                    <NavLink
                      to="/admin/acc-mng"
                      className="nav-link"
                    >Trang quản lý</NavLink>
                  </li> </> : ""}

              </ul>
              {/* <!-- Left links --> */}
            </div>
            {/* <!-- Collapsible wrapper -->
            
                <!-- Right elements --> */}

            {/* <!-- Icon --> */}

            {/* <!-- Notifications --> */}
            {AuthenticationService.getCurrentUser() !== null && AuthenticationService.getRoleName() === "Student" ? <>
              <div class="d-flex align-items-center" style={{ width: "20%" }}>
                <div class="nav-item container">
                  <center style={{ color: "#4890E4" }}>Level {this.state.level.level} &nbsp;&nbsp;&nbsp;   {typeof (this.state.level.currentExp) !== "undefined" ? this.state.level.currentExp + "/" + this.state.level.levelExp + " EXP" : ""}</center>
                  <div class="progress progress-striped">
                    <div class="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" style={{ width: this.state.percentage + "%" }} aria-valuemin="0" aria-valuemax="100">{this.state.level.currentExp + "/" + this.state.level.levelExp} EXP

                    </div>
                  </div>
                </div>
                <div clas="nav-item container">
                  <span class="me-2"> {AuthenticationService.getCurrentUser()} </span>
                </div>

                <div class="nav-item dropdown me-2">
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
                      src={this.state.avaLink ? this.state.avaLink : defaultAvatar}
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
                      <a class="dropdown-item list" data-bs-toggle="modal" data-bs-target="#profileModal" onClick={() => this.setState({ isClicked: true })}>
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
              </div>
            </> : AuthenticationService.getCurrentUser() !== null && AuthenticationService.getRoleName() !== "Student" ? <>
              <div class="d-flex align-items-center">
                <div clas="nav-item container">
                  <span class="me-2"> {AuthenticationService.getCurrentUser()} </span>
                </div>

                <div class="nav-item dropdown me-2">
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
                      src={this.state.avaLink ? this.state.avaLink : defaultAvatar}
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
                      <a class="dropdown-item list" data-bs-toggle="modal" data-bs-target="#profileModal" onClick={() => this.setState({ isClicked: true })}>
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
              </div>
            </> :
              <div class="d-flex align-items-center">
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
              </div>
            }
            {/* <!-- Right elements --> */}
          </div>
          {/* <!-- Container wrapper --> */}
        </nav>
        <Profile isClicked={this.state.isClicked} />
      </>
      // <!-- Navbar -->
    );
  }
}

export default Navigation;