import React, { Component } from 'react';
import './css/nav.css'

class Navigation extends Component {
    render() {
        return (
            // <nav className="nav">
            //     <h1 className="nav-logo">Zappy</h1>
            //     <div className="menu-icon">
            //     <ul className="nav-links">
            //         <li><a>Home</a></li>
            //         <li><a>Học tập</a></li>
            //         <li><a>Kiểm tra</a></li>
            //         <li><a>Chơi game</a></li>
            //     </ul>
            //     </div>
            // </nav>
            // <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#ff9999"}}>
                {/* <!-- Container wrapper --> */}
                <div class="container-fluid">
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
                        <a class="navbar-brand mt-2 mt-lg-0" href="#">
                            <img
                                src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                                height="15"
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        {/* <!-- Left links --> */}
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Trang chủ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Học tập</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Kiểm tra</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Chơi game</a>
                            </li>
                        </ul>
                        {/* <!-- Left links --> */}
                    </div>
                    {/* <!-- Collapsible wrapper -->
            
                <!-- Right elements --> */}
                    <div class="d-flex align-items-center">
                        {/* <!-- Icon --> */}

                        {/* <!-- Notifications --> */}
                        <a
                            class="text-reset me-3"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="fas fa-gem"></i>
                        </a>
                        <a
                            class="text-reset me-3"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="fas fa-bell"></i>
                            <span class="badge rounded-pill badge-notification bg-danger">1</span>
                        </a>
                        {/* <ul
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <li>
                                <a class="dropdown-item" href="#">Some news</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Another news</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </li>
                        </ul> */}

                        {/* <!-- Avatar --> */}
                        <div class="nav-item dropdown">
                            <a
                                class="dropdown-toggle"
                                data-toggle = "dropdown"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                aria-haspopup = "true"
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
                                aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a class="dropdown-item list" href="#">Thông tin cá nhân</a>
                                </li>
                                <li>
                                    <a class="dropdown-item list" href="#">Settings</a>
                                </li>
                                <li>
                                    <a class="dropdown-item list" href="#">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Right elements --> */}
                </div>
                {/* <!-- Container wrapper --> */}
            </nav>
            // <!-- Navbar -->   
        );
    }
}

export default Navigation;