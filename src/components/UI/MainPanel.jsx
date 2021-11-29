import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import "./MainPanel.css";

export default function MainPanel({ username, site, siteContent }) {
  return (
    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
        <div class="d-flex align-items-center">
          <i
            class="fas fa-align-left primary-text fs-4 me-3 d-none"
            id="menu-toggle"
          ></i>
          <h2 class="fs-2 m-0 fw-bold">{site}</h2>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon "></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <a
              class="nav-link second-text fw-bold me-2"
              id="navbarDropdown"
              href="#"
              role="button"
            >
              <i class="fas fa-bell px-1"></i>
            </a>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle second-text fw-bold"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user me-2"></i>
                {username}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: "-43%" }}>
                <li>
                  <a class="dropdown-item" href="#">
                    Thông tin tài khoản
                  </a>
                </li>
                <li>
                </li>
                <li>
                  <a class="dropdown-item" href="#" onClick={() => AuthenticationService.logout()}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      {siteContent}
    </div>
  );
}
