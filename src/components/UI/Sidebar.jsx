import React from "react";
import "./SidebarStyle.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div class="text-white text-center" id="sidebar-wrapper">
      <div id="child-wrapper">
        <div class="sidebar-heading text-center fw-bold text-uppercase">
          <i class=""></i>Zappy
        </div>
        <div class="list-group list-group-flush">
          <Link
            to="/admin"
            title="Dashboard"
            class="list-group-item list-group-item-action bg-transparent active"
          >
            <i class="fas fa-tachometer-alt fa-2x"></i>
          </Link>
          <Link
            to="/admin/accMng"
            title="Account Management"
            class="list-group-item list-group-item-action bg-transparent"
          >
            <i class="fas fa-project-diagram"></i>
          </Link>

          <a
            href="#"
            class="list-group-item list-group-item-action bg-transparent"
          >
            <i class="fas fa-power-off"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
