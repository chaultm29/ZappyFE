import React from "react";
import "./SidebarStyle.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Sidebar({ role }) {
  return (
    <div class="text-white text-center" id="sidebar-wrapper">
      <div id="child-wrapper">
        <div class="sidebar-heading text-center fw-bold text-uppercase">
          <i class=""></i>Zappy
        </div>
        {role == "Account Manager" && (
          <div class="list-group list-group-flush">
            <Link
              to="/admin/dashboard"
              title="Thống kê"
              class="list-group-item list-group-item-action bg-transparent active"
            >
              <i class="fas fa-tachometer-alt fa-2x"></i>
            </Link>
            <Link
              to="/admin/acc-mng"
              title="Quản lý tài khoản"
              class="list-group-item list-group-item-action bg-transparent"
            >
              <i class="fas fa-project-diagram"></i>
            </Link>
          </div>
        )}
        {role == "Content Manager" && (
          <div class="list-group list-group-flush">
            <Link
              to="/content-mng/question-mng"
              title="Quản lý câu hỏi"
              class="list-group-item list-group-item-action bg-transparent active"
            >
              <i class="far fa-question-circle fa-2x"></i>
            </Link>
            <a
              data-bs-toggle="collapse"
              href="#collapseOption" role="button" aria-expanded="false" aria-controls="collapseOption"
              // to="/admin/acc-mng"
              title="Quản lý bài học"
              class="list-group-item list-group-item-action bg-transparent"
            >
              <i class="fas fa-chalkboard-teacher"></i>
            </a>
            <div class="collapse" id="collapseOption">
              <Link
                to="/admin/dashboard"
                title="Quản lý câu hỏi"
                class="list-group-item list-group-item-action bg-transparent active"
              >
                <i class="far fa-question-circle fa-2x"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
