import React from "react";
import "./SidebarStyle.css";

export default function Sidebar() {
  return (
    <div class="text-white text-center" id="sidebar-wrapper">
      <div id="child-wrapper">
        <div class="sidebar-heading text-center fw-bold text-uppercase">
          <i class=""></i>Zappy
        </div>
        <div class="list-group list-group-flush">
          <a
            href="#"
            class="list-group-item list-group-item-action bg-transparent active"
          >
            <i class="fas fa-tachometer-alt"></i>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action bg-transparent"
          >
            <i class="fas fa-project-diagram"></i>
          </a>

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
