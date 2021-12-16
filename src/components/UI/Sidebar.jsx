import React from "react";
import "./SidebarStyle.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
export default function Sidebar({ role }) {
  return (
    <div class="text-white text-center" id="sidebar-wrapper">
      <div id="child-wrapper">
        <div class="sidebar-heading text-center fw-bold text-uppercase">
          <i class=""></i>Zappy
        </div>
        {role == "Account Manager" && (
          <div class="list-group list-group-flush">
            <NavLink
              to="/admin/acc-mng" title="Quản lý tài khoản"
              className="list-group-item list-group-item-action bg-transparent"
              avtiveClassName="active"
            >     <p>Quản lý <br /> tài khoản</p></NavLink>
          </div>
        )}
        {role == "Content Manager" && (
          <div class="list-group list-group-flush">
            <NavLink
              to="/content-mng/question-mng"
              title="Quản lý câu hỏi"
              className="list-group-item list-group-item-action bg-transparent"
              avtiveClassName="active"
            >  <p>Quản lý <br /> câu hỏi</p></NavLink>

            <a
              data-bs-toggle="collapse"
              href="#collapseOption" role="button" aria-expanded="false" aria-controls="collapseOption"
              // to="/admin/acc-mng"
              title="Quản lý bài học"
              class="list-group-item list-group-item-action bg-transparent"
            >
              <p> Quản lý<br /> bài học </p>
            </a>
            <div class="collapse border-top border-light mx-3" id="collapseOption">
              <NavLink
                to="/content-mng/lesson-mng/kanji"
                title="Quản lý chữ Hán"
                className="list-group-item list-group-item-action bg-transparent"
                avtiveClassName="active"
              >  <p id="child-list">Quản lý <br /> Chữ Hán</p></NavLink>
              <NavLink
                to="/content-mng/lesson-mng/vocabulary"
                title="Quản lý từ vựng"
                className="list-group-item list-group-item-action bg-transparent"
                avtiveClassName="active"
              >  <p id="child-list">Quản lý <br /> Từ vựng</p></NavLink>
              <NavLink
                to="/content-mng/lesson-mng/grammar"
                title="Quản lý ngữ pháp"
                className="list-group-item list-group-item-action bg-transparent"
                avtiveClassName="active"
              >  <p id="child-list">Quản lý <br /> Ngữ pháp</p></NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
